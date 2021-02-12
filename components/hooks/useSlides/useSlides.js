import { useState, useEffect } from 'react'

export default function useSlides(length) {
   const [view, setView] = useState(0)

   const slide = (direction) => {
      if (view + direction < 0) setView(length - 1)
      else if (view + direction > length - 1) setView(0)
      else setView(view + direction)
   }

   const slideLeft = () => slide(-1)
   const slideRight = () => slide(1)

   useEffect(() => {
      const handleKeydown = (e) => {
         if (e.keyCode === 37) slideLeft()
         if (e.keyCode === 39) slideRight()
      }

      document.addEventListener('keydown', handleKeydown)

      return () => {
         document.removeEventListener('keydown', handleKeydown)
      }
   }, [view])

   return { view, slideLeft, slideRight }
}