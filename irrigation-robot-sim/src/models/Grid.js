import { GRID_SIZE, TERRAIN } from '../constants/config';

export class Grid {
  static generate() {
    const grid = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_SIZE).fill(null).map(() => {
        const rand = Math.random();
        if (rand < 0.5) return 'GRASS';
        if (rand < 0.8) return 'SOIL';
        if (rand < 0.95) return 'CEMENT';
        return 'OBSTACLE';
      })
    );
    
    // Clear starting area
    grid[1][1] = 'CEMENT';
    grid[1][2] = 'CEMENT';
    grid[2][1] = 'CEMENT';
    
    return grid;
  }

  static getTerrainAt(grid, x, y) {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) {
      return null;
    }
    return grid[y][x];
  }

  static isValidPosition(grid, x, y) {
    const terrain = this.getTerrainAt(grid, x, y);
    return terrain && terrain !== 'OBSTACLE';
  }

  static getTerrainCost(terrainType) {
    return TERRAIN[terrainType]?.cost || Infinity;
  }
}