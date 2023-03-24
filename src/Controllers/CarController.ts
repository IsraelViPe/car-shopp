import { Request, Response, NextFunction } from 'express';
import ICarService from '../Interfaces/ICarService';

export default class CarController {
  private service: ICarService;

  constructor(service: ICarService) {
    this.service = service;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await this.service.create(req.body);
      return res.status(201).json(newCar);
    } catch (e) {
      next(e);
    }
  }
}