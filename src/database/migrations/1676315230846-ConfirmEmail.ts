import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConfirmEmail1676315230846 implements MigrationInterface {
  name = 'ConfirmEmail1676315230846';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email_confirmed" boolean NOT NULL DEFAULT false`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email_confirmed"`);
  }
}
