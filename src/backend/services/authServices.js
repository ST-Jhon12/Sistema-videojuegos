import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const authServices = {
  // 🔹 Registrar usuario
  async register(data) {
    try {
      const { email, name, password } = data;

      // Verificar si ya existe un usuario con ese email
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error("El usuario ya existe con ese correo electrónico.");
      }

      // Hashear contraseña
      const hashedPassword = await hashPassword(password);

      // Crear usuario
      const user = await prisma.user.create({
        data: { email, name, password: hashedPassword },
      });

      // Generar token JWT
      const token = generateToken(user.id, user.email);

      // Excluir la contraseña de la respuesta
      const { password: _, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        token,
      };
    } catch (error) {
      console.error("Error en register:", error);
      throw new Error("Error al registrar usuario: " + error.message);
    }
  },
};
