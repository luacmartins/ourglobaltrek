import Head from "next/head"
import useSize from "../../components/hooks/useSize"
import useOptimizedImage from "../../components/hooks/useOptimizedImage"
import GalleryDesktop from "../../components/common/GalleryDesktop"
import GalleryMobile from "../../components/common/GalleryMobile"
import { getAllPhotoPaths, getPhotoBySlug } from "../../api/useAPI"

export default function Photo({ photos }) {
  const { title, content } = photos
  const optimizedImages = useOptimizedImage(content)
  const images = optimizedImages.split("\n\n\n\n")
  const { isDesktop } = useSize()

  return (
    <>
      <Head>
        <title>ourglobaltrek - {title}</title>
        <link rel='icon' href='/' />
      </Head>

      {isDesktop ? (
        <GalleryDesktop images={images} />
      ) : (
        <GalleryMobile images={images} />
      )}
    </>
  )
}

export async function getStaticPaths() {
  const allPaths = await getAllPhotoPaths()
  console.log(allPaths)
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const photos = await getPhotoBySlug(params.slug)
  return {
    props: {
      photos,
    },
  }
}
