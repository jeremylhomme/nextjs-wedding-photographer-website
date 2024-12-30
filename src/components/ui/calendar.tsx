'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { fr, enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { useTranslations } from 'next-intl';
import { cn } from '@/src/lib/utils';
import { buttonVariants } from '@/src/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const t = useTranslations('contact-page.calendar');
  const [currentLocale, setCurrentLocale] = React.useState(fr);

  return (
    <div className='flex flex-col gap-2 pt-4'>
      <select
        value={currentLocale === fr ? 'fr' : 'en'}
        onChange={e => setCurrentLocale(e.target.value === 'fr' ? fr : enUS)}
        className='-mb-2 self-center rounded-md border p-1 text-sm'
      >
        <option disabled>{t('select-language')}</option>
        <option value='fr'>Français</option>
        <option value='en'>English</option>
      </select>
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn('p-3', className)}
        locale={currentLocale}
        classNames={{
          day_selected: 'bg-primary text-primary-foreground',
          day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
          day_disabled: 'text-muted-foreground opacity-50',
          nav_button: cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          ),
          nav_button_previous: 'absolute left-1',
          nav_button_next: 'absolute right-1',
          table: 'w-full border-collapse space-y-1',
          head_row: 'flex',
          head_cell:
            'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
          row: 'flex w-full mt-2',
          cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
          caption: 'flex justify-center pt-1 relative items-center',
          caption_label: 'text-sm font-medium',
          nav: 'space-x-1 flex items-center',
          ...classNames
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
          IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
