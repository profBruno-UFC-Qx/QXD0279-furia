import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";

import { Teacher } from "./Teacher.ts";

@Entity()
export class Discipline {
  @PrimaryGeneratedColumn()
  dicipline_id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100 })
  course!: string;

  @Column({ type: "int" })
  hours!: number;

  @ManyToMany(() => Teacher, (teacher) => teacher.disciplines)
  teachers!: Teacher[];
}
