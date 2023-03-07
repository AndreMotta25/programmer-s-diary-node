import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
import { convertTime } from '../../../../utils/convertTime';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  identification: string;
  password: string;
}

@injectable()
class AuthenticateUserUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ identification, password }: IRequest) {
    const user =
      (await this.repository.findByEmail(identification)) ??
      (await this.repository.findByUsername(identification));

    if (!user) throw new AppError('Senha ou E-mail Incorretos');

    const passworMatch = await compare(password, user.password);

    if (!passworMatch) throw new AppError('Senha ou E-mail Incorretos');

    if (!user.email_confirmed)
      throw new AppError('Confirme o email para entrar');

    const token = sign(
      {
        subject: user.id,
        exp: convertTime.toMin(50),
        iss: "programmer's diary",
      },
      user.hashToken
    );

    return {
      token,
      user: {
        email: user.email,
        id: user.id,
        avatar: user.avatar,
      },
    };
  }
}

export default AuthenticateUserUseCase;
