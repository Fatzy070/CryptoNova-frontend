import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoTriangleUp } from "react-icons/go";

const CryptoPrices = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://cryptonova-backend.onrender.com/api/price?page=${pageNumber}`
      );
      setCoins((prev) => [...prev, ...res.data]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  return (
    <div className="px-1.5 pt-3 md:p-10" id="price">
      <div className="text-center">
        <h2 className="md:text-5xl text-[1.5rem] font-bold">Crypto Market</h2>
        <p className="pt-2.5 text-gray-500">
          Live prices for the top cryptocurrencies.
        </p>
      </div>

      <div className="grid md:grid-cols-4 lg:grid-cols-5 grid-cols-2">
        {coins.map((coin) => (
          <div key={coin.id} className="bg-gray-700 rounded-2xl p-3 m-3">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full"
              />
              <div>
                <span className="font-semibold">{coin.name}</span>
                <p className="text-[15px]">({coin.symbol.toUpperCase()})</p>
              </div>
            </div>
            <div className="font-semibold pt-3 text-[1.2rem]">
              <p>${coin.current_price?.toLocaleString() || "N/A"}</p>
              <p
                className={`text-sm pt-1 flex items-center ${
                  coin.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                <GoTriangleUp size={25} />
                <span>
                  {coin.price_change_percentage_24h?.toFixed(2) || 0}%
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage(page + 1)}
          disabled={loading}
          className="px-6 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Read More"}
        </button>
      </div>
    </div>
  );
};

export default CryptoPrices;
