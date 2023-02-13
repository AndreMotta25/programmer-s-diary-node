import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 9000,
  username: 'docker',
  password: 'docker',
  database: 'diarioDoProgramador',
  synchronize: false,
  entities: ['./src/modules/accounts/entities/*.ts'],
  migrations: ['./src/database/migrations/*.ts'],
});

export { appDataSource };
