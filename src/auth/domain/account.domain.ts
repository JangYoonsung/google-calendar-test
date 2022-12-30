import { Account as AccountEntity } from '@auth/infrastructure/entities';

export class Account {
  readonly _id: number;
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(account: AccountEntity) {
    this._id = account.id;
    this.id = account.uuid;
    this.username = account.username;
    this.email = account.email;
    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
  }
}
