import React from 'react';
import { useSimulation } from './hooks/useSimulation';
import ControlPanel from './components/ControlPanel';
import Statistics from './components/Statistics';
import Legend from './components/Legend';
import GridDisplay from './components/GridDisplay';

const App = () => {
  const {
    grid,
    robot,
    plants,
    chargingStation,
    path,
    isRunning,
    stats,
    pathMode,
    startSimulation,
    pauseSimulation,
    reset,
    initializeSimulation,
    setPathMode
  } = useSimulation();

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white p-4 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">
          🤖 Irrigation Robot Simulator - Phase 1
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-4">
          <ControlPanel
            isRunning={isRunning}
            onStart={startSimulation}
            onPause={pauseSimulation}
            onReset={reset}
            onNewMap={initializeSimulation}
            pathMode={pathMode}
            onPathModeChange={setPathMode}
            battery={robot.battery}
          />
          
          <Statistics 
            stats={stats}
            totalPlants={plants.length}
          />
          
          <Legend />
        </div>
        
        <GridDisplay
          grid={grid}
          robot={robot}
          plants={plants}
          chargingStation={chargingStation}
          path={path}
        />
        
        
      </div>
    </div>
  );
};

export default App;