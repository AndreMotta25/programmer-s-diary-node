import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../../errors/AppError';
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

    if (!user) throw new AppError('Usuario não achado');

    const token = sign(
      { subject: user.id, exp: convertTime.toMin(10) },
      user.hashToken
    );

    try {
      await this.sender.send({
        target: user.email,
        subject: 'reset password ',
        message: `${token}`,
        username: user.username,
        template: 'forgetPassword',
      });
    } catch {
      throw new AppError('Erro ao enviar o email');
    }
  }
}

export { ForgetPasswordUseCase };
