import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699969648242 implements MigrationInterface {
    name = 'Migrations1699969648242'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "password" SET DEFAULT 'NA'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "password" DROP DEFAULT`);
    }

}
