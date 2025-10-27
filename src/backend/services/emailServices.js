// services/emailService.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Cargar las variables de entorno
dotenv.config();

// Crear el transportador de correo
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),              // 587 para TLS
  secure: process.env.SMTP_SECURE === "true",       // false para 587, true para 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,              // App Password de Gmail
  },
});

/**
 * Envía un correo electrónico.
 * @param {string} to - Correo del destinatario.
 * @param {string} subject - Asunto del correo.
 * @param {string} text - Cuerpo del mensaje (texto plano)
 * @returns {Promise<{ success: boolean, error?: any }>}
 */
export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    return { success: true };
  } catch (error) {
    console.error("Error enviando correo:", error);
    return { success: false, error };
  }
};
