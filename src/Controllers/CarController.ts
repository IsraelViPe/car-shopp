import { Request, Response, NextFunction } from 'express';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import IService from '../Interfaces/IService';

export default class CarController {
  private service: IService <ICar, Car>;

  constructor(service: IService <ICar, Car>) {
    this.service = service;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newCar = await this.service.create(req.body);
      return res.status(201).json(newCar);
    } catch (e) {
      next(e);
    }
  }

  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const carList = await this.service.findAll();
      return res.status(200).json(carList);
    } catch (e) {
      next(e);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params; 
    try {
      const car = await this.service.findById(id);
      res.status(200).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const updatedCar = await this.service.update(id, req.body);
      res.status(200).json(updatedCar);
    } catch (e) {
      next(e);
    }
  }
}