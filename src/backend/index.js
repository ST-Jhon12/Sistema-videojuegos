import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import emailRoutes from "./routes/emailRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Debug endpoint: devuelve el JSON del swaggerSpec (útil para comprobar que la spec se generó)
app.get('/swagger-json', (req, res) => {
  res.json(swaggerSpec);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => {
  res.json({
    message: "Api corriendo correctamente",
  });
});

//Rutas que deseo usar
app.use("/api/users", userRoutes);
app.use("/api/email", emailRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
});