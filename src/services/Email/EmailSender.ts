import { createTransport, Transporter } from 'nodemailer';
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from 'nodemailer-express-handlebars';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { resolve } from 'path';

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
    const handlebarOptions: NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: resolve('./src/views/'),
        defaultLayout: false,
      },
      viewPath: resolve('./src/views/'),
    };

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
    this.transport.use('compile', hbs(handlebarOptions));
  }

  async send({ target, subject, message, username, template }: ISender) {
    const sender = {
      from: {
        name: 'Diario do programador',
        address: 'diariodoprogramadordev@gmail.com',
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
          path: './src/assets/logo.png',
          cid: 'logo',
        },
      ],
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
