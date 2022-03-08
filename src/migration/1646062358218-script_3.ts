import {MigrationInterface, QueryRunner} from "typeorm";

export class script31646062358218 implements MigrationInterface {
    name = 'script31646062358218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "countryId" character varying(10), "countryName" character varying(50), "stateId" character varying(10), "stateName" character varying(50), "cityId" character varying(10), "cityName" character varying(50), "address" character varying(50), CONSTRAINT "PK_9034683839599c80ebe9ebb0891" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "profileName" character varying(50) NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "emailAddress" character varying(100) NOT NULL, "contactNumber" character varying(100), "addressId" uuid, CONSTRAINT "REL_82e9573eb65966504b27754065" UNIQUE ("addressId"), CONSTRAINT "PK_89dff233f744d59758158aca1d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "userName" character varying(50) NOT NULL, "password" character varying(50), "profileId" uuid, CONSTRAINT "REL_2041c7acbba08abd3a5073d6f4" UNIQUE ("profileId"), CONSTRAINT "PK_bf68fd30f1adeede9c72a5cac09" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "roleName" character varying(50) NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role_account_account" ("roleId" uuid NOT NULL, "accountId" uuid NOT NULL, CONSTRAINT "PK_98d92acc3c992ebda2e7aaaf10b" PRIMARY KEY ("roleId", "accountId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_de689312e4accdee8f6a9ac078" ON "role_account_account" ("roleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_19d77f4a7b78f39eb874c6e715" ON "role_account_account" ("accountId") `);
        await queryRunner.query(`ALTER TABLE "Profile" ADD CONSTRAINT "FK_82e9573eb65966504b27754065d" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Account" ADD CONSTRAINT "FK_2041c7acbba08abd3a5073d6f4a" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role_account_account" ADD CONSTRAINT "FK_de689312e4accdee8f6a9ac0784" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "role_account_account" ADD CONSTRAINT "FK_19d77f4a7b78f39eb874c6e7150" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_account_account" DROP CONSTRAINT "FK_19d77f4a7b78f39eb874c6e7150"`);
        await queryRunner.query(`ALTER TABLE "role_account_account" DROP CONSTRAINT "FK_de689312e4accdee8f6a9ac0784"`);
        await queryRunner.query(`ALTER TABLE "Account" DROP CONSTRAINT "FK_2041c7acbba08abd3a5073d6f4a"`);
        await queryRunner.query(`ALTER TABLE "Profile" DROP CONSTRAINT "FK_82e9573eb65966504b27754065d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_19d77f4a7b78f39eb874c6e715"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_de689312e4accdee8f6a9ac078"`);
        await queryRunner.query(`DROP TABLE "role_account_account"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "Account"`);
        await queryRunner.query(`DROP TABLE "Profile"`);
        await queryRunner.query(`DROP TABLE "Address"`);
    }

}
