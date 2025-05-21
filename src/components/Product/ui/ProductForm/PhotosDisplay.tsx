import Image from "next/image"
import { ProductPhoto } from "../../types"
import { Button } from "@/shared/ui"
import { Trash } from "lucide-react"

type PhotosDisplayProps = {
  photos: ProductPhoto[]
  onDelete: (id: string) => void
}

export const PhotosDisplay = ({
  photos,
  onDelete,
}: PhotosDisplayProps) => {
  return (
    <div className="flex gap-4">
      {photos.map(({ id, url, is_preview }) => (
        <div key={id} className="flex flex-col gap-y-2">
          <Image src={url} alt="" width={50} height={50} />
          {is_preview && <div>Это Превью</div>}
          <Button mode="danger" onClick={() => onDelete(id)}>
            <Trash />
          </Button>
        </div>
      ))}
    </div>
  )
}
