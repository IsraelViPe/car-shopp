import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../src/Models/CarModel';
import CarService from '../../../src/Services/CarService';
import { carList, CAR_ID, createdCarResponse, INCORRECT_CAR_ID } from '../mocks';

describe('CarService', function () {
  afterEach(function () {
    Sinon.restore();
  });
  it('se a camda Service cria uma nova instância de Dominio Car corretamente', async function () {
    Sinon.stub(CarModel.prototype, 'create').resolves(createdCarResponse);
    const serviceStub = Sinon.stub(CarService.prototype, 'create')
      .resolves(createdCarResponse);
    const domainStub = Sinon.stub(CarService.prototype, 'newCarDomain')
      .resolves(createdCarResponse);

    const resultService = await CarService.prototype.create(createdCarResponse); 
    const resultDomain = await CarService.prototype.newCarDomain(createdCarResponse); 
    
    expect(resultService).to.deep.equal(createdCarResponse);
    expect(resultDomain).to.deep.equal(createdCarResponse);
    expect(domainStub.calledOnceWith(createdCarResponse)).to.be.equal(true);
    expect(serviceStub.calledOnceWith(createdCarResponse)).to.be.equal(true);
  });

  it('deve trazer uma lista com todos os carros', async function () {
    Sinon.stub(CarService.prototype, 'findAll').resolves(carList);

    const result = await CarService.prototype.findAll();

    expect(result).to.be.equal(carList);
    expect(result?.length).to.be.equal(2);
  });
  it('deve buscar um carro pelo id', async function () {
    const serviceStub = Sinon.stub(CarService.prototype, 'findById').resolves(carList[0]);

    const result = await CarService.prototype.findById(CAR_ID);

    expect(result).to.be.deep.equal(carList[0]);
    expect(serviceStub.calledOnceWith(CAR_ID)).to.be.equal(true);
  });
  it(
    'deve retornar uma exceção do tipo "Car not found" ao buscar um carro inexistente', 
    async function () {
      Sinon.stub(CarModel.prototype, 'findById').resolves(null);
      try {
        await CarService.prototype.findById(INCORRECT_CAR_ID);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Car not ');
      }
    },
  );
});