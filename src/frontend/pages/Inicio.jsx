import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMoon, FaUserCircle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import NavUser from "./navUser.jsx";

export default function Inicio() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [juegos, setJuegos] = useState([]);

  // 🔹 Cargar los juegos desde el backend
  useEffect(() => {
    fetch("http://localhost:3000/api/juegos")
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => setJuegos(data))
      .catch((err) => console.error("Error al obtener juegos:", err));
  }, []);

  // 🔍 Filtrar los juegos si se usa el buscador
  const juegosFiltrados = juegos.filter((juego) =>
    juego.nombre.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center">
      {/* 🌟 Navbar fija */}
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-pink-600 to-purple-600 shadow-md py-5 px-10 flex justify-between items-center text-white">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/inicio")}
        >
          <span className="text-3xl">🎮</span>
          <h1 className="text-2xl font-bold">GameBird</h1>
        </div>

        {/* Navegación */}
        <nav className="flex gap-10 text-lg font-medium">
          <Link
            to="/inicio"
            className="text-gray-200 font-semibold border-b-2 border-white"
          >
            Inicio
          </Link>
          <Link to="/biblioteca" className="hover:text-gray-200">
            Biblioteca
          </Link>
          <Link to="/libros" className="hover:text-gray-200">
            Libros
          </Link>
          <Link to="/tendencias" className="hover:text-gray-200">
            Tendencias
          </Link>
        </nav>

        {/* Iconos y menú usuario */}
        <div className="flex items-center gap-4 text-2xl relative">
          {/* 🔍 Buscador */}
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
                  placeholder="Buscar juegos..."
                  className="flex-1 text-gray-800 outline-none text-sm bg-transparent"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 🌙 Modo oscuro */}
          <FaMoon className="cursor-pointer hover:text-gray-200 transition" />

          {/* 👤 Icono de usuario */}
          <div className="relative">
            <FaUserCircle
              className="cursor-pointer text-3xl hover:text-pink-300 transition"
              onClick={() => setShowUserMenu(!showUserMenu)}
            />
            <NavUser show={showUserMenu} />
          </div>
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
          className="text-5xl font-extrabold text-gray-900 mb-6"
        >
          Tu centro <span className="text-pink-500">Gaming</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-pink-100 mb-14 max-w-3xl leading-relaxed text-center"
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

        {/* 🎮 Cuadrícula animada de juegos */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05 },
            },
          }}
        >
          {juegosFiltrados.length > 0 ? (
            juegosFiltrados.map((juego) => (
              <motion.div
                key={juego.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.4 }}
                className="bg-white/70 rounded-xl flex flex-col items-center p-3 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                <img
                  src={juego.imagen || "https://via.placeholder.com/150"}
                  alt={juego.nombre}
                  className="rounded-lg w-full h-24 object-cover mb-2"
                />
                <h4 className="text-sm font-semibold text-center text-gray-800">
                  {juego.nombre}
                </h4>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-100 col-span-full text-center">
              Cargando juegos...
            </p>
          )}
        </motion.div>
      </motion.main>
    </div>
  );
}
