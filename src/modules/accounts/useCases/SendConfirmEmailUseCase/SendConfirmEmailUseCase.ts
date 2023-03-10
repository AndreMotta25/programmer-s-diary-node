import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IEmailSender } from '../../../../services/Email/IEmailSender';
import { convertTime } from '../../../../utils/convertTime';
import { User } from '../../entities/User';

@injectable()
class SendConfirmEmailUseCase {
  private readonly sender: IEmailSender;

  constructor(@inject('IEmailSender') sender: IEmailSender) {
    this.sender = sender;
  }

  async execute(user: User) {
    const token = sign(
      { subject: user.id, exp: convertTime.toMin(60) },
      user.hashToken
    );

    await this.sender.send({
      target: user.email,
      subject: 'Confirmação de email',
      message: token,
      username: user.username,
      template: 'confirmEmail',
    });
  }
}

export { SendConfirmEmailUseCase };
