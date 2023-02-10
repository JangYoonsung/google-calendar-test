import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStaff1676046882585 implements MigrationInterface {
  name = 'CreateStaff1676046882585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staff" ("uuid" uuid NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying NOT NULL, "price" integer NOT NULL DEFAULT '0', "role" character varying NOT NULL DEFAULT 'stylist', "image" character varying, "description" character varying, "career" integer, "shopId" bigint NOT NULL, "accountId" bigint NOT NULL, CONSTRAINT "UQ_63b4c676ecbf97749279446629f" UNIQUE ("uuid"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id")); COMMENT ON COLUMN "staff"."name" IS '스태프 이름'; COMMENT ON COLUMN "staff"."price" IS '지명료'; COMMENT ON COLUMN "staff"."role" IS '스태프의 역할'; COMMENT ON COLUMN "staff"."image" IS '스태프 사진'; COMMENT ON COLUMN "staff"."description" IS '스태프 설명'; COMMENT ON COLUMN "staff"."career" IS '경력'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_5b8f301b5a7bf25e58a7fc3836b" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_0c22265b9f67020e4618c1bd4c6" FOREIGN KEY ("accountId") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_0c22265b9f67020e4618c1bd4c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_5b8f301b5a7bf25e58a7fc3836b"`,
    );
    await queryRunner.query(`DROP TABLE "staff"`);
  }
}
