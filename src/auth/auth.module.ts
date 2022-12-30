import { ConfigurationModule } from '@config/configuration.module';
import { CustomTypeOrmModule } from '@config/custom-typerom.module';
import { Module } from '@nestjs/common';
import { AccountRepository } from './infrastructure/repositories/account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, AccountRole } from './infrastructure/entities';
import { AuthService } from './application/auth.service';
import { AuthController } from './presentation/auth.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountRole]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
