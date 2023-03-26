import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  newCarDomain(car: ICar): Car | null
  create(car: ICar): Promise<Car | null >
  findAll(): Promise <(Car | null)[]>
  findById(id: string): Promise<(Car | null)>
  update(id: string, body: ICar): Promise<(Car | null)> 
}