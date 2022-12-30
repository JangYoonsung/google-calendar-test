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

  async register(dto: CreateAccountDto): Promise<string> {
    const account = await this.accountRepository.findOneBy({
      username: dto.username,
    });
    if (account) throw new ConflictException();

    try {
      const newAccount = await this.dataSource.manager.transaction(
        async (manager) => {
          const accountRoleRepo = manager.getRepository(AccountRole);
          const accountRoleData = accountRoleRepo.create({ role: 'member' });
          const role = await accountRoleRepo.save(accountRoleData);

          const accountData = this.accountRepository.create({
            ...dto,
            uuid: 'test',
            role,
          });
          return await this.accountRepository.save(accountData);
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
    } catch (err) {
      throw new InternalServerErrorException();
    }

    return '';
  }
}
