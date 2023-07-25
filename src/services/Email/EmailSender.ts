import { createTransport, Transporter } from 'nodemailer';
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from 'nodemailer-express-handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';

import AppError from '../../errors/AppError';
import { IEmailSender, ISender } from './IEmailSender';

class EmailSend implements IEmailSender {
  private email: string;
  private password: string;
  private transport: Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.email = 'diariodoprogramadordev@gmail.com';
    this.password = process.env.SECRET_API as string;
    this.config();
  }

  config() {
    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: resolve('./src/views/'),
        defaultLayout: false,
      },
      viewPath: resolve('./src/views/'),
    };

    const config = {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.email,
        pass: this.password,
      },
    };
    this.transport = createTransport(config);
    this.transport.use('compile', hbs(handlebarOptions));
  }

  async send({ target, subject, message, username, template }: ISender) {
    const sender = {
      from: {
        name: 'Diario do Programador',
        address: this.email,
      },
      to: target,
      replyTo: this.email,
      subject,
      template,
      context: {
        name: username,
        message,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: resolve(__dirname, '..', '..', 'assets', 'logo.png'),
          cid: 'logo',
        },
      ],
    };
    try {
      await this.transport.sendMail(sender);
      return 'E-Mail enviado com sucesso';
    } catch (e) {
      console.log(e);
      throw new AppError('Ocorreu um erro ao enviar o email');
    }
  }
}

export { EmailSend };
