export class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.maxRadius = Math.random() * 30 + 20;
    this.life = 30;
  }

  update() {
    this.radius += 1.2;
    this.life--;
  }

  draw(ctx) {
    const alpha = this.life / 30;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, ${150 + this.life}, 0, ${alpha})`;
    ctx.fill();
  }

  isDead() {
    return this.life <= 0;
  }
}