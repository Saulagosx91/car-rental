export interface IService<T> {
  find(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(data: any): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T | null>;
  remove(id: number): Promise<boolean>;
}
