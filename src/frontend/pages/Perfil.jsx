import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import axios from "axios";

export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null); // ← antes era hardcodeado
  const [cargando, setCargando] = useState(true);

  // Opciones de switches
  const [tema, setTema] = useState("claro");
  const [publico, setPublico] = useState(true);
  const [online, setOnline] = useState(true);
  const [solicitudes, setSolicitudes] = useState(true);
  const [notificaciones, setNotificaciones] = useState(false);
  const [mantenerSesion, setMantenerSesion] = useState(false);

  // ============================================
  //   🔐 VERIFICAR TOKEN Y TRAER USUARIO REAL
  // ============================================
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        // 1️⃣ Verificar token
        const verifyRes = await axios.get("http://localhost:3000/api/auth/verify", {
          withCredentials: true,
        });

        if (!verifyRes.data.valid) {
          navigate("/login");
          return;
        }

        const userId = verifyRes.data.userId;

        // 2️⃣ Obtener usuario desde prisma
        const userRes = await axios.get(`http://localhost:3000/api/users/${userId}`, {
          withCredentials: true,
        });

        setUsuario(userRes.data.data); // ← usuario real
      } catch (error) {
        navigate("/login"); // si falla algo, vuelve al login
      } finally {
        setCargando(false);
      }
    };

    obtenerPerfil();
  }, []);

  // ===========================
  //   LOADING
  // ===========================
  if (cargando) {
    return (
      <div className="min-h-screen w-full bg-slate-700 flex justify-center items-center text-white text-xl">
        Cargando datos del usuario...
      </div>
    );
  }

  // ===========================
  //   UI PRINCIPAL
  // ===========================
  return (
    <div className="min-h-screen w-full bg-slate-700 flex justify-center py-10">
      <div className="bg-[#87a8be] w-11/12 md:w-8/12 lg:w-5/12 rounded-2xl shadow-2xl p-10 mt-24">

        <h1 className="text-4xl font-extrabold text-white tracking-wide mb-8 text-center">
          Ajustes de <span className="text-pink-300">Usuario</span>
        </h1>

        <div className="bg-white/80 rounded-2xl p-7 shadow-lg backdrop-blur-lg">

          {/* INFORMACIÓN BÁSICA */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Información básica
          </h2>

          {/* PERFIL */}
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center shadow-md">
              <img
                src={usuario.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                className="w-full h-full object-cover"
              />
              <FaCamera className="absolute bottom-1 right-1 text-white bg-black p-1 rounded-full text-lg cursor-pointer" />
            </div>

            <div className="flex flex-col">
              <p className="text-gray-900 text-lg font-semibold">{usuario.name}</p>
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs w-fit mt-1">
                En línea
              </span>
            </div>

            <button className="ml-auto text-sm text-purple-600 font-semibold hover:underline">
              Editar
            </button>
          </div>

          {/* EMAIL */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-700 text-sm font-semibold">Correo Electrónico:</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-800">{usuario.email}</span>
              <button className="text-purple-600 text-sm hover:underline">Actualizar</button>
            </div>
          </div>

          {/* CONTRASEÑA */}
          <div className="mt-4 bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-700 text-sm font-semibold">Contraseña:</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-gray-800">•••••••••••••</span>
              <button className="text-purple-600 text-sm hover:underline">Actualizar</button>
            </div>
          </div>

          {/* TEMA */}
          <div className="mt-4 bg-white rounded-xl shadow-md p-4">
            <p className="text-gray-700 text-sm font-semibold">Tema de fondo:</p>
            <select
              className="mt-1 px-3 py-2 bg-white border rounded-lg shadow-sm"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
            >
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
              <option value="color">Colorido</option>
            </select>
          </div>

          {/* LOGROS */}
          <div className="mt-2 text-right">
            <button className="text-pink-600 text-sm hover:underline">Logros</button>
            <p className="text-xs text-gray-700 -mt-1">17% desbloqueado</p>
          </div>

          {/* VISIBILIDAD */}
          <div className="bg-gradient-to-br from-pink-300 to-purple-300 rounded-2xl p-6 mt-8 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Visibilidad de perfil
            </h3>

            {[
              ["Público", publico, setPublico],
              ["Mostrar estado en línea", online, setOnline],
              ["Permitir solicitudes de amistad", solicitudes, setSolicitudes],
              ["Activar notificaciones", notificaciones, setNotificaciones],
              ["¿Mantener la sesión iniciada?", mantenerSesion, setMantenerSesion]
            ].map(([label, value, setter], i) => (
              <div key={i} className="flex justify-between items-center mb-3 bg-white/40 px-4 py-2 rounded-xl shadow">
                <span className="text-gray-900 font-medium">{label}</span>
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-purple-600"
                  checked={value}
                  onChange={() => setter(!value)}
                />
              </div>
            ))}

            <div className="text-center mt-6">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-purple-700 transition">
                Guardar cambios
              </button>
            </div>
          </div>
        </div>

        {/* VOLVER */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/inicio")}
            className="text-white/80 hover:text-white underline text-lg"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
