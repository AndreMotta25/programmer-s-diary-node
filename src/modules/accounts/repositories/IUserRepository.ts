import { User } from '../entities/User';

export interface IRequest {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IUserRepository {
  create({ username, email, password, avatar }: IRequest): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  excludeById(user: User): Promise<void>;
}

export { IUserRepository };
