import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Rocket, Star, Sparkles } from "lucide-react";

export default function Welcome() {
return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden text-white">


  {/* ✨ Partículas flotantes */}
  <motion.div
    className="absolute inset-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    transition={{ duration: 2 }}
  >
    {[...Array(30)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-white rounded-full"
        initial={{
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random(),
          opacity: 0.6,
        }}
        animate={{
          y: [Math.random() * window.innerHeight, -10],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 5,
        }}
      />
    ))}
  </motion.div>

  {/* 🧩 Contenedor principal */}
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center border border-white/30 max-w-xl z-10"
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <Rocket size={50} className="text-yellow-300 drop-shadow-lg" />
      <h1 className="text-5xl font-extrabold drop-shadow-md">GameBird</h1>
    </div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="text-lg opacity-90 mb-8"
    >
      🚀 Bienvenido a <span className="font-semibold">GameBird</span>, el lugar donde los videojuegos cobran vida.
    </motion.p>

    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="mb-8"
    >
      <Link
        to="/login"
        className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
      >
        <Gamepad2 size={20} />
        Ir a la página de Login
      </Link>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="text-sm opacity-75"
    >
      😎 Parece que no has iniciado sesión. ¡Comienza tu aventura gamer ahora!
    </motion.p>
  </motion.div>

  {/* 🌟 Elementos decorativos */}
  <Star className="absolute top-10 left-10 text-yellow-200 opacity-70 animate-pulse" size={30} />
  <Sparkles className="absolute bottom-10 right-10 text-pink-200 opacity-70 animate-pulse" size={40} />
</div>


);
}
