import "reflect-metadata";
import express from "express";
import cors from "cors";
import path from "path";
import routes from "./routes";
import { AppDataSource } from "./config/database";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, "../../frontend")));

// Routes API
app.use("/api", routes);

// Route par défaut pour le frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

// Initialisation de la base de données et démarrage du serveur
AppDataSource.initialize()
  .then(() => {
    console.log("Base de données connectée");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });

export default app;
