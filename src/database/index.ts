import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT as string) || 9000,
  username: process.env.DB_USER as string,
  password: process.env.DB_PASS as string,
  database: process.env.DB_NAME as string,
  synchronize: false,
  entities: [
    './src/modules/accounts/entities/*.ts',
    './src/modules/cards/entities/*.ts',
  ],
  migrations: ['./src/database/migrations/*.ts'],
});

export { appDataSource };
