import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import ICarService from '../Interfaces/ICarService';
import CarModel from '../Models/CarModel';
import customErro from '../Utils/customError';

export default class CarService implements ICarService {
  constructor(private model: CarModel = new CarModel()) {} 

  newCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  async create(carInfo: ICar): Promise < Car | null> {
    const newCarInfo = { ...carInfo };
    if (!newCarInfo.status) newCarInfo.status = false;

    const newCar: ICar = await this.model.create(newCarInfo);
    return this.newCarDomain(newCar); 
  }

  async findAll(): Promise < (Car | null)[]> {
    const carList = await this.model.find();
    const carDomainList = carList.map((car) => this.newCarDomain(car));
    return carDomainList;
  }

  async findById(id: string): Promise<(Car | null)> {
    if (!isValidObjectId(id)) {
      customErro('Invalid mongo id', 422);
    }
    const car = await this.model.findById(id);
    if (!car) {
      customErro('Car not found', 404);
    }

    return this.newCarDomain(car);
  }

  async update(id: string, body: ICar): Promise<(Car | null)> {
    if (!isValidObjectId(id)) {
      customErro('Invalid mongo id', 422);
    }
    const carUpdate = await this.model.update(id, body);
    if (!carUpdate) {
      customErro('Car not found', 404);
    }
    return this.newCarDomain(carUpdate);
  }
}