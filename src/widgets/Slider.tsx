"use client"
import clsx from "clsx"
import { ReactNode } from "react"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

type SliderProps = {
  className?: string
  children: ReactNode[]
}

export const Slider = (props: SliderProps) => {
  const { className, children } = props

  return (
    <Swiper
      className={clsx("select-none", className)}
      navigation
      pagination={{ type: "bullets", clickable: true }}
      modules={[Pagination, Navigation]}
      slidesPerView={1}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  )
}
