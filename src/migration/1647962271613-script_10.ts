import {MigrationInterface, QueryRunner} from "typeorm";

export class script101647962271613 implements MigrationInterface {
    name = 'script101647962271613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionCategory" RENAME COLUMN "name" TO "subCategory"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionCategory" RENAME COLUMN "subCategory" TO "name"`);
    }

}
