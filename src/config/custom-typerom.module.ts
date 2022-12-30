import { DynamicModule, Provider } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TYPE_ORM_CUSTOM_REPOSITORY } from './constants/config-const';

export class CustomTypeOrmModule {
  public static forRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider<T>[] = [];
    for (const repository of repositories) {
      const entity = Reflect.getMetadata(
        TYPE_ORM_CUSTOM_REPOSITORY,
        repository,
      );

      if (!entity) continue;

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource): typeof repository => {
          const baseRepository = dataSource.getRepository<T>(entity);
          return new repository(baseRepository, dataSource);
        },
      });
    }

    return { exports: providers, module: CustomTypeOrmModule, providers };
  }
}
