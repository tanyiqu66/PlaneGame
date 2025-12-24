import { randInt } from './utils.js';

export class Enemy {
  constructor(x, y, type = 'normal') {
    this.x = x;
    this.y = y;
    this.type = type; // 'normal' or 'reward'
    this.width = type === 'reward' ? 30 : randInt(20, 35);
    this.height = this.width;
    this.speed = type === 'reward' ? 1.5 : randInt(1, 3);
    this.color = type === 'reward' ? '#FFD700' : '#ff5555'; // 金色为奖励
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeStyle = this.type === 'reward' ? '#FFA500' : '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }

  isReward() {
    return this.type === 'reward';
  }
}

// 随机生成敌人（5% 概率为奖励敌人）
export function spawnEnemy(canvasWidth) {
  const isReward = Math.random() < 0.05;
  const size = isReward ? 30 : randInt(20, 35);
  const x = randInt(0, canvasWidth - size);
  return new Enemy(x, -size, isReward ? 'reward' : 'normal');
}