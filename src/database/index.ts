import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [
    './src/modules/accounts/entities/*.ts',
    './src/modules/cards/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
});

export { appDataSource };
