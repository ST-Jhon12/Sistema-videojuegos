import { motion } from "framer-motion";
import { FaGoogle, FaFacebook, FaTwitter, FaDiscord, FaUserAlt, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const bubbles = Array.from({ length: 40 });

  // ✅ LOGIN CORREGIDO CON COOKIES
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ← NECESARIO para guardar la cookie del token
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      // ✔ Guardamos datos del usuario y token para futuras peticiones (ej. /api/auth/me)
      localStorage.setItem("user", JSON.stringify(data.data.user));
      if (data.data.token) {
        localStorage.setItem("token", data.data.token);
      }

      navigate("/inicio"); // ✔ login-success ya no se usa

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      navigate("/login-error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">

      {/* Fondo con burbujas */}
      {bubbles.map((_, i) => {
        const size = Math.random() * 30 + 10;
        const delay = Math.random() * 10;
        const duration = Math.random() * 12 + 8;
        const startX = Math.random() * 200 - 100;
        const endX = startX + 600 + Math.random() * 400;

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/40 backdrop-blur-sm"
            style={{ width: size, height: size, left: startX }}
            initial={{ x: startX, y: 800 + Math.random() * 200, opacity: 0, scale: 0.8 }}
            animate={{ x: endX, y: -150, opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration, repeat: Infinity, ease: "linear", delay }}
          />
        );
      })}

      {/* Figuras decorativas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="absolute w-96 h-96 bg-pink-400/40 blur-3xl rounded-full -top-20 -left-20 animate-pulse" />
        <div className="absolute w-80 h-80 bg-indigo-400/40 blur-3xl rounded-full -bottom-20 -right-20 animate-pulse" />
      </motion.div>

      {/* Card principal */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md text-center text-white border border-white/30 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-4 drop-shadow-lg"
        >
          🎮 Bienvenido
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg opacity-90 mb-8"
        >
          Inicia sesión para continuar.
        </motion.p>

        {/* Formulario */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mb-6">
          <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3">
            <FaUserAlt className="mr-3 text-white/80" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-white placeholder-white/60"
            />
          </div>

          <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3">
            <FaLock className="mr-3 text-white/80" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-transparent flex-1 outline-none text-white placeholder-white/60"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 bg-white text-gray-800 font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
          >
            Iniciar sesión
          </motion.button>
        </form>

        {/* Botón Google */}
        <motion.a
          href={GOOGLE_AUTH_URL}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center w-full gap-3 bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 mb-6"
        >
          <FaGoogle /> Iniciar sesión con Google
        </motion.a>

        {/* Redes sociales */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-6 text-2xl mt-4"
        >
          <FaFacebook className="cursor-pointer hover:text-blue-500 transition" />
          <FaTwitter className="cursor-pointer hover:text-sky-400 transition" />
          <FaDiscord className="cursor-pointer hover:text-indigo-400 transition" />
          <FaGoogle className="cursor-pointer hover:text-red-500 transition" />
        </motion.div>

        {/* Registro */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm mt-8 opacity-75"
        >
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-white font-semibold hover:underline">
            Regístrate aquí
          </a>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;
