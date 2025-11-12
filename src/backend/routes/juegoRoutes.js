import express from "express";
import { PrismaClient } from "@prisma/client";
import { guardarJuegosEnDB } from "../services/JuegosServices.js"; // 👈 Importamos el servicio

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Juegos
 *   description: Endpoints para gestión de juegos
 */

/**
 * @swagger
 * /api/juegos:
 *   get:
 *     summary: Obtener todos los juegos
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Lista de juegos obtenida exitosamente
 *       500:
 *         description: Error del servidor
 */
router.get("/", async (req, res) => {
  try {
    const juegos = await prisma.juego.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(juegos);
  } catch (error) {
    console.error("Error al obtener los juegos:", error);
    res.status(500).json({ error: "Error al obtener los juegos" });
  }
});

/**
 * @swagger
 * /api/juegos:
 *   post:
 *     summary: Crear un nuevo juego
 *     tags: [Juegos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: God of War
 *               descripcion:
 *                 type: string
 *                 example: Juego de acción y aventura basado en la mitología nórdica.
 *               imagen:
 *                 type: string
 *                 example: https://example.com/godofwar.jpg
 *     responses:
 *       201:
 *         description: Juego creado exitosamente
 *       500:
 *         description: Error al crear el juego
 */
router.post("/", async (req, res) => {
  try {
    const { nombre, imagen, descripcion } = req.body;
    const nuevoJuego = await prisma.juego.create({
      data: { nombre, imagen, descripcion },
    });
    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error("Error al crear el juego:", error);
    res.status(500).json({ error: "Error al crear el juego" });
  }
});

/**
 * @swagger
 * /api/juegos/sincronizar:
 *   post:
 *     summary: Sincronizar juegos desde una API externa
 *     tags: [Juegos]
 *     responses:
 *       200:
 *         description: Juegos sincronizados exitosamente
 *       500:
 *         description: Error al sincronizar juegos
 */
// dentro de /sincronizar route
router.post("/sincronizar", async (req, res) => {
  try {
    const usePaginated = req.query.paged === "true";
    const resultado = await guardarJuegosEnDB({ usePaginated });
    res.json({ ok: true, ...resultado });
  } catch (error) {
    console.error("Error al sincronizar los juegos:", error);
    res.status(500).json({ error: "Error al sincronizar los juegos" });
  }
});

export default router;
