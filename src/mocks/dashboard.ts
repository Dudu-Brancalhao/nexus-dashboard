import {
    LucideIcon,
    BanknoteArrowDown,
    HandCoins,
    Users,
    Wallet
} from 'lucide-react';

export interface cardData {
    label: String,
    icon: LucideIcon,
    value: String,
    trendingDirection: "positive" | "negative",
    trendingPercentage: String,
}

export const mockCardsData: cardData[] = [
    {
        label: "TOTAL DEPOSITADO",
        icon: BanknoteArrowDown,
        value: "R$ 842.390",
        trendingDirection: "positive",
        trendingPercentage: "12,4",
    },
    {
        label: "TOTAL SACADO",
        icon: HandCoins,
        value: "R$ 318.750",
        trendingDirection: "negative",
        trendingPercentage: "3,1",
    },
    {
        label: "USUÁRIOS ATIVOS",
        icon: Users,
        value: "4.218",
        trendingDirection: "positive",
        trendingPercentage: "8,7",
    },
    {
        label: "VOLUME EM BRL",
        icon: Wallet,
        value: "R$ 2,1M",
        trendingDirection: "positive",
        trendingPercentage: "21,3",
    },
]