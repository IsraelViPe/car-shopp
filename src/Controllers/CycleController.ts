import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class CycleController {
    private service: IMotorcycle;

    constructor(service: I) {
        this.service = service;
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newCycle = await this
        }
    }
}