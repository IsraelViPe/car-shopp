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

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const carList = await this.service.findAll();
      return res.status(200).json(carList);
    } catch (e) {
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params; 
    try {
      const car = await this.service.findById(id);
      res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }
}