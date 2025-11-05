import { motion } from "framer-motion";
import {
FaUserAlt,
FaEnvelope,
FaLock,
FaGoogle,
FaFacebook,
FaTwitter,
FaDiscord,
} from "react-icons/fa";

export function Register() {
const icons = ["🎮", "👾", "💎", "⚡", "🕹️", "🔥"];
const particles = Array.from({ length: 90 });

return ( <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 relative overflow-hidden">
{/* 🌌 Iconos flotantes gamer */}
{particles.map((_, i) => {
const icon = icons[i % icons.length];
return (
<motion.div
key={i}
className="absolute text-2xl select-none"
initial={{
x: Math.random() * window.innerWidth,
y: Math.random() * window.innerHeight,
opacity: 0,
scale: 0.5,
}}
animate={{
y: [Math.random() * 600, Math.random() * -600],
x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
opacity: [0.4, 1, 0.4],
scale: [0.8, 1.2, 0.8],
}}
transition={{
duration: Math.random() * 8 + 6,
repeat: Infinity,
ease: "easeInOut",
}}
>
{icon}
</motion.div>
);
})}


  {/* 🔮 Figuras decorativas */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.25 }}
    className="absolute inset-0 flex justify-center items-center pointer-events-none"
  >
    <div className="absolute w-96 h-96 bg-indigo-400/40 blur-3xl rounded-full -top-24 -left-16 animate-pulse" />
    <div className="absolute w-80 h-80 bg-pink-400/40 blur-3xl rounded-full -bottom-16 -right-20 animate-pulse" />
  </motion.div>

  {/* 🧩 Card principal */}
  <motion.div
    initial={{ opacity: 0, y: 100, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md text-white border border-white/30 relative z-10"
  >
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 1 }}
      className="text-4xl font-extrabold mb-6 drop-shadow-lg text-center"
    >
      🕹️ Registrate
    </motion.h1>

    {/* 🧾 Formulario */}
    <form className="flex flex-col gap-4">
      <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3">
        <FaUserAlt className="mr-3 text-white/80" />
        <input
          type="text"
          placeholder="Nombre"
          className="bg-transparent flex-1 outline-none text-white placeholder-white/60"
        />
      </div>

      <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3">
        <FaEnvelope className="mr-3 text-white/80" />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-transparent flex-1 outline-none text-white placeholder-white/60"
        />
      </div>

      <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-5 py-3">
        <FaLock className="mr-3 text-white/80" />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-transparent flex-1 outline-none text-white placeholder-white/60"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 bg-white text-gray-800 font-semibold py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        Registrarme
      </motion.button>
    </form>

    {/* 🌐 Redes sociales */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="flex justify-center gap-6 text-2xl mt-8"
    >
      <FaGoogle className="cursor-pointer hover:text-red-500 transition" />
      <FaFacebook className="cursor-pointer hover:text-blue-500 transition" />
      <FaTwitter className="cursor-pointer hover:text-sky-400 transition" />
      <FaDiscord className="cursor-pointer hover:text-indigo-400 transition" />
    </motion.div>

    {/* 🔁 Enlace a login */}
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="text-sm mt-6 text-center opacity-80"
    >
      ¿Ya tienes una cuenta?{" "}
      <a
        href="/login"
        className="text-white font-semibold hover:underline"
      >
        Inicia sesión aquí
      </a>
    </motion.p>
  </motion.div>
</div>


);
}

export default Register;
