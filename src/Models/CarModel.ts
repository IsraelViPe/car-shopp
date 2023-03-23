import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import ODM from './ODM';

export default class CarModel extends ODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true }, 
    });

    super(schema, 'cars');
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }
}