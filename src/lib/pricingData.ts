export type Platform = 'Instagram' | 'TikTok' | 'Facebook' | 'YouTube';

export interface PackageOption {
  amount: string;
  priceLps: number;
}

export interface ServiceCategory {
  name: string;
  options: PackageOption[];
}

export interface PlatformData {
  platform: Platform;
  services: ServiceCategory[];
}

export const pricingData: PlatformData[] = [
  {
    platform: 'Instagram',
    services: [
      {
        name: 'Followers',
        options: [
          { amount: '500', priceLps: 250 },
          { amount: '1k', priceLps: 470 },
          { amount: '2k', priceLps: 570 },
          { amount: '3k', priceLps: 720 },
          { amount: '5k', priceLps: 940 },
          { amount: '8k', priceLps: 1200 },
          { amount: '10k', priceLps: 1750 },
          { amount: '20k', priceLps: 2800 },
          { amount: '30k', priceLps: 3900 },
          { amount: '50k', priceLps: 5400 },
          { amount: '100k', priceLps: 9800 },
        ]
      },
      {
        name: 'Likes',
        options: [
          { amount: '1k', priceLps: 300 },
        ]
      }
    ]
  },
  {
    platform: 'TikTok',
    services: [
      {
        name: 'Followers',
        options: [
          { amount: '500', priceLps: 300 },
          { amount: '1k', priceLps: 480 },
          { amount: '2k', priceLps: 720 },
          { amount: '3k', priceLps: 1020 },
          { amount: '5k', priceLps: 1350 },
          { amount: '8k', priceLps: 1970 },
          { amount: '10k', priceLps: 2900 },
        ]
      },
      {
        name: 'Views',
        options: [
          { amount: '1k', priceLps: 50 },
          { amount: '3k', priceLps: 150 },
          { amount: '5k', priceLps: 250 },
          { amount: '10k', priceLps: 500 },
        ]
      },
      {
        name: 'Likes',
        options: [
          { amount: '1k', priceLps: 390 },
        ]
      }
    ]
  },
  {
    platform: 'Facebook',
    services: [
      {
        name: 'Page Followers and Likes',
        options: [
          { amount: '500', priceLps: 300 },
          { amount: '1k', priceLps: 480 },
          { amount: '2k', priceLps: 720 },
          { amount: '3k', priceLps: 1020 },
          { amount: '5k', priceLps: 1350 },
          { amount: '8k', priceLps: 1980 },
          { amount: '10k', priceLps: 2900 },
        ]
      },
      {
        name: 'Likes on posts',
        options: [
          { amount: '1k', priceLps: 390 },
        ]
      },
      {
        name: 'Views',
        options: [
          { amount: '1k', priceLps: 300 },
        ]
      }
    ]
  },
  {
    platform: 'YouTube',
    services: [
      {
        name: 'Mixed Latin Views',
        options: [
          { amount: '1k', priceLps: 420 },
          { amount: '2k', priceLps: 670 },
          { amount: '3k', priceLps: 830 },
          { amount: '5k', priceLps: 1100 },
          { amount: '8k', priceLps: 1590 },
          { amount: '10k', priceLps: 1910 },
          { amount: '15k', priceLps: 2450 },
          { amount: '20k', priceLps: 3200 },
          { amount: '30k', priceLps: 3900 },
          { amount: '50k', priceLps: 5700 },
          { amount: '80k', priceLps: 7600 },
          { amount: '100k', priceLps: 9200 },
        ]
      },
      {
        name: 'Subscribers with views',
        options: [
          { amount: '500', priceLps: 850 },
          { amount: '1k', priceLps: 1500 },
        ]
      }
    ]
  }
];

export const EXCHANGE_RATE_USD_TO_LPS = 24.7; // Approximate exchange rate
