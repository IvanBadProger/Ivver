"use client"
import { useCallback, useRef } from "react"
import { useSlider } from "./useSlider"
import { NavigationButton } from "./NavigationButton"
import { PaginationDot } from "./PaginationDot"
import { ProgressBar } from "./ProgessBar"
import { Slide } from "./Slide"

interface SliderProps {
  slides: string[]
  ariaLabel?: string
}

export const Slider = ({
  slides,
  ariaLabel = "Слайдер изображений",
}: SliderProps) => {
  const sliderRef = useRef<HTMLElement>(null)
  const {
    currentSlide,
    isAnimating,
    nextSlide,
    prevSlide,
    goToSlide,
    progress,
  } = useSlider(slides.length)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const keyActions = {
        ArrowLeft: prevSlide,
        ArrowRight: nextSlide,
        Home: () => goToSlide(0),
        End: () => goToSlide(slides.length - 1),
      }
      const action = keyActions[e.key as keyof typeof keyActions]
      action?.()
    },
    [prevSlide, nextSlide, goToSlide, slides.length]
  )

  return (
    <section
      ref={sliderRef}
      className="relative w-full max-w-[1200px] mx-auto overflow-hidden"
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex transition-transform duration-400 ease-in-out w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            src={slide}
            index={index}
            total={slides.length}
            isCurrent={currentSlide === index}
          />
        ))}
      </div>

      <nav className="absolute bottom-10 left-0 right-0 flex justify-between items-center px-5">
        <NavigationButton
          direction="prev"
          onClick={prevSlide}
          disabled={isAnimating}
        />

        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Пагинация слайдера"
        >
          {slides.map((_, index) => (
            <PaginationDot
              key={index}
              index={index}
              isActive={currentSlide === index}
              onClick={() => goToSlide(index)}
              disabled={isAnimating}
            />
          ))}
        </div>

        <NavigationButton
          direction="next"
          onClick={nextSlide}
          disabled={isAnimating}
        />
      </nav>

      <ProgressBar progress={progress} />
    </section>
  )
}
