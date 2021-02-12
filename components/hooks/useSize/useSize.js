import { useState, useEffect } from 'react'

export default function useSize() {
   const [width, setWidth] = useState(0)
   const [height, setHeight] = useState(0)
   const [isMobile, setIsMobile] = useState(false)
   const [isDesktop, setIsDesktop] = useState(false)

   useEffect(() => {
      const getSize = () => {
         setWidth(window.innerWidth)
         setHeight(window.innerHeight)
         window.innerWidth > 767 ? setIsMobile(false) : setIsMobile(true)
         window.innerWidth < 1024 ? setIsDesktop(false) : setIsDesktop(true)
      }

      getSize()
      window.addEventListener('resize', getSize)

      return () => {
         window.removeEventListener('resize', getSize)
      }
   }, [])

   return { width, height, isMobile, isDesktop }
}