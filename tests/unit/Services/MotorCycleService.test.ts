import { expect } from 'chai';
import { Model } from 'mongoose';
import Sinon from 'sinon';
import CycleService from '../../../src/Services/CycleService';
import { bodyRequestCycle, cycleList, cycleMock, CYCLE_ID, 
  INCORRECT_ID, INVALID_ID } from '../mocks';

describe('CycleService', function () {
  const cycleService = new CycleService();

  afterEach(function () {
    Sinon.restore();
  });
  describe('método create', function () {
    it(
      'se a camda Service cria uma nova instância de Dominio MotorCycle corretamente', 
      async function () {
        Sinon.stub(Model, 'create').resolves(cycleMock);
    
        const resultService = await cycleService.create(bodyRequestCycle); 
      
        expect(resultService).to.deep.equal(cycleMock);
      },
    );
  });

  describe('método find', function () {
    it('deve trazer uma lista com todas as motos', async function () {
      Sinon.stub(Model, 'find').resolves(cycleList);
    
      const result = await cycleService.findAll();
  
      expect(result).to.be.deep.equal(cycleList);
      expect(result?.length).to.be.equal(2);
    });
  });

  describe('método findById', function () {
    it('deve buscar uma moto pelo id', async function () {
      const serviceStub = Sinon.stub(Model, 'findById').resolves(cycleList[0]);
  
      const result = await cycleService.findById(CYCLE_ID);
  
      expect(result).to.be.deep.equal(cycleList[0]);
      expect(serviceStub.calledOnceWith(CYCLE_ID)).to.be.equal(true);
    });

    it(
      'deve retornar uma exceção do tipo "Motorcycle not found" ao buscar uma moto inexistente', 
      async function () {
        Sinon.stub(Model, 'findById').resolves(null);
        try {
          await cycleService.findById(INCORRECT_ID);
        } catch (e) {
          expect((e as Error).message).to.be.equal('Motorcycle not found');
        }
      },
    );
    it(
      'deve retornar uma exceção do tipo  "Invalid mongo id" ao buscar uma moto com id inválido',
      async function () {
        Sinon.stub(Model, 'findById').resolves(null);
  
        try {
          await cycleService.findById(INVALID_ID);
        } catch (e) {
          expect((e as Error).message).to.be.equal('Invalid mongo id');
        }
      },
    );
  });

  describe(' método update', function () {
    it('deve localizar e atualizar uma moto pelo id', async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(cycleMock);
  
      const result = await cycleService.update(CYCLE_ID, bodyRequestCycle);
  
      expect(result).to.be.deep.equal(cycleMock);
    });
  });

  it(
    'deve retornar uma exceção do tipo "Motorcycle not found" ao buscar uma moto inexistente', 
    async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);
      try {
        await cycleService.update(INCORRECT_ID, bodyRequestCycle);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Motorcycle not found');
      }
    },
  );
  it(
    'deve retornar uma exceção do tipo  "Invalid mongo id" ao buscar uma moto com id inválido',
    async function () {
      Sinon.stub(Model, 'findByIdAndUpdate').resolves(null);

      try {
        await cycleService.update(INVALID_ID, bodyRequestCycle);
      } catch (e) {
        expect((e as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );
});