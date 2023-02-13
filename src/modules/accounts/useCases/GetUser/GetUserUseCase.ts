import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IUser {
  username: string;
  email: string;
  avatar: string;
}

@injectable()
class GetUserUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(id: string) {
    const user = (await this.repository.findById(id)) as User;
    const userDTO: IUser = {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    };

    return userDTO;
  }
}

export { GetUserUseCase };
