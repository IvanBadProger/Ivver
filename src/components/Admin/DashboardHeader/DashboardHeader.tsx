import { Title } from "@/shared/ui"

type DashboardHeaderProps = {
  titleText: string
  button: React.ReactNode
}

export const DashboardHeader = (props: DashboardHeaderProps) => {
  const { titleText, button } = props

  return (
    <header className="flex justify-between items-center gap-x-4 mb-6 border-b border-gray-200 pb-6">
      <Title size="md" align="left">
        {titleText}
      </Title>
      {button}
    </header>
  )
}
