import express from "express";
import { registerUser, recoverPassword } from "../controllers/emailController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Email
 *   description: Endpoints relacionados con envío de correos
 */


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
 *         description: Usuario creado y correo enviado
 *       500:
 *         description: Error enviando correo
 */
router.post("/register", registerUser);



/**
 * @swagger
 * /api/email/recover-password:
 *   post:
 *     summary: Enviar un correo de recuperación de contraseña
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
 *     responses:
 *       200:
 *         description: Correo de recuperación enviado
 *       400:
 *         description: El email es obligatorio
 *       500:
 *         description: Error enviando correo de recuperación
 */
router.post("/recover-password", recoverPassword);



export default router;
