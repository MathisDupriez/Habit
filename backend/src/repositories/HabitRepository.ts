import { AppDataSource } from "../config/database";
import { Habit } from "../models";

export class HabitRepository {
  private repository = AppDataSource.getRepository(Habit);

  async findAllByUser(userId: number): Promise<Habit[]> {
    return this.repository.find({
      where: { userId },
      order: { sortOrder: "ASC", id: "ASC" }
    });
  }

  async findById(id: number): Promise<Habit | null> {
    return this.repository.findOneBy({ id });
  }

  async findByIdAndUser(id: number, userId: number): Promise<Habit | null> {
    return this.repository.findOneBy({ id, userId });
  }

  async create(habitData: Partial<Habit>): Promise<Habit> {
    const habit = this.repository.create(habitData);
    return this.repository.save(habit);
  }

  async createMany(habits: Partial<Habit>[]): Promise<Habit[]> {
    const created = this.repository.create(habits);
    return this.repository.save(created);
  }

  async update(id: number, habitData: Partial<Habit>): Promise<Habit | null> {
    await this.repository.update(id, habitData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async getMaxSortOrder(userId: number): Promise<number> {
    const result = await this.repository
      .createQueryBuilder("habit")
      .select("MAX(habit.sortOrder)", "maxOrder")
      .where("habit.userId = :userId", { userId })
      .getRawOne();
    return result?.maxOrder ?? -1;
  }
}
