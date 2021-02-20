import { useState, useEffect } from 'react'

const useOverlay = () => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const $body = document.getElementsByTagName('body')[0]
    const $next = document.getElementById('__next')

    const handleEscape = e => {
      if (e.keyCode === 27) {
        setIsOpen(false)
        $body.classList.remove('overflow-hidden')
        $next.classList.remove('overflow-hidden')
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      $body.classList.remove('overflow-hidden')
      $next.classList.remove('overflow-hidden')
      setIsOpen(false)
    }
  }, [])

  const toggle = () => {
    setIsOpen(!isOpen)
    const $body = document.getElementsByTagName('body')[0]
    const $next = document.getElementById('__next')
    $body.classList.toggle('overflow-hidden')
    $next.classList.toggle('overflow-hidden')
  }

  return [isOpen, toggle]
}

export default useOverlay
