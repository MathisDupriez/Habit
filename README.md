# Habit

Application de suivi d'habitudes pour construire et maintenir de bonnes routines au quotidien.

## Fonctionnalites

- **Authentification** - Inscription et connexion securisees avec JWT
- **Gestion des habitudes** - Creer, modifier, supprimer et organiser vos habitudes
- **Frequences flexibles** - Habitudes quotidiennes, hebdomadaires ou mensuelles
- **Suivi journalier** - Cochez vos habitudes completees chaque jour
- **Dashboard** - Visualisez vos progres et statistiques

## Stack Technique

### Backend
- **Express.js** avec TypeScript
- **TypeORM** pour l'ORM
- **SQLite** comme base de donnees
- **JWT** pour l'authentification
- **bcrypt** pour le hashage des mots de passe

### Frontend
- **Alpine.js** pour la reactivite
- **Vanilla CSS** avec architecture modulaire
- **SPA** (Single Page Application)

## Structure du Projet

```
Habit/
├── backend/
│   └── src/
│       ├── config/         # Configuration DB et auth
│       ├── controllers/    # Logique metier
│       ├── middlewares/    # Auth middleware
│       ├── models/         # Entites TypeORM
│       ├── repositories/   # Acces donnees
│       ├── routes/         # Definition des routes API
│       └── app.ts          # Point d'entree
│
└── frontend/
    ├── css/
    │   ├── pages/          # Styles par page
    │   ├── base.css        # Styles de base
    │   ├── components.css  # Composants reutilisables
    │   └── layout.css      # Layout general
    │
    ├── js/
    │   ├── pages/          # Composants de pages
    │   ├── services/       # Appels API
    │   ├── stores/         # Etat global Alpine.js
    │   └── utils/          # Fonctions utilitaires
    │
    └── index.html          # Page principale
```

## Installation

### Prerequisites
- Node.js >= 18
- npm

### Setup

```bash
# Cloner le repository
git clone https://github.com/MathisDupriez/Habit.git
cd Habit

# Installer les dependances backend
cd backend
npm install

# Lancer en mode developpement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## API Endpoints

### Authentification
| Methode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |
| GET | `/api/auth/me` | Profil utilisateur |

### Habitudes
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/habits` | Liste des habitudes |
| POST | `/api/habits` | Creer une habitude |
| PUT | `/api/habits/:id` | Modifier une habitude |
| DELETE | `/api/habits/:id` | Supprimer une habitude |

### Logs
| Methode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/logs` | Historique des logs |
| POST | `/api/logs` | Enregistrer un log |
| DELETE | `/api/logs/:id` | Supprimer un log |

## Scripts

```bash
# Backend
npm run dev      # Mode developpement avec hot-reload
npm run build    # Compiler TypeScript
npm start        # Lancer en production
```

## Licence

ISC
