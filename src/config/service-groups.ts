import { ServiceType } from './services';
import { CategoryType } from './categories';

export const serviceGroups: Record<CategoryType, ServiceType[]> = {
  wedding: ['photography' /* , 'videography' */],
  corporate: ['photography' /* , 'videography' */],
  event: ['photography' /* , 'videography' */],
  lifestyle: ['photography' /* , 'videography' */]
} as const;

export type ServiceGroup = keyof typeof serviceGroups;
