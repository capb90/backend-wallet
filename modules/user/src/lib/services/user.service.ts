import { IRepository } from '../repositories/IRepository';

export class UserService{

  constructor(private readonly repository:IRepository) {}
}