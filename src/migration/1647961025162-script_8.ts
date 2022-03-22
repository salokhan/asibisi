import {MigrationInterface, QueryRunner} from "typeorm";

export class script81647961025162 implements MigrationInterface {
    name = 'script81647961025162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "QuestionCategory" ("id" character varying NOT NULL, "name" character varying(300), "questionCategoryId" character varying, CONSTRAINT "PK_4598906d751f6da9d6c16c9bb1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "question" character varying(1000) NOT NULL, "difficultyLevel" character varying(5) NOT NULL, "description" character varying(300), "questionType" character varying(300) NOT NULL, "questionCategoryId" character varying(300) NOT NULL, "questionSubCategoryId" character varying(300) NOT NULL, CONSTRAINT "PK_1a855c8b4f527c9633c4b054675" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "QuestionOption" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "option" character varying(1000) NOT NULL, "isAnswer" boolean NOT NULL, "description" character varying(300), "questionId" uuid, CONSTRAINT "PK_6fcd05e5b6b73a76627eb8797b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "questionCategoryId"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "questionCategoryId" character varying`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD CONSTRAINT "FK_eef4540dca6c9abe6e14f253678" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuestionOption" ADD CONSTRAINT "FK_28b353269535ee4043ea1847301" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionOption" DROP CONSTRAINT "FK_28b353269535ee4043ea1847301"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP CONSTRAINT "FK_eef4540dca6c9abe6e14f253678"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "questionCategoryId"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "questionCategoryId" character varying`);
        await queryRunner.query(`DROP TABLE "QuestionOption"`);
        await queryRunner.query(`DROP TABLE "Question"`);
        await queryRunner.query(`DROP TABLE "QuestionCategory"`);
    }

}
