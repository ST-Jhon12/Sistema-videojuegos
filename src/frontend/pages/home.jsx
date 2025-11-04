import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedName = localStorage.getItem("userName");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold mb-4 drop-shadow-lg"
      >
        🚀 Bienvenido a mi Sistema De Frontend
      </motion.h1>

      {token ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-green-200 text-xl mb-4">
            ¡Hola {userName || "Usuario"}! Has iniciado sesión correctamente 🎉
          </p>

          <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-white/30">
            <p className="text-white text-lg opacity-90">
              Tu sesión está activa 🔒
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-6 px-6 py-3 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-red-200 text-xl mb-4">
            😅 Parece que no has iniciado sesión
          </p>
          <Link
            to="/login"
            className="text-white underline font-semibold hover:text-gray-200 transition"
          >
            Ir a la página de Login
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default Home;
