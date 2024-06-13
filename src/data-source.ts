import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Tasks } from './entity/Tasks';


const PostgresAppDataSource = new DataSource({
  type: 'postgres',
  host: 'dpg-cpl7ac8cmk4c739ivt1g-a.oregon-postgres.render.com',
  port: 5432,
  username: 'tarefadb_sorh_user',
  password: 'U3RRhFAtOTJwKcjjxNhUC8xwwjTqzqhE',
  database: 'tarefadb_sorh',
  synchronize: true,
  logging: true,
  entities: [User, Tasks],
  migrations: [],
  subscribers: [],
  ssl: true,
});


const SqliteAppDataSource = new DataSource({
  type: 'sqlite',
  database: 'tarefadb.sql',
  synchronize: true,
  logging: true,
  entities: [User, Tasks],
  migrations: [],
  subscribers: [],
});


export const AppDataSource =
  process.env.ENV === 'PROD' ? PostgresAppDataSource : SqliteAppDataSource;
