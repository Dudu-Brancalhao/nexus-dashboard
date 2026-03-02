import { useMutation } from "@tanstack/react-query";

// Config
const BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = import.meta.env.VITE_COINGECKO_API_KEY as string || 'CG-1g7tL5dV4FCwBdFjaCjNT5Xw'; // Deixei a chave explícita da API DEMO da CoinGecko para facilitar a instalação/uso mesmo sabendo que não é o ideal, mas isso poupa etapas na instalação e trata-se de uma key DEMO.

const headers = { "x-cg-demo-api-key": API_KEY };

// A ausência do BRL é intencional — trata-se de uma moeda fiduciária (vs_currency), não de uma moeda digital.
// O CoinGecko retorna os preços em BRL nativamente quando vs_currencies inclui "brl".
export const COIN_IDS = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
} as const;

export type CoinAcronym = keyof typeof COIN_IDS;

// Todas as siglas que o aplicativo entende, incluindo fiat.
export type AssetAcronym = CoinAcronym | "BRL";

type RawCoin = {
  usd: number;
  brl: number;
  usd_24h_change: number;
  brl_24h_change: number;
};

type RawPricesResponse = Record<string, RawCoin>;

export interface AssetPrice {
  acronym: CoinAcronym;
  coinId: string;
  priceUSD: number;
  priceBRL: number;
  change24h: number | null;
}

export interface ConvertResponse {
  from: AssetAcronym
  to: AssetAcronym
  amount: number
  rate: number
  result: number
  timestamp: string
}

type ApiError = { message: string };
type PricesVariables = { acronyms: CoinAcronym[] };
type ConvertVariables = { from: AssetAcronym; to: AssetAcronym; amount: number };

async function fetchPrices({ acronyms }: PricesVariables): Promise<AssetPrice[]> {
  const ids = acronyms.map((a) => COIN_IDS[a]).join(",");

  const url = new URL(`${BASE_URL}/simple/price`);
  url.searchParams.set("ids", ids);
  url.searchParams.set("vs_currencies", "usd,brl"); // ← fetch both at once
  url.searchParams.set("include_24hr_change", "true");

  const res = await fetch(url, { headers });
  const data: RawPricesResponse = await res.json();

  return acronyms.map((acronym) => {
    const coin = data[COIN_IDS[acronym]];
    return {
      acronym,
      coinId: COIN_IDS[acronym],
      priceUSD: coin?.usd ?? 0,
      priceBRL: coin?.brl ?? 0,
      change24h: coin?.usd_24h_change ?? null,
    };
  });
}

async function convertAsset({ from, to, amount }: ConvertVariables): Promise<ConvertResponse> {
  const coinsNeeded = ([from, to].filter((a) => a !== "BRL") as CoinAcronym[]);
  const prices = await fetchPrices({ acronyms: [...new Set(coinsNeeded)] });

  function getPriceBRL(acronym: AssetAcronym): number {
    if (acronym === "BRL") return 1; // 1 BRL = 1 BRL
    return prices.find((p) => p.acronym === acronym)?.priceBRL ?? 1;
  }

  const fromBRL = getPriceBRL(from);
  const toBRL = getPriceBRL(to);

  // Convert: from → BRL → to
  const result = (amount * fromBRL) / toBRL;

  const rate = fromBRL / toBRL;

  return { from, to, amount, result, rate, timestamp: new Date().toISOString() };
}

export function useConvertAsset() {
  return useMutation<ConvertResponse, ApiError, ConvertVariables>({
    mutationFn: convertAsset,
  });
}