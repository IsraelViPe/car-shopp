import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../src/Models/CarModel';
import { createdCarResponse } from '../mocks';

describe('CarService', function () {
  it('se a camda Service cria uma nova instância de Dominio Car corretamente', async function () {
    Sinon.stub(CarModel.prototype, 'create').resolves(createdCarResponse);
    const serviceStub = Sinon.stub(CarService.prototype, 'create')
      .resolves(createdCarResponse);
    const domainStub = Sinon.stub(CarService.prototype, 'newCarDomain')
      .resolves(createdCarResponse);

    const resultService = await CarService.prototype.create(createdCarResponse); 
    const resultDomain = CarService.prototype.newCarDomain(createdCarResponse); 
    
    expect(resultService).to.deep.equal(createdCarResponse);
    expect(resultDomain).to.deep.equal(createdCarResponse);
    expect(domainStub.calledOnceWith(createdCarResponse)).to.be.equal(true);
    expect(serviceStub.calledOnceWith(createdCarResponse)).to.be.equal(true);
  });
});