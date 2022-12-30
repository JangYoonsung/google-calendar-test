import { TYPE_ORM_CUSTOM_REPOSITORY } from '@config/constants/config-const';
import { SetMetadata } from '@nestjs/common';

export const CustomRepository = <T>(entity: T): ClassDecorator =>
  SetMetadata(TYPE_ORM_CUSTOM_REPOSITORY, entity);
