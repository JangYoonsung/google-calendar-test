import { AccountRole as AccountRoleEntity } from '@auth/infrastructure/entities';

export class AccountRole {
  readonly _id: number;
  readonly role: AccountRoleEntity['role'];

  constructor(accountRole: AccountRoleEntity) {
    this._id = accountRole.id;
    this.role = accountRole.role;
  }
}
