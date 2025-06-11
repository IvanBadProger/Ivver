import { TabType } from "../types"

export interface HeaderConfigItem {
  titleText: string
  searchLabel: string
  button: React.ReactNode
}

export interface DashboardHeaderSwitcherProps {
  tab: TabType
}
