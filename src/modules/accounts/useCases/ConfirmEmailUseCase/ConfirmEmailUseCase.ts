import { verify } from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { inject, injectable } from 'tsyringe';

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

      if (!user) throw new Error('Usuario não achado');

      verify(token, user.hashToken);

      user.email_confirmed = true;

      await this.repository.create(user);
    } catch {
      throw new Error('Token Invalido');
    }
  }
}

export { ConfirmEmailUseCase };
