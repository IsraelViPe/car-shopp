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

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const cycleList = await this.service.findAll();
      res.status(200).json(cycleList);
    } catch (e) {
      next(e);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const cycle = await this.service.findById(id);
      res.status(200).json(cycle);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const updatedCycle = await this.service.update(id, req.body);
      res.status(200).json(updatedCycle);
    } catch (e) {
      next(e);
    }
  }
}