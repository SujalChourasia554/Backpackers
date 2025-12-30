export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-[120px]">
      <div
        className="flex justify-between items-center px-10 py-4 rounded-2xl
                   bg-white/30 backdrop-blur-md border border-white/40
                   shadow-lg"
      >
        <div className="font-bold tracking-widest">LOGO</div>

        <nav className="flex gap-8 font-medium text-gray-800">
          <a href="#" className="hover:text-black transition">Home</a>
          <a href="#" className="hover:text-black transition">Search</a>
          <a href="#" className="hover:text-black transition">Moments</a>
          <button>Boddok</button>
        </nav>
      </div>
    </header>
  );
}
