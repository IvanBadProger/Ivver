import { DashboardHeader } from "."
import { DashboardHeaderSwitcherProps } from "../types"
import { HEADER_CONFIG } from "./contants"

export const DashboardHeaderSwitcher = (
  props: DashboardHeaderSwitcherProps
) => {
  const { tab } = props
  const { title, button } = HEADER_CONFIG[tab]

  return <DashboardHeader title={title} button={button} />
}
