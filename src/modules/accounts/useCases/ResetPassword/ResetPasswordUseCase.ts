import { hash } from 'bcryptjs';
import { randomBytes } from 'crypto';
import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IReset {
  password: string;
  id: string;
}

@injectable()
class ResetPasswordUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }
  async execute({ password, id }: IReset) {
    const user = (await this.repository.findById(id)) as User;
    const passwordHash = await hash(password, 8);

    user.password = passwordHash;
    user.hashToken = randomBytes(16).toString('hex');

    await this.repository.create(user);
  }
}
export { ResetPasswordUseCase };
