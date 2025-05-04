import Image from "next/image"

interface SlideProps {
  src: string
  index: number
  total: number
  isCurrent: boolean
}

export const Slide = (props: SlideProps) => {
  const { src, index, total, isCurrent } = props

  return (
    <div className="flex-[0_0_100%] w-full" aria-hidden={!isCurrent}>
      <Image
        src={src}
        alt={`Слайд ${index + 1} из ${total}`}
        className="w-full h-full object-cover"
        width={300}
        height={300}
        priority={index === 0}
      />
    </div>
  )
}
