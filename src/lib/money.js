import { formatMoney as accountingFormatMoney, unformat } from 'accounting';
import Currency from 'js-money/lib/currency';

function findCurrency(currency) {
  const result = Currency[currency];
  if (result) return result;
  throw new Error(`Unsupported currency '${currency}'`);
}

export function toCents(value, currency) {
  const { decimal_digits: precision } = findCurrency(currency);
  return Math.round(unformat(value) * Math.pow(10, precision));
}

export function formatMoney(cents, currency, options) {
  const defaults = { format: { pos: '%s%v', neg: '-%s%v', zero: '%s%v' } };
  const opts = { ...defaults, ...options };

  const { symbol, decimal_digits: precision } = findCurrency(currency);
  const amount = cents / Math.pow(10, precision);

  return accountingFormatMoney(amount, {
    symbol,
    precision,
    format: opts.format,
  });
}
