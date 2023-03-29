import ICustomError from '../Interfaces/ICustomError';

export default function customErro(msg: string, code: number): void {
  const error: ICustomError = {
    ...new Error(),
    status: code,
    message: msg,
  };

  throw error;
}

export const CAR_NOT_FOUND = 'Car not found';
export const CYCLE_NOT_FOUND = 'Motorcycle not found';
export const INVALID_ID = 'Invalid mongo id';