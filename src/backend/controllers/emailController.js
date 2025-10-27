// controllers/userController.js

import { sendEmail } from "../services/emailServices.js";

/**
 * Controlador para registrar un nuevo usuario.
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const registerUser = async (req, res) => {
  const { email, name } = req.body;

  try {
    // 1️⃣ Aquí iría la lógica para crear el usuario en la base de datos
    // Ejemplo: const newUser = await User.create({ email, name });

    // 2️⃣ Enviar correo de bienvenida
    const emailResult = await sendEmail(
      email,
      "Bienvenido",
      'Hola ${name}, bienvenido a nuestra app'
    )

    if (!emailResult.success) {
      return res.status(500).json({
        message: "Usuario creado, pero hubo un error al enviar el correo",
        error: emailResult.error,
      });
    }

    // 3️⃣ Respuesta final al cliente
    res.json({ message: "Usuario creado y correo enviado correctamente" });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: error.message,
    });
  }
};
