import { useState } from 'react'
import Image from 'next/image'
import useLoader from '../../hooks/useLoader'

export default function LazyImage({ src, width, height, layout, className, ...props }) {
  const [isLoaded, setLoaded] = useState(false)
  const loader = useLoader()

  return (
    <div className={`relative overflow-hidden w-full h-full`}>
      <img
        aria-hidden='true'
        src={loader({ src, width: 20 })}
        className={`box-border absolute inset-0 block w-full h-full transform scale-125 transition-opacity blur-3 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <Image
        loader={loader}
        onLoad={() => setLoaded(true)}
        src={src}
        width={width}
        height={height}
        layout={layout}
        className={`transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  )
}
