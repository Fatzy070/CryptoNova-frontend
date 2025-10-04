import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import AddCoin from "./AddCoin";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const token = localStorage.getItem("token");

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get("https://cryptonova-backend.onrender.com/api/portfolio", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio(res.data);
    } catch (err) {
      console.error("Error fetching portfolio:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cryptonova-backend.onrender.com/api/portfolio/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio((prev) => prev.filter((item) => item._id !== id));
       toast.success("Holdings deleted successfully!");
    } catch (err) {
      console.error("Error deleting portfolio:", err);
    }
  };

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 1200000);
    return () => clearInterval(interval);
  }, []);

  // 🔥 Calculate total value of all holdings
  const totalValue = portfolio.reduce((acc, item) => {
    const currentPrice = item.currentPrice || 0;
    return acc + currentPrice * item.quantity;
  }, 0);

  return (
    <div className="py-6">
      <div className="flex justify-between ">
        <div>
          <h1 className="text-lg md:text-[1.5rem] font-bold">My Portfolio</h1>
          <p className="text-gray-400">
            Total Value:{" "}
            <span className="text-green-500">
              $
              {totalValue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </p>
        </div>
        <AddCoin portfolio={portfolio} setPortfolio={setPortfolio} />
      </div>

      {/* Responsive scrollable table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left  border border-gray-700 rounded text-sm md:text-base">
          <thead className="bg-gray-800 text-white">
            <tr className="text-green-400">
              <th className="p-2  min-w-[100px]">Coin</th>
              <th className="p-2 min-w-[120px]">Price (USD)</th>
              <th className="p-2 min-w-[150px]">Holdings</th>
              <th className="p-2 min-w-[120px]">P/L</th>
              <th className="p-2 min-w-[100px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.map((item) => {
              const currentPrice = item.currentPrice || 0;
              const holdings = (currentPrice * item.quantity).toFixed(2);

              return (
                <tr
                  key={item._id}
                  className="bg-gray-900 border-b border-gray-500 text-green-400 hover:bg-gray-800 transition"
                >
                  <td className="p-2  min-w-[100px] capitalize">{item.coin}</td>
                  <td className="p-2 min-w-[120px]">
                    ${currentPrice ? currentPrice.toLocaleString() : "N/A"}
                  </td>
                  <td className="p-2 min-w-[150px]">
                    <div>${holdings}</div>
                    <div className="text-gray-400 text-xs md:text-sm">
                      {item.quantity}
                      {item.coin.slice(0, 3).toUpperCase()}
                    </div>
                  </td>
                  <td
                    className={`p-2 min-w-[120px] font-semibold ${
                      item.plValue >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    ${item.plValue ? item.plValue.toFixed(2) : 0}
                  </td>
                  <td
                    className="p-2 min-w-[100px] text-red-400 cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  >
                    <MdDelete size={18} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;
