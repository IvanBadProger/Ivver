import Image from "next/image"
import { ProductPhoto } from "../../types"
import { Badge, Button, Title } from "@/shared/ui"
import { Trash } from "lucide-react"

type PhotosDisplayProps = {
  photos: ProductPhoto[]
  selectedPhotosIds: string[]
  onClick: (id: string) => void
}

export const PhotosDisplay = ({
  photos,
  selectedPhotosIds,
  onClick,
}: PhotosDisplayProps) => {
  const imageSize = 150

  return (
    <>
      <Title size="md" align="center">
        Фото продукта
      </Title>
      <div className="flex justify-around gap-4 flex-wrap border border-gray-300 overflow-y-scroll max-h-[500px] p-2">
        {photos.map(({ id, url, is_preview }) => {
          const isSelected = !!selectedPhotosIds.includes(id)

          return (
            <div
              key={id}
              className="flex flex-col gap-y-2 relative justify-between"
            >
              {is_preview && (
                <Badge
                  text="превью"
                  className="absolute top-2 left-2"
                />
              )}
              <Image
                src={url}
                alt=""
                width={imageSize}
                height={imageSize}
              />
              {/* fix: label понятный дать */}
              <Button
                label={
                  isSelected
                    ? "Убрать отметку об удалении"
                    : "Пометить на удаление"
                }
                mode={isSelected ? "danger-fill" : "danger"}
                onClick={() => onClick(id)}
                aria-pressed={isSelected}
              >
                <Trash />
              </Button>
            </div>
          )
        })}
      </div>
    </>
  )
}
