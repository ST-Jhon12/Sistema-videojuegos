import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaMoon, FaUserCircle, FaFireAlt } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Gamepad2 } from "lucide-react";
import NavUser from "./navUser.jsx";

export default function Tendencias() {
  const navigate = useNavigate();
  const [tendencias, setTendencias] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/tendencias")
      .then((res) => res.json())
      .then((data) => setTendencias(data))
      .catch((err) => console.error("Error al cargar las tendencias:", err));
  }, []);

  const dataGrafico = [
    { name: "Ene", jugadores: 2000 },
    { name: "Feb", jugadores: 3200 },
    { name: "Mar", jugadores: 4500 },
    { name: "Abr", jugadores: 6100 },
    { name: "May", jugadores: 7500 },
    { name: "Jun", jugadores: 8700 },
  ];

  return (
    <div className="min-h-screen bg-slate-700 flex flex-col items-center">
      {/* 🌟 Navbar fija */}
      <header className="w-full fixed top-0 left-0 z-50 bg-gradient-to-r from-pink-600 to-purple-600 shadow-md py-5 px-10 flex justify-between items-center text-white">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/inicio")}
        >
          <span className="text-3xl">🔥</span>
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
          <Link to="/libros" className="hover:text-gray-200">
            Libros
          </Link>
          <Link
            to="/tendencias"
            className="text-gray-200 font-semibold border-b-2 border-white"
          >
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
                  placeholder="Buscar tendencias..."
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
        className="bg-[#87a8be] w-11/12 md:w-10/12 lg:w-8/12 mt-36 mb-20 p-14 rounded-2xl shadow-lg flex flex-col items-center"
      >
        {/* 🔥 Título */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center gap-2"
        >
          <FaFireAlt className="text-pink-600 text-4xl" />
          Juegos en <span className="text-pink-500 ml-2">Tendencia</span>
        </motion.h2>

        <p className="text-lg text-pink-100 mb-14 max-w-3xl text-center">
          Descubre los títulos más jugados y seguidos por la comunidad gamer ⚡
        </p>

        {/* 🔥 Cuadrícula de tendencias */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.05 } },
          }}
        >
          {tendencias.length > 0
            ? tendencias.map((juego, i) => (
                <motion.div
                  key={juego.id || i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/70 rounded-xl flex flex-col justify-center items-center p-5 hover:scale-105 shadow-md hover:shadow-xl transition-all"
                >
                  {juego.imagen ? (
                    <img
                      src={juego.imagen}
                      alt={juego.nombre}
                      className="w-28 h-28 object-cover rounded-md mb-2"
                    />
                  ) : (
                    <Gamepad2 className="w-12 h-12 text-gray-400 mb-2" />
                  )}
                  <p className="text-sm font-semibold text-gray-700 text-center">
                    {juego.nombre}
                  </p>
                  <span className="text-xs text-pink-500 mt-1">
                    {juego.jugadoresActivos || "🔥 Popular"}
                  </span>
                </motion.div>
              ))
            : Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/40 rounded-xl flex justify-center items-center p-4"
                >
                  <Gamepad2 className="w-12 h-12 text-gray-500" />
                </motion.div>
              ))}
        </motion.div>

        {/* 📊 Gráfico de crecimiento */}
        <div className="w-full h-80 bg-white/70 rounded-2xl p-6 shadow-md mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Crecimiento de jugadores (mensual)
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataGrafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#555" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="jugadores"
                stroke="#ec4899"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🏆 Logros destacados */}
        <section className="w-full text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            🏆 Logros destacados
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {["Más jugado", "Mayor crecimiento", "Top stream", "Mejor valorado"].map(
              (logro, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="bg-white/70 p-5 rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <h4 className="text-lg font-semibold text-pink-600">
                    {logro}
                  </h4>
                  <p className="text-gray-800 text-sm mt-2">
                    {["Fortnite", "Genshin Impact", "Valorant", "Minecraft"][i]}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </section>
      </motion.main>
    </div>
  );
}
