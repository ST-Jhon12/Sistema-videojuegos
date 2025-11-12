// src/backend/services/JuegosServices.js
import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY || "";

// Extrae array de juegos desde varias formas de respuesta comunes
function extractGameArray(res) {
  if (!res) return [];
  // si pasas la respuesta completa (axios), mira res.data
  const body = res.data ?? res;
  if (Array.isArray(body)) return body;
  if (body && Array.isArray(body.data)) return body.data;
  if (body && Array.isArray(body.results)) return body.results;
  if (body && Array.isArray(body.games)) return body.games;
  return [];
}

// Ajusta el mapeo aquí según lo que tu API devuelva
function mapExternalToJuego(external) {
  return {
    externalId: external.id ?? external.gameId ?? null,
    nombre: external.nombre ?? external.name ?? external.title ?? "Sin nombre",
    imagen: external.imagen ?? external.image ?? external.thumbnail ?? null,
    descripcion: external.descripcion ?? external.description ?? external.summary ?? null,
  };
}

// Trae una sola página (útil para debug)
export async function traerJuegosExternos() {
  console.log("Llamando a API externa:", `${API_URL}/juegos`);
  const res = await axios.get(`${API_URL}/juegos`, {
    headers: API_KEY ? { Authorization: `Bearer ${API_KEY}` } : undefined,
    timeout: 15000,
  });
  console.log("Respuesta externa (preview):", JSON.stringify(res.data).slice(0, 500));
  return extractGameArray(res);
}

// Si tu API tiene paginación page/limit — opción segura
export async function traerJuegosPaginados(limit = 100) {
  let page = 1;
  const all = [];
  while (true) {
    const res = await axios.get(`${API_URL}/juegos`, {
      headers: API_KEY ? { Authorization: `Bearer ${API_KEY}` } : undefined,
      params: { page, limit },
      timeout: 20000,
    });
    const items = extractGameArray(res);
    all.push(...items);
    if (items.length < limit) break;
    page++;
  }
  return all;
}

// Guarda/actualiza en la DB
export async function guardarJuegosEnDB({ usePaginated = false } = {}) {
  const externos = usePaginated ? await traerJuegosPaginados() : await traerJuegosExternos();
  let created = 0;
  let updated = 0;

  for (const ext of externos) {
    const j = mapExternalToJuego(ext);

    // Si tienes externalId, usa upsert por externalId; si no, por nombre
    const whereClause = j.externalId ? { externalId: j.externalId } : { nombre: j.nombre };

    const upsert = await prisma.juego.upsert({
      where: whereClause,
      update: {
        nombre: j.nombre,
        imagen: j.imagen,
        descripcion: j.descripcion,
      },
      create: {
        externalId: j.externalId,
        nombre: j.nombre,
        imagen: j.imagen,
        descripcion: j.descripcion,
      },
    });

    // sencillo conteo: si createdAt === updatedAt asumimos creado (no perfecto)
    if (upsert.createdAt.getTime && upsert.createdAt.getTime() === upsert.updatedAt.getTime()) created++;
    else updated++;
  }

  console.log(`Sincronización completa. Created: ${created}, Updated: ${updated}`);
  return { created, updated, total: externos.length };
}
