import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GYPHY_API;

const useFetchGifFromKeyword = (keyword) => {
  const [gifUrl, setGifUrl] = useState("");

  useEffect(() => {
    const fetchGif = async () => {
      if (!keyword) return;

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=1`
        );
        const { data } = await response.json();
        setGifUrl(data[0]?.images?.downsized_medium?.url || "");
      } catch (error) {
        console.error("Failed to fetch GIF", error);
      }
    };

    fetchGif();
  }, [keyword]);

  return gifUrl;
};

export default useFetchGifFromKeyword;
