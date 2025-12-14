import React from 'react';
import { TERRAIN } from '../constants/config';

const Legend = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 min-w-[250px]">
      <h2 className="text-xl font-semibold mb-3">Legend</h2>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded border-2 border-white"></div>
          <span>Robot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-lg">🌱</div>
          <span>Plant (urgency level)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center text-lg">⚡</div>
          <span>Charging Station</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: TERRAIN.GRASS.color }}></div>
          <span>Grass (slow)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: TERRAIN.SOIL.color }}></div>
          <span>Soil (medium)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: TERRAIN.CEMENT.color }}></div>
          <span>Cement (fast)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-900 rounded border border-gray-600"></div>
          <span>Obstacle</span>
        </div>
      </div>
    </div>
  );
};

export default Legend;