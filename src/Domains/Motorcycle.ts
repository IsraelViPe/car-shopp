import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

export default class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(cycle: IMotorcycle) {
    super(cycle);
    
    this.category = cycle.category;
    this.engineCapacity = cycle.engineCapacity;
  }

  getCategory() {
    return this.category;
  }

  getEngineCapacity() {
    return this.engineCapacity;
  }
}