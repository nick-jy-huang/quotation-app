export function toThousand(value: number | string, showCurrency: boolean = true): string {
  const strValue = String(value);

  const parts = strValue.split('.');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? parts[1] : '';

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let result = decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;

  if (showCurrency) {
    result = `NT$ ${result}`;
  }

  return result;
}
