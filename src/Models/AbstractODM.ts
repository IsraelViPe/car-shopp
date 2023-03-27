import { Model, Schema, model, models, UpdateQuery } from 'mongoose';

export default abstract class AbstractODM<T> {
  readonly model: Model<T>;
  private schema: Schema<T>;

  constructor(schema: Schema<T>, modelName: string) {
    this.schema = schema;
    this.model = models[modelName] || model(modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    const result = await this.model.create(obj);
    return result;
  }

  public async find(): Promise<T []> {
    return this.model.find({}, {
      __v: 0,
    });
  }

  public async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, body: UpdateQuery<T>): Promise<T | null> {
    const result = this.model.findByIdAndUpdate(id, body, { new: true });
    return result;
  }
}