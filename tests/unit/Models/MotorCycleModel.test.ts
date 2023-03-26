import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import { bodyRequestCycle, cycleMock } from '../mocks';

describe('Testando camada de ODM MotorcycleModel', function () {
  const cycleModel = new motorCycleModel();

  afterEach(function () {
    Sinon.restore();
  });

  it('é possível criar um document motorCycle na collection motorCycle', async function () {
    Sinon.stub(Model, 'create').resolves(cycleMock);

    const result = await cycleModel.create(bodyRequestCycle);

    expect(result).to.be.deep.equal(cycleMock);
  });
});