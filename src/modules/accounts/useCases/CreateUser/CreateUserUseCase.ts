import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import normalizeEmail from 'normalize-email';
import { injectable, inject } from 'tsyringe';

import { IEmailSender } from '../../../../services/Email/IEmailSender';
import { convertTime } from '../../../../utils/convertTime';
import { IRequest, IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  private readonly repository: IUserRepository;
  private readonly sender: IEmailSender;

  constructor(
    @inject('IUserRepository') repository: IUserRepository,
    @inject('IEmailSender') sender: IEmailSender
  ) {
    this.repository = repository;
    this.sender = sender;
  }

  async execute({ username, email, password }: IRequest) {
    const normalizedEmail = normalizeEmail(email);

    let userExists = await this.repository.findByEmail(normalizedEmail);

    if (userExists) throw new Error('E-mail indisponível');

    userExists = await this.repository.findByUsername(username);

    if (userExists) throw new Error('Username indisponível');

    const passwordHash = await hash(password, 8);

    const user = await this.repository.create({
      username,
      email: normalizedEmail,
      password: passwordHash,
    });

    const token = sign(
      { subject: user.id, exp: convertTime.toMin(10) },
      user.hashToken
    );

    this.sender.config({ host: 'smtp.gmail.com', port: 465 });

    this.sender.send({
      target: normalizedEmail,
      subject: 'Confirmação de email',
      message: token,
      username: user.username,
      template: 'confirmEmail',
    });
  }
}

export { CreateUserUseCase };
