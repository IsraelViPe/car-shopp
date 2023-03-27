import { Request, Response, NextFunction } from 'express';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import IService from '../Interfaces/IService';

export default class CycleController {
  private service: IService<IMotorcycle, Motorcycle>;

  constructor(service: IService<IMotorcycle, Motorcycle>) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCycle = await this.service.create(req.body);
      return res.status(201).json(newCycle);
    } catch (e) {
      next(e);
    }
  }
}