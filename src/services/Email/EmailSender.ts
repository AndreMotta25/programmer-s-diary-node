import { createTransport, Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { IConfig, IEmailSender, ISender } from './IEmailSender';

class EmailSend implements IEmailSender {
  private email: string;
  private password: string;
  private transport: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.email = 'diariodoprogramadordev@gmail.com';
    this.password = 'rwzaymldyxswcczi';
  }

  config({ host, port }: IConfig) {
    const config = {
      host,
      port,
      secure: port === 465,
      auth: {
        user: this.email,
        pass: this.password,
      },
    };
    this.transport = createTransport(config);
  }

  async send({ target, subject, message }: ISender) {
    const sender = {
      from: this.email,
      to: target,
      replyTo: this.email,
      subject,
      html: message,
      text: message,
    };
    try {
      await this.transport.sendMail(sender);
      return 'E-Mail enviado com sucesso';
    } catch (e) {
      throw new Error('Ocorreu um erro ao enviar o email');
    }
  }
}

export { EmailSend };
