import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/repositories/typeorm/UserRepository';
import { EmailSend } from '../../services/Email/EmailSender';

container.registerSingleton('IUserRepository', UserRepository);
container.register('IEmailSender', EmailSend);
