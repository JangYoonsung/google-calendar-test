import { CreateAccountDto } from '@auth/dto';
import { AccountRepository } from '@auth/infrastructure/repositories/account.repository';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

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
