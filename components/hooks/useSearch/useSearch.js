import { useRouter } from 'next/router'
import { useState } from 'react'

export default function useSearch(toggle) {
  const router = useRouter()
  const [value, setValue] = useState('')

  const handleChange = e => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (value) {
      router.push(`/search?q=${value}`)
      toggle()
    }
  }

  return { value, handleChange, handleSubmit }
}
