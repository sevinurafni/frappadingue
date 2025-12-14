// Configuration constants for the simulation
export const GRID_SIZE = 20;
export const CELL_SIZE = 30;
export const ANIMATION_SPEED = 200; // milliseconds
export const LOW_BATTERY_THRESHOLD = 20;
export const BATTERY_DRAIN_RATE = 0.5;
export const NUM_PLANTS = 8;

export const TERRAIN = {
  GRASS: { 
    color: '#90EE90', 
    cost: 2, 
    speed: 0.5, 
    name: 'Grass' 
  },
  SOIL: { 
    color: '#D2691E', 
    cost: 1, 
    speed: 1, 
    name: 'Soil' 
  },
  CEMENT: { 
    color: '#A9A9A9', 
    cost: 0.5, 
    speed: 2, 
    name: 'Cement' 
  },
  OBSTACLE: { 
    color: '#333', 
    cost: Infinity, 
    speed: 0, 
    name: 'Obstacle' 
  }
};