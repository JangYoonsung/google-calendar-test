import { BaseEntity, BeforeInsert, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class UUIDBaseEntity extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @BeforeInsert()
  async function() {
    if (this.uuid) return;
    this.uuid = uuidv4();
  }
}
