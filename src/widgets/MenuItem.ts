export class MenuItem {
  readonly value: string
  readonly label: string
  readonly paramName: string
  readonly pathname: string

  constructor({
    value,
    label,
    paramName,
    pathname,
  }: {
    value: string
    label: string
    paramName: string
    pathname: string
  }) {
    this.value = value
    this.label = label
    this.paramName = paramName
    this.pathname = pathname
  }

  getHref = () => {
    return `${this.pathname}?${this.paramName}=${this.value}`
  }
}
