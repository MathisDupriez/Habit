import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { HabitRepository, HabitLogRepository } from "../repositories";

export class HabitLogController {
  private habitRepository = new HabitRepository();
  private habitLogRepository = new HabitLogRepository();

  async toggle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const habitId = parseInt(req.params.habitId);
      const { date, completed } = req.body;

      if (!date) {
        res.status(400).json({ message: "Date requise" });
        return;
      }

      const habit = await this.habitRepository.findByIdAndUser(habitId, req.userId!);
      if (!habit) {
        res.status(404).json({ message: "Habitude non trouvée" });
        return;
      }

      const log = await this.habitLogRepository.upsert(habitId, date, completed);
      res.json(log);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async getByDate(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { date } = req.params;

      if (!date) {
        res.status(400).json({ message: "Date requise" });
        return;
      }

      const logs = await this.habitLogRepository.findByUserAndDate(req.userId!, date);
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async getByDateRange(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ message: "startDate et endDate requis" });
        return;
      }

      const logs = await this.habitLogRepository.findByUserAndDateRange(
        req.userId!,
        startDate as string,
        endDate as string
      );
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async getStats(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ message: "startDate et endDate requis" });
        return;
      }

      const stats = await this.habitLogRepository.getCompletionStats(
        req.userId!,
        startDate as string,
        endDate as string
      );
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async getHabitLogs(req: AuthRequest, res: Response): Promise<void> {
    try {
      const habitId = parseInt(req.params.habitId);
      const { startDate, endDate } = req.query;

      if (!startDate || !endDate) {
        res.status(400).json({ message: "startDate et endDate requis" });
        return;
      }

      const habit = await this.habitRepository.findByIdAndUser(habitId, req.userId!);
      if (!habit) {
        res.status(404).json({ message: "Habitude non trouvée" });
        return;
      }

      const logs = await this.habitLogRepository.findByHabitAndDateRange(
        habitId,
        startDate as string,
        endDate as string
      );
      res.json(logs);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
}
