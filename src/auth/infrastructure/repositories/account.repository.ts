import { CustomRepository } from '@config/decorator/custom-repository.decorator';
import { Account, AccountRole } from '../entities';
import { DataSource, Repository } from 'typeorm';
import { RequestLoginDto, CreateAccountDto, UpdateAccountDto } from '@auth/dto';
import { IAccountRepository, ILoginSuccess } from '@auth/domains/repositories';
import { InjectDataSource } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AccountDomain } from '@auth/domains/entity';
import {
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';

@CustomRepository(Account)
export class AccountRepository
  extends Repository<Account>
  implements IAccountRepository
{
  constructor(@InjectDataSource() private dataSource: DataSource) {
    super(Account, dataSource.manager);
  }

  signIn(dto: RequestLoginDto): Promise<ILoginSuccess> {
    throw new Error('Method not implemented.');
  }

  registerCognitoUser(
    userPool: CognitoUserPool,
    data: CreateAccountDto,
  ): Promise<CognitoUser> {
    const cognitoUserAttribute = new CognitoUserAttribute({
      Name: 'email',
      Value: data.username,
    });

    return new Promise((resolve, reject) => {
      return userPool.signUp(
        data.username,
        data.password,
        [cognitoUserAttribute],
        null,
        (err, result) => {
          if (err) throw new reject(err);
          return resolve(result.user);
        },
      );
    });
  }

  async register(dto: CreateAccountDto): Promise<AccountDomain> {
    const account = await this.findOneBy({ username: dto.username });
    if (account) throw new ConflictException();

    try {
      const newAccount = await this.dataSource.manager.transaction(async () => {
        const accountRoleRepo = this.manager.getRepository(AccountRole);

        const accountData = this.create({ ...dto, uuid: uuidv4() });
        const account = await this.save(accountData);

        const accountRoleData = accountRoleRepo.create({ account });
        await accountRoleRepo.save(accountRoleData);

        return account;
      });

      return new AccountDomain(newAccount);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
  updateAccount(dto: UpdateAccountDto): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
