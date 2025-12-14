import { GRID_SIZE } from '../constants/config';
import { Grid } from '../models/Grid';

export class Pathfinder {
  constructor(grid) {
    this.grid = grid;
  }

  // A* pathfinding algorithm
  findPath(start, goal, considerTerrain = true) {
    const openSet = [{
      ...start,
      g: 0,
      h: this.heuristic(start, goal),
      f: this.heuristic(start, goal),
      path: [start]
    }];
    
    const closedSet = new Set();
    
    while (openSet.length > 0) {
      // Get node with lowest f score
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift();
      
      // Check if reached goal
      if (current.x === goal.x && current.y === goal.y) {
        return current.path;
      }
      
      closedSet.add(`${current.x},${current.y}`);
      
      // Check neighbors
      const neighbors = this.getNeighbors(current);
      
      for (const neighbor of neighbors) {
        if (closedSet.has(`${neighbor.x},${neighbor.y}`)) continue;
        
        const terrainType = Grid.getTerrainAt(this.grid, neighbor.x, neighbor.y);
        if (!terrainType || terrainType === 'OBSTACLE') continue;
        
        const moveCost = considerTerrain ? Grid.getTerrainCost(terrainType) : 1;
        const g = current.g + moveCost;
        const h = this.heuristic(neighbor, goal);
        const f = g + h;
        
        const existingNode = openSet.find(n => n.x === neighbor.x && n.y === neighbor.y);
        
        if (!existingNode || g < existingNode.g) {
          const newPath = [...current.path, neighbor];
          if (existingNode) {
            existingNode.g = g;
            existingNode.f = f;
            existingNode.path = newPath;
          } else {
            openSet.push({ ...neighbor, g, h, f, path: newPath });
          }
        }
      }
    }
    
    return null; // No path found
  }

  // Manhattan distance heuristic
  heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  }

  // Get valid neighboring positions
  getNeighbors(pos) {
    const neighbors = [
      { x: pos.x + 1, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x, y: pos.y - 1 }
    ];
    
    return neighbors.filter(n => 
      n.x >= 0 && n.x < GRID_SIZE && n.y >= 0 && n.y < GRID_SIZE
    );
  }
}