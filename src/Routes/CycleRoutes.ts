import { Router } from 'express';
import CycleController from '../Controllers/CycleController';
import CycleService from '../Services/CycleService';

const cycleService = new CycleService(); 
const cycleController = new CycleController(cycleService);

const cycleRoutes = Router();

cycleRoutes.post('/motorcycles', (req, res, next) => cycleController.create(req, res, next));

export default cycleRoutes;