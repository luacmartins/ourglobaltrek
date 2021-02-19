import { useState } from 'react'
import { useRouter } from 'next/router'
import useOverlay from '../useOverlay'

export default function useFilter(query, mainCat) {
  const [isOpen, toggleModal] = useOverlay()
  const [filter, setFilter] = useState({ main: '', list: [] })

  const router = useRouter()

  const showClear =
    query.filter(item => !mainCat.map(item => item.databaseId).includes(item)).length > 0

  const add = id => {
    setFilter({ main: id, list: [] })
    router.push(`${router.pathname}?q=${id}`)
  }

  const toggle = id => {
    if (filter.list.includes(id))
      setFilter({ main: '', list: filter.list.filter(item => item !== id) })
    else setFilter({ main: '', list: [...filter.list, id] })
  }

  const addAll = children => {
    const add = children.filter(item => !filter.list.includes(item.databaseId))
    setFilter({ main: '', list: [...filter.list, ...add.map(item => item.databaseId)] })
  }

  const clear = () => {
    setFilter({ main: '', list: [] })
  }

  const clearAll = () => {
    clear()
    router.push(router.pathname)
  }

  const close = () => {
    const newFilter = { main: '', list: [] }
    const mainCatId = mainCat.map(item => item.databaseId)
    query.forEach(item =>
      !mainCatId.includes(item) ? newFilter.list.push(item) : (newFilter.main = item)
    )
    setFilter(newFilter)
    toggleModal()
  }

  const update = () => {
    toggleModal()
    router.push(`${router.pathname}?q=${[...filter.list]}`)
  }

  return {
    filter,
    showClear,
    isOpen,
    add,
    toggle,
    addAll,
    clear,
    clearAll,
    update,
    close,
    toggleModal,
  }
}
