import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

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

    if (!user) throw new Error('Senha ou E-mail Incorretos');

    const passworMatch = await compare(password, user.password);

    if (!passworMatch) throw new Error('Senha ou E-mail Incorretos');

    const token = sign(
      {
        sub: user.id,
        exp: convertTime.toDays(2),
        iss: "programmer's diary",
      },
      user.hashToken
    );

    return {
      token,
      user: {
        email: user.email,
      },
    };
  }
}

export default AuthenticateUserUseCase;
