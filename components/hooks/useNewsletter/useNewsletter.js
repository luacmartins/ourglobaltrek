import { useState } from 'react'

export default function useNewsletter() {
   const [formData, setFormData] = useState({ name: '', email: '' })
   const [message, setMessage] = useState({})

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const data = { email: formData.email, name: formData.name }
      fetch(`https://www.ourglobaltrek.com/wp-json/newsletter/v1/subscribe`, {
         method: 'post',
         body: JSON.stringify(data),
         headers: { 'Content-Type': 'application/json' }
      })
         .then(res => res.json())
         .then(json => {
            if (json.data.status === 200) setMessage({ success: 'Welcome aboard!' })
            else setMessage({ error: json.message })
         })
         .catch(error => console.log(error))
   }

   return { formData, message, handleChange, handleSubmit }
}