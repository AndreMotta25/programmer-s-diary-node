import { container } from 'tsyringe';

import { UserRepository } from '../../modules/accounts/repositories/typeorm/UserRepository';
import { CardRepository } from '../../modules/cards/repositories/typeorm/CardRepository';
import { EmailSend } from '../../services/Email/EmailSender';

container.registerSingleton('IUserRepository', UserRepository);
container.registerSingleton('ICardRepository', CardRepository);
container.register('IEmailSender', EmailSend);
