import { sendEmail } from "../services/emailServices.js";

export const registerUser = async (req, res) => {
  try {
    const { email, name } = req.body;

    await sendEmail(
      email,
      "Bienvenido",
      `Hola ${name}, bienvenido a nuestra app`
    );

    res.json({ message: "Usuario creado, email enviado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enviando correo" });
  }
};


export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "El email es obligatorio" });

    // Generar token temporal (puedes reemplazarlo por JWT)
    const resetToken = Math.random().toString(36).substring(2);
    const resetUrl = `https://tuapp.com/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Recuperación de contraseña",
      `
        <h3>Recuperación de contraseña</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      `
    );

    res.json({ 
      message: "Correo de recuperación enviado",
      token: resetToken  // opcional para pruebas 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error enviando correo" });
  }
};
