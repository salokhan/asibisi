import {MigrationInterface, QueryRunner} from "typeorm";

export class script91647961224569 implements MigrationInterface {
    name = 'script91647961224569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP CONSTRAINT "FK_eef4540dca6c9abe6e14f253678"`);
        await queryRunner.query(`CREATE TABLE "QuestionSubCategory" ("id" character varying NOT NULL, "name" character varying(300), "questionCategoryId" character varying, CONSTRAINT "PK_79528d665e7bd0879b7863dfa19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "questionCategoryId"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "FK_7040e7f25c8589327addeed86ae" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "FK_7040e7f25c8589327addeed86ae"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "questionCategoryId" character varying`);
        await queryRunner.query(`DROP TABLE "QuestionSubCategory"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD CONSTRAINT "FK_eef4540dca6c9abe6e14f253678" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
