// 碰撞检测 AABB
export function isColliding(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

// 随机整数 [min, max)
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}