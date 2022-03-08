import {MigrationInterface, QueryRunner} from "typeorm";

export class script61646754008397 implements MigrationInterface {
    name = 'script61646754008397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "UQ_2db873448f830f8ed7f6ce19474" UNIQUE ("userName")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "UQ_2db873448f830f8ed7f6ce19474"`);
        await queryRunner.query(`ALTER TABLE "Account" ADD "emailAddress" character varying(100) NOT NULL`);
    }

}
