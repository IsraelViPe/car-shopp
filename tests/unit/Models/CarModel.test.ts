import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../src/Models/CarModel';
import { bodyRequest, carList, CAR_ID, carMock } from '../mocks';

describe('Testando camada de ODM CarModel', function () {
  const carModel = new CarModel();

  afterEach(function () {
    Sinon.restore();
  });
  it('é possível criar um document car na collection cars', async function () {
    // Arrange
    const createStub = Sinon.stub(CarModel.prototype, 'create').resolves(carMock);
    Sinon.stub(Model, 'create').resolves(carMock);
    
    // Action
    const result = await CarModel.prototype.create(bodyRequest);
    // Assertion

    expect(result).to.deep.equal(carMock);
    expect(createStub.calledOnceWith(bodyRequest)).to.be.equal(true);
  });

  it('é possível buscar a lista de carros no collection cars', async function () {
    Sinon.stub(CarModel.prototype, 'find').resolves(carList);
    const result = await CarModel.prototype.find();

    expect(result).to.deep.equal(result);
    expect(result.length).to.be.equal(2);
  });
  it('é possível buscar um carro por id', async function () {
    const createStub = Sinon.stub(CarModel.prototype, 'findById').resolves(carList[0]);
    const result = await CarModel.prototype.findById(CAR_ID);

    expect(result).to.deep.equal(result);
    expect(createStub.calledOnceWith(CAR_ID)).to.be.equal(true);
    expect(result?.id).to.be.equal(CAR_ID);
  });
  it('é possível localizar e alterar os dados de um carro', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(carMock);

    const result = await carModel.update(CAR_ID, bodyRequest);

    expect(result).to.be.equal(carMock);
  });
});