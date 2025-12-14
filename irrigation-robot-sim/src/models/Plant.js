export class Plant {
  constructor(id, x, y, urgency) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.urgency = urgency; // 1-3, higher = more urgent
    this.watered = false;
  }

  water() {
    this.watered = true;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  static generateRandom(grid, count) {
    const plants = [];
    const GRID_SIZE = grid.length;
    
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * (GRID_SIZE - 4)) + 2;
        y = Math.floor(Math.random() * (GRID_SIZE - 4)) + 2;
      } while (grid[y][x] === 'OBSTACLE' || (x === 1 && y === 1));
      
      const urgency = Math.floor(Math.random() * 3) + 1;
      plants.push(new Plant(i, x, y, urgency));
    }
    
    return plants;
  }
}