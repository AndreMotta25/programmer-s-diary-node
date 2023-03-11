import 'dotenv/config';
import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [
    './dist/modules/accounts/entities/*.js',
    './dist/modules/cards/entities/*.js',
  ],
  migrations: ['./dist/database/migrations/*.js'],
});

export { appDataSource };
