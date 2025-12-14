import { useState, useEffect, useRef } from 'react';
import { Grid } from '../models/Grid';
import { Robot } from '../models/Robot';
import { Plant } from '../models/Plant';
import { Pathfinder } from '../algorithms/pathfinding';
import { TaskScheduler } from '../algorithms/scheduling';
import { NUM_PLANTS, ANIMATION_SPEED } from '../constants/config';

export const useSimulation = () => {
  const [grid, setGrid] = useState([]);
  const [robot, setRobot] = useState(new Robot());
  const [plants, setPlants] = useState([]);
  const [chargingStation] = useState({ x: 1, y: 1 });
  const [path, setPath] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [stats, setStats] = useState({ distance: 0, time: 0, plantsWatered: 0 });
  const [pathMode, setPathMode] = useState('time');
  
  const animationRef = useRef(null);
  const pathIndexRef = useRef(0);

  // Initialize grid on mount
  useEffect(() => {
    initializeSimulation();
  }, []);

  const initializeSimulation = () => {
    const newGrid = Grid.generate();
    setGrid(newGrid);
    
    const newPlants = Plant.generateRandom(newGrid, NUM_PLANTS);
    setPlants(newPlants);
    
    setRobot(new Robot());
    setStats({ distance: 0, time: 0, plantsWatered: 0 });
  };

  const startSimulation = () => {
    if (robot.needsCharging()) {
      goToChargingStation();
    } else {
      goToNextPlant();
    }
  };

  const goToChargingStation = () => {
    const pathfinder = new Pathfinder(grid);
    const newPath = pathfinder.findPath(
      robot.getPosition(), 
      chargingStation, 
      pathMode === 'time'
    );
    
    if (newPath) {
      setPath(newPath);
      setCurrentTarget('charging');
      pathIndexRef.current = 0;
      setIsRunning(true);
    }
  };

  const goToNextPlant = () => {
    const target = TaskScheduler.findNextTarget(plants, robot.getPosition());
    
    if (target) {
      const pathfinder = new Pathfinder(grid);
      const newPath = pathfinder.findPath(
        robot.getPosition(),
        target.getPosition(),
        pathMode === 'time'
      );
      
      if (newPath) {
        setPath(newPath);
        setCurrentTarget(target);
        pathIndexRef.current = 0;
        setIsRunning(true);
      }
    } else {
      setIsRunning(false);
    }
  };

  // Animation loop
  useEffect(() => {
    if (!isRunning || path.length === 0) return;
    
    animationRef.current = setInterval(() => {
      if (pathIndexRef.current < path.length) {
        const nextPos = path[pathIndexRef.current];
        const terrainType = Grid.getTerrainAt(grid, nextPos.x, nextPos.y);
        const moveCost = Grid.getTerrainCost(terrainType);
        
        setRobot(prev => {
          const newRobot = prev.clone();
          newRobot.moveTo(nextPos.x, nextPos.y);
          return newRobot;
        });
        
        setStats(prev => ({
          ...prev,
          distance: prev.distance + 1,
          time: prev.time + moveCost
        }));
        
        pathIndexRef.current++;
      } else {
        handleTargetReached();
      }
    }, ANIMATION_SPEED);
    
    return () => clearInterval(animationRef.current);
  }, [isRunning, path, currentTarget]);

  const handleTargetReached = () => {
    if (currentTarget === 'charging') {
      setRobot(prev => {
        const newRobot = prev.clone();
        newRobot.charge();
        return newRobot;
      });
      
      setCurrentTarget(null);
      setPath([]);
      pathIndexRef.current = 0;
      
      setTimeout(goToNextPlant, 500);
    } else if (currentTarget) {
      // Water plant
      setPlants(prev => {
        const updated = [...prev];
        const plantIndex = updated.findIndex(p => p.id === currentTarget.id);
        if (plantIndex !== -1) {
          updated[plantIndex].water();
        }
        return updated;
      });
      
      setStats(prev => ({ ...prev, plantsWatered: prev.plantsWatered + 1 }));
      setCurrentTarget(null);
      setPath([]);
      pathIndexRef.current = 0;
      
      setTimeout(() => {
        if (robot.needsCharging()) {
          goToChargingStation();
        } else {
          goToNextPlant();
        }
      }, 500);
    }
  };

  const reset = () => {
    setIsRunning(false);
    clearInterval(animationRef.current);
    setRobot(new Robot());
    setPath([]);
    setCurrentTarget(null);
    setStats({ distance: 0, time: 0, plantsWatered: 0 });
    pathIndexRef.current = 0;
    
    setPlants(prev => prev.map(p => {
      p.watered = false;
      return p;
    }));
  };

  return {
    grid,
    robot,
    plants,
    chargingStation,
    path,
    isRunning,
    stats,
    pathMode,
    startSimulation,
    pauseSimulation: () => setIsRunning(false),
    reset,
    initializeSimulation,
    setPathMode
  };
};