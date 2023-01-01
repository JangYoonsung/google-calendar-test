import { CustomTypeOrmModule } from '@config/custom-typerom.module';
import { Module } from '@nestjs/common';
import { AccountRepository } from './infrastructure/repositories/account.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, AccountRole } from './infrastructure/entities';
import { AuthService } from './application/auth.service';
import { AuthController } from './presentation/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@common/passport/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, AccountRole]),
    CustomTypeOrmModule.forRepository([AccountRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
