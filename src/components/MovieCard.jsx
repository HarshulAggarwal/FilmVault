import React, { useState, useEffect } from "react";

function MovieCard({ movieobj, poster_path, name, handleaddtowatchlist }) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Load favorite status from localStorage
  useEffect(() => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(movieobj.id));
  }, [movieobj.id]);

  const handleFavoriteClick = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(movieobj.id)) {
      favorites = favorites.filter((id) => id !== movieobj.id);
      setIsFavorite(false);
    } else {
      favorites.push(movieobj.id);
      setIsFavorite(true);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    handleaddtowatchlist(movieobj);
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${poster_path})`,
      }}
      className="w-[200px] h-[300px] bg-cover bg-center m-3 mr-3 ml-4 rounded-xl hover:scale-110 duration-300 hover:cursor-pointer relative"
    >
      <div className="absolute inset-0 bg-gray-200 bg-opacity-60 flex items-center justify-center text-black font-bold text-center text-lg opacity-0 hover:opacity-80 duration-300 rounded-xl">
        {name}
        <div
          className="absolute top-2 right-2 cursor-pointer"
          onClick={handleFavoriteClick}
        >
          <i
            className={
              isFavorite
                ? "fa-solid fa-heart text-red-500"
                : "fa-regular fa-heart"
            }
          ></i>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
