import { AppDataSource } from "../config/database";
import { HabitLog } from "../models";

export class HabitLogRepository {
  private repository = AppDataSource.getRepository(HabitLog);

  async findByHabitAndDate(habitId: number, date: string): Promise<HabitLog | null> {
    return this.repository.findOneBy({ habitId, date });
  }

  async findByHabitAndDateRange(habitId: number, startDate: string, endDate: string): Promise<HabitLog[]> {
    return this.repository
      .createQueryBuilder("log")
      .where("log.habitId = :habitId", { habitId })
      .andWhere("log.date >= :startDate", { startDate })
      .andWhere("log.date <= :endDate", { endDate })
      .orderBy("log.date", "ASC")
      .getMany();
  }

  async findByUserAndDateRange(userId: number, startDate: string, endDate: string): Promise<HabitLog[]> {
    return this.repository
      .createQueryBuilder("log")
      .innerJoin("log.habit", "habit")
      .where("habit.userId = :userId", { userId })
      .andWhere("log.date >= :startDate", { startDate })
      .andWhere("log.date <= :endDate", { endDate })
      .orderBy("log.date", "ASC")
      .getMany();
  }

  async findByUserAndDate(userId: number, date: string): Promise<HabitLog[]> {
    return this.repository
      .createQueryBuilder("log")
      .innerJoin("log.habit", "habit")
      .where("habit.userId = :userId", { userId })
      .andWhere("log.date = :date", { date })
      .getMany();
  }

  async upsert(habitId: number, date: string, completed: boolean): Promise<HabitLog> {
    let log = await this.findByHabitAndDate(habitId, date);

    if (log) {
      log.completed = completed;
      return this.repository.save(log);
    }

    log = this.repository.create({ habitId, date, completed });
    return this.repository.save(log);
  }

  async getCompletionStats(userId: number, startDate: string, endDate: string): Promise<{ date: string; total: number; completed: number }[]> {
    const result = await this.repository
      .createQueryBuilder("log")
      .innerJoin("log.habit", "habit")
      .select("log.date", "date")
      .addSelect("COUNT(*)", "total")
      .addSelect("SUM(CASE WHEN log.completed = 1 THEN 1 ELSE 0 END)", "completed")
      .where("habit.userId = :userId", { userId })
      .andWhere("log.date >= :startDate", { startDate })
      .andWhere("log.date <= :endDate", { endDate })
      .groupBy("log.date")
      .orderBy("log.date", "ASC")
      .getRawMany();

    return result.map(r => ({
      date: r.date,
      total: parseInt(r.total),
      completed: parseInt(r.completed)
    }));
  }
}
