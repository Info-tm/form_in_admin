export interface FreelancerInterface {
  date?: any
  select?: string | number
  name?: string
  email?: string
  website?: string
  phone?: string
  orderType?: string
  duration?: number
  top?: string
  light?: string
  period?: any
  web3x?: boolean
  radio?: boolean
  adv?: boolean
  checkbox4?: boolean
  checkbox5?: boolean
  checkbox6?: boolean
  details?: any
  radio_text?: string
  adv_site?: string
  comment?: string
  selectedCityIds?: any
}
export interface Multy extends FreelancerInterface {
  selectedCityIds: string
}
