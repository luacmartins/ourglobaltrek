import { useState, useEffect } from 'react'

export default function useScroll(offset) {
   const [scrollY, setScrollY] = useState(0)
   const [isBelowOffset, setIsBelowOffset] = useState(false)

   useEffect(() => {
      const getScroll = () => {
         setScrollY(window.scrollY)
         offset && window.scrollY > offset ? setIsBelowOffset(true) : setIsBelowOffset(false)
      }

      getScroll()
      document.addEventListener('scroll', getScroll)

      return () => {
         document.removeEventListener('scroll', getScroll)
      }

   }, [])

   return { scrollY, isBelowOffset }
}