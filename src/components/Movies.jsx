import React from "react";
import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

function Movies({ handleaddtowatchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handlePrev = () => {
    if (pageNo === 1) {
      setPageNo(pageNo);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=d53e8b0b4e45b9dc89ec3873a88a5502&language=en-US&page=${pageNo}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNo]);
  return (
    <div>
      <div className="text-2xl text-center w-full font-bold mt-5 mb-5">
        Trending Movies
      </div>
      <div className="flex flex-row flex-wrap justify-around">
        {movies.map((movieObj) => {
          return (
            <MovieCard
              key={movieObj.id}
              movieobj={movieObj} // ✅ Added unique key
              poster_path={movieObj.poster_path}
              name={movieObj.original_title}
              handleaddtowatchlist={handleaddtowatchlist}
            />
          );
        })}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;
