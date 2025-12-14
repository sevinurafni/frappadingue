import { LOW_BATTERY_THRESHOLD, BATTERY_DRAIN_RATE } from '../constants/config';

export class Robot {
  constructor(x = 1, y = 1, battery = 100) {
    this.x = x;
    this.y = y;
    this.battery = battery;
  }

  moveTo(x, y) {
    this.x = x;
    this.y = y;
    this.drainBattery();
  }

  drainBattery() {
    this.battery = Math.max(0, this.battery - BATTERY_DRAIN_RATE);
  }

  charge() {
    this.battery = 100;
  }

  needsCharging() {
    return this.battery < LOW_BATTERY_THRESHOLD;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  clone() {
    return new Robot(this.x, this.y, this.battery);
  }
}