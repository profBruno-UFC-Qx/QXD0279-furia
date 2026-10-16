import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

type UserType = "student" | "teacher" | "admin";

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 50 })
  password!: string;

  @Column({ type: "varchar", length: 50 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "enum", enum: ["student", "teacher", "admin"] })
  role!: UserType;
}
