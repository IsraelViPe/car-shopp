import ICar from '../Interfaces/ICar';

export default class Car {
  readonly id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }

  getdoorsQty() {
    return this.doorsQty;
  }

  getseatsQty() {
    return this.seatsQty;
  }
}