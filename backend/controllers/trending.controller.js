import fetch from "node-fetch";

export const getTrending = async (req, res) => {
  try {
    // Make the API call to the news API
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    const data = await response.json();

    // Log the API response for debugging
    console.log("API Response:", data);

    // Handle cases where there is no data or articles
    if (!data.articles || data.articles.length === 0) {
      return res.status(404).json({ message: "No news available" });
    }

    // Return the articles as a response
    res.status(200).json(data.articles);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching news:", error.message);

    // Send error response
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
