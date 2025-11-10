import { authServices } from "../services/authServices.js";
import { generateToken } from "../utils/auth.js";
import jwt from "jsonwebtoken";

export const authControllers = {
  // 🧾 Registro
  async register(req, res) {
    try {
      const { email, name, password } = req.body;
      const result = await authServices.register({ email, name, password });
      res.status(201).json({
        success: true,
        message: "Usuario registrado exitosamente",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // 🔑 Login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authServices.login({ email, password });

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso",
        data: result,
      });
    } catch (error) {
      if (error.message === "Usuario no encontrado") {
        return res.status(400).json({ success: false, message: error.message });
      }
      if (error.message === "Contraseña incorrecta") {
        return res.status(401).json({ success: false, message: error.message });
      }
      res.status(500).json({ success: false, message: error.message });
    }
  },

  // 🌐 Login con Google
  async googleCallBack(req, res) {
    try {
      console.log("✅ Callback recibido de Google");
      console.log("Usuario de Passport:", req.user);

      const user = req.user;
      const token = generateToken(user.id, user.email);

      res.redirect(`http://localhost:5173/login-success?token=${token}`);
    } catch (error) {
      console.error("❌ Error en googleCallBack:", error);
      res.redirect(`http://localhost:5173/login-error?message=${error.message}`);
    }
  },

  // 🔒 Verificación del token JWT
  async verifyToken(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ valid: false, message: "No token provided" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      return res.status(200).json({ valid: true, userId: decoded.id });
    } catch (error) {
      return res.status(401).json({ valid: false, message: "Token inválido o expirado" });
    }
  },
};
