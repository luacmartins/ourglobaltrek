import { useState } from 'react'

export default function useFilter(query, mainCat, setQuery, toggleModal) {
   const [filter, setFilter] = useState({ main: '', list: [] })

   const showClear = query.filter(item => !mainCat.map(item => item.databaseId).includes(item)).length > 0

   const add = (id) => {
      setFilter({ main: id, list: [] })
      setQuery([id])
   }

   const toggle = (id) => {
      if (filter.list.includes(id)) setFilter({ main: '', list: filter.list.filter(item => item !== id) })
      else setFilter({ main: '', list: [...filter.list, id] })
   }

   const addAll = (children) => {
      const add = children.filter(item => !filter.list.includes(item.databaseId))
      setFilter({ main: '', list: [...filter.list, ...add.map(item => item.databaseId)] })
   }

   const clear = () => {
      setFilter({ main: '', list: [] })
   }

   const clearAll = () => {
      clear()
      setQuery([])
   }

   const close = () => {
      const newFilter = { main: '', list: [] }
      const mainCatId = mainCat.map(item => item.databaseId)
      query.forEach(item => !mainCatId.includes(item) ? newFilter.list.push(item) : newFilter.main = item)
      setFilter(newFilter)
      toggleModal()
   }

   const update = () => {
      setQuery([...filter.list])
      toggleModal()
   }

   return { filter, showClear, add, toggle, addAll, clear, clearAll, update, close }
}