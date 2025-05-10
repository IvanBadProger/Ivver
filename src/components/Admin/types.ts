export type TabType = "products" | "categories"

export interface DashboardHeaderSwitcherProps {
  tab: TabType
}

export interface HeaderConfigItem {
  title: string
  searchLabel: string
  button: React.ReactNode
}

export interface DashboardHeaderSwitcherProps {
  tab: TabType
}
