import { Asset, mockAssets } from "./assets";
import { User, mockUsers } from "./users";

export interface Transactions {
    type: "DEPOSIT" | "WITHDRAW",
    user: User,
    asset: Asset
    amount: Number,
    status: "CONCLUDED" | "PENDING" | "CANCELLED",
    date: Date,
    observation?: string
}

export const mockTransactions: Transactions[] = [
    { type: "DEPOSIT", user: mockUsers[0], asset: mockAssets[0] ,amount: 1250.5, status: "CONCLUDED", date: new Date("2025-03-01T10:15:00"), },
    { type: "WITHDRAW", user: mockUsers[1], asset: mockAssets[0], amount: 320.0, status: "PENDING", date: new Date("2025-03-02T14:22:00"), },
    { type: "DEPOSIT", user: mockUsers[2], asset: mockAssets[0], amount: 842.39, status: "CONCLUDED", date: new Date("2025-03-03T09:10:00"), },
    { type: "WITHDRAW", user: mockUsers[3], asset: mockAssets[0], amount: 150.75, status: "CANCELLED", date: new Date("2025-03-03T18:05:00"), },
    { type: "DEPOSIT", user: mockUsers[4], asset: mockAssets[0], amount: 5000, status: "CONCLUDED", date: new Date("2025-03-04T11:30:00"), },

    { type: "WITHDRAW", user: mockUsers[0], asset: mockAssets[0], amount: 210.9, status: "CONCLUDED", date: new Date("2025-03-05T12:00:00") },
    { type: "DEPOSIT", user: mockUsers[1], asset: mockAssets[0], amount: 980.4, status: "PENDING", date: new Date("2025-03-06T09:45:00") },
    { type: "WITHDRAW", user: mockUsers[2], asset: mockAssets[0], amount: 430.0, status: "CONCLUDED", date: new Date("2025-03-06T16:20:00") },
    { type: "DEPOSIT", user: mockUsers[3], asset: mockAssets[0], amount: 760.99, status: "CONCLUDED", date: new Date("2025-03-07T08:10:00") },
    { type: "WITHDRAW", user: mockUsers[4], asset: mockAssets[0], amount: 1200.0, status: "PENDING", date: new Date("2025-03-07T17:55:00") },

    { type: "DEPOSIT", user: mockUsers[0], asset: mockAssets[0], amount: 300.0, status: "CONCLUDED", date: new Date("2025-03-08T10:00:00") },
    { type: "WITHDRAW", user: mockUsers[1], asset: mockAssets[0], amount: 75.25, status: "CONCLUDED", date: new Date("2025-03-08T13:30:00") },
    { type: "DEPOSIT", user: mockUsers[2], asset: mockAssets[0], amount: 1500.0, status: "CONCLUDED", date: new Date("2025-03-09T09:00:00") },
    { type: "WITHDRAW", user: mockUsers[3], asset: mockAssets[0], amount: 620.0, status: "CANCELLED", date: new Date("2025-03-09T15:40:00") },
    { type: "DEPOSIT", user: mockUsers[4], asset: mockAssets[0], amount: 420.8, status: "PENDING", date: new Date("2025-03-10T11:15:00") },

    { type: "WITHDRAW", user: mockUsers[0], asset: mockAssets[0], amount: 50.0, status: "CONCLUDED", date: new Date("2025-03-10T18:25:00") },
    { type: "DEPOSIT", user: mockUsers[1], asset: mockAssets[0], amount: 2300.0, status: "CONCLUDED", date: new Date("2025-03-11T10:45:00") },
    { type: "WITHDRAW", user: mockUsers[2], asset: mockAssets[0], amount: 410.3, status: "PENDING", date: new Date("2025-03-11T14:00:00") },
    { type: "DEPOSIT", user: mockUsers[3], asset: mockAssets[0], amount: 999.99, status: "CONCLUDED", date: new Date("2025-03-12T09:30:00") },
    { type: "WITHDRAW", user: mockUsers[4], asset: mockAssets[0], amount: 275.6, status: "CONCLUDED", date: new Date("2025-03-12T16:50:00") },

    { type: "DEPOSIT", user: mockUsers[0], asset: mockAssets[0], amount: 600.0, status: "CONCLUDED", date: new Date("2025-03-13T08:40:00") },
    { type: "WITHDRAW", user: mockUsers[1], asset: mockAssets[0], amount: 140.0, status: "CANCELLED", date: new Date("2025-03-13T12:10:00") },
    { type: "DEPOSIT", user: mockUsers[2], asset: mockAssets[0], amount: 720.45, status: "PENDING", date: new Date("2025-03-14T09:55:00") },
    { type: "WITHDRAW", user: mockUsers[3], asset: mockAssets[0], amount: 310.0, status: "CONCLUDED", date: new Date("2025-03-14T14:35:00") },
    { type: "DEPOSIT", user: mockUsers[4], asset: mockAssets[0], amount: 1800.0, status: "CONCLUDED", date: new Date("2025-03-15T10:20:00") },

    { type: "WITHDRAW", user: mockUsers[0], asset: mockAssets[0], amount: 90.0, status: "PENDING", date: new Date("2025-03-15T17:45:00") },
    { type: "DEPOSIT", user: mockUsers[1], asset: mockAssets[0], amount: 1340.75, status: "CONCLUDED", date: new Date("2025-03-16T11:10:00") },
    { type: "WITHDRAW", user: mockUsers[2], asset: mockAssets[0], amount: 250.0, status: "CONCLUDED", date: new Date("2025-03-16T15:00:00") },
    { type: "DEPOSIT", user: mockUsers[3], asset: mockAssets[0], amount: 4100.0, status: "CONCLUDED", date: new Date("2025-03-17T09:25:00") },
    { type: "WITHDRAW", user: mockUsers[4], asset: mockAssets[0], amount: 330.5, status: "PENDING", date: new Date("2025-03-17T16:10:00") },
]