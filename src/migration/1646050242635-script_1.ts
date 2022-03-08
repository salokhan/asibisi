import {MigrationInterface, QueryRunner} from "typeorm";

export class script11646050242635 implements MigrationInterface {
    name = 'script11646050242635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "name" character varying(300) NOT NULL, "description" character varying(300) NOT NULL, CONSTRAINT "PK_bec89f51e611cb8e2d9c9d717c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Country" ("id" character varying NOT NULL, "name" character varying(300), "iso3" character varying(10), "iso2" character varying(10), "numericCode" character varying(10), "phoneCode" character varying(50), "capital" character varying(50), "currency" character varying(10), "currencyName" character varying(50), "currencySymbol" character varying(10), "tld" character varying(10), "native" character varying(50), "region" character varying(50), "subRegion" character varying(50), "timeZone" character varying(5000), "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "internalComment" character varying(300), CONSTRAINT "PK_43cb4419fc372b859dec2618037" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "State" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "countryCode" character varying(10) NOT NULL, "countryName" character varying(50) NOT NULL, "stateCode" character varying(10), "type" character varying(100), "latitude" numeric, "longitude" numeric, "isActive" character varying NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "internalComment" character varying(300), "countryId" character varying, CONSTRAINT "PK_ba7801fef9aabc0a35a0110c896" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "City" ("id" character varying NOT NULL, "name" character varying(200) NOT NULL, "stateCode" character varying(10) NOT NULL, "stateName" character varying(200) NOT NULL, "countryId" character varying(10) NOT NULL, "countryCode" character varying(10) NOT NULL, "countryName" character varying(50) NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "wikiDataId" character varying(50) NOT NULL, "isActive" character varying NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL DEFAULT 'system', "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL DEFAULT 'system', "internalComment" character varying(300), "stateId" character varying, CONSTRAINT "PK_1c5a287828771160a6e703cd37e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "User" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300) NOT NULL, "lastChangedDateTime" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastChangedBy" character varying(300) NOT NULL, "internalComment" character varying(300), "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "contactNumber" character varying(50) NOT NULL, CONSTRAINT "PK_9862f679340fb2388436a5ab3e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "State" ADD CONSTRAINT "FK_29e59f09a2f061d8252c82cea7e" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "City" ADD CONSTRAINT "FK_36fb0a41ca1b746c06c999c5aff" FOREIGN KEY ("stateId") REFERENCES "State"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "City" DROP CONSTRAINT "FK_36fb0a41ca1b746c06c999c5aff"`);
        await queryRunner.query(`ALTER TABLE "State" DROP CONSTRAINT "FK_29e59f09a2f061d8252c82cea7e"`);
        await queryRunner.query(`DROP TABLE "User"`);
        await queryRunner.query(`DROP TABLE "City"`);
        await queryRunner.query(`DROP TABLE "State"`);
        await queryRunner.query(`DROP TABLE "Country"`);
        await queryRunner.query(`DROP TABLE "Item"`);
    }

}
