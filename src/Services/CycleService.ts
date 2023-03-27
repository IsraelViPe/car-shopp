import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IService from '../Interfaces/IService';
import IMotorcycle from '../Interfaces/IMotorcycle';
import CycleModel from '../Models/CycleModel';
import customErro from '../Utils/customError';

export default class CycleService implements IService<IMotorcycle, Motorcycle> {
  constructor(private model: CycleModel = new CycleModel()) {}

  newDomain(cycle: IMotorcycle | null): Motorcycle | null {
    if (cycle) {
      return new Motorcycle(cycle);
    }
    return null;
  }

  async create(cycleInfo: IMotorcycle): Promise < Motorcycle | null> {
    const newCycleinfo = { ...cycleInfo };
    if (!newCycleinfo.status) newCycleinfo.status = false;

    const newCycle: IMotorcycle = await this.model.create(newCycleinfo);
    return this.newDomain(newCycle);
  }
  
  async findAll(): Promise < (Motorcycle | null)[]> {
    const cycleList = await this.model.find();
    const cycleDomainList = cycleList.map((cycle) => this.newDomain(cycle));
    return cycleDomainList;
  }

  async findById(id: string): Promise<(Motorcycle | null)> {
    if (!isValidObjectId(id)) {
      customErro('Invalid mongo id', 422);
    }
    const cycle = await this.model.findById(id);
    if (!cycle) {
      customErro('Motorcycle not found', 404);
    }

    return this.newDomain(cycle);
  }

  async update(id: string, body: IMotorcycle): Promise<(Motorcycle | null)> {
    if (!isValidObjectId(id)) {
      customErro('Invalid mongo id', 422);
    }
    const cycleUpdate = await this.model.update(id, body);
    if (!cycleUpdate) {
      customErro('Motorcycle not found', 404);
    }
    return this.newDomain(cycleUpdate);
  }
}