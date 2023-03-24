import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  newCarDomain(car: ICar): Car | ICar | null
  create(car: ICar): Promise<Car | ICar | null >
  findAll(): Promise <ICar[] | null> 
}