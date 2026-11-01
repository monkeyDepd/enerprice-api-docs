// Single source for the EOM address change: dates, and the old-to-new mapping used by
// the migration guide table and the "Use instead" badges on legacy endpoint cards.

export const DEPRECATION_DATE = 'November 1, 2026';
export const SUNSET_DATE = 'January 30, 2027';
export const SUNSET_HTTP_DATE = 'Sat, 30 Jan 2027 00:00:00 GMT';
export const DEPRECATION_HEADER = '@1793491200'; // 2026-11-01T00:00:00Z as a Unix timestamp

// Legacy method + path -> new path (with the query the server adds in the Link header).
export const SUCCESSORS = {
  'GET /datasets/download/energy-futures': '/api/v1/electricity/futures/download?format=xlsx',
  'GET /datasets/download/energy-futures/csv': '/api/v1/electricity/futures/download?format=csv',
  'GET /datasets/download/energy-futures/json': '/api/v1/electricity/futures/download?format=json',
  'GET /datasets/download/naturalgas-futures': '/api/v1/natural-gas/futures/download?format=xlsx',
  'GET /datasets/download/naturalgas-futures/csv': '/api/v1/natural-gas/futures/download?format=csv',
  'GET /datasets/download/naturalgas-futures/json': '/api/v1/natural-gas/futures/download?format=json',
  'GET /datasets/download/ancillary-uplift': '/api/v1/electricity/ancillary-uplift/download?format=xlsx',
  'GET /datasets/download/ancillary-uplift/csv': '/api/v1/electricity/ancillary-uplift/download?format=csv',
  'GET /datasets/download/ancillary-uplift/json': '/api/v1/electricity/ancillary-uplift/download?format=json',
  'GET /datasets/download/rec-rps': '/api/v1/electricity/rec-rps/download?format=xlsx',
  'GET /datasets/download/rec-rps/csv': '/api/v1/electricity/rec-rps/download?format=csv',
  'GET /datasets/download/rec-rps/json': '/api/v1/electricity/rec-rps/download?format=json',
  'GET /datasets/download/utility-price': '/api/v1/electricity/utility-price/download?format=xlsx',
  'GET /datasets/download/utility-price/summary/csv': '/api/v1/electricity/utility-price/download?format=csv&variant=summary',
  'GET /datasets/download/utility-price/details/csv': '/api/v1/electricity/utility-price/download?format=csv&variant=details',
  'GET /datasets/download/utility-price/csv': '/api/v1/electricity/utility-price/download?format=csv',
  'GET /datasets/download/utility-price/json': '/api/v1/electricity/utility-price/download?format=json',
  'GET /datasets/download/naturalgas-utility-price': '/api/v1/natural-gas/utility-price/download?format=xlsx',
  'GET /datasets/download/naturalgas-utility-price/summary/csv': '/api/v1/natural-gas/utility-price/download?format=csv&variant=summary',
  'GET /datasets/download/naturalgas-utility-price/details/csv': '/api/v1/natural-gas/utility-price/download?format=csv&variant=details',
  'GET /datasets/download/naturalgas-utility-price/csv': '/api/v1/natural-gas/utility-price/download?format=csv',
  'GET /datasets/download/naturalgas-utility-price/json': '/api/v1/natural-gas/utility-price/download?format=json',
  'GET /pricing/options': '/api/v1/electricity/fair-market-pricing/options',
  'POST /pricing/calculate': '/api/v1/electricity/fair-market-pricing/calculate',
  'POST /pricing/download/excel': '/api/v1/electricity/fair-market-pricing/download?format=xlsx',
  'POST /pricing/download/csv': '/api/v1/electricity/fair-market-pricing/download?format=csv',
  'GET /pricing/batch-template': '/api/v1/electricity/fair-market-pricing/batch-template',
  'POST /pricing/batch-upload': '/api/v1/electricity/fair-market-pricing/batch-upload',
  'GET /pricing/batch-status/{batch_id}': '/api/v1/electricity/fair-market-pricing/batch-status/{batch_id}',
  'GET /pricing/batch-download/{batch_id}': '/api/v1/electricity/fair-market-pricing/batch-download/{batch_id}',
  'GET /pricing/batch-jobs': '/api/v1/electricity/fair-market-pricing/batch-jobs',
  'GET /api/v1/utility-price/options': '/api/v1/electricity/utility-price/options',
  'POST /api/v1/utility-price/comparative-analysis': '/api/v1/electricity/utility-price/comparative-analysis',
  'GET /api/v1/utility-price/savings-template': '/api/v1/electricity/utility-price/savings-template',
  'POST /api/v1/utility-price/savings-upload': '/api/v1/electricity/utility-price/savings-upload',
  'GET /api/v1/utility-price/savings-status/{batch_id}': '/api/v1/electricity/utility-price/savings-status/{batch_id}',
  'GET /api/v1/utility-price/savings-download/{batch_id}': '/api/v1/electricity/utility-price/savings-download/{batch_id}',
  'GET /api/v1/utility-price/savings-jobs': '/api/v1/electricity/utility-price/savings-jobs',
};

// Which docs section each new path belongs to, so a legacy badge can jump to it.
export const SECTION_FOR_PATH = [
  ['/api/v1/electricity/futures', 'energy-futures'],
  ['/api/v1/natural-gas/futures', 'natgas-energy-futures'],
  ['/api/v1/electricity/ancillary-uplift', 'ancillary'],
  ['/api/v1/electricity/rec-rps', 'rec-rps'],
  ['/api/v1/electricity/utility-price/download', 'utility-price'],
  ['/api/v1/natural-gas/utility-price', 'natural-gas-utility-price'],
  ['/api/v1/electricity/fair-market-pricing', 'fair-market-pricing'],
  ['/api/v1/electricity/utility-price', 'comparative-savings'],
];

export const sectionForPath = (path) => {
  const hit = SECTION_FOR_PATH.find(([prefix]) => path.startsWith(prefix));
  return hit ? hit[1] : null;
};

export const successorFor = (method, url) => SUCCESSORS[`${method} ${url}`] || null;
