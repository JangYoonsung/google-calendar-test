import { CreateAccountDto, RequestLoginDto, UpdateAccountDto } from '@auth/dto';
import { AccountDomain } from '../entity';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

export interface ILoginSuccess {
  accessToken: string;
}

export interface IPayload {
  sub: string;
  email: string;
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  username: string;
  client_id: string;
}

export abstract class IAccountRepository {
  abstract signIn(dto: RequestLoginDto): Promise<ILoginSuccess>;
  abstract register(dto: CreateAccountDto): Promise<AccountDomain>;
  abstract registerCognitoUser(
    userPool: CognitoUserPool,
    data: CreateAccountDto,
  ): Promise<CognitoUser>;
  abstract updateAccount(dto: UpdateAccountDto): Promise<void>;
}
