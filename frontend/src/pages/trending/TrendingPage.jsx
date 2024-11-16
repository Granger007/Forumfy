import React, { useEffect, useState } from "react";
import { fetchTrending } from "../../utils/fetchTrending";

const TrendingPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const trendingNews = await fetchTrending();
        if (trendingNews.length === 0) {
          setError("No trending news available.");
        } else {
          setNews(trendingNews);
        }
      } catch (err) {
        setError("Failed to fetch trending data.");
      }
      setLoading(false);
    };
    getNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No news available.</p>
      ) : (
        <div>
					<h1 className='text-4xl font-extrabold text-primary'>TRENDING</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <img
                src={article.urlToImage || "https://via.placeholder.com/400x200"}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{article.title}</h2>
                <p className="text-gray-600 mt-2">{article.description || "No description available"}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-primary font-semibold hover:text-blue-600 transition-colors duration-200"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default TrendingPage;
