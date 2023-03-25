import { Router } from 'express';
import CarController from '../Controllers/CarController';
import CarService from '../Services/CarService';

const carService = new CarService(); 
const carController = new CarController(carService);

const carRoutes = Router();

carRoutes.post('/cars', (req, res, next) => carController.create(req, res, next));
carRoutes.get('/cars', (req, res, next) => carController.findAll(req, res, next));
carRoutes.get('/cars/:id', (req, res, next) => carController.findById(req, res, next));

export default carRoutes;