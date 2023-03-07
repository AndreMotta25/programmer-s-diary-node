import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCard1678070354153 implements MigrationInterface {
  name = 'CreateCard1678070354153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "card" ("id" character varying NOT NULL, "name" character varying NOT NULL, "language" character varying NOT NULL, "description" text NOT NULL, "code" text NOT NULL DEFAULT '', "create_date" TIMESTAMP NOT NULL DEFAULT now(), "update_date" TIMESTAMP NOT NULL DEFAULT now(), "userId" character varying, CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`
    );
    await queryRunner.query(`DROP TABLE "card"`);
  }
}
