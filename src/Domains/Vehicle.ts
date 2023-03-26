import IVehicle from '../Interfaces/IVehicle';

export default abstract class Vehicle {
  readonly id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;

  constructor(obj: IVehicle) {
    this.model = obj.model;
    this.year = obj.year;
    this.color = obj.color;
    this.status = obj.status;
    this.buyValue = obj.buyValue;
  }
}