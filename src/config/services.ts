export type ServiceType = 'photography' /* | 'videography' */;

const serviceUrls: Record<ServiceType, Record<string, string>> = {
  photography: {
    en: 'photographer',
    fr: 'photographe'
  }
  /* videography: {
    en: 'videographer',
    fr: 'vidéaste'
  } */
} as const;

export const services: ServiceType[] = ['photography' /* , 'videography' */];

export const getLocalizedService = (
  service: ServiceType,
  locale: string
): string => {
  return serviceUrls[service][
    locale as keyof (typeof serviceUrls)[ServiceType]
  ];
};

export const getServiceFromLocalized = (
  localizedService: string,
  locale: string
): ServiceType | null => {
  for (const [service, urls] of Object.entries(serviceUrls)) {
    if (urls[locale as keyof typeof urls] === localizedService) {
      return service as ServiceType;
    }
  }
  return null;
};
