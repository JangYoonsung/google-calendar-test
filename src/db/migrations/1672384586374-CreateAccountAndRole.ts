import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountAndRole1672384586374 implements MigrationInterface {
  name = 'CreateAccountAndRole1672384586374';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("id" BIGSERIAL NOT NULL, "uuid" uuid NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "roleId" bigint, CONSTRAINT "UQ_31e2fd7720a2da3af586f17778f" UNIQUE ("uuid"), CONSTRAINT "REL_77bf26eef8865441fb9bd53a36" UNIQUE ("roleId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account_role" ("id" BIGSERIAL NOT NULL, "role" character varying NOT NULL DEFAULT 'member', CONSTRAINT "PK_d3890c96feefc95c7cfd788cfda" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_77bf26eef8865441fb9bd53a364" FOREIGN KEY ("roleId") REFERENCES "account_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_77bf26eef8865441fb9bd53a364"`,
    );
    await queryRunner.query(`DROP TABLE "account_role"`);
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
