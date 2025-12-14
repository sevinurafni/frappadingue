import React from 'react';
import { TERRAIN, GRID_SIZE, CELL_SIZE } from '../constants/config';

const GridDisplay = ({ grid, robot, plants, chargingStation, path }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 overflow-auto">
      <div 
        className="inline-block border-2 border-gray-600"
        style={{ 
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: '1px',
          backgroundColor: '#333'
        }}
      >
        {grid.map((row, y) => 
          row.map((cell, x) => {
            const isRobot = robot.x === x && robot.y === y;
            const isCharging = chargingStation.x === x && chargingStation.y === y;
            const plant = plants.find(p => p.x === x && p.y === y);
            const isOnPath = path.some(p => p.x === x && p.y === y);
            
            return (
              <div
                key={`${x}-${y}`}
                className="relative flex items-center justify-center text-xs transition-colors"
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  backgroundColor: TERRAIN[cell]?.color || '#333',
                  opacity: isOnPath && !isRobot ? 0.7 : 1,
                  border: isOnPath ? '2px solid yellow' : 'none'
                }}
              >
                {isRobot && (
                  <div className="w-full h-full bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    🤖
                  </div>
                )}
                {isCharging && !isRobot && (
                  <div className="text-xl">⚡</div>
                )}
                {plant && !isRobot && (
                  <div className={`text-xl ${plant.watered ? 'opacity-30' : ''}`}>
                    {plant.watered ? '✅' : '🌱'}
                    <span className="absolute top-0 right-0 text-xs font-bold text-red-500">
                      {plant.urgency}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default GridDisplay;