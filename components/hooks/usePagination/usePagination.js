import { useState, useEffect } from 'react'

export default function usePagination(currentPage, totalPages) {
   const [pages, setPages] = useState([])
   const [spreadLeft, setSpreadLeft] = useState(false)
   const [spreadRight, setSpreadRight] = useState(false)

   useEffect(() => {
      if (totalPages < 5) {
         setPages(Array.from({ length: totalPages }, (_, i) => i + 1))
         setSpreadRight(false)
         setSpreadLeft(false)
      }
      else if (currentPage < 5) {
         setPages(Array.from({ length: 4 }, (_, i) => i + 1))
         setSpreadRight(true)
         setSpreadLeft(false)
      }
      else if (currentPage > totalPages - 4) {
         setPages(Array.from({ length: 4 }, (_, i) => totalPages - 3 + i))
         setSpreadLeft(true)
         setSpreadRight(false)
      }
      else {
         setPages(Array.from({ length: 5 }, (_, i) => currentPage - 2 + i))
         setSpreadLeft(true)
         setSpreadRight(true)
      }
   }, [totalPages, currentPage])

   return { pages, spreadLeft, spreadRight }
}