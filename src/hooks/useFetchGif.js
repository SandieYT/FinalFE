import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_GYPHY_API;
const gifCache = {};

const useFetchGifFromKeyword = (keyword) => {
  const [gifUrl, setGifUrl] = useState("");

  useEffect(() => {
    const fetchGif = async () => {
      if (!keyword) {
        setGifUrl("");
        return;
      }

      if (gifCache[keyword]) {
        setGifUrl(gifCache[keyword]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword}&limit=1`
        );
        const { data } = await response.json();
        const url = data[0]?.images?.downsized_medium?.url || "";
        gifCache[keyword] = url;
        setGifUrl(url);
      } catch (error) {
        console.error("Failed to fetch GIF", error);
        setGifUrl("https://via.placeholder.com/150");
      }
    };

    fetchGif();
  }, [keyword]);

  return gifUrl;
};

export default useFetchGifFromKeyword;
