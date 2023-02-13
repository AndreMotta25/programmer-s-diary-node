export interface IConfig {
  host: string;
  port: number;
}

export interface ISender {
  target: string;
  subject: string;
  message: string;
  username: string;
  template: 'confirmEmail' | 'forgetPassword';
}

export interface IEmailSender {
  config({ host, port }: IConfig): void;

  send({ target, subject, message }: ISender): Promise<string>;
}
