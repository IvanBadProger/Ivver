"use client"
import { CategorySelect } from "@/components/Category"
import { addProduct, updateProduct, uploadPhotos } from "../api"
import {
  ProductForm as TProductForm,
  ProductFormSchema,
} from "../types"
import { Input, TextArea, Button } from "@/shared/ui"
import { forwardRef } from "react"
import { WithId } from "@/shared/types"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus, Trash } from "lucide-react"
import { z } from "zod"

export const ProductFormAddSchema = ProductFormSchema.extend({
  photos: z.instanceof(FileList),
})

export type ProductFormAdd = z.infer<typeof ProductFormAddSchema>

interface ProductFormProps {
  isEdit?: boolean
  product?: WithId<TProductForm>
}

export const ProductForm = forwardRef<
  HTMLFormElement,
  ProductFormProps
>(function ProductForm(props, ref) {
  const { isEdit, product } = props

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<ProductFormAdd>({
    defaultValues: {
      name: "",
      description: "",
      price: "1000",
      category_id: "0196ba2b-9208-7093-95eb-e6da63dab2f9",
      measurement_unit_id: "",
      specifications: [],
    },
    resolver: zodResolver(ProductFormAddSchema),
  })

  const { fields, remove, append } = useFieldArray({
    control,
    name: "specifications",
  })

  const formTitle = isEdit
    ? "Редактирование продукта"
    : "Создание продукта"

  const onSubmit = async (formInputs: ProductFormAdd) => {
    const { photos, ...data } = formInputs
    const photosFormData = new FormData()

    if (photos) {
      Array.from(photos).forEach((photo) => {
        photosFormData.append("photos[]", photo)
      })
    }

    if (!data.measurement_unit_id) {
      delete data.measurement_unit_id
    }

    if (isEdit && product) {
      alert(await updateProduct(product.id, data))
    } else {
      const res = await addProduct(data)

      let message = res.message
      if (photos?.length && res.data) {
        message = await uploadPhotos(photosFormData, res.data.id)
      }

      alert(message)
    }
  }

  const addSpecification = () => {
    append({ name: "", value: "" })
  }

  const removeSpecification = (index: number) => {
    remove(index)
  }

  return (
    <form ref={ref} onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>{formTitle}</legend>
        <Input
          {...register("name")}
          label="Название"
          errorMessage={errors.name?.message}
        />
        <TextArea
          {...register("description")}
          label="Описание"
          errorMessage={errors.description?.message}
        />
        <CategorySelect
          {...register("category_id")}
          errorMessage={errors.category_id?.message}
        />
        <Input
          {...register("price")}
          label="Цена"
          type="number"
          errorMessage={errors.price?.message}
        />
        <Input
          {...register("measurement_unit_id")}
          label="Единица измерения"
          errorMessage={errors.measurement_unit_id?.message}
        />

        <fieldset>
          <legend className="text-center">Характеристики</legend>
          {fields.map((field, index) => (
            <div className="flex gap-x-4" key={field.id}>
              <Input
                label="Имя характеристики"
                {...register(`specifications.${index}.name`)}
                errorMessage={errors.specifications?.message}
              />
              <Input
                label="Значение"
                {...register(`specifications.${index}.value`)}
              />
              <Button
                mode="danger"
                onClick={() => removeSpecification(index)}
              >
                <Trash />
              </Button>
            </div>
          ))}
          <Button onClick={addSpecification}>
            <CirclePlus />
            <span>Добавить характеристику</span>
          </Button>
        </fieldset>

        <Input
          {...register("photos")}
          type="file"
          accept="image/*"
          label="Фото продукта"
          multiple
        />

        <Button type="submit" disabled={isSubmitting}>
          {isEdit ? "Редактировать" : "Создать"}
        </Button>
      </fieldset>
    </form>
  )
})
