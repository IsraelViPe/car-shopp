import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarService from '../../../src/Services/CarService';
import { carList, CAR_ID, carMock, INCORRECT_CAR_ID, INVALID_ID, bodyRequest } from '../mocks';

describe('CarService', function () {
  const carService = new CarService();

  afterEach(function () {
    Sinon.restore();
  });
  it('se a camda Service cria uma nova instância de Dominio Car corretamente', async function () {
    Sinon.stub(Model, 'create').resolves(carMock);
  
    const resultService = await carService.create(carMock); 
    
    expect(resultService).to.deep.equal(carMock);
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
        expect((e as Error).message).to.be.equal('Car not found');
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
  it('deve localizar e atualizar um carro pelo id', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carMock);

    const result = await carService.update(CAR_ID, bodyRequest);

    expect(result).to.be.deep.equal(carMock);
  });
});