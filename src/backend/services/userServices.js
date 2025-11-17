import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userService = {
  // Crear usuario
  async createUser(data) {
    const { email, name, password, googleId, avatar } = data;
    try {
      return await prisma.user.create({
        data: { 
          email, 
          name, 
          password: password || null, 
          googleId: googleId || null, 
          avatar: avatar || null 
        }
      });
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  },

  // Obtener todos los usuarios
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  },

  // Obtener usuario por ID
  async getUserById(id) {
    const userId = Number(id);
    if (isNaN(userId)) throw new Error("ID de usuario inválido");

    const user = await prisma.user.findUnique({ where: { id: userId } });
    return user || null;
  },

  // 🔹 NUEVO → Obtener usuario por nombre
  async getUserByName(name) {
    try {
      return await prisma.user.findFirst({
        where: { name }
      });
    } catch (error) {
      throw new Error("Error al buscar usuario por nombre: " + error.message);
    }
  },

  // Actualizar usuario
  async updateUser(id, data) {
    try {
      return await prisma.user.update({ 
        where: { id: Number(id) }, 
        data 
      });
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  },

  // Eliminar usuario
  async deleteUser(id) {
    try {
      return await prisma.user.delete({ where: { id: Number(id) } });
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  },
};
