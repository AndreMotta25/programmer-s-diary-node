import 'reflect-metadata';

import express from 'express';
import path from 'path';

import { appDataSource } from './database';
import { routes } from './routes';
import './shared/container';

const app = express();

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(() => {
    console.log('Erro na conexão com o banco.');
  });

app.use(express.json());

/*
  vai pegar o caminho todo da pasta
*/
// app.use('/avatar', express.static(path.join(__dirname, '..', 'avatar')));
// app.use(express.static('./src/public'));

app.use(routes);

app.listen(3333, () => {
  console.log('Server is running');
});
