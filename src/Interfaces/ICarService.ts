import Car from '../Domains/Car';
import ICar from './ICar';

export default interface ICarService {
  newCarDomain(car: ICar): Car | null
  create(car: ICar): Promise<ICar | null >;
}