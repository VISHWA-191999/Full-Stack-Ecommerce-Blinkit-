import React from 'react'

const Loading = () => {
  return (
   
//       <button type="button" className="bg-indigo-500 ..." disabled>
//   <svg className="animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">
 
//   </svg>
//   Processing...
// </button>
<button type="button" className="bg-indigo-100 text-black px-4 py-2 rounded flex items-center mx-auto mt-24 " disabled>
  <svg 
    className="animate-spin h-5 w-5 mr-3 text-black" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    ></path>
  </svg>
  Processing...
</button>

    
  )
}

export default Loading

