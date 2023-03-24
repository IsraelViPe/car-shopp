import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CarModel from '../../../src/Models/CarModel';
import { bodyRequest, carList, createdCarResponse } from '../mocks';

describe('Testando camada de ODM CarModel', function () {
  it('é possível criar um document car na collection cars', async function () {
    // Arrange
    const createStub = Sinon.stub(CarModel.prototype, 'create').resolves(createdCarResponse);
    Sinon.stub(Model, 'create').resolves(createdCarResponse);
    
    // Action
    const result = await CarModel.prototype.create(bodyRequest);
    // Assertion

    expect(result).to.deep.equal(createdCarResponse);
    expect(createStub.calledOnceWith(bodyRequest)).to.be.equal(true);

    createStub.restore();
  });

  it('é possível busca a lista de carros no collection cars', async function () {
    Sinon.stub(CarModel.prototype, 'find').resolves(carList);
    const result = await CarModel.prototype.find();

    expect(result).to.deep.equal(result);
    expect(result.length).to.be.equal(2);
  });
});