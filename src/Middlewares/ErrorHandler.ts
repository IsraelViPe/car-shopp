import { NextFunction, Request, Response } from 'express';
import ICustomError from '../Interfaces/ICustomError';

export default class ErrorHandler {
  public static handle = async (
    error: ICustomError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise <Response | void> => {
    const status = error.status || 500;
    const message = error.message || 'Erro inesperado. Por favor, tente mais tarde';

    res.status(status).json({ message });
    next();
  };
}