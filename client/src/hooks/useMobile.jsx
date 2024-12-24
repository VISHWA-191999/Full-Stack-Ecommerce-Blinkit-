import { useEffect, useState } from "react"

const useMobile = (breakpoint = 768) => {
    // debugger;
    // console.log(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint)

    //getting screen size dynamically
    const handleScreenResizing =() => {
        setIsMobile(window.innerWidth<breakpoint)
        // console.log(window.innerWidth) 
    }

    useEffect(()=> {
    //      debugger;
    // console.log(window.innerWidth);

        handleScreenResizing();

        window.addEventListener('resize',handleScreenResizing); // when the screen size get resize then function will call

        return ()=> { // here we have used parenthesis i.e arrow func because we don't want it to be get executed immediately
            //it return when the component gets unmounted(when no need of component then react will call this arrow function)
            window.removeEventListener('resize',handleScreenResizing)
        }
      
    },[])
return [isMobile];
}

export default useMobile;

