import { CreateAccountDto } from '@auth/dto';
import { Account } from '@auth/infrastructure/entities';
import { AccountRepository } from '@auth/infrastructure/repositories/account.repository';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CognitoUserAttribute,
  CognitoUserPool,
  ISignUpResult,
} from 'amazon-cognito-identity-js';

@Injectable()
export class AuthService {
  constructor(
    private accountRepository: AccountRepository,
    private configService: ConfigService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get('cognito').userPoolId as string,
      ClientId: this.configService.get('cognito').clientId as string,
    });
  }
  private userPool: CognitoUserPool;

  async register(dto: CreateAccountDto) {
    return await Promise.all([
      this.accountRepository.register(dto),
      this.accountRepository.registerCognitoUser(this.userPool, dto),
    ]);
  }
}
