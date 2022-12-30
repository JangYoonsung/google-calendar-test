import { CreateAccountDto } from '@auth/dto';
import { Account, AccountRole } from '@auth/infrastructure/entities';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import {
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    @InjectRepository(Account) private accountRepository: Repository<Account>,
    private configService: ConfigService,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get('cognito').userPoolId as string,
      ClientId: this.configService.get('cognito').clientId as string,
    });
  }
  private userPool: CognitoUserPool;

  async register(dto: CreateAccountDto) {
    const account = await this.accountRepository.findOneBy({
      username: dto.username,
    });
    if (account) throw new ConflictException();

    try {
      const newAccount = await this.dataSource.manager.transaction(
        async (manager) => {
          const accountRoleRepo = manager.getRepository(AccountRole);
          const uuid = uuidv4();
          const accountData = this.accountRepository.create({ ...dto, uuid });
          const account = await this.accountRepository.save(accountData);
          const accountRoleData = accountRoleRepo.create({
            role: 'member',
            account: account,
          });
          await accountRoleRepo.save(accountRoleData);
          return account;
        },
      );

      const cogitoAttributes = new CognitoUserAttribute({
        Name: 'email',
        Value: dto.username,
      });
      const data = new Promise((resolve, reject) => {
        return this.userPool.signUp(
          dto.username,
          dto.password,
          [cogitoAttributes],
          null,
          (err, result) => {
            if (result) {
              resolve(result.user);
            } else {
              reject(err);
            }
          },
        );
      });
      return data;
    } catch (err) {
      throw new InternalServerErrorException();
    }

    return '';
  }
}
