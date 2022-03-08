import {MigrationInterface, QueryRunner} from "typeorm";

export class script21646050876768 implements MigrationInterface {
    name = 'script21646050876768'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "City" ALTER COLUMN "wikiDataId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "City" ALTER COLUMN "wikiDataId" SET NOT NULL`);
    }

}
