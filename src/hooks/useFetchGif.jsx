import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GYPHY_API;

const useFetch = ({ keyword }) => {
  const [gif, setGif] = useState("");

  const fetchGifs = async () => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1&offset=0&rating=g&lang=en`
      );
      const { data } = await response.json();
      setGif(data[0]?.images?.downsized_medium?.url || "");
    } catch (error) {
      console.error("Error fetching GIFs:", error);
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gif;
};

export default useFetch;
