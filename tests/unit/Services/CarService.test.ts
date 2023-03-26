import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import { carList, CAR_ID, createdCarResponse, INCORRECT_CAR_ID, INVALID_ID } from '../mocks';

describe('CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });
  it('se a camda Service cria uma nova instância de Dominio Car corretamente', async function () {
    Sinon.stub(Model, 'create').resolves(createdCarResponse);
  
    const resultService = await carService.create(createdCarResponse); 
    
    expect(resultService).to.deep.equal(createdCarResponse);
  });

  it('deve trazer uma lista com todos os carros', async function () {
    Sinon.stub(Model, 'find').resolves(carList);
  
    const result = await carService.findAll();

    expect(result).to.be.deep.equal(carList);
    expect(result?.length).to.be.equal(2);
  });
  it('deve buscar um carro pelo id', async function () {
    const serviceStub = Sinon.stub(Model, 'findById').resolves(carList[0]);

    const result = await carService.findById(CAR_ID);

    expect(result).to.be.deep.equal(carList[0]);
    expect(serviceStub.calledOnceWith(CAR_ID)).to.be.equal(true);
  });
  it(
    'deve retornar uma exceção do tipo "Car not found" ao buscar um carro inexistente', 
    async function () {
      Sinon.stub(Model, 'findById').resolves(null);
      try {
        await carService.findById(INCORRECT_CAR_ID);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Car not Found');
      }
    },
  );
  it(
    'deve retornar uma exceção do tipo  "Invalid mongo id" ao buscar um carro com id inválido',
    async function () {
      Sinon.stub(Model, 'findById').resolves(null);

      try {
        await carService.findById(INVALID_ID);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );
});