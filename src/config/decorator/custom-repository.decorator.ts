import { SetMetadata } from '@nestjs/common';
import { TYPE_ORM_CUSTOM_REPOSITORY } from '../constants/config-const';

export const CustomRepository = <T>(entity: T): ClassDecorator =>
  SetMetadata(TYPE_ORM_CUSTOM_REPOSITORY, entity);
