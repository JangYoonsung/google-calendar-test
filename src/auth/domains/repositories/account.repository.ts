import { CreateAccountDto, RequestLoginDto, UpdateAccountDto } from '@auth/dto';

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
  abstract register(dto: CreateAccountDto): Promise<string>;
  abstract updateAccount(dto: UpdateAccountDto): Promise<void>;
}
