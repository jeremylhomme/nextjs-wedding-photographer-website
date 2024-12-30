'use client';
import { FloatingLabelInput } from '@/src/components/ui/floating-label-input';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeInImage from '@/src/components/fade-in-image';
import { toast } from 'sonner';
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
  event_location: z.string().min(1, 'Event location is required').max(50),
  fixed_date: z.string().optional(),
  guests_number: z.coerce.number().min(1).max(500).optional(),
  knowing_source: z.string().optional(),
  message: z.string().min(30),
  project_type: z.string()
});

export default function ContactForm() {
  const t = useTranslations('contact-page');
  const params = useParams();
  const locale = params?.locale as string;
  const [selectedType, setSelectedType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      event_date: undefined,
      event_location: '',
      fixed_date: '',
      guests_number: undefined,
      knowing_source: '',
      message: '',
      project_type: ''
    }
  });
  const [loadedImages, setLoadedImages] = React.useState<{
    [key: string]: boolean;
  }>({});

  const generateRecaptchaToken = async () => {
    if (!(window as any).grecaptcha) {
      throw new Error('reCAPTCHA not loaded');
    }

    return await new Promise<string>((resolve, reject) => {
      (window as any).grecaptcha.ready(() => {
        (window as any).grecaptcha
          .execute(process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY, {
            action: 'submit'
          })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const recaptchaToken = await generateRecaptchaToken();
      console.log('Form values:', values);

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...values, recaptchaToken })
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
        event_location: '',
        fixed_date: '',
        guests_number: undefined,
        knowing_source: '',
        message: '',
        project_type: ''
      });
      setSelectedType('');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send the message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='relative w-screen'>
      <div className='relative h-screen w-full'>
        <FadeInImage
          src='/contact-page/contact-jeremydan-wedding-photography-lscape-001-optimized.webp'
          alt='Hero image for blog'
          onImageLoad={path =>
            setLoadedImages(prev => ({ ...prev, [path]: true }))
          }
          className='h-screen w-full object-cover object-center'
        />
        <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
          <h1 className='font-serif text-5xl text-white'>{t('hero-title')}</h1>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='mx-4 my-16 max-w-3xl space-y-8 rounded-lg border bg-transparent px-4 py-10 shadow-sm lg:mx-auto'
        >
          <div className='col-span-12'>
            <h2 className='mb-4 text-2xl'>{t('cf.title')}</h2>
            <FormField
              control={form.control}
              name='project_type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cf.project_type-label')}</FormLabel>
                  <Select
                    onValueChange={value => {
                      field.onChange(value);
                      setSelectedType(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t('cf.project_type-placeholder')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='default' disabled>
                        {t('cf.project_type-placeholder')}
                      </SelectItem>
                      <SelectItem value='wedding'>
                        {t('cf.project_type-item1')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>{t('cf.project_type-desc')}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {selectedType === 'wedding' && (
            <div className='gap-4'>
              <div className='flex flex-col justify-center text-left'>
                <h2 className='mb-4 text-2xl'>{t('cf.wedding.title')}</h2>
                <p className='mb-8 text-sm leading-loose text-muted-foreground'>
                  {t('cf.wedding.desc')}
                </p>
              </div>
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-12 sm:col-span-6'>
                  <FormField
                    control={form.control}
                    name='first_name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t('cf.wedding.first_name-label')}
                        </FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='first_name'
                            type='text'
                            label={t('cf.wedding.first_name-placeholder')}
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
                        <FormLabel>{t('cf.wedding.last_name-label')}</FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='last_name'
                            type='text'
                            label={t('cf.wedding.last_name-placeholder')}
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
                        <FormLabel>{t('cf.wedding.email-label')}</FormLabel>
                        <FormControl>
                          <FloatingLabelInput
                            id='email'
                            type='email'
                            label={t('cf.wedding.email-placeholder')}
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
                        <FormLabel>Date*</FormLabel>
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
                                  <span>
                                    {t('cf.wedding.event_date-placeholder')}
                                  </span>
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

              <div className='col-span-12 mt-6'>
                <FormField
                  control={form.control}
                  name='event_location'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('cf.wedding.event_location-label')}
                      </FormLabel>
                      <FormControl>
                        <FloatingLabelInput
                          id='location'
                          type='text'
                          label={t('cf.wedding.event_location-placeholder')}
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
                  name='guests_number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t('cf.wedding.guests_number-label')}
                      </FormLabel>
                      <FormControl>
                        <FloatingLabelInput
                          id='guests_number'
                          type='number'
                          label={t('cf.wedding.guests_number-placeholder')}
                          {...field}
                          value={field.value || ''}
                          onChange={e => {
                            const value = e.target.value
                              ? parseInt(e.target.value)
                              : undefined;
                            field.onChange(value);
                          }}
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
                  name='fixed_date'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cf.wedding.fixed_date-label')}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t(
                                'cf.wedding.fixed_date-placeholder'
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='flexible_date'>
                            {t('cf.wedding.fixed_date-option1')}
                          </SelectItem>
                          <SelectItem value='definitive_date'>
                            {t('cf.wedding.fixed_date-option2')}
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='col-span-12 mt-6'>
                <FormField
                  control={form.control}
                  name='message'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('cf.wedding.message-label')}*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('cf.wedding.message-placeholder')}
                          className='min-h-40 resize leading-loose'
                          {...field}
                        />
                      </FormControl>
                      {/* <FormDescription>
                        En soumettant ce formulaire, vous acceptez les
                        conditions générales d'utilisation de ce site.
                      </FormDescription> */}
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
                      <FormLabel>
                        {t('cf.wedding.knowing_source-label')}
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={t(
                                'cf.wedding.knowing_source-placeholder'
                              )}
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='instagram'>Instagram</SelectItem>
                          <SelectItem value='google-search'>
                            {t('cf.wedding.knowing_source-option2')}
                          </SelectItem>
                          <SelectItem value='word-of-mouth'>
                            {t('cf.wedding.knowing_source-option3')}
                          </SelectItem>
                          <SelectItem value='other'>
                            {t('cf.wedding.knowing_source-option4')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        {t('cf.wedding.knowing_source-desc')}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
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
  );
}
