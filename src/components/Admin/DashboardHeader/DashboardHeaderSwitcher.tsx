import { DashboardHeader } from "./DashboardHeader"
import { TabType } from "../types"
import { HEADER_CONFIG } from "./constants"

export interface DashboardHeaderSwitcherProps {
  tab: TabType
}

export const DashboardHeaderSwitcher = (
  props: DashboardHeaderSwitcherProps
) => {
  const { tab } = props
  const { titleText, button } =
    HEADER_CONFIG[tab] ?? HEADER_CONFIG.error

  return <DashboardHeader titleText={titleText} button={button} />
}
