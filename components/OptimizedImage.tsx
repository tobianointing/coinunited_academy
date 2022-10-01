import Image from "next/image"

interface OptimizedImageProps {
    src: string
    alt: string
    className?: string
}


const OptimizedImage = ({src, alt, className}:OptimizedImageProps) => {
  return (
      <div className={`relative ${className}`}>
          <Image src={src} alt={alt} layout="fill" objectFit="cover" loading="lazy"/>
      </div>
  )
}

export default OptimizedImage
