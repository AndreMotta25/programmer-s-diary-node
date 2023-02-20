import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { inject, injectable } from 'tsyringe';

import { IUserRepository } from '../../repositories/IUserRepository';

interface IJwtPayload {
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
      const { subject: id } = jwt_decode(token) as IJwtPayload;
      const user = await this.repository.findById(id);

      if (!user) throw new Error('Usuario não achado');

      verify(token, user.hashToken) as IJwtPayload;

      return user.id;
    } catch {
      throw new Error('Token invalido');
    }
  }
}
export { ValidadeTokenUseCase };
