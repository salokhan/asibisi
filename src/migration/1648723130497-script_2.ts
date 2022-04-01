import {MigrationInterface, QueryRunner} from "typeorm";

export class script21648723130497 implements MigrationInterface {
    name = 'script21648723130497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionPaper" ADD "isVerified" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Question" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Question" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "QuestionPaper" DROP COLUMN "isVerified"`);
    }

}
