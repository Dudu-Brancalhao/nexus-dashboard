import { Banknote, Bitcoin, IndianRupee, LucideIcon, Pyramid } from "lucide-react"

export interface Asset {
  acronym: string,
  name: string,
  icon: LucideIcon,
  valueInBRL: string,
  trending?: string,
  trendingPercentage?: number,
}

export interface TotalAssets {
  asset: Asset
  quantity: string,
  quantityInBRL: string,
}

export const mockAssets: Asset[] = [
  {
    acronym: "BRL",
    name: "Real Brasileiro",
    icon: Banknote,
    valueInBRL: "R$ 1",
  },
  {
    acronym: "BTC",
    name: "Bitcoin",
    icon: Bitcoin,
    valueInBRL: "R$ 541.320",
  },
  {
    acronym: "ETH",
    name: "Ethereum",
    icon: Pyramid,
    valueInBRL: "R$ 16.840",
  },
  {
    acronym: "USDT",
    name: "Tether USD",
    icon: IndianRupee,
    valueInBRL: "R$ 6.02",
  },
]

export const mockTotalAssets: TotalAssets[] = [
  {
    asset: mockAssets.find(a => a.acronym === "BRL")!,
    quantity: "R$ 23.840",
    quantityInBRL: "49,1% do total",
  },
  {
    asset: mockAssets.find(a => a.acronym === "BTC")!,
    quantity: "1.847 BTC",
    quantityInBRL: "R$ 312.500",
  },
  {
    asset: mockAssets.find(a => a.acronym === "ETH")!,
    quantity: "142.3 ETH",
    quantityInBRL: "R$ 148.200",
  },
  {
    asset: mockAssets.find(a => a.acronym === "USDT")!,
    quantity: "84.200 USDT",
    quantityInBRL: "R$ 82.316",
  },
]

export const mockLoginAssets: Asset[] = [
  {
    acronym: "BNB",
    name: "BNB",
    icon: Banknote,
    valueInBRL: "3.870",
    trending: "up",
    trendingPercentage: 0.5,
  },
  {
    acronym: "BTC",
    name: "BTC",
    icon: Banknote,
    valueInBRL: "541.320",
    trending: "up",
    trendingPercentage: 2.4,
  },
  {
    acronym: "ETH",
    name: "ETH",
    icon: Banknote,
    valueInBRL: "16.840",
    trending: "up",
    trendingPercentage: 1.1,
  },
  {
    acronym: "USDT",
    name: "USDT",
    icon: Banknote,
    valueInBRL: "6.02",
    trending: "up",
    trendingPercentage: 0.2,
  },
  {
    acronym: "SOL",
    name: "SOL",
    icon: Banknote,
    valueInBRL: "1.230",
    trending: "down",
    trendingPercentage: 0.8,
  },
]
