export class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 4;
    this.height = 12;
    this.speed = 8;
  }

  update() {
    this.y -= this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = '#ffff00';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isOffScreen(canvasHeight) {
    return this.y < 0;
  }
}

// 根据玩家等级生成子弹模式
export function createBullets(player) {
  const bullets = [];
  const centerX = player.x + player.width / 2;

  switch (player.bulletLevel) {
    case 1:
      bullets.push(new Bullet(centerX - 2, player.y));
      break;
    case 2:
      bullets.push(new Bullet(centerX - 10, player.y));
      bullets.push(new Bullet(centerX, player.y));
      bullets.push(new Bullet(centerX + 6, player.y));
      break;
    case 3:
      bullets.push(new Bullet(centerX - 15, player.y));
      bullets.push(new Bullet(centerX - 5, player.y));
      bullets.push(new Bullet(centerX + 5, player.y));
      bullets.push(new Bullet(centerX + 15, player.y));
      break;
  }
  return bullets;
}