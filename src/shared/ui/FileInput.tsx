"use client"
import React, { useState, useRef, useCallback } from "react"
import { Cross } from "lucide-react" // Используйте любую подходящую иконку для удаления
import clsx from "clsx"

interface UploadButtonProps {
  onUpload: (file: File | undefined) => void
  disabled?: boolean
  className?: string
}

export const FileInput: React.FC<UploadButtonProps> = ({
  onUpload,
  disabled,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0]
      if (selectedFile) {
        setLoading(true)
        onUpload(selectedFile)
      }
    },
    [onUpload]
  )

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(true)
    },
    []
  )

  const handleDragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
    },
    []
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      const file = e.dataTransfer.files?.[0]
      if (file) {
        setLoading(true)
        onUpload(file)
      }
      setIsDragging(false)
    },
    [onUpload]
  )

  const handleRemoveFile = () => {
    setLoading(false)
    setProgress(0)
  }

  return (
    <div
      className={clsx(
        "relative w-full rounded-md bg-gray-100 py-4 px-6 text-center",
        isDragging && "bg-blue-100",
        loading && "cursor-wait",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onDragEnter={handleDragStart}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
    >
      {!loading ? (
        <p className="text-sm">
          Click or drag a file here to upload{" "}
          <span role="img" aria-label="upload icon">
            📎
          </span>
        </p>
      ) : (
        <div className="space-y-2">
          <p className="text-xs">Uploading...</p>
          <div className="w-full h-1 rounded bg-green-200 overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <Cross
            size={16}
            onClick={handleRemoveFile}
            className="absolute top-2 right-2 cursor-pointer"
          />
        </div>
      )}
      <input
        type="file"
        accept="*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileSelect}
      />
      <button
        type="button"
        className="mt-2 block w-full text-indigo-600 underline hover:text-indigo-800 focus:outline-none"
        onClick={openFileDialog}
        disabled={disabled}
      >
        Browse for a file
      </button>
    </div>
  )
}
