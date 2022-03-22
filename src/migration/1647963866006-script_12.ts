import {MigrationInterface, QueryRunner} from "typeorm";

export class script121647963866006 implements MigrationInterface {
    name = 'script121647963866006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "createdBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "lastChangedBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "internalComment" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "isArchived" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "createdBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "lastChangedBy" character varying(300) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "internalComment" character varying(300)`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "FK_7040e7f25c8589327addeed86ae"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "PK_79528d665e7bd0879b7863dfa19"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "PK_79528d665e7bd0879b7863dfa19" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "questionCategoryId"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "questionCategoryId" uuid`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP CONSTRAINT "PK_4598906d751f6da9d6c16c9bb1d"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD CONSTRAINT "PK_4598906d751f6da9d6c16c9bb1d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "FK_7040e7f25c8589327addeed86ae" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "FK_7040e7f25c8589327addeed86ae"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP CONSTRAINT "PK_4598906d751f6da9d6c16c9bb1d"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD CONSTRAINT "PK_4598906d751f6da9d6c16c9bb1d" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "questionCategoryId"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "questionCategoryId" character varying`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "PK_79528d665e7bd0879b7863dfa19"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD "id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "PK_79528d665e7bd0879b7863dfa19" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "FK_7040e7f25c8589327addeed86ae" FOREIGN KEY ("questionCategoryId") REFERENCES "QuestionCategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "internalComment"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "lastChangedBy"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "lastChangedDateTime"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "createDateTime"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "isArchived"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP COLUMN "isActive"`);
    }

}
