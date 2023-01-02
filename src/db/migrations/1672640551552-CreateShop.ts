import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateShop1672640551552 implements MigrationInterface {
  name = 'CreateShop1672640551552';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shop" ("uuid" uuid NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "zipCode" character varying NOT NULL, "address" character varying NOT NULL, "address2" character varying, "owner" character varying, "tel" character varying, "openedAt" character varying, "closedAt" character varying, "scheduledAt" character varying array, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "accountId" bigint NOT NULL, CONSTRAINT "UQ_84b3c8d74c359e947d5136b4905" UNIQUE ("uuid"), CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "FK_59a049aef9cd9d0d399bda594dc" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "FK_59a049aef9cd9d0d399bda594dc"`,
    );
    await queryRunner.query(`DROP TABLE "shop"`);
  }
}
