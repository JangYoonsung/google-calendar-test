import { CustomRepository } from '@config/decorator/custom-repository.decorator';
import { Account, AccountRole } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { RequestLoginDto, CreateAccountDto, UpdateAccountDto } from '@auth/dto';
import { IAccountRepository, ILoginSuccess } from '@auth/domains/repositories';
import { InjectDataSource } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(Account)
export class AccountRepository
  extends Repository<Account>
  implements IAccountRepository
{
  constructor(
    @InjectDataSource() private dataSource: DataSource,
    private configService: ConfigService,
  ) {
    super(Account, dataSource.manager);
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get('cognito').userPoolId as string,
      ClientId: this.configService.get('cognito').clientId as string,
    });
  }

  private userPool: CognitoUserPool;

  signIn(dto: RequestLoginDto): Promise<ILoginSuccess> {
    throw new Error('Method not implemented.');
  }
  async register(dto: CreateAccountDto): Promise<string> {
    const account = await this.findOneBy({ username: dto.username });
    if (account) throw new ConflictException();

    try {
      const newAccount = await this.dataSource.manager.transaction(async () => {
        const accountRoleRepo = this.manager.getRepository(AccountRole);
        const accountRoleData = accountRoleRepo.create({ role: 'member' });
        const role = await accountRoleRepo.save(accountRoleData);

        const accountData = this.create({ ...dto, role });
        return await this.save(accountData);
      });

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
    } catch (err) {
      throw new InternalServerErrorException();
    }

    return '';
  }
  updateAccount(dto: UpdateAccountDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
