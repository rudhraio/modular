import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699946849784 implements MigrationInterface {
    name = 'Migrations1699946849784'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "salt" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."users" ALTER COLUMN "salt" SET NOT NULL`);
    }

}
