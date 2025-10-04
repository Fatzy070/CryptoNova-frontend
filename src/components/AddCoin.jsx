import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const AddCoin = ({ portfolio, setPortfolio }) => {
  const [coin, setCoin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const addCoin = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    try {
      const res = await axios.post(
        "https://cryptonova-backend.onrender.com/api/portfolio",
        {
          coin: coin.toLowerCase(),
          quantity: Number(quantity),
          buyPrice: buyPrice ? Number(buyPrice) : null,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPortfolio([...portfolio, res.data]);
      setCoin("");
      setQuantity("");
      setBuyPrice("");
      setIsOpen(false);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error adding coin:", err.response?.data || err.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <>
      {/* Trigger button */}
      <div
        onClick={toggleOpen}
        className="flex font-semibold items-center h-[40px] px-2.5 gap-1 rounded-[10px] bg-blue-600 text-white cursor-pointer"
      >
        <FaPlus />
        <h1>Add New Coin</h1>
      </div>

      {isOpen && (
        <section className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="md:w-[450px] px-6 py-4 rounded-[10px] bg-gray-800 text-white">
            <h1 className="capitalize font-semibold text-[1.2rem]">
              Add New Coin
            </h1>

            <form onSubmit={addCoin}>
              <div className="pt-3">
                <label className="text-gray-400">
                  Coin ID (e.g. bitcoin, ethereum)
                </label>
                <input
                  type="text"
                  value={coin}
                  onChange={(e) => setCoin(e.target.value)}
                  className="bg-gray-700 p-2 rounded-[9px] w-full mt-2 outline-0"
                />
              </div>

              <div className="pt-3">
                <label className="text-gray-400">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="bg-gray-700 p-2 rounded-[9px] w-full mt-2 outline-0"
                />
              </div>

              <div className="pt-3">
                <label className="text-gray-400">Buy Price (USD)</label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(e.target.value)}
                  className="bg-gray-700 p-2 rounded-[9px] w-full mt-2 outline-0"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-[10px] flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loading size="w-5 h-5" />
                      Adding...
                    </>
                  ) : (
                    "Add Holding"
                  )}
                </button>

                <button
                  type="button"
                  className="border border-gray-400 py-2 px-4 rounded-[10px]"
                  onClick={toggleOpen}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default AddCoin;
