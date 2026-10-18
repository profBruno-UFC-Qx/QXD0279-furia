import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { User } from "./abstracts/User.ts";

@Entity()
export class Student extends User {
  @Column({ type: "varchar", length: 100 })
  course!: string;
}
