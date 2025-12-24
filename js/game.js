import { Player } from './player.js';
import { createBullets } from './bullet.js';
import { spawnEnemy } from './enemy.js';
import { Explosion } from './explosion.js';
import { isColliding } from './utils.js';

// DOM 元素
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const finalScoreEl = document.getElementById('final-score');
const gameOverEl = document.getElementById('game-over');
const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

// 游戏状态
let gameRunning = false;
let score = 0;
let frameCount = 0;

// 游戏对象
let player;
let bullets = [];
let enemies = [];
let explosions = [];

// 按键状态
const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

// 事件监听
window.addEventListener('keydown', (e) => {
  if (e.code in keys) keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
  if (e.code in keys) keys[e.code] = false;
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

function startGame() {
  gameRunning = true;
  score = 0;
  frameCount = 0;
  bullets = [];
  enemies = [];
  explosions = [];
  player = new Player(canvas.width / 2 - 25, canvas.height - 80);
  
  scoreEl.textContent = `得分: ${score}`;
  levelEl.textContent = `子弹等级: ${player.bulletLevel}`;
  gameOverEl.style.display = 'none';
  startScreen.style.display = 'none';
  
  gameLoop();
}

function endGame() {
  gameRunning = false;
  finalScoreEl.textContent = `得分: ${score}`;
  gameOverEl.style.display = 'block';
}

function gameLoop() {
  if (!gameRunning) return;

  // 清屏
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 背景星点
  ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
  for (let i = 0; i < 40; i++) {
    const x = Math.random() * canvas.width;
    const y = (Date.now() / 30 + i * 100) % (canvas.height + 20) - 10;
    ctx.fillRect(x, y, 1, 1);
  }

  // 玩家控制
  if (keys.ArrowLeft && player.x > 0) player.x -= player.speed;
  if (keys.ArrowRight && player.x < canvas.width - player.width) player.x += player.speed;

  // 自动射击（每12帧）
  if (frameCount % 12 === 0) {
    bullets.push(...createBullets(player));
  }

  // 生成敌人（每70帧）
  if (frameCount % 70 === 0) {
    enemies.push(spawnEnemy(canvas.width));
  }

  // 更新并绘制子弹
  bullets = bullets.filter(bullet => {
    bullet.update();
    if (!bullet.isOffScreen(canvas.height)) {
      bullet.draw(ctx);
      return true;
    }
    return false;
  });

  // 更新并绘制敌人
  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.update();
    enemy.draw(ctx);

    // 子弹击中检测
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (isColliding(bullets[j], enemy)) {
        explosions.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
        bullets.splice(j, 1);
        
        if (enemy.isReward()) {
          // 奖励敌人：升级子弹
          if (player.upgradeBullet()) {
            levelEl.textContent = `子弹等级: ${player.bulletLevel}`;
          }
          score += 50; // 高分奖励
        } else {
          score += 10;
        }
        scoreEl.textContent = `得分: ${score}`;
        enemies.splice(i, 1);
        break;
      }
    }

    // 敌人撞玩家
    if (isColliding(player, enemy)) {
      explosions.push(new Explosion(player.x + player.width / 2, player.y + player.height / 2));
      endGame();
      return;
    }

    // 移除屏幕外敌人
    if (enemy.isOffScreen(canvas.height)) {
      enemies.splice(i, 1);
    }
  }

  // 更新爆炸
  explosions = explosions.filter(exp => {
    exp.update();
    exp.draw(ctx);
    return !exp.isDead();
  });

  // 绘制玩家
  player.draw(ctx);

  frameCount++;
  requestAnimationFrame(gameLoop);
}

// 初始显示开始界面
startScreen.style.display = 'flex';