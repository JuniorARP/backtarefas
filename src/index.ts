import 'reflect-metadata';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppDataSource } from './data-source';
import routes from './routes';

AppDataSource.initialize()
  .then(() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(routes);

    app.listen(3333, () => {
      console.log('Servidor está rodando na porta 3333');
    });
  })
  .catch((error) => console.log('Erro ao inicializar o Data Source', error));
