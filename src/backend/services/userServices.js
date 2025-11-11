import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const userService = {
  // 🔹 Crear usuario
  async createUser(data) {
    try {
      const { email, name, password, googleId, avatar } = data;

      return await prisma.user.create({
        data: {
          email,
          name,
          password: password || null,
          googleId: googleId || null,
          avatar: avatar || null,
        },
      });
    } catch (error) {
      throw new Error('Error al crear usuario: ' + error.message);
    }
  },

  // 🔹 Obtener todos los usuarios
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error('Error al obtener usuarios: ' + error.message);
    }
  },

  // 🔹 Obtener un usuario por ID
  async getUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: Number(id) },
      });
    } catch (error) {
      throw new Error('Error al obtener usuario: ' + error.message);
    }
  },

  // 🔹 Actualizar usuario (nombre, contraseña o avatar)
  async updateUser(id, data) {
    try {
      return await prisma.user.update({
        where: { id: parseInt(id) },
        data,
      });
    } catch (error) {
      throw new Error('Error al actualizar usuario: ' + error.message);
    }
  },

  // 🔹 Eliminar usuario
  async deleteUser(id) {
    try {
      return await prisma.user.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw new Error('Error al eliminar usuario: ' + error.message);
    }
  },
};
