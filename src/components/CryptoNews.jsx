import { useEffect, useState } from "react";
import axios from "axios";

export default function CryptoNews() {
  const [news, setNews] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (pageToken = null) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(
        `https://cryptonova-backend.onrender.com/api/news${pageToken ? `?nextPage=${pageToken}` : ""}`
      );

      setNews((prev) => [...prev, ...res.data.results]);
      setNextPage(res.data.nextPage);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch news. Try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center mb-10">
        📰 Crypto<span className="text-green-400">News</span>
      </h1>

      {error && (
        <p className="text-center text-red-400 mb-4 font-medium">{error}</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl p-5 shadow-lg hover:shadow-green-500/30 transition duration-300"
          >
            <h2 className="font-bold text-lg mb-2 line-clamp-2">
              {article.title}
            </h2>
            <p className="text-sm text-gray-300 line-clamp-3 mb-3">
              {article.description}
            </p>
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 text-sm font-semibold"
            >
              🔗 Read More
            </a>
          </div>
        ))}
      </div>

      {nextPage && (
        <div className="text-center mt-10">
          <button
            onClick={() => fetchNews(nextPage)}
            className="px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-full shadow-md transition"
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
