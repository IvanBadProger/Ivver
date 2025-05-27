"use client"
import { CategorySelect } from "@/components/Category"
import {
  addProduct,
  getProductById,
  removeProductPhotos,
  updateProduct,
  uploadPhotos,
  uploadPreviewPhoto,
} from "../../api"
import { ProductPhoto } from "../../types"
import {
  ProductFormAdd,
  ProductFormAddSchema,
  ProductFormProps,
  ProductForm as TProductForm,
} from "./types"
import { Input, TextArea, Button } from "@/shared/ui"
import { forwardRef, useCallback, useEffect, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CirclePlus } from "lucide-react"
import { SpecificationField } from "./SpecificationField"
import { PhotosDisplay } from "./PhotosDisplay"
import { DEFAULT_VALUES } from "./constants"
import { toast, ToastContainer } from "react-toastify"
import { createPortal } from "react-dom"

const ProductForm = forwardRef<HTMLFormElement, ProductFormProps>(
  function ProductForm({ isEdit, productId, onSubmitExtra }, ref) {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      control,
      setValue,
      reset,
    } = useForm<ProductFormAdd>({
      defaultValues: DEFAULT_VALUES,
      resolver: zodResolver(ProductFormAddSchema),
    })

    const { fields, remove, append } = useFieldArray({
      control,
      name: "specifications",
    })

    const [deletePhotosIds, setDeletePhotosIds] = useState<string[]>(
      []
    )
    const [photos, setPhotos] = useState<ProductPhoto[]>([])

    const formTitle = isEdit
      ? "Редактирование продукта"
      : "Создание продукта"

    const setFieldsFromProductData = useCallback(
      (productData: TProductForm) => {
        for (const key in productData) {
          const value = productData[key as keyof TProductForm]
            ? productData[key as keyof TProductForm]
            : ""

          setValue(key as keyof TProductForm, value)
        }
      },
      [setValue]
    )

    const addSpecification = useCallback(() => {
      append({ name: "", value: "" })
    }, [append])

    const removeSpecification = useCallback(
      (index: number) => {
        remove(index)
      },
      [remove]
    )

    useEffect(() => {
      if (productId) {
        getProductById(productId).then((res) => {
          if (typeof res === "object") {
            const {
              category_id,
              price,
              specifications,
              description,
              measurement_unit_id,
              name,
              photos,
            } = res

            setFieldsFromProductData({
              category_id,
              price,
              specifications:
                specifications?.map((item) => {
                  return { name: item.name, value: item.value }
                }) ?? [],
              description,
              measurement_unit_id,
              name,
            })
            setPhotos(photos ?? [])
          }
        })
      }
    }, [productId, setFieldsFromProductData])

    const onDeletePhoto = (id: string) => {
      setDeletePhotosIds((prev) => {
        if (prev.includes(id)) {
          return [...prev.filter((item) => item !== id)]
        }

        return [...prev, id]
      })
    }

    const onSubmit = async (formInputs: ProductFormAdd) => {
      const handleUploadPhotos = async (
        files: FileList,
        productId: string
      ) => {
        const photosFormData = new FormData()

        Array.from(files).forEach((photo) => {
          photosFormData.append("photos[]", photo)
        })

        return await uploadPhotos(photosFormData, productId)
      }

      const handleUploadPreview = async (
        file: File,
        productId: string
      ) => {
        const previewFormData = new FormData()
        previewFormData.append("preview", file)

        return await uploadPreviewPhoto(previewFormData, productId)
      }

      const { photos, preview, ...data } = formInputs
      const messages: string[] = []

      if (!data.measurement_unit_id) {
        delete data.measurement_unit_id
      }

      if (isEdit && productId) {
        messages.push(await updateProduct(productId, data))

        if (deletePhotosIds.length) {
          messages.push(
            await removeProductPhotos(
              productId,
              Array.from(deletePhotosIds)
            )
          )
        }

        if (photos?.length) {
          messages.push(await handleUploadPhotos(photos, productId))
        }

        if (preview?.length) {
          messages.push(
            await handleUploadPreview(preview[0], productId)
          )
        }
      } else {
        const res = await addProduct(data)
        messages.push(res.message)
        const addedProductId = res?.data?.id
        if (!addedProductId) return

        if (photos?.length) {
          messages.push(
            await handleUploadPhotos(photos, addedProductId)
          )
        }

        if (preview?.length) {
          messages.push(
            await handleUploadPreview(preview[0], addedProductId)
          )
        }
      }

      if (onSubmitExtra) {
        onSubmitExtra()
      }

      toast(messages.join(" "), {
        position: "top-center",
        autoClose: 3000,
        pauseOnHover: false,
      })

      if (!isEdit) reset()
      setDeletePhotosIds([])
    }

    return (
      <>
        <form
          ref={ref}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-md overflow-hidden"
        >
          <fieldset className="flex flex-col gap-y-4">
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
            {/*
          
            <SelectUnit
              {...register("measurement_unit_id")}
              errorMessage={errors.measurement_unit_id?.message}
            />
             */}

            <fieldset className="flex flex-col gap-y-4">
              <legend className="text-center">Характеристики</legend>
              {fields.map((field, index) => (
                <SpecificationField
                  errorMessage={errors.specifications?.message}
                  index={index}
                  onRemove={removeSpecification}
                  register={register}
                  key={field.id}
                />
              ))}
              <Button onClick={addSpecification}>
                <CirclePlus />
                <span>Добавить характеристику</span>
              </Button>
            </fieldset>

            <Input
              {...register("preview")}
              type="file"
              accept="image/*"
              label="Превью продукта"
            />

            <Input
              {...register("photos")}
              type="file"
              accept="image/*"
              label="Фото продукта"
              multiple
            />

            {!!photos.length && (
              <PhotosDisplay
                selectedPhotosIds={deletePhotosIds}
                photos={photos}
                onClick={onDeletePhoto}
              />
            )}

            <Button type="submit" disabled={isSubmitting}>
              {isEdit ? "Сохранить" : "Создать"}
            </Button>
          </fieldset>
        </form>

        {createPortal(<ToastContainer limit={3} />, document.body)}
      </>
    )
  }
)

export default ProductForm
