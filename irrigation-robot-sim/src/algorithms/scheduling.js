export class TaskScheduler {
  // Find next plant to visit based on urgency and distance
  static findNextTarget(plants, robotPosition) {
    const unwatered = plants.filter(p => !p.watered);
    
    if (unwatered.length === 0) return null;
    
    // Sort by urgency (higher first), then by distance (closer first)
    unwatered.sort((a, b) => {
      if (b.urgency !== a.urgency) {
        return b.urgency - a.urgency;
      }
      
      const distA = Math.abs(robotPosition.x - a.x) + Math.abs(robotPosition.y - a.y);
      const distB = Math.abs(robotPosition.x - b.x) + Math.abs(robotPosition.y - b.y);
      
      return distA - distB;
    });
    
    return unwatered[0];
  }

  // Calculate total distance for a set of waypoints
  static calculateTotalDistance(waypoints) {
    let total = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const dx = waypoints[i + 1].x - waypoints[i].x;
      const dy = waypoints[i + 1].y - waypoints[i].y;
      total += Math.abs(dx) + Math.abs(dy);
    }
    return total;
  }

  // Get all unwatered plants
  static getUnwateredPlants(plants) {
    return plants.filter(p => !p.watered);
  }

  // Get watered plants count
  static getWateredCount(plants) {
    return plants.filter(p => p.watered).length;
  }
}