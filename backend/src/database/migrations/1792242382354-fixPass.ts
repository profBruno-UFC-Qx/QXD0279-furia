import { MigrationInterface, QueryRunner } from "typeorm";

export class FixPass1792242382354 implements MigrationInterface {
    name = 'FixPass1792242382354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "password" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "password" character varying(50) NOT NULL`);
    }

}
