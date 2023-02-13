import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  password: string;
  id: string;
}

@injectable()
class UpdatePasswordUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ password, id }: IRequest) {
    const user = (await this.repository.findById(id)) as User;

    const passwordHash = await hash(password, 8);

    user.password = passwordHash;

    await this.repository.create(user);
  }
}

export { UpdatePasswordUseCase };
