import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699946751620 implements MigrationInterface {
    name = 'Migrations1699946751620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "first_name" SET DEFAULT 'USER'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "first_name" DROP DEFAULT`);
    }

}
