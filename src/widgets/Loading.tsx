import { Loader } from "lucide-react"

type LoadingProps = { size?: number }

export const Loading = ({ size = 64 }: LoadingProps) => {
  return (
    <Loader size={size} className="animate-spin stroke-primary-600" />
  )
}
