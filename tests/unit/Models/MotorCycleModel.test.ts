import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CycleModel from '../../../src/Models/CycleModel';
import { bodyRequestCycle, cycleList, cycleMock, CYCLE_ID } from '../mocks';

describe('Testando camada de ODM MotorcycleModel', function () {
  const cycleModel = new CycleModel();

  afterEach(function () {
    Sinon.restore();
  });

  it('é possível criar um document motorCycle na collection motorCycle', async function () {
    Sinon.stub(Model, 'create').resolves(cycleMock);

    const result = await cycleModel.create(bodyRequestCycle);

    expect(result).to.be.deep.equal(cycleMock);
  });

  it('é possível buscar a lista de motocycletas no collection motorcycles', async function () {
    Sinon.stub(Model, 'find').resolves(cycleList);

    const result = await cycleModel.find();

    expect(result).to.be.deep.equal(cycleList);
  });

  it('é possível buscar uma moto por id', async function () {
    Sinon.stub(Model, 'findById').resolves(cycleMock);

    const result = await cycleModel.findById(CYCLE_ID);

    expect(result).to.be.deep.equal(cycleMock);
  });

  it('é possível localizar e alterar os dados de uma moto', async function () {
    Sinon.stub(Model, 'findByIdAndUpdate').resolves(cycleMock);

    const result = await cycleModel.update(CYCLE_ID, bodyRequestCycle);

    expect(result).to.be.equal(cycleMock);
  });
});