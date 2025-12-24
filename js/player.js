export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
    this.speed = 6;
    this.bulletLevel = 1; // 1: 单发, 2: 三向, 3: 连射增强
  }

  draw(ctx) {
    ctx.fillStyle = '#4dff4d';
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, this.y);
    ctx.lineTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#00ccff';
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + 15, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  upgradeBullet() {
    if (this.bulletLevel < 3) {
      this.bulletLevel++;
      return true;
    }
    return false;
  }
}