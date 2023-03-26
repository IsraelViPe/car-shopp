import Motorcycle from '../Domains/ Motorcycle';
import IMotorcycle from './IMotorcycle';

export default interface ICycleService {
  newCycleDomain(cycle: IMotorcycle): Motorcycle | null
  create(cycle: IMotorcycle): Promise<Motorcycle | null >
//   findAll(): Promise <(Car | null)[]>
//   findById(id: string): Promise<(Car | null)>
//   update(id: string, body: ICar): Promise<(Car | null)> 
}