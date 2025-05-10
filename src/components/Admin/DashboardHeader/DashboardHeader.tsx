import { Title } from "@/shared/ui"

type DashboardHeaderProps = {
  title: string
  button: React.ReactNode
  search: React.ReactNode
}

export const DashboardHeader = (props: DashboardHeaderProps) => {
  const { title, button, search } = props

  return (
    <header className="flex justify-between items-center gap-x-4 mb-6 border-b border-gray-200 pb-6">
      <Title size="md" align="left">
        {title}
      </Title>
      {search}
      {button}
    </header>
  )
}
