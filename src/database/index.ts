import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [
    './src/modules/accounts/entities/*.js',
    './src/modules/cards/entities/*.js',
  ],
  migrations: ['./src/database/migrations/*.js'],
});

export { appDataSource };
