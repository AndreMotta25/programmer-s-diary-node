import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
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
    if (!token) throw new AppError('Está faltando o token');

    try {
      const { subject: id } = jwt_decode(token) as IJwtPayload;
      const user = await this.repository.findById(id);

      if (!user) throw new AppError('Usuario não achado');
      verify(token, user.hashToken);

      return user.id;
    } catch {
      throw new AppError('Token invalido');
    }
  }
}
export { ValidadeTokenUseCase };
