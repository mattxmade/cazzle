import currencies, { Currency, CurrencyKeys } from "./currencies";

type FormatPrice = (
  price: number,
  currencyKey: CurrencyKeys,
  fixed?: boolean,
  omitsymbol?: boolean
) => string;

const formatPrice: FormatPrice = (price, currencyKey, fixed, omitSymbol) => {
  const currency: Currency = currencies[currencyKey];

  const process = Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
  });

  const pos = omitSymbol ? 1 : 0;

  // if (price === 0) return process.format(price).slice(pos, 1);
  return fixed ? process.format(price) : process.format(price).slice(pos, -3);
};

export default formatPrice;
