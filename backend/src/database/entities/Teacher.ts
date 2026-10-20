import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Discipline } from "./Discipline.ts";
import { GenericUser } from "./GenericUser.ts";

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id!: number;

  @OneToOne(() => GenericUser, (user) => user.especific_type)
  @JoinColumn({ name: "user_id" })
  user!: GenericUser;

  @CreateDateColumn({ name: "creat_at" })
  creat_at!: Date;

  @ManyToMany(() => Discipline, (discipline) => discipline.teachers)
  @JoinTable({
    name: "teacher_disciplines",
  })
  disciplines!: Discipline[];
}
