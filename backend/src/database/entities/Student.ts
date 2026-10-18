import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { GenericUser } from "./GenericUser.ts";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  student_id!: number;

  @Column({ type: "varchar", length: 100 })
  course!: string;

  @OneToOne(() => GenericUser, (user) => user.especific_type)
  @JoinColumn({ name: "user_id" })
  user!: GenericUser;
}
