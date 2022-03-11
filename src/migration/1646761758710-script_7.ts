import {MigrationInterface, QueryRunner} from "typeorm";

export class script71646761758710 implements MigrationInterface {
    name = 'script71646761758710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Address" RENAME COLUMN "address" TO "addressDetails"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Address" RENAME COLUMN "addressDetails" TO "address"`);
    }

}
