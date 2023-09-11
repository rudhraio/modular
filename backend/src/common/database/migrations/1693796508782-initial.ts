import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1693796508782 implements MigrationInterface {
    name = 'Initial1693796508782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "modSchema"."otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "info" jsonb NOT NULL DEFAULT '{}', "created_by" character varying NOT NULL DEFAULT 'NA', "updated_by" character varying NOT NULL DEFAULT 'NA', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "otp" character varying NOT NULL, "to" character varying NOT NULL, "type" "modSchema"."otp_type_enum" NOT NULL DEFAULT 'mail', "validity" integer NOT NULL DEFAULT '10', "verified" boolean NOT NULL DEFAULT false, "count" integer NOT NULL DEFAULT '1', "utility" "modSchema"."otp_utility_enum" NOT NULL DEFAULT 'reset', "userId" uuid, CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modSchema"."users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "info" jsonb NOT NULL DEFAULT '{}', "created_by" character varying NOT NULL DEFAULT 'NA', "updated_by" character varying NOT NULL DEFAULT 'NA', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying, "description" character varying, "image" character varying, "email" character varying NOT NULL, "username" character varying NOT NULL, "ccode" integer, "phone_number" character varying, "password" character varying, "verified" boolean NOT NULL DEFAULT false, "salt" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modSchema"."user_business" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "info" jsonb NOT NULL DEFAULT '{}', "created_by" character varying NOT NULL DEFAULT 'NA', "updated_by" character varying NOT NULL DEFAULT 'NA', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_type" "modSchema"."user_business_user_type_enum" NOT NULL DEFAULT 'staff', "userId" uuid, "businessId" uuid, CONSTRAINT "PK_5a4bd96d9a519d4d20a21231b9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modSchema"."businesses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "active" boolean NOT NULL DEFAULT true, "deleted" boolean NOT NULL DEFAULT false, "info" jsonb NOT NULL DEFAULT '{}', "created_by" character varying NOT NULL DEFAULT 'NA', "updated_by" character varying NOT NULL DEFAULT 'NA', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "domain" character varying NOT NULL, "name" character varying, "description" text, "image" character varying, "email" character varying, "ccode" integer, "phone_number" character varying, "social_links" jsonb NOT NULL DEFAULT '{}', "address" character varying, "plan" "modSchema"."businesses_plan_enum" NOT NULL DEFAULT 'free', CONSTRAINT "UQ_2c948beea2ef5a0fd9028101001" UNIQUE ("domain"), CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "modSchema"."otp" ADD CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "modSchema"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" ADD CONSTRAINT "FK_a79da579a87ca88b61feaa18e37" FOREIGN KEY ("userId") REFERENCES "modSchema"."users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" ADD CONSTRAINT "FK_8c76278e6f526cbfecef7a44f57" FOREIGN KEY ("businessId") REFERENCES "modSchema"."businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" DROP CONSTRAINT "FK_8c76278e6f526cbfecef7a44f57"`);
        await queryRunner.query(`ALTER TABLE "modSchema"."user_business" DROP CONSTRAINT "FK_a79da579a87ca88b61feaa18e37"`);
        await queryRunner.query(`ALTER TABLE "modSchema"."otp" DROP CONSTRAINT "FK_db724db1bc3d94ad5ba38518433"`);
        await queryRunner.query(`DROP TABLE "modSchema"."businesses"`);
        await queryRunner.query(`DROP TABLE "modSchema"."user_business"`);
        await queryRunner.query(`DROP TABLE "modSchema"."users"`);
        await queryRunner.query(`DROP TABLE "modSchema"."otp"`);
    }

}
