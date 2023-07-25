import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import { config } from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

import { appDataSource } from './database';
import AppError from './errors/AppError';
import FormError from './errors/FormError';
import { routes } from './routes';
import './shared/container';

const app = express();

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((e) => {
    console.log(e);
    console.log('Erro na conexão com o banco.');
  });

app.use(express.json());

/*
  vai pegar o caminho todo da pasta
*/
app.use('/avatar', express.static(path.join(__dirname, '..', 'avatar')));

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof FormError) {
      return response.status(err.statusCode).json({
        errors: [
          {
            value: err.value,
            param: err.param,
            msg: err.msg,
          },
        ],
      });
    }
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ msg: err.msg });
    }
    return response.status(500).json({ msg: err.message });
  }
);

app.listen(Number(process.env.PORT) || 3333, () => {
  console.log('Server is running');
});
