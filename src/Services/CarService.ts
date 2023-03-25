import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import ICarService from '../Interfaces/ICarService';
import CarModel from '../Models/CarModel';

export default class CarService implements ICarService {
  constructor(private model: CarModel = new CarModel()) {} 

  newCarDomain(car: ICar | null): Car | ICar | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  async create(carInfo: ICar): Promise <ICar | Car | null> {
    const newCarInfo = { ...carInfo };
    if (!newCarInfo.status) newCarInfo.status = false;

    const newCar: ICar = await this.model.create(newCarInfo);
    return this.newCarDomain(newCar); 
  }

  async findAll(): Promise <ICar[] | null> {
    const carList = await this.model.find();
    return carList;
  }

  async findById(id: string): Promise<ICar | null> {
    if (!isValidObjectId(id)) {
      throw new Error('Invalid mongo id');
    }
    const car = await this.model.findById(id);
    if (!car) {
      throw new Error('Car not Found');
    }
    return car;
  }
}