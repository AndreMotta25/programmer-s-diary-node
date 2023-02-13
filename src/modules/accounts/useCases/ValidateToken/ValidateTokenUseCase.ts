import { verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IUser {
  subject: string;
}

@injectable()
class ValidadeTokenUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }
  async execute(token: string) {
    if (!token) throw new Error('Está faltando o token');

    try {
      const { subject: id } = verify(token, '1234') as IUser;

      const user = await this.repository.findById(id);

      if (!user) throw new Error('Usuario não achado');

      return user.id;
    } catch {
      throw new Error('Token invalido');
    }
  }
}
export { ValidadeTokenUseCase };
