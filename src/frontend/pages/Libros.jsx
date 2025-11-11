import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMoon } from "react-icons/fa";
import { BookOpen } from "lucide-react";
import NavUser from "./navUser.jsx";


export default function Libros() {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 📚 Cargar libros desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/api/libros")
      .then((res) => res.json())
      .then((data) => setLibros(data))
      .catch((err) => console.error("Error al cargar los libros:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center">
      {/* 🌟 Navbar fija */}
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-pink-600 to-purple-600 shadow-md py-5 px-10 flex justify-between items-center text-white">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/inicio")}
        >
          <span className="text-3xl">📚</span>
          <h1 className="text-2xl font-bold">GameBird</h1>
        </div>

        {/* Navegación */}
        <nav className="flex gap-10 text-lg font-medium">
          <Link to="/inicio" className="hover:text-gray-200">
            Inicio
          </Link>
          <Link to="/biblioteca" className="hover:text-gray-200">
            Biblioteca
          </Link>
          <Link to="/libros" className="text-gray-200 font-bold border-b-2 border-white">
            Libros
          </Link>
          <Link to="/tendencias" className="text-gray-200 font-bold">
            Tendencias
          </Link>
          
        </nav>

        {/* 🔍 Buscador + iconos */}
        <div className="flex items-center gap-4 text-2xl relative">
          <FaSearch
            className="cursor-pointer hover:text-gray-200 transition"
            onClick={() => setSearchOpen(!searchOpen)}
          />

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
                  placeholder="Buscar libros..."
                  className="flex-1 text-gray-800 outline-none text-sm bg-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          <FaMoon className="cursor-pointer hover:text-gray-200 transition" />
          <NavUser />
        </div>
      </header>

      {/* 🧩 Contenido principal */}
      <motion.main
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-[#87a8be] w-11/12 md:w-10/12 lg:w-8/12 mt-36 mb-16 p-14 rounded-2xl shadow-lg flex flex-col items-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 mb-6"
        >
          Explora los <span className="text-pink-500">Libros</span> del mundo gamer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-pink-100 mb-14 max-w-3xl leading-relaxed text-center"
        >
          Encuentra guías, novelas y colecciones inspiradas en tus videojuegos favoritos.  
          Expande tu conocimiento gamer 📖
        </motion.p>

        {/* 📘 Cuadrícula de libros */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {libros.length > 0
            ? libros.map((libro, i) => (
                <motion.div
                  key={libro.id || i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/70 rounded-xl flex flex-col justify-center items-center p-5 hover:scale-105 shadow-md hover:shadow-xl transition-all"
                >
                  {libro.imagen ? (
                    <img
                      src={libro.imagen}
                      alt={libro.titulo}
                      className="w-32 h-40 object-cover rounded-md mb-3"
                    />
                  ) : (
                    <BookOpen className="w-14 h-14 text-gray-400 mb-3" />
                  )}
                  <p className="text-sm font-semibold text-gray-700 text-center">
                    {libro.titulo}
                  </p>
                </motion.div>
              ))
            : Array.from({ length: 60 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/40 rounded-xl flex justify-center items-center p-5"
                >
                  <BookOpen className="w-14 h-14 text-gray-500" />
                </motion.div>
              ))}
        </motion.div>
      </motion.main>
    </div>
  );
}
