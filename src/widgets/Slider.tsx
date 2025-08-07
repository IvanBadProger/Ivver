// Slider.tsx
"use client"
import clsx from "clsx"
import { ReactNode } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

type SliderProps = {
  className?: string
  children: ReactNode[]
}

export const Slider = (props: SliderProps) => {
  const { className, children } = props

  return (
    <Swiper
      className={clsx("select-none w-full", className)}
      navigation
      pagination={{ type: "bullets", clickable: true }}
      modules={[Pagination, Navigation]}
      slidesPerView={1}
      spaceBetween={10}
      loop={true}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index} className="flex items-center justify-center">
          {child}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
