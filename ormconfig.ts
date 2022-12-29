import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

export const ormConfig = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_SCHEMA,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/src/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/src/db/migrations',
  },
  synchronize: false,
  logging: true,
} as DataSourceOptions;

export const AppDataSource: DataSource = new DataSource(ormConfig);
