import { hash } from 'bcryptjs';
import normalizeEmail from 'normalize-email';
import { injectable, inject } from 'tsyringe';

import { IRequest, IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ username, email, password }: IRequest) {
    const normalizedEmail = normalizeEmail(email);

    let userExists = await this.repository.findByEmail(normalizedEmail);

    if (userExists) throw new Error('E-mail indisponível');

    userExists = await this.repository.findByUsername(username);

    if (userExists) throw new Error('Username indisponível');

    const passwordHash = await hash(password, 8);

    await this.repository.create({
      username,
      email: normalizedEmail,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
