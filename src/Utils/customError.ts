import ICustomError from '../Interfaces/ICustomError';

export default function customErro(msg: string, code: number): void {
  const error: ICustomError = {
    ...new Error(),
    status: code,
    message: msg,
  };

  throw error;
}