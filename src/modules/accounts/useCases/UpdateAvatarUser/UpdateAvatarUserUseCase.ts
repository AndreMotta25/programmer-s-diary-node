import fs from 'fs/promises';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';

import AppError from '../../../../errors/AppError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  id: string;
  avatar?: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ id, avatar }: IRequest) {
    console.log(id);
    if (avatar === undefined)
      throw new AppError('A foto tem que estar no formato JPG ou PNG');

    /*
        Eu fiz o assertion aqui, pq depois esse id vai vir de um middleware que já vai ter achado o usuario, 
        logo tornando ilogico o mesmo ser nulo.
    */
    const user = (await this.repository.findById(id)) as User;

    if (user.avatar !== 'avatar_default.jpg') {
      await fs.unlink(`./avatar/${user.avatar}`);
    }
    console.log(user);

    user.avatar = avatar;

    await this.repository.create(user);
  }
}

export default UpdateUserAvatarUseCase;
