import { Input } from "@/shared/ui"
import { DashboardHeader } from "."
import { DashboardHeaderSwitcherProps } from "../types"
import { HEADER_CONFIG } from "./contants"

export const DashboardHeaderSwitcher = (
  props: DashboardHeaderSwitcherProps
) => {
  const { tab } = props
  const { title, searchLabel, button } = HEADER_CONFIG[tab]

  return (
    <DashboardHeader
      title={title}
      search={
        <Input
          wrapperClassName="grow"
          label={searchLabel}
          isLabelHidden
          placeholder={searchLabel}
        />
      }
      button={button}
    />
  )
}
