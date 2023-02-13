import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IEmailSender } from '../../../../services/Email/IEmailSender';
import { convertTime } from '../../../../utils/convertTime';
import { IUserRepository } from '../../repositories/IUserRepository';

@injectable()
class ForgetPasswordUseCase {
  private readonly repository: IUserRepository;
  private readonly sender: IEmailSender;
  constructor(
    @inject('IUserRepository') repository: IUserRepository,
    @inject('IEmailSender') sender: IEmailSender
  ) {
    this.repository = repository;
    this.sender = sender;
  }
  async execute(email: string) {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new Error('Usuario não achado');

    const token = sign({ subject: user.id, exp: convertTime.toMin(1) }, '1234');

    // const sender = new EmailSend();

    this.sender.config({ host: 'smtp.gmail.com', port: 465 });

    try {
      await this.sender.send({
        target: user.email,
        subject: 'reset password ',
        message: `<b><a>${token}</a></b>`,
      });
    } catch {
      throw new Error('Erro ao enviar o email');
    }
  }
}

export { ForgetPasswordUseCase };
