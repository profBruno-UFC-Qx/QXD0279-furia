import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { UserEnumRoles } from "../../../enums/roles.ts";

@Entity()
export abstract class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  password!: string;

  @Column({ type: "varchar", length: 50 })
  email!: string;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "enum", enum: ["student", "teacher", "admin"] })
  role!: UserEnumRoles;
}
