import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';

const c = config.dev;

export const sequelize = new Sequelize({
  database: c.database,
  host: c.host,
  username: c.username,
  password: c.password,
  dialect: 'postgres',
  // storage: ':memory:',
  pool: {
    max: 2,
    min: 0,
    idle: 1000
  }
});

