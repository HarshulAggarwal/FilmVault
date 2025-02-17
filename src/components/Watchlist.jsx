import React, { useState, useEffect } from "react";
import genreIds from "../Utility/Genre";

function Watchlist({ watchlist, setWatchlist }) {
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const uniqueGenres = ["All", ...new Set(watchlist.map(movie => genreIds[movie.genre_ids[0]]).filter(Boolean))];

  useEffect(() => {
    // Fetch updated watchlist from localStorage
    const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedWatchlist);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
  };

  const handleRemove = (movieId) => {
    let storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

    storedWatchlist = storedWatchlist.filter((movie) => movie.id !== movieId);
    storedFavorites = storedFavorites.filter((id) => id !== movieId);

    localStorage.setItem("watchlist", JSON.stringify(storedWatchlist));
    localStorage.setItem("favorites", JSON.stringify(storedFavorites));

    setWatchlist(storedWatchlist);
  };

  const handleSortingAsc = () => {
    let sortedWatchlist = [...watchlist].sort((a, b) => a.vote_average - b.vote_average);
    setWatchlist(sortedWatchlist);
  };

  const handleSortingDesc = () => {
    let sortedWatchlist = [...watchlist].sort((a, b) => b.vote_average - a.vote_average);
    setWatchlist(sortedWatchlist);
  };

  return (
    <>
      <div className="flex justify-center flex-wrap">
        {uniqueGenres.map((genre) => (
          <div
            key={genre}
            onClick={() => handleGenreFilter(genre)}
            className={`flex justify-center items-center h-[3rem] w-[9rem] m-4 rounded-xl font-semibold cursor-pointer ${
              selectedGenre === genre ? "bg-blue-800 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {genre}
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search"
          className="w-[18rem] h-[3rem] p-2 m-2 bg-gray-200 rounded-xl"
        />
      </div>
      <div className="border-gray-200 border-2 m-10">
        <table className="w-full text-black text-center bg-gray-200">
          <thead className="border-gray-300 border-1">
            <tr>
              <th>Name</th>
              <th className="flex justify-center items-center">
                <button className="cursor-pointer" onClick={handleSortingAsc}><i className="fa-solid fa-arrow-up-1-9"></i></button>
                <div className="mx-3">Rating</div>
                <button className="cursor-pointer" onClick={handleSortingDesc}><i className="fa-solid fa-arrow-down-9-1"></i></button>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border-gray-300 border-1">
            {watchlist
              .filter((movie) => 
                movie.title.toLowerCase().includes(search.toLowerCase()) &&
                (selectedGenre === "All" || genreIds[movie.genre_ids[0]] === selectedGenre)
              )
              .map((movie) => (
                <tr key={movie.id} className="border-gray-300 border-1">
                  <td className="flex items-center p-2">
                    <img
                      className="h-[6rem] w-[6rem]"
                      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                      alt={movie.title}
                    />
                    <div className="m-8">{movie.title}</div>
                  </td>
                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{genreIds[movie.genre_ids[0]]}</td>
                  <td>
                    <button
                      className="text-red-600 font-semibold cursor-pointer"
                      onClick={() => handleRemove(movie.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Watchlist;
