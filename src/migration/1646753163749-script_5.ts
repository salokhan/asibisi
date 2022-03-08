import {MigrationInterface, QueryRunner} from "typeorm";

export class script51646753163749 implements MigrationInterface {
    name = 'script51646753163749'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Profile" DROP COLUMN "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "Account" ADD "emailAddress" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Account" DROP COLUMN "emailAddress"`);
        await queryRunner.query(`ALTER TABLE "Profile" ADD "emailAddress" character varying(100) NOT NULL`);
    }

}
