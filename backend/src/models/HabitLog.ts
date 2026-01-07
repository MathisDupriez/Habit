import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Habit } from "./Habit";

@Entity("habit_logs")
@Unique(["habitId", "date"])
export class HabitLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  habitId: number;

  @ManyToOne(() => Habit, habit => habit.logs, { onDelete: "CASCADE" })
  @JoinColumn({ name: "habitId" })
  habit: Habit;

  // Format: YYYY-MM-DD
  @Column({ type: "varchar", length: 10 })
  date: string;

  @Column({ type: "boolean", default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
