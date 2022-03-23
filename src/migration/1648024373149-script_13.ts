import {MigrationInterface, QueryRunner} from "typeorm";

export class script131648024373149 implements MigrationInterface {
    name = 'script131648024373149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionCategory" ADD CONSTRAINT "UQ_dbfe73e69b21bf022a15ece6cf7" UNIQUE ("category")`);
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" ADD CONSTRAINT "index_qsc" UNIQUE ("questionCategoryId", "subCategory")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "QuestionSubCategory" DROP CONSTRAINT "index_qsc"`);
        await queryRunner.query(`ALTER TABLE "QuestionCategory" DROP CONSTRAINT "UQ_dbfe73e69b21bf022a15ece6cf7"`);
    }

}
