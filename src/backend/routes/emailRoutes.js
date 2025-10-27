import express from "express";
import { registerUser } from "../controllers/emailController.js";

const router = express.Router();

/**
 * @swagger
 * /api/email/register:
 *   post:
 *     summary: Registrar un nuevo usuario y enviar correo de bienvenida
 *     tags: [Email]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@gmail.com
 *               name:
 *                 type: string
 *                 example: Usuario
 *     responses:
 *       200:
 *         description: Usuario registrado y correo enviado correctamente
 *       500:
 *         description: Error al registrar el usuario o enviar el correo
 */

router.post("/register", registerUser);

export default router;