// Importation des modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Configuration de l'environnement
dotenv.config();

// Création de l'application Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route simple de test
app.get("/", (req, res) => {
  res.send("🚍 Serveur Dakar Dem Dikk en marche !");
});

// Définition du port (depuis .env ou par défaut 5000)
const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en écoute sur le port ${PORT}`);
});
