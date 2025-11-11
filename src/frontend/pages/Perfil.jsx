import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Ajustes() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  // ID del usuario actual (puedes cambiarlo si usas autenticación)
  const userData = JSON.parse(localStorage.getItem("user"));
const userId = userData?.id;


  // Cargar datos del usuario desde el backend
  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsuario(data.data);
          setNombre(data.data.name);
          setContrasena(data.data.password || "");
        }
      })
      .catch((err) => console.error("Error al cargar usuario:", err));
  }, []);

  // Guardar cambios
  const handleGuardar = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nombre,
          password: contrasena,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setMensaje("✅ Cambios guardados correctamente");
        setTimeout(() => setMensaje(""), 3000);
      } else {
        setMensaje("❌ Error al guardar los cambios");
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      setMensaje("❌ No se pudo conectar con el servidor");
    }
  };

  if (!usuario)
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center text-white text-lg">
        Cargando datos del usuario...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-700 text-white flex flex-col items-center pt-28 pb-16">
      {/* Contenedor principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#87a8be] w-11/12 md:w-8/12 lg:w-6/12 rounded-2xl shadow-xl p-10"
      >
        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
          ⚙️ Ajustes de Cuenta
        </h1>

        {/* Información básica */}
        <div className="bg-white/20 p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-bold mb-4">Información básica</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full p-3 rounded-md bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                value={usuario.email}
                disabled
                className="w-full p-3 rounded-md bg-gray-300/80 text-gray-700 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-800 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full p-3 rounded-md bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          </div>
        </div>

        {/* Preferencias de cuenta */}
        <div className="bg-white/20 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Preferencias de cuenta</h2>

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">
                Mantener sesión al cerrar
              </span>
              <input type="checkbox" className="scale-125 accent-pink-600" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">
                Mostrar estado en línea
              </span>
              <input type="checkbox" className="scale-125 accent-pink-600" />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">
                Permitir solicitudes de amistad
              </span>
              <input type="checkbox" className="scale-125 accent-pink-600" />
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="text-center mt-8">
          <button
            onClick={handleGuardar}
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-10 rounded-xl shadow-md transition-all duration-200"
          >
            Guardar cambios
          </button>

          {mensaje && (
            <p className="mt-4 text-center text-white font-medium">
              {mensaje}
            </p>
          )}
        </div>

        {/* Volver */}
        <div className="text-center mt-6">
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
