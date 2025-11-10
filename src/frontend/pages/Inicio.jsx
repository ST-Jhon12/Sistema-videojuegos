import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaUserCircle, FaMoon } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Inicio() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const games = Array.from({ length: 30 });

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center">
      {/* 🌟 Navbar */}
      <header className="w-full bg-gradient-to-r from-pink-600 to-purple-600 shadow-md py-5 px-10 flex justify-between items-center text-white relative">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <span className="text-3xl">🎮</span>
          <h1 className="text-2xl font-bold">GameBird</h1>
        </div>

        {/* Navegación */}
        <nav className="flex gap-10 text-lg font-medium">
          <a href="/home" className="hover:text-gray-200">Inicio</a>
          <a href="#" className="hover:text-gray-200">Biblioteca</a>
          <a href="#" className="hover:text-gray-200">Libros</a>
          <a href="#" className="hover:text-gray-200">Tendencias</a>
        </nav>

        {/* Iconos y buscador */}
        <div className="flex items-center gap-4 text-2xl relative">
          {/* Ícono de búsqueda */}
          <FaSearch
            className="cursor-pointer hover:text-gray-200 transition"
            onClick={() => setSearchOpen(!searchOpen)}
          />

          {/* 🔍 Buscador dentro del header */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 260 }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-40 bg-white rounded-full shadow-lg flex items-center px-4 py-2"
              >
                <FaSearch className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Buscar juegos o libros..."
                  className="flex-1 text-gray-800 outline-none text-sm bg-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Otros iconos */}
          <FaMoon className="cursor-pointer hover:text-gray-200 transition" />
          <FaUserCircle
            className="cursor-pointer hover:text-gray-200 transition"
            onClick={() => navigate("/profile")}
          />
        </div>
      </header>

      {/* 🧩 Contenido principal */}
      <main className="flex flex-col items-center text-center bg-[#87a8be] w-11/12 md:w-10/12 lg:w-8/12 my-10 rounded-2xl p-14 shadow-lg">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold text-gray-900 mb-6"
        >
          Tu centro de <span className="text-pink-500">Gaming</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-pink-100 mb-14 max-w-3xl leading-relaxed"
        >
          Descubre, juega y conecta con la mejor colección de videojuegos,
          libros y tendencias del gaming. Explora nuevos mundos y vive la
          experiencia gamer definitiva.
        </motion.p>

        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-left w-full text-3xl font-semibold text-gray-900 mb-6"
        >
          Juegos destacados
        </motion.h3>

        {/* 🎮 Cuadros de juegos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.03 * i }}
              className="w-36 h-36 sm:w-44 sm:h-44 bg-white/70 rounded-xl flex items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <span className="text-5xl text-gray-500">🖼️</span>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
