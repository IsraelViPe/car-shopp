export default interface IService <I, D> {
  newDomain(obj: I): D | null
  create(car: I): Promise<D | null >
  findAll(): Promise <(D | null)[]>
  findById(id: string): Promise<(D | null)>
  update(id: string, body: I): Promise<(D | null)> 
}