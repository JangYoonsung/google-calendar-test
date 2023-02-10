import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDetailAddressToShop1676043882905 implements MigrationInterface {
  name = 'AddDetailAddressToShop1676043882905';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shop" ADD "prefecture" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD "city" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD "town" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ALTER COLUMN "address" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shop" ALTER COLUMN "address" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "town"`);
    await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "city"`);
    await queryRunner.query(`ALTER TABLE "shop" DROP COLUMN "prefecture"`);
  }
}
