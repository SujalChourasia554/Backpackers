import Navbar from "@/components/Navbar";


export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 -z-10"
        style={{ backgroundImage: "url('/sky-bg.png')" }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main Content Wrapper */}
      <div className="px-30 pt-40">

        {/* ================= HERO SECTION ================= */}
        <section className="flex justify-between items-center mb-28">

          {/* Left */}
          <div className="max-w-130">
            <h1 className="text-5xl font-bold leading-tight mb-6">
              Travel Smarter. <br />
              Backpack lighter.
            </h1>

            <p className="text-gray-600 mb-8">
              Plan stays, food and unforgettable experience that
              match your budget and vibe – powered by AI and
              real backpacker journeys.
            </p>

            <button className="bg-[#4b8ca8] text-white px-6 py-3 rounded-xl text-sm font-medium mb-4">
              Get Recommendation
            </button>

            <div className="text-gray-700 font-medium cursor-pointer">
              Explore backpacker moments →
            </div>
          </div>

          {/* Right */}
          <div
            id="hero-image"
            className="ml-8 relative w-[540px] h-[400px]"
          >
            <img
              src= "/travel-removebg-preview.png"
              
             className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
        </section>

        {/* ================= BUDGET SECTION ================= */}
        <section className="mb-28">
          <h2 className="text-lg font-semibold mb-4">
            If you have <span className="font-bold">1500/day</span> and love Adventure, start here
          </h2>

          <button className="mb-6 bg-[#4b8ca8] text-white px-4 py-2 rounded-full text-xs">
            YOUR BUDGET & VIBE
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Kasol", img: "/kasol.jpg" },
              { title: "Hampi", img: "/hampi.jpg" },
              { title: "Goa", img: "/goa.jpg" },
            ].map((place) => (
              <div
                key={place.title}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div
                  className="h-40 bg-cover bg-center"
                  style={{ backgroundImage: `url(${place.img})` }}
                />
                <div className="p-4">
                  <h3 className="font-bold">{place.title}</h3>
                  <p className="text-xs text-gray-500">Budget Backpack Hostel</p>
                  <p className="mt-2 text-sm font-semibold">₹1200 / Day</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PLAN SECTION ================= */}
        <section className="pb-32">
          <div className="bg-[#0f1a24] rounded-2xl text-white p-10 grid md:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div>
              <span className="text-xs uppercase text-yellow-400 font-semibold">
                Smarter Travel
              </span>

              <h2 className="text-3xl font-bold mt-3 mb-4">
                Let Plan Your <br /> Dream Itinerary
              </h2>

              <p className="text-sm text-gray-300 max-w-md mb-6">
                Stop spending hours researching. Tell us your budget, dates and interest,
                and we’ll generate a day-by-day plan with hotel booking and hidden places.
              </p>

              <button className="bg-white text-black px-5 py-3 rounded-lg text-sm font-semibold">
                Create My Trip
              </button>
            </div>

            {/* Right */}
            <div className="bg-[#f6f2e9] text-black rounded-xl p-6 max-w-sm">
              <h4 className="font-bold mb-4">Your 3-Day Plan</h4>

              <ul className="text-sm space-y-2 text-gray-700">
                <li>✔ Check in The Hostel</li>
                <li>✔ Visit the Waterfall</li>
                <li>✔ Trek the Mountains</li>
              </ul>

              <p className="mt-4 text-xs text-green-600 font-semibold">
                Budget Friendly
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
