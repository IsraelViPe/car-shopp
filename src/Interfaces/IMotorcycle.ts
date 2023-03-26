import IVehicle from './IVehicle';

export default interface IMotorcycle extends IVehicle {
  category: ('Streer' | 'Custom' | 'Trail');
  engineCapacity: number;
}