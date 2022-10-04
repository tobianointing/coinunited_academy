import Image from "next/image"

interface OptimizedImageProps {
    src: string
    alt: string
    className?: string
}


const OptimizedImage = ({src, alt, className}:OptimizedImageProps) => {

  return (
      <div className={`relative ${className} overflow-hidden`}>
          <Image src={src ? src : '/img/default.jpg'} alt={alt} layout="fill" objectFit="cover" loading="lazy"/>
      </div>
  )
}


export const ContainImage = ({src, alt, className}:OptimizedImageProps) => {
    return (
        <div className={`relative ${className}`}>
            <Image src={src} alt={alt} layout="fill" objectFit="contain" loading="lazy"/>
        </div>
    )
  }
  

export default OptimizedImage
