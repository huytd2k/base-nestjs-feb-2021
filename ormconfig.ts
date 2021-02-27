import * as dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

dotenv.config({
  path: `.env`,
});

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_MYSQL_HOST,
  port: parseInt(process.env.DB_MYSQL_PORT),
  username: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/db/migrations/**/*.ts'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default connectionOptions;
