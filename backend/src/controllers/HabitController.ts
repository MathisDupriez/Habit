import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { HabitRepository } from "../repositories";

export class HabitController {
  private habitRepository = new HabitRepository();

  async getAll(req: AuthRequest, res: Response): Promise<void> {
    try {
      const habits = await this.habitRepository.findAllByUser(req.userId!);
      res.json(habits);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async getById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const habit = await this.habitRepository.findByIdAndUser(id, req.userId!);

      if (!habit) {
        res.status(404).json({ message: "Habitude non trouvée" });
        return;
      }

      res.json(habit);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, frequencyType, frequencyDays } = req.body;

      if (!name) {
        res.status(400).json({ message: "Nom requis" });
        return;
      }

      const maxOrder = await this.habitRepository.getMaxSortOrder(req.userId!);

      const habit = await this.habitRepository.create({
        name,
        frequencyType: frequencyType || "daily",
        frequencyDays: frequencyDays || [],
        userId: req.userId!,
        sortOrder: maxOrder + 1
      });

      res.status(201).json(habit);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const { name, frequencyType, frequencyDays, sortOrder } = req.body;

      const existing = await this.habitRepository.findByIdAndUser(id, req.userId!);
      if (!existing) {
        res.status(404).json({ message: "Habitude non trouvée" });
        return;
      }

      const updateData: any = {};
      if (name !== undefined) updateData.name = name;
      if (frequencyType !== undefined) updateData.frequencyType = frequencyType;
      if (frequencyDays !== undefined) updateData.frequencyDays = frequencyDays;
      if (sortOrder !== undefined) updateData.sortOrder = sortOrder;

      const habit = await this.habitRepository.update(id, updateData);
      res.json(habit);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);

      const existing = await this.habitRepository.findByIdAndUser(id, req.userId!);
      if (!existing) {
        res.status(404).json({ message: "Habitude non trouvée" });
        return;
      }

      await this.habitRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
}
