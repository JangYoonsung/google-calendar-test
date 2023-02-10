import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreatedUpdatedDeletedAtToStaff1676047713875
  implements MigrationInterface
{
  name = 'AddCreatedUpdatedDeletedAtToStaff1676047713875';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "staff" ADD "deletedAt" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "deletedAt"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "staff" DROP COLUMN "createdAt"`);
  }
}
