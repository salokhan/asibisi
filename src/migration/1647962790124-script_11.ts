import {MigrationInterface, QueryRunner} from "typeorm";

export class script111647962790124 implements MigrationInterface {
    name = 'script111647962790124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" RENAME COLUMN "name" TO "subCategory"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" RENAME COLUMN "subCategory" TO "category"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionCategory" RENAME COLUMN "category" TO "subCategory"`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" RENAME COLUMN "subCategory" TO "name"`);
    }

}
