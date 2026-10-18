import { MigrationInterface, QueryRunner } from "typeorm";

export class AddGenericUser1792331129149 implements MigrationInterface {
    name = 'AddGenericUser1792331129149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."generic_user_role_enum" AS ENUM('student', 'teacher', 'admin')`);
        await queryRunner.query(`CREATE TABLE "generic_user" ("user_id" SERIAL NOT NULL, "password" character varying(100) NOT NULL, "email" character varying(50) NOT NULL, "name" character varying(100) NOT NULL, "role" "public"."generic_user_role_enum" NOT NULL, CONSTRAINT "PK_0991f3458bd68dd1e3bf6a96ee2" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_3d8016e1cb58429474a3c041904"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."student_role_enum"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "student_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa" PRIMARY KEY ("student_id")`);
        await queryRunner.query(`ALTER TABLE "student" ADD "user_id" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_0cc43638ebcf41dfab27e62dc09" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09" FOREIGN KEY ("user_id") REFERENCES "generic_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_be3689991c2cc4b6f4cf39087fa"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "password" character varying(100) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."student_role_enum" AS ENUM('student', 'teacher', 'admin')`);
        await queryRunner.query(`ALTER TABLE "student" ADD "role" "public"."student_role_enum" NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "email" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")`);
        await queryRunner.query(`DROP TABLE "generic_user"`);
        await queryRunner.query(`DROP TYPE "public"."generic_user_role_enum"`);
    }

}
