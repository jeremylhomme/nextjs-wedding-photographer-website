'use client';
import { AltchaWidget } from '@/src/components/ui/altcha-widget';
import { usePathname } from 'next/navigation';
import { FloatingLabelInput } from '@/src/components/ui/floating-label-input';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeInImage from '@/src/components/fade-in-image';
import { toast } from 'sonner';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/button';
import { Spinner } from '@/src/components/ui/spinner';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useParams } from 'next/navigation';
import { Link } from '@/src/i18n/routing';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/src/components/ui/popover';
import { Calendar } from '@/src/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/src/components/ui/select';

import { Textarea } from '@/src/components/ui/textarea';

const formSchema = z.object({
  first_name: z.string().min(1, { message: 'First Name is required' }),
  last_name: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Please enter a valid email address'),
  event_date: z.coerce.date(),
  work_type: z.string().min(1, 'Please select a work type'),
  work_category: z.string().min(1, 'Please select a category'),
  knowing_source: z.string().min(1, 'Please select an option'),
  message: z.string().min(30),
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions'
  }),
  altcha: z.string().min(1, 'Please complete the captcha')
});

export default function ContactForm() {
  const t = useTranslations('contact-page');
  const params = useParams();
  const locale = params?.locale as string;
  const pathname = usePathname();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jeremydan.fr';
  const url = `${baseUrl}${pathname}`;

  // Contact page schema for structured data
  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('metadata.title'),
    description: t('metadata.description'),
    url: url,
    mainEntity: {
      '@type': 'Organization',
      name: 'Jeremy Dan Photography',
      description: t('metadata.description'),
      url: baseUrl,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English', 'French'],
        email: 'contact@jeremydan.fr'
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Sceaux',
        addressRegion: 'Île-de-France',
        addressCountry: 'FR'
      }
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      event_date: undefined,
      work_type: '',
      work_category: '',
      knowing_source: '',
      message: '',
      terms_accepted: false
    }
  });
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      console.log('Form values:', values);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values })
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (!response.ok) {
        console.error('API Error:', data);
        toast.error(
          data.error || 'Failed to send the message. Please try again.'
        );
        return;
      }

      toast.success('Message sent successfully! We will get back to you soon.');
      form.reset({
        first_name: '',
        last_name: '',
        email: '',
        event_date: undefined,
        work_type: '',
        work_category: '',
        knowing_source: '',
        message: '',
        terms_accepted: false
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Script id='contact-schema' type='application/ld+json'>
        {JSON.stringify(contactPageSchema)}
      </Script>
      <div className='relative w-screen'>
        <div className='relative h-[40vh] w-full'>
          <FadeInImage
            src='/contact-page/contact-jeremydan-wedding-photography-001-optimized.webp'
            alt='Hero image for blog'
            onImageLoad={path =>
              setLoadedImages(prev => ({ ...prev, [path]: true }))
            }
            className='h-[40vh] w-full object-cover object-center'
          />
          <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
            <h1 className='font-serif text-4xl text-white md:text-5xl'>
              {t('hero-title')}
            </h1>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mx-4 my-8 max-w-3xl rounded-lg border bg-transparent px-4 py-8 shadow-sm md:mx-auto md:my-16'
          >
            <div className='gap-4'>
              <div className='flex flex-col justify-center text-left'>
                <h2 className='mb-4 text-2xl'>{t('cf.title')}</h2>
                <p className='text-sm leading-loose text-muted-foreground'>
                  {t('cf.desc')}
                </p>
                <p className='mb-8 mt-2 text-sm leading-loose text-muted-foreground'>
                  {t('cf.desc2')}{' '}
                  <a
                    className='font-bold underline'
                    href='mailto:bonjour@jeremydan.fr'
                  >
                    bonjour@jeremydan.fr
                  </a>
                </p>
              </div>
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('cf.first_name-label')}</FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='first_name'
                            type='text'
                            label={t('cf.first_name-placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='last_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('cf.last_name-label')}</FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='last_name'
                            type='text'
                            label={t('cf.last_name-placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='mt-6 grid grid-cols-12 gap-4'>
                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('cf.email-label')}</FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='email'
                            type='email'
                            label={t('cf.email-placeholder')}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-12 mt-1.5 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='event_date'
                    render={({ field }) => (
                      <FormItem className='flex flex-col'>
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  '!mt-[20px] rounded-lg bg-input pl-3 text-left font-normal !text-card',
                                  !field.value && 'text-muted-foreground'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP', {
                                    locale: locale === 'fr' ? fr : enUS
                                  })
                                ) : (
                                  <span>{t('cf.event_date-placeholder')}</span>
                                )}
                                <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className='w-auto p-0' align='start'>
                            <Calendar
                              mode='single'
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='mt-6 grid grid-cols-12 gap-4'>
                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='work_type'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('cf.work_type-label')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('cf.work_type-placeholder')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='photography'>
                              {t('cf.work_type-photography')}
                            </SelectItem>
                            <SelectItem value='videography'>
                              {t('cf.work_type-videography')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='work_category'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('cf.work_category-label')}</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={t('cf.work_category-placeholder')}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value='wedding'>
                              {t('cf.work_category-wedding')}
                            </SelectItem>
                            <SelectItem value='event'>
                              {t('cf.work_category-event')}
                            </SelectItem>
                            <SelectItem value='couple'>
                              {t('cf.work_category-couple')}
                            </SelectItem>
                            <SelectItem value='family'>
                              {t('cf.work_category-family')}
                            </SelectItem>
                            <SelectItem value='company'>
                              {t('cf.work_category-company')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className='col-span-12 mt-6'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cf.message-label')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('cf.message-placeholder')}
                          className='min-h-40 resize leading-loose'
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-12 mt-6'>
                <FormField
                  control={form.control}
                  name='knowing_source'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cf.knowing_source-label')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t('cf.knowing_source-placeholder')}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='instagram'>Instagram</SelectItem>
                          <SelectItem value='google-search'>
                            {t('cf.knowing_source-option2')}
                          </SelectItem>
                          <SelectItem value={t('cf.knowing_source-option3')}>
                            {t('cf.knowing_source-option3')}
                          </SelectItem>
                          <SelectItem value={t('cf.knowing_source-option4')}>
                            {t('cf.knowing_source-option4')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {t('cf.knowing_source-desc')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <FormField
              control={form.control}
              name='terms_accepted'
              render={({ field }) => (
                <FormItem className='mb-8 mt-2 flex flex-row items-start space-x-3 space-y-0'>
                  <FormControl>
                    <input
                      type='checkbox'
                      checked={field.value}
                      onChange={field.onChange}
                      className='mt-1 h-4 w-4 rounded border text-primary focus:ring-primary'
                    />
                  </FormControl>
                  <div className='space-y-1 leading-none'>
                    <FormLabel className='text-sm text-muted-foreground'>
                      {t('cf.terms-label')}{' '}
                      <Link
                        href='/legal/terms'
                        className='text-primary-foreground hover:underline'
                      >
                        {t('cf.terms-link')}
                      </Link>{' '}
                      {t('cf.terms-and')}{' '}
                      <Link
                        href='/legal/privacy'
                        className='text-primary-foreground hover:underline'
                      >
                        {t('cf.privacy-link')}
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='altcha'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <AltchaWidget locale={locale} onToken={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? (
                <div className='flex items-center gap-2'>
                  <Spinner size='sm' className='h-4 w-4' />
                  {t('cf.submitting')}
                </div>
              ) : (
                t('cf.submit')
              )}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
