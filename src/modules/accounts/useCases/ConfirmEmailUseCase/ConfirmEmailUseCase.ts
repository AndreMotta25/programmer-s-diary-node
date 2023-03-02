import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IJwtPayload {
  subject: string;
}

@injectable()
class ConfirmEmailUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute(token: string) {
    try {
      const { subject: id } = jwt_decode(token) as IJwtPayload;

      const user = await this.repository.findById(id);

      if (!user) throw new AppError('Usuario não achado');
      console.log('Valiadando');
      verify(token, user.hashToken);

      user.email_confirmed = true;

      await this.repository.create(user);
    } catch {
      throw new AppError('Token Invalido');
    }
  }
}

export { ConfirmEmailUseCase };
