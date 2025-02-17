import React from 'react'

function Pagination({handlePrev, handleNext, pageNo}) {
  return (
    <div className='bg-gray-200 p-5 flex justify-center'>
        <div onClick={handlePrev} className='px-8 hover: cursor-pointer'>
        <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div className='font-bold'>{pageNo}</div>
        <div onClick={handleNext} className='px-8 hover: cursor-pointer'>
        <i className="fa-solid fa-arrow-right"></i>
        </div>
    </div>
  )
}

export default Pagination