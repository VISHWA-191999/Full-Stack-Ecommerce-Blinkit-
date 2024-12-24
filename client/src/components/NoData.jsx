import React from 'react'
import no_data_img from '../assets/no_data_img.avif'
const NoData = () => {
  return (
    <div className='flex justify-center mt-20 '>
      <img className='h-40 w-40' src={no_data_img} alt="no_data found" />
    </div>
  )
}

export default NoData
