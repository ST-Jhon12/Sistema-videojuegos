import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const icons = ["🎮", "👾", "💎", "⚡", "🕹️", "🔥"];
  const particles = Array.from({ length: 40 });

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      console.log("✅ Token recibido y guardado:", token);
      localStorage.setItem("authToken", token);

      // 👇 Aquí cambiamos la redirección a /home
      setTimeout(() => {
        navigate("/Inicio", { replace: true });
      }, 3000);
    } else {
      console.log("❌ No se recibió token");
      navigate("/login-error", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden text-white p-6">
      {/* 🌌 Íconos flotantes diagonales */}
      {particles.map((_, i) => {
        const icon = icons[i % icons.length];
        const startX = -100 - Math.random() * 200;
        const endX = window.innerWidth + 200;
        const size = Math.random() * 24 + 20;
        const duration = Math.random() * 10 + 12;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            className="absolute text-2xl select-none"
            style={{ fontSize: size }}
            initial={{
              x: startX,
              y: window.innerHeight + 100,
              opacity: 0,
              rotate: 0,
            }}
            animate={{
              x: endX,
              y: -150,
              opacity: [0.4, 0.8, 0.4],
              rotate: [0, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
              delay,
            }}
          >
            {icon}
          </motion.div>
        );
      })}

      {/* 💫 Luces decorativas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <div className="absolute w-96 h-96 bg-pink-400/40 blur-3xl rounded-full -top-20 -left-20 animate-pulse" />
        <div className="absolute w-80 h-80 bg-indigo-400/40 blur-3xl rounded-full -bottom-20 -right-20 animate-pulse" />
      </motion.div>

      {/* 🧩 Tarjeta de éxito */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md text-center border border-white/30 relative z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-extrabold mb-4 drop-shadow-lg text-green-300"
        >
          🎉 ¡Login Exitoso!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-lg opacity-90 mb-4"
        >
          Bienvenido de nuevo jugador.  
          Tu sesión se ha iniciado correctamente.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm opacity-75"
        >
          Redirigiendo al panel principal...
        </motion.p>

        {/* ⏳ Spinner o animación pequeña */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 w-12 h-12 border-4 border-t-white border-white/40 rounded-full mx-auto"
        />
      </motion.div>
    </div>
  );
}
