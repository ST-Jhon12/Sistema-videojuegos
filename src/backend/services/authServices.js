import { hashPassword, comparePassword, generateToken } from "../utils/auth.js";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const authServices = {
// 🔹 Registrar usuario
async register(data) {
try {
const { email, name, password } = data;


  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("El usuario ya existe con ese correo electrónico.");

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, name, password: hashedPassword },
  });

  const token = generateToken(user.id, user.email);
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
} catch (error) {
  console.error("Error en register:", error);
  throw new Error("Error al registrar usuario: " + error.message);
}


},

// 🔹 Iniciar sesión normal
async login(data) {
try {
const { email, password } = data;


  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Usuario no encontrado.");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta.");

  const token = generateToken(user.id, user.email);
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
} catch (error) {
  console.error("Error en login:", error);
  throw new Error("Error al iniciar sesión: " + error.message);
}


},

// 🔹 Login con Google (usado por passport)
async loginWithGoogle(profile) {
try {
const email = profile.emails?.[0]?.value;
const name = profile.displayName;
const googleId = profile.id;
const avatar = profile.photos?.[0]?.value;


  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    if (!user.googleId) {
      user = await prisma.user.update({
        where: { email },
        data: { googleId, avatar },
      });
    }
  } else {
    user = await prisma.user.create({
      data: { email, name, googleId, avatar },
    });
  }

  const token = generateToken(user.id, user.email);
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
} catch (error) {
  console.error("Error en loginWithGoogle:", error);
  throw new Error("Error al iniciar sesión con Google: " + error.message);
}


},
};
