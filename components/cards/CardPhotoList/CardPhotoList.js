import { Fade } from 'react-awesome-reveal'
import useTiledGrid from '../../hooks/useTiledGrid'
import CardPhoto from '../CardPhoto'
import Error from '../../common/Error'

export default function CardPhotoList({ data, error }) {
  const { className, height } = useTiledGrid()

  if (error) return <Error />
  if (data && !data.length) return <div>Rain check. No stories to share.</div>

  return (
    <>
      <div className='grid justify-center grid-cols-1 mt-10 mb-12 md:grid-cols-3 gap-y-6 md:gap-4'>
        {data &&
          data.map((post, i) => (
            <Fade key={post.slug} triggerOnce className={className(i)} delay={(i % 4) * 150}>
              <CardPhoto data={post} height={height(i)} />
            </Fade>
          ))}
      </div>
    </>
  )
}
