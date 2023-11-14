import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1699948143799 implements MigrationInterface {
    name = 'Migrations1699948143799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "modSchema"."user_business_status_enum" AS ENUM('pending', 'accepted', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" ADD "status" "modSchema"."user_business_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "modSchema"."user_business_status_enum"`);
    }

}
