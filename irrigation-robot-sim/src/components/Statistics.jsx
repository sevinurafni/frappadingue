import React from 'react';

const Statistics = ({ stats, totalPlants }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 min-w-[250px]">
      <h2 className="text-xl font-semibold mb-3">Statistics</h2>
      <div className="space-y-2">
        <div>
          Distance: <span className="font-mono">{stats.distance} cells</span>
        </div>
        <div>
          Time: <span className="font-mono">{stats.time.toFixed(1)} units</span>
        </div>
        <div>
          Plants Watered: <span className="font-mono">{stats.plantsWatered}/{totalPlants}</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;