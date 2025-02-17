import React from 'react'
import Banner from './Banner'
import Movies from './Movies'

function Home({handleaddtowatchlist, watchlist}) {
  return (
    <div>
        <Banner/>
        <Movies watchlist={watchlist} handleaddtowatchlist={handleaddtowatchlist} />  
    </div>
  )
}

export default Home