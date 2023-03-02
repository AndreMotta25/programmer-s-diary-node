import { hash } from 'bcryptjs';
import { scheduleJob } from 'node-schedule';
import normalizeEmail from 'normalize-email';
import { injectable, inject, container } from 'tsyringe';

import FormError from '../../../../errors/FormError';
import { User } from '../../entities/User';
import { IRequest, IUserRepository } from '../../repositories/IUserRepository';
import { SendConfirmEmailUseCase } from '../SendConfirmEmailUseCase/SendConfirmEmailUseCase';

@injectable()
class CreateUserUseCase {
  private readonly repository: IUserRepository;
  private readonly sendConfirmEmailUseCase: SendConfirmEmailUseCase;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
    this.sendConfirmEmailUseCase = container.resolve(SendConfirmEmailUseCase);
  }

  async execute({ username, email, password }: IRequest) {
    const normalizedEmail = normalizeEmail(email);

    let userExists = await this.repository.findByEmail(normalizedEmail);

    if (userExists)
      throw new FormError(email, 'E-mail indisponível', 'email', 400);

    userExists = await this.repository.findByUsername(username);

    if (userExists)
      throw new FormError(email, 'Username indisponível', 'username', 400);

    const passwordHash = await hash(password, 8);

    const user = await this.repository.create({
      username,
      email: normalizedEmail,
      password: passwordHash,
    });

    await this.sendConfirmEmailUseCase.execute(user);

    const date = new Date();
    date.setMinutes(date.getMinutes() + 60);

    scheduleJob(date, async () => {
      const userConfirmed = (await this.repository.findById(user.id)) as User;
      if (!userConfirmed.email_confirmed)
        this.repository.excludeById(userConfirmed);
      console.log('trabalho agendado terminado');
    });
  }
}

export { CreateUserUseCase };
