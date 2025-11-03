function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        🚀 Bienvenido a mi App con Tailwind CSS
      </h1>
      <p className="text-lg opacity-90">
        Si ves esto, Tailwind está funcionando correctamente.
      </p>
      <button className="mt-6 px-6 py-2 bg-white text-indigo-700 font-semibold rounded-full hover:bg-gray-200 transition">
        ¡Todo OK!
      </button>
    </div>
  );
}

export default Home;
