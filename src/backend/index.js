import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import "./config/passport.js";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import juegoRoutes from "./routes/juegoRoutes.js"; 
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 🧩 Configuración base
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🧠 Sesión y Passport
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// 🧾 Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 🧭 Ruta base
app.get("/", (req, res) => {
  res.json({
    message: "✅ API corriendo correctamente",
  });
});

// 🔹 Rutas del proyecto
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/juegos", juegoRoutes); 

// 🚀 Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
});
