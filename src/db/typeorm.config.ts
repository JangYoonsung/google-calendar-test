import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

const useFactory: (
  ...args: any[]
) => TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> = (
  configService: ConfigService,
) => {
  return { ...configService.get('database') };
};

const dataSourceFactory = async (options: DataSourceOptions) => {
  return await new DataSource(options).initialize();
};

export const typeormConfigOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory,
  dataSourceFactory,
};
