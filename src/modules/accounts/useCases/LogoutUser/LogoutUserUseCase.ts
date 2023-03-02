import { randomBytes } from 'crypto';
import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class LogoutUserUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const user = (await this.repository.findById(id)) as User;

    const newHash = randomBytes(16).toString('hex');

    user.hashToken = newHash;

    await this.repository.create(user);
  }
}

export { LogoutUserUseCase };
