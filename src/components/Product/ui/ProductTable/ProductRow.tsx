"use client"
import { Button, Table } from "@/shared/ui"
import { ProductDTO } from "../../types"
import { WithId } from "@/shared/types"
import { removeProduct } from "../../api"
import { X } from "lucide-react"
import { toast, ToastContentProps } from "react-toastify"
import {
  MAIN_TOAST_CONTAINER_ID,
  TOAST_REMOVE_PRODUCT_ID,
} from "@/shared/constants"

type ProductRowProps = {
  onClick: (id: string) => void
  data: WithId<ProductDTO>
}
// fix: тип data поменять
export const ProductRow = (props: ProductRowProps) => {
  const { data, onClick } = props
  const { category, name, price, id } = data

  return (
    <Table.Row
      className="cursor-pointer relative"
      title={`Редактировать товар: ${name}`}
      onClick={() => onClick(id)}
    >
      <Table.Cell className="max-w-[20vw]">{name}</Table.Cell>
      <Table.Cell className="max-w-[10vw]">
        {category.name}
      </Table.Cell>
      <Table.Cell>{price} руб</Table.Cell>
      <Table.Cell>
        <Button
          label="Удалить товар"
          mode="danger"
          size="sm"
          className="absolute top-2 z-10"
          onClick={(event) => {
            event.stopPropagation()
            toast(
              (toastContentProps) => (
                <RemoveToast name={name} {...toastContentProps} />
              ),
              {
                onClose(reason) {
                  switch (reason) {
                    case "delete":
                      removeProduct(id)
                      toast("Товар удален", {
                        containerId: MAIN_TOAST_CONTAINER_ID,
                      })
                      break
                    case "cancel":
                      break
                    default:
                      break
                  }
                },
                containerId: MAIN_TOAST_CONTAINER_ID,
                toastId: TOAST_REMOVE_PRODUCT_ID,
                autoClose: false,
                className:
                  "backdrop-blur-xs! bg-transparent! min-w-screen! min-h-screen! p-0! m-0! flex! justify-center! items-center!",
              }
            )
          }}
        >
          <X />
        </Button>
      </Table.Cell>
    </Table.Row>
  )
}

interface RemoveToastProps extends ToastContentProps {
  name: string
}
const RemoveToast = ({ closeToast, name }: RemoveToastProps) => (
  <div className="p-8 bg-white shadow-2xl border border-gray-400 rounded-xl max-w-1/3">
    <div className="mb-8">
      Вы уверены что хотите удалить товар&nbsp;
      <span className="font-bold">{name}</span>?
    </div>
    <div className="flex justify-around gap-x-4">
      <Button mode="danger-fill" onClick={() => closeToast("delete")}>
        Удалить
      </Button>
      <Button mode="danger" onClick={() => closeToast("cancel")}>
        Отмена
      </Button>
    </div>
  </div>
)
