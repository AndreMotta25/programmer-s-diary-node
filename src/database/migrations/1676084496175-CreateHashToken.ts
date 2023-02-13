import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHashToken1676084496175 implements MigrationInterface {
  name = 'CreateHashToken1676084496175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "hashToken" character varying NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashToken"`);
  }
}
