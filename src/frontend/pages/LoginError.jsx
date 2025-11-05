import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function LoginError() {
const bubbles = Array.from({ length: 35 });

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 relative overflow-hidden text-white">
{/* 🌬️ Burbujas flotantes diagonales */}
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
        style={{
          width: size,
          height: size,
          left: startX,
        }}
        initial={{
          x: startX,
          y: 800 + Math.random() * 200,
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          x: endX,
          y: -150,
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
    );
  })}

  {/* ✨ Luces decorativas */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.2 }}
    className="absolute inset-0 flex justify-center items-center pointer-events-none"
  >
    <div className="absolute w-96 h-96 bg-pink-400/40 blur-3xl rounded-full -top-20 -left-20 animate-pulse" />
    <div className="absolute w-80 h-80 bg-indigo-400/40 blur-3xl rounded-full -bottom-20 -right-20 animate-pulse" />
  </motion.div>

  {/* 🧩 Tarjeta de error */}
  <motion.div
    initial={{ opacity: 0, y: 80, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border border-white/30 relative z-10"
  >
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-4xl font-extrabold mb-4 drop-shadow-lg text-red-300"
    >
      ⚠️ Error de Autenticación
    </motion.h1>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-lg opacity-90 mb-8"
    >
      Hubo un problema al intentar iniciar sesión con Google.  
      Por favor, inténtalo de nuevo.
    </motion.p>

    {/* 🔁 Botón de regreso */}
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/login"
        className="inline-block bg-white text-gray-800 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        Volver a la página de inicio de sesión
      </Link>
    </motion.div>
  </motion.div>
</div>

);
}
