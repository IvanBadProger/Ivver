type Props = {
  progress: number
  label?: string
}
export const ProgressBar = ({ progress, label }: Props) => (
  <div
    className="absolute bottom-0 left-0 right-0 h-1 bg-gray-400"
    role="progressbar"
    aria-label={label}
    aria-valuemin={0}
    aria-valuemax={100}
    aria-valuenow={progress}
  >
    <div
      className="h-full bg-primary-200 transition-[width] duration-400 ease-in-out"
      style={{ width: `${progress}%` }}
    />
  </div>
)
