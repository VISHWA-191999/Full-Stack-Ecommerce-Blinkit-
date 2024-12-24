
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import SearchPage from "../Pages/SearchPage";
import { useEffect, useState } from "react";
// import useMobile from "../hooks/useMobile";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import useMobile from "./../hooks/useMobile"

const Search = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isSearchPage,setIsSearchPage] = useState(false)
  const [ isMobile ] = useMobile()
  const params = useLocation()
  const searchText = params.search.slice(3)

  useEffect(()=>{
      const isSearch = location.pathname === "/search"
      setIsSearchPage(isSearch)
  },[location])


  const redirectToSearchPage = ()=>{
      navigate("/search")
  }

  const handleOnChange = (e)=>{
      const value = e.target.value
      const url = `/search?q=${value}`
      navigate(url)
  }

return (
  <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 '>
      <div>
          {
              (isMobile && isSearchPage ) ? (
                  <Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-primary-200 bg-white rounded-full shadow-md'>
                      <FaArrowLeft size={20}/>
                  </Link>
              ) :(
                  <button className='flex justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                      <IoSearch size={22}/>
                  </button>
              )
          }
      </div>
      <div className='w-full h-full'>
          {
              !isSearchPage ? (
                   //not in search page
                   <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
                      <TypeAnimation
                              sequence={[
                                  // Same substring at the start will only be typed out once, initially
                                  'Search "milk"',
                                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                                  'Search "bread"',
                                  1000,
                                  'Search "sugar"',
                                  1000,
                                  'Search "panner"',
                                  1000,
                                  'Search "chocolate"',
                                  1000,
                                  'Search "curd"',
                                  1000,
                                  'Search "rice"',
                                  1000,
                                  'Search "egg"',
                                  1000,
                                  'Search "chips"',
                              ]}
                              wrapper="span"
                              speed={50}
                              repeat={Infinity}
                          />
                   </div>
              ) : (
                  //when i was search page
                  <div className='w-full h-full'>
                      <input
                          type='text'
                          placeholder='Search for atta dal and more.'
                          autoFocus
                          defaultValue={searchText}
                          className='bg-transparent w-full h-full outline-none'
                          onChange={handleOnChange}
                      />
                  </div>
              )
          }
      </div>
      
  </div>
)
//   const navigate = useNavigate();

//   const [searchedPage, setSearchedPage] = useState(false);
//   const isMobile =useMobile();
//   const pageLocation = useLocation();
//   const params = useLocation()
//   const searchText = params.search.slice(3)

//   const navigateToSearchPage = () => {
//     navigate("/search");
//   };

//   useEffect(() => {
//     const isSearchPage = pageLocation.pathname === "/search";
//     setSearchedPage(isSearchPage);
//   },[pageLocation]);

  
//   // console.log(pageLocation); // this object gives us the pathname='/something'
//   // console.log(searchedPage);

//   const handleOnChange = (e)=>{
//     const value = e.target.value
//     const url = `/search?q=${value}`
//     navigate(url)
// }
//   return (
//     <div
     
//       className="flex items-center text-gray-500 bg-slate-200  border rounded-xl h-10 mr-4 lg:h-12 w-full border-2 hover:border-yellow-400"
//     >
      
//       {
//         (searchedPage && isMobile) ? (
//             <Link to={"/"} className="p-3 hover:text-red-500">
//                 <FaArrowAltCircleLeft size={24}/>
//             </Link>
//         ) : (

//             <button  onClick={navigateToSearchPage} className="p-3 hover:text-red-500">
//         <FaSearch />
//       </button>


//         )
//       }



//       {searchedPage ? (
//         //  for taking input
//         <input  
//           type="text"
//           placeholder="search here..."
//           autoFocus
//           onChange={handleOnChange}
//           defaultValue={searchText}
//           className=" w-[90%]  lg:w-[80%] placeholder:text-center outline-none bg-slate-50 rounded-lg mr-2 text-lg my-1 border-[1px] hover:border-pink-400"
//         />
//       ) : (
//         <div className="text-lg">
//           <TypeAnimation
//             sequence={[
//               "search milk...",
//               1000,
//               "search laptop...",
//               1000,
//               "search fan...",
//               1000,
//               "search bread...",
//               1000,
//             ]}
//             wrapper="span"
//             speed={50}
//             repeat={Infinity}
//           />
//         </div>
//       )}
{/* 
      {
        (searchedPage && isMobile) ? (
            <input
            type="text"
            placeholder="search here..."
            className=" w-[90%]  lg:w-[80%] placeholder:text-center outline-none bg-slate-50 rounded-lg mr-2 text-lg my-1 border-[1px] hover:border-pink-400"
          />

        ) : (
            <input
          type="text"
          placeholder="search here..."
          className=" w-[90%]  lg:w-[80%] placeholder:text-center outline-none bg-slate-50 rounded-lg mr-2 text-lg my-1 border-[1px] hover:border-pink-400"
        />

        )
      } */}

  //     <div></div>
  //   </div>
  // );
};
export default Search;
