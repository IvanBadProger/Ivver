import { useCallback, useState } from "react"
import { ANIMATION_DURATION } from "./constants"

export const useSlider = (slidesCount: number) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => {
    if (isAnimating) return false
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION)
    return true
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    if (startAnimation()) {
      setCurrentSlide((prev) => (prev + 1) % slidesCount)
    }
  }, [startAnimation, slidesCount])

  const prevSlide = useCallback(() => {
    if (startAnimation()) {
      setCurrentSlide(
        (prev) => (prev - 1 + slidesCount) % slidesCount
      )
    }
  }, [startAnimation, slidesCount])

  const goToSlide = useCallback(
    (index: number) => {
      if (startAnimation()) {
        setCurrentSlide(index)
      }
    },
    [startAnimation]
  )

  const progress = ((currentSlide + 1) / slidesCount) * 100

  return {
    currentSlide,
    isAnimating,
    nextSlide,
    prevSlide,
    goToSlide,
    progress,
  }
}
