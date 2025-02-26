export type LocationType = 'sceaux';

const locationUrls = {
  sceaux: {
    en: 'sceaux',
    fr: 'sceaux'
  }
} as const;

export const locations: LocationType[] = ['sceaux'];

export const getLocalizedLocation = (
  location: LocationType,
  locale: string
): string => {
  return locationUrls[location][
    locale as keyof (typeof locationUrls)[LocationType]
  ];
};

export const getLocationFromLocalized = (
  localizedLocation: string,
  locale: string
): LocationType | null => {
  for (const [location, urls] of Object.entries(locationUrls)) {
    if (urls[locale as keyof typeof urls] === localizedLocation) {
      return location as LocationType;
    }
  }
  return null;
};
