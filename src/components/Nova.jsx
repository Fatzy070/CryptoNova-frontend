import { useEffect, useState } from "react";
import axios from "axios";

const Nova = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get("https://cryptonova-backend.onrender.com/api/top");
        setCoins(res.data);
      } catch (err) {
        console.error("Error fetching top markets:", err);
      }
    };
    fetchCoins();
  }, []);

  return (
    <div className="bg-white pt-10 text-gray-800">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Crypto Nova —{" "}
            <span className="text-cyan-500">Fast crypto insights</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Preview live prices, follow handpicked crypto news, and save coins to
            your watchlist. This demo UI focuses on clarity and speed.
          </p>

          <div className="mt-6 flex gap-4">
            <a
              href="/news"
              className="px-5 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition"
            >
              Read News
            </a>
            <a
              href="#price"
              className="px-5 py-3 bg-gray-100 rounded-md font-medium hover:bg-gray-200 transition"
            >
              Explore Prices
            </a>
          </div>
        </div>

        {/* Top Markets */}
        <div>
          <h2 className="text-lg font-bold mb-4">Top Markets</h2>
          <ul className="space-y-3">
            {coins.map((coin) => (
              <li
                key={coin.id}
                className="flex justify-between border-b pb-2 text-sm"
              >
                <span className="font-semibold flex items-center gap-2">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-5 h-5 rounded-full"
                  />
                  {coin.name}
                  <span className="text-gray-500">
                    {coin.symbol.toUpperCase()}
                  </span>
                </span>
                <span className="flex gap-2">
                  ${coin.current_price?.toLocaleString() || "N/A"}
                  <span
                    className={`${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(1) || 0}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl">⚡</div>
            <h3 className="font-bold mt-2">Live Prices</h3>
            <p className="text-gray-500 text-sm">Quick snapshot of top coins.</p>
          </div>
          <div>
            <div className="text-3xl">📰</div>
            <h3 className="font-bold mt-2">Curated News</h3>
            <p className="text-gray-500 text-sm">
              Only the headlines that matter.
            </p>
          </div>
          <div>
            <div className="text-3xl">🎯</div>
            <h3 className="font-bold mt-2">Clean UI</h3>
            <p className="text-gray-500 text-sm">
              Design made for quick decisions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nova;
