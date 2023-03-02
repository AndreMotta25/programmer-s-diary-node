import normalizeEmail from 'normalize-email';
import { injectable, inject } from 'tsyringe';

import FormError from '../../../../errors/FormError';
import { User } from '../../entities/User';
import { IUserRepository } from '../../repositories/IUserRepository';

interface IRequest {
  username: string;
  email: string;
  id: string;
}

@injectable()
class UpdateUserProfileUseCase {
  private readonly repository: IUserRepository;

  constructor(@inject('IUserRepository') repository: IUserRepository) {
    this.repository = repository;
  }

  async execute({ username, id, email }: IRequest) {
    const user = (await this.repository.findById(id)) as User;

    let userExists: User | null;
    const normalizedEmail = normalizeEmail(email);

    // if (!user) throw new AppError('Usuario não achado', 404);

    // todo: trocar essa forma de validação, pq é muito bagunçada. usar generics
    if (!(username === user?.username)) {
      userExists = await this.repository.findByUsername(username);
      if (userExists)
        throw new FormError(username, 'Username indisponível', 'username', 400);
    }
    if (!(email === user?.email)) {
      userExists = await this.repository.findByEmail(normalizedEmail);
      if (userExists)
        throw new FormError(email, 'E-mail indisponível', 'email', 400);
    }

    Object.assign(user, {
      username,
      email: normalizedEmail,
    });

    await this.repository.create(user);
  }
}

export { UpdateUserProfileUseCase };

// todo, trocar de dados, para o que estava antes.
