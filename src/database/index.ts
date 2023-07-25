import { DataSource } from 'typeorm';

let extension = 'ts';

if (process.env.NODE_ENV?.toLowerCase() === 'production') extension = 'js';

const appDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [
    `./src/modules/accounts/entities/*.${extension}`,
    `./src/modules/cards/entities/*.${extension}`,
  ],
  migrations: [`./src/database/migrations/*.${extension}`],
});

export { appDataSource };
