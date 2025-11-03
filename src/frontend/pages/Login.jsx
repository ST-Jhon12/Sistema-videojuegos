import { motion } from "framer-motion";

export function Login() {
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}        // aparece con efecto desde abajo
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-10 w-full max-w-md text-center text-white border border-white/30"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-4 drop-shadow-lg"
        >
          🔐 Inicia Sesión
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg opacity-90 mb-8"
        >
          Usa tu cuenta de Google para continuar
        </motion.p>

        <motion.a
          href={GOOGLE_AUTH_URL}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center justify-center w-full gap-3 bg-white text-gray-800 font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
        >
          Iniciar sesión con Google
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm mt-6 opacity-75"
        >
          Tu información estará protegida y no se compartirá sin permiso.
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Login;
