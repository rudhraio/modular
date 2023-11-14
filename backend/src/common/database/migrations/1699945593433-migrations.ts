import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699945593433 implements MigrationInterface {
    name = 'Migrations1699945593433'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."businesses" RENAME COLUMN "domain" TO "business"`);
        await queryRunner.query(`ALTER TABLE "modSchema"."businesses" RENAME CONSTRAINT "UQ_2c948beea2ef5a0fd9028101001" TO "UQ_f59647cfc38cb5a72dbb9c1a346"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."businesses" RENAME CONSTRAINT "UQ_f59647cfc38cb5a72dbb9c1a346" TO "UQ_2c948beea2ef5a0fd9028101001"`);
        await queryRunner.query(`ALTER TABLE "modSchema"."businesses" RENAME COLUMN "business" TO "domain"`);
    }

}
