import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const librosService = {
  async createLibro(data) {
    try {
      const { titulo, descripcion, autor, imagen, publishedAt } = data;
      return await prisma.libro.create({ data: { titulo, descripcion, autor, imagen, publishedAt } });
    } catch (error) {
      throw new Error("Error al crear libro: " + error.message);
    }
  },

  async getAllLibros() {
    try {
      return await prisma.libro.findMany({ orderBy: { createdAt: "desc" } });
    } catch (error) {
      throw new Error("Error al obtener libros: " + error.message);
    }
  },

  async getLibroById(id) {
    try {
      const libroId = Number(id);
      if (isNaN(libroId)) throw new Error("ID de libro inválido");
      return await prisma.libro.findUnique({ where: { id: libroId } });
    } catch (error) {
      throw new Error("Error al obtener libro: " + error.message);
    }
  },

  async updateLibro(id, data) {
    try {
      return await prisma.libro.update({ where: { id: Number(id) }, data });
    } catch (error) {
      throw new Error("Error al actualizar libro: " + error.message);
    }
  },

  async deleteLibro(id) {
    try {
      return await prisma.libro.delete({ where: { id: Number(id) } });
    } catch (error) {
      throw new Error("Error al eliminar libro: " + error.message);
    }
  },
};
