import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1792178561870 implements MigrationInterface {
    name = 'Initial1792178561870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."student_role_enum" AS ENUM('student', 'teacher', 'admin')`);
        await queryRunner.query(`CREATE TABLE "student" ("id" SERIAL NOT NULL, "password" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "role" "public"."student_role_enum" NOT NULL, "course" character varying(100) NOT NULL, CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_role_enum"`);
    }

}
