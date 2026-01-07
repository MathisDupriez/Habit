import { DataSource } from "typeorm";
import { User, Habit, HabitLog } from "../models";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Habit, HabitLog],
  migrations: [],
  subscribers: [],
});
