/**
 * Parses the formatted valueInBRL string from mockAssets into a plain number.
 *
 * Examples:
 *   "R$ 1"        → 1
 *   "R$ 6.02"     → 6.02
 *   "R$ 16.840"   → 16840
 *   "R$ 541.320"  → 541320
 *
 * Brazilian number formatting uses "." as a thousands separator and "," as
 * decimal separator. We strip the currency prefix and then normalise
 * accordingly before passing to parseFloat.
 */
export function parseAssetValueInBRL(valueInBRL: string): number {
  // Remove the "R$ " prefix and any leading/trailing whitespace
  const raw = valueInBRL.replace(/R\$\s*/g, "").trim();

  // If there is a comma it is the decimal separator (e.g. "6,02")
  if (raw.includes(",")) {
    // Remove dots (thousands sep) then replace comma with dot
    const normalised = raw.replace(/\./g, "").replace(",", ".");
    return parseFloat(normalised);
  }

  // No comma – dots are thousands separators (e.g. "541.320", "16.840")
  // A single dot with exactly 2 trailing digits is a decimal (e.g. "6.02")
  const parts = raw.split(".");
  if (parts.length === 2 && parts[1].length === 2) {
    // Treat as decimal
    return parseFloat(raw);
  }

  // Otherwise remove dots entirely (thousands separators)
  return parseFloat(raw.replace(/\./g, ""));
}

/**
 * Converts an asset amount into its BRL equivalent.
 *
 * @param amount      - Quantity of the asset (e.g. 0.5 ETH)
 * @param valueInBRL  - The raw valueInBRL string from mockAssets
 * @returns           - BRL value rounded to 2 decimal places
 *
 * Example: convertToBRL(0.5, "R$ 16.840") → 8420.00
 */
export function convertToBRL(amount: number, valueInBRL: string): number {
  const rate = parseAssetValueInBRL(valueInBRL);
  return Math.round(amount * rate * 100) / 100;
}