// import { useState } from "react";
// import "./App.css";
// import Navbar from "./components/Navbar";
// import Watchlist from "./components/Watchlist";
// import Home from "./components/Home";

// import { BrowserRouter, Routes, Route } from "react-router-dom";

// function App() {
//   let [watchlist, setWatchlist] = useState([]);

//   const handleaddtowatchlist = (movieobj) => {
//     if (watchlist.some((movie) => movie.id === movieobj.id)) {
//       let newwatchlist = watchlist.filter((movie) => movie.id !== movieobj.id);
//       setWatchlist(newwatchlist);
//     } else {
//       let newwatchlist = [...watchlist, movieobj];
//       setWatchlist(newwatchlist);
//       localStorage.setItem("watchlist", JSON.stringify(newwatchlist));
//     }
//   };

//   useState(() => {
//     let watchlist = localStorage.getItem("watchlist");
//     if (!watchlist) {
//       return;
//     }
//     if (watchlist) {
//       setWatchlist(JSON.parse(watchlist));
//     }
//   }, []);

//   return (
//     <>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <Home
//                 watchlist={watchlist}
//                 handleaddtowatchlist={handleaddtowatchlist}
//               />
//             }
//           />
//           <Route
//             path="/Watchlist"
//             element={<Watchlist watchlist={watchlist} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }
// export default App;

// // https://api.themoviedb.org/3/movie/popular?api_key=d53e8b0b4e45b9dc89ec3873a88a5502&language=en-US&page=1

import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  // Initialize state directly from localStorage to prevent empty flicker
  const [watchlist, setWatchlist] = useState(() => {
    let storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  // Update localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleAddToWatchlist = (movieObj) => {
    if (watchlist.some((movie) => movie.id === movieObj.id)) {
      let newWatchlist = watchlist.filter((movie) => movie.id !== movieObj.id);
      setWatchlist(newWatchlist);
    } else {
      let newWatchlist = [...watchlist, movieObj];
      setWatchlist(newWatchlist);
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                watchlist={watchlist}
                handleaddtowatchlist={handleAddToWatchlist}
              />
            }
          />
          <Route
            path="/Watchlist"
            element={
              <Watchlist
                watchlist={watchlist}
                handleaddtowatchlist={handleAddToWatchlist}
                setWatchlist={setWatchlist}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
