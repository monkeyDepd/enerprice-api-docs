import { Book, Key, Zap, Settings, Database, Leaf, AlertTriangle, FileText, HelpCircle, Flame, Calculator, TrendingDown, ArrowRightLeft, Clock, History, ListTree } from 'lucide-react';
import { mockApiData as legacy } from './legacy';
import { guides } from './guides';
import { v1Downloads } from './v1/downloads';
import { v1Pricing } from './v1/pricing';
import { v1Savings } from './v1/savings';

export const NAV_GROUPS = [
  {
    title: 'Get started',
    items: [
      { id: 'home', title: 'Home', icon: Book },
      { id: 'auth', title: 'Authentication', icon: Key },
      { id: 'migration', title: 'Migration guide', icon: ArrowRightLeft },
    ],
  },
  {
    title: 'Products',
    items: [
      { id: 'energy-futures', title: 'Energy Futures', icon: Zap },
      { id: 'natgas-energy-futures', title: 'Natural Gas Energy Futures', icon: Flame },
      { id: 'ancillary', title: 'Ancillary Uplift', icon: Settings },
      { id: 'rec-rps', title: 'REC/RPS', icon: Leaf },
      { id: 'utility-price', title: 'Utility Price', icon: Database },
      { id: 'natural-gas-utility-price', title: 'Natural Gas Utility Price', icon: Database },
      { id: 'fair-market-pricing', title: 'Fair Market Pricing', icon: Calculator },
      { id: 'comparative-savings', title: 'Comparative Savings', icon: TrendingDown },
    ],
  },
  {
    title: 'Reference',
    items: [
      { id: 'errors', title: 'Errors', icon: AlertTriangle },
      { id: 'response-headers', title: 'Response headers', icon: ListTree },
      { id: 'deprecation-policy', title: 'Deprecation policy', icon: Clock },
      { id: 'changelog', title: 'Changelog', icon: History },
    ],
  },
  {
    title: 'Resources',
    items: [
      { id: 'notebook', title: 'Notebook', icon: FileText },
      { id: 'support', title: 'Support', icon: HelpCircle },
    ],
  },
];

const PRODUCT_IDS = [
  'energy-futures', 'natgas-energy-futures', 'ancillary', 'rec-rps',
  'utility-price', 'natural-gas-utility-price', 'fair-market-pricing', 'comparative-savings',
];

const v1Products = { ...v1Downloads, ...v1Pricing, ...v1Savings };

// Product pages switch with the address toggle; guide and reference pages are shared.
export const getSectionData = (mode, id) => {
  if (PRODUCT_IDS.includes(id)) return mode === 'legacy' ? legacy[id] : v1Products[id];
  return guides[id];
};
