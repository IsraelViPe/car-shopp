import { Router } from 'express';
import CycleController from '../Controllers/CycleController';
import CycleService from '../Services/CycleService';

const cycleService = new CycleService(); 
const cycleController = new CycleController(cycleService);

const ROUTE_ID = '/motorcycles/:id';

const cycleRoutes = Router();

cycleRoutes.post('/motorcycles', (req, res, next) => cycleController.create(req, res, next));
cycleRoutes.get('/motorcycles', (req, res, next) => cycleController.findAll(req, res, next));
cycleRoutes.get(ROUTE_ID, (req, res, next) => cycleController.findById(req, res, next));
cycleRoutes.put(ROUTE_ID, (req, res, next) => cycleController.update(req, res, next));
cycleRoutes.delete(ROUTE_ID, (req, res, next) => cycleController.delete(req, res, next));

export default cycleRoutes;