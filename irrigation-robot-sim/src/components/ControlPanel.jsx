import React from 'react';
import { Play, Pause, RotateCcw, Battery } from 'lucide-react';

const ControlPanel = ({ 
  isRunning, 
  onStart, 
  onPause, 
  onReset, 
  onNewMap,
  pathMode,
  onPathModeChange,
  battery 
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex-1 min-w-[300px]">
      <h2 className="text-xl font-semibold mb-3">Controls</h2>
      
      <div className="flex gap-2 mb-4">
        <button
          onClick={isRunning ? onPause : onStart}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          {isRunning ? 'Pause' : 'Start'}
        </button>
        
        <button
          onClick={onReset}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
        >
          <RotateCcw size={20} />
          Reset
        </button>
        
        <button
          onClick={onNewMap}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition"
        >
          New Map
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span>Path Mode:</span>
          <select
            value={pathMode}
            onChange={(e) => onPathModeChange(e.target.value)}
            className="bg-gray-700 px-3 py-1 rounded"
            disabled={isRunning}
          >
            <option value="distance">Shortest Distance</option>
            <option value="time">Shortest Time</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <Battery 
            size={20} 
            className={battery < 20 ? 'text-red-500' : 'text-green-500'} 
          />
          <div className="flex-1 bg-gray-700 rounded h-6 overflow-hidden">
            <div 
              className={`h-full transition-all ${battery < 20 ? 'bg-red-500' : 'bg-green-500'}`}
              style={{ width: `${battery}%` }}
            />
          </div>
          <span>{battery.toFixed(0)}%</span>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;