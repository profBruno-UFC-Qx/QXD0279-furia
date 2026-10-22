import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTeacherAndDicipline1792503558117 implements MigrationInterface {
    name = 'AddTeacherAndDicipline1792503558117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "discipline" ("dicipline_id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "course" character varying(100) NOT NULL, "hours" integer NOT NULL, CONSTRAINT "PK_c7fd629d3ee2939c113031e998a" PRIMARY KEY ("dicipline_id"))`);
        await queryRunner.query(`CREATE TABLE "teacher" ("teacher_id" SERIAL NOT NULL, "creat_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_93f6fa64874b010c5f3a87c3b8" UNIQUE ("user_id"), CONSTRAINT "PK_4218596f5a4a574cff06e91d791" PRIMARY KEY ("teacher_id"))`);
        await queryRunner.query(`CREATE TABLE "teacher_disciplines" ("teacherTeacherId" integer NOT NULL, "disciplineDiciplineId" integer NOT NULL, CONSTRAINT "PK_cd817b8f93884e90244beac05be" PRIMARY KEY ("teacherTeacherId", "disciplineDiciplineId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_39cbaff48029c7c9d4b1a84c50" ON "teacher_disciplines"  ("teacherTeacherId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11c4bfd1afed8a6ba9e9a5ad6a" ON "teacher_disciplines"  ("disciplineDiciplineId") `);
        await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "FK_93f6fa64874b010c5f3a87c3b8b" FOREIGN KEY ("user_id") REFERENCES "generic_user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teacher_disciplines" ADD CONSTRAINT "FK_39cbaff48029c7c9d4b1a84c500" FOREIGN KEY ("teacherTeacherId") REFERENCES "teacher"("teacher_id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teacher_disciplines" ADD CONSTRAINT "FK_11c4bfd1afed8a6ba9e9a5ad6a1" FOREIGN KEY ("disciplineDiciplineId") REFERENCES "discipline"("dicipline_id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher_disciplines" DROP CONSTRAINT "FK_11c4bfd1afed8a6ba9e9a5ad6a1"`);
        await queryRunner.query(`ALTER TABLE "teacher_disciplines" DROP CONSTRAINT "FK_39cbaff48029c7c9d4b1a84c500"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "FK_93f6fa64874b010c5f3a87c3b8b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11c4bfd1afed8a6ba9e9a5ad6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_39cbaff48029c7c9d4b1a84c50"`);
        await queryRunner.query(`DROP TABLE "teacher_disciplines"`);
        await queryRunner.query(`DROP TABLE "teacher"`);
        await queryRunner.query(`DROP TABLE "discipline"`);
    }

}
