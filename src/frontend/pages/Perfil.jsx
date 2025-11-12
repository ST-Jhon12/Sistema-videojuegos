import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.warn("No hay token en localStorage. Redirigiendo al login...");
      navigate("/login");
      return;
    }

    try {
      // 🔹 Decodificar token simulado
      // En esta versión local, el token solo contiene el ID 1
      const decoded = { id: 1 };
      const userId = decoded?.id;

      // 🔹 Cargar datos del usuario desde localStorage
      const storedUser = localStorage.getItem("usuarioPerfil");
      if (storedUser) {
        setUsuario(JSON.parse(storedUser));
      } else {
        // Datos predeterminados si no hay nada en localStorage
        const defaultUser = {
          id: 1,
          name: "Jugador",
          email: "jugador@example.com",
          avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          nivel: "1",
          horas: "0",
          estado: "Activo",
        };
        setUsuario(defaultUser);
        localStorage.setItem("usuarioPerfil", JSON.stringify(defaultUser));
      }

    } catch (error) {
      console.error("Error al cargar perfil o token inválido:", error);
      navigate("/login");
    } finally {
      setCargando(false);
    }
  }, [navigate]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center text-white text-lg">
        Cargando perfil...
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center text-white text-lg">
        No se pudo cargar el perfil 😕
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-700 text-white flex flex-col items-center pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#87a8be] w-11/12 md:w-8/12 lg:w-6/12 rounded-2xl shadow-xl p-10 flex flex-col items-center"
      >
        {/* Imagen de perfil */}
        <div className="w-36 h-36 rounded-full overflow-hidden shadow-lg mb-6 border-4 border-white/50">
          <img
            src={usuario.avatar}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nombre */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          {usuario.name || "Usuario sin nombre"}
        </h1>

        {/* Email */}
        <p className="text-lg text-gray-800 mb-6 bg-white/30 px-5 py-2 rounded-lg">
          {usuario.email || "Sin email"}
        </p>

        {/* Información adicional */}
        <div className="w-full bg-white/20 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Información del jugador 🎮
          </h2>
          <ul className="flex flex-col gap-3 text-gray-900 font-medium">
            <li>
              🏆 Nivel:{" "}
              <span className="text-pink-600 font-semibold">{usuario.nivel}</span>
            </li>
            <li>
              ⏱️ Horas jugadas:{" "}
              <span className="text-pink-600 font-semibold">{usuario.horas}</span>
            </li>
            <li>
              💬 Estado:{" "}
              <span className="text-pink-600 font-semibold">{usuario.estado}</span>
            </li>
          </ul>
        </div>

        {/* Botones */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => navigate("/ajustes")}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all"
          >
            ⚙️ Ir a ajustes
          </button>

          <button
            onClick={() => navigate("/inicio")}
            className="text-sm text-gray-200 hover:text-white underline"
          >
            ← Volver al inicio
          </button>
        </div>
      </motion.div>
    </div>
  );
}
