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
        className='box-border absolute inset-0 block w-full h-full transform scale-125'
        style={{
          filter: 'blur(2rem)',
          opacity: isLoaded ? '0' : '1',
          transition: 'opacity 0s ease',
          transitionDelay: '0ms',
        }}
      />
      <Image
        loader={loader}
        onLoad={() => setLoaded(true)}
        src={src}
        width={width}
        height={height}
        layout={layout}
        className={className}
        style={{
          opacity: isLoaded ? '1' : '0',
          transition: 'opacity 300ms ease',
        }}
        {...props}
      />
    </div>
  )
}
