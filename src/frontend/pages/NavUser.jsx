import { motion, AnimatePresence } from "framer-motion";
import { FaCog, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function NavUser({ show }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute right-8 top-16 bg-slate-600/95 rounded-xl shadow-lg w-60 overflow-hidden border border-slate-500"
        >
          {/* 🔹 Header clickeable que lleva a Ajustes */}
          <div
            onClick={() => navigate("/perfil")}
            className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 text-white font-semibold text-lg hover:brightness-110 transition"
          >
            Mi Cuenta
          </div>

          {/* Opciones */}
          <div className="p-4 flex flex-col gap-3 text-gray-200">
            <button
              onClick={() => navigate("/perfil")}
              className="flex justify-between items-center hover:text-white transition text-base"
            >
              <span>Ajustes</span>
              <FaCog />
            </button>

            <button
              onClick={handleLogout}
              className="flex justify-between items-center hover:text-red-400 transition text-base"
            >
              <span>Cerrar Sesión</span>
              <FaSignOutAlt />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
