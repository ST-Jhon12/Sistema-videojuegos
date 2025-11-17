import express from "express";
import { authControllers } from "../controllers/authControllers.js";
import passport from "passport";

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Registrar nuevo usuario
 *    tags: [Auth]
 */
router.post("/register", authControllers.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Iniciar sesión de usuario
 *    tags: [Auth]
 */
router.post("/login", authControllers.login);

/**
 * @swagger
 * /api/auth/verify:
 *  get:
 *    summary: Verifica si el token JWT es válido
 *    tags: [Auth]
 *    security:
 *      - BearerAuth: []
 *    responses:
 *      200:
 *        description: Token válido
 *      401:
 *        description: Token inválido o expirado
 */
router.get("/verify", authControllers.verifyToken); 

/**
 * 🔥🔥🔥 AQUI SE AGREGA LA NUEVA RUTA 🔥🔥🔥
 * @swagger
 * /api/auth/me:
 *  get:
 *    summary: Obtiene la información del usuario autenticado
 *    tags: [Auth]
 *    security:
 *      - BearerAuth: []
 */
router.get("/me", authControllers.me);
// -----------------------------------------------------------


 // 🔹 Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login-error" }),
  authControllers.googleCallBack
);

export default router;
