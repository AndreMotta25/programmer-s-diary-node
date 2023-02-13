import { Repository } from 'typeorm';

import { appDataSource } from '../../../../database';
import { User } from '../../entities/User';
import { IRequest, IUserRepository } from '../IUserRepository';

class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = appDataSource.getRepository(User);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ username });
    return user;
  }

  async create(data: IRequest): Promise<void> {
    const user = this.repository.create({
      ...data,
    });
    await this.repository.save(user);
  }
}

export { UserRepository };
