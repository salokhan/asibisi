import {MigrationInterface, QueryRunner} from "typeorm";

export class script31648918825505 implements MigrationInterface {
    name = 'script31648918825505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question_paper_questions_question" ("questionPaperId" uuid NOT NULL, "questionId" uuid NOT NULL, CONSTRAINT "PK_65f5deffb714c1bfac6b8836e20" PRIMARY KEY ("questionPaperId", "questionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_652799731017e8871b7f80e886" ON "question_paper_questions_question" ("questionPaperId") `);
        await queryRunner.query(`CREATE INDEX "IDX_26fbb6b404d0951c1eebb7bbb0" ON "question_paper_questions_question" ("questionId") `);
        await queryRunner.query(`ALTER TABLE "question_paper_questions_question" ADD CONSTRAINT "FK_652799731017e8871b7f80e8865" FOREIGN KEY ("questionPaperId") REFERENCES "QuestionPaper"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "question_paper_questions_question" ADD CONSTRAINT "FK_26fbb6b404d0951c1eebb7bbb0e" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question_paper_questions_question" DROP CONSTRAINT "FK_26fbb6b404d0951c1eebb7bbb0e"`);
        await queryRunner.query(`ALTER TABLE "question_paper_questions_question" DROP CONSTRAINT "FK_652799731017e8871b7f80e8865"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_26fbb6b404d0951c1eebb7bbb0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_652799731017e8871b7f80e886"`);
        await queryRunner.query(`DROP TABLE "question_paper_questions_question"`);
    }

}
