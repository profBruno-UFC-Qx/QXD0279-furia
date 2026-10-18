import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Student } from "./Student.ts";

@Entity()
export class GenericUser {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Column({ type: "varchar", length: 50 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "enum", enum: ["student", "teacher", "admin"] })
  role!: "student" | "teacher" | "admin";

  @OneToOne(() => Student, (student) => student.user)
  especific_type!: Student;
}
