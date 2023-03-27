import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';
import cycleRoutes from './Routes/CycleRoutes';

const app = express();

app.use(express.json());
app.use(carRoutes);
app.use(cycleRoutes);
app.use(ErrorHandler.handle);

export default app;
