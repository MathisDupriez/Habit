import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories";
import { HabitRepository } from "../repositories";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/auth";

const DEFAULT_HABITS = [
  { name: "Lit fait", frequencyType: "daily", frequencyDays: [] },
  { name: "Déjeuner", frequencyType: "daily", frequencyDays: [] },
  { name: "Dîner", frequencyType: "daily", frequencyDays: [] },
  { name: "Souper", frequencyType: "daily", frequencyDays: [] },
  { name: "Vêtements préparés pour le lendemain", frequencyType: "daily", frequencyDays: [] },
  { name: "Dents brossées matin", frequencyType: "daily", frequencyDays: [] },
  { name: "Dents brossées soir", frequencyType: "daily", frequencyDays: [] },
  { name: "Sac préparé la veille", frequencyType: "daily", frequencyDays: [] },
  { name: "Voiture sortie dès le réveil", frequencyType: "daily", frequencyDays: [] },
  { name: "Réveil respecté", frequencyType: "daily", frequencyDays: [] },
  { name: "Sport", frequencyType: "daily", frequencyDays: [] },
  { name: "Dev", frequencyType: "daily", frequencyDays: [] },
  { name: "Détente", frequencyType: "daily", frequencyDays: [] },
];

export class AuthController {
  private userRepository = new UserRepository();
  private habitRepository = new HabitRepository();

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        res.status(400).json({ message: "Nom, email et mot de passe requis" });
        return;
      }

      if (password.length < 6) {
        res.status(400).json({ message: "Le mot de passe doit contenir au moins 6 caractères" });
        return;
      }

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: "Email déjà utilisé" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userRepository.create({
        name,
        email,
        password: hashedPassword
      });

      // Créer les habitudes par défaut
      const habits = DEFAULT_HABITS.map((h, index) => ({
        ...h,
        userId: user.id,
        sortOrder: index
      }));
      await this.habitRepository.createMany(habits as any);

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.status(201).json({
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: "Email et mot de passe requis" });
        return;
      }

      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email }
      });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).userId;
      const user = await this.userRepository.findById(userId);

      if (!user) {
        res.status(404).json({ message: "Utilisateur non trouvé" });
        return;
      }

      res.json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error });
    }
  }
}
