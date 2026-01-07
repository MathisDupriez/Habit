import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { User } from "./User";
import { HabitLog } from "./HabitLog";

export type FrequencyType = "daily" | "weekly" | "monthly";

@Entity("habits")
export class Habit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 20, default: "daily" })
  frequencyType: FrequencyType;

  // Pour weekly: ["monday", "wednesday", "friday"]
  // Pour monthly: [1, 15] (jours du mois)
  // Pour daily: []
  @Column({ type: "simple-json", default: "[]" })
  frequencyDays: (string | number)[];

  @Column({ type: "int" })
  userId: number;

  @ManyToOne(() => User, user => user.habits, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => HabitLog, log => log.habit)
  logs: HabitLog[];

  @Column({ type: "int", default: 0 })
  sortOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
