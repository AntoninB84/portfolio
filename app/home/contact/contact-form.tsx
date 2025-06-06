'use client';

import { useActionState } from 'react';
import { sendContactMail } from './actions';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';

export default function ContactForm() {
  const [response, formAction, isPending] = useActionState(
    sendContactMail, undefined,
  );
  const t = useTranslations('contactPage');

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1">
        <h1 className='mb-3 text-2xl'>
          {t('title')}
        </h1>
        <p className='mb-3 text-lg' dangerouslySetInnerHTML={{__html: t('subtitle')}}>
        </p>
        <div className="w-full">
          <div className='mt-6'>
            <Label htmlFor="from" className="pb-2">{t('from_label')}</Label>
            <Input
              id="from"
              type="email"
              name="from"
              placeholder={t('from_placeholder')}
              required
            />
          </div>
          <div className="mt-6">
            <Label htmlFor="message" className="pb-2">{t('message_label')}</Label>
            <Textarea
                id='message'
                name='message'
                placeholder={t('message_placeholder')}
                required
                minLength={4}
                className='min-h-[200px]'
            ></Textarea>
          </div>
          <div
            className="flex h-8 items-end space-x-1 mb-4"
            aria-live="polite"
            aria-atomic="true"
          >
            {response && response.message && (
              <>
                <p className={clsx(
                    "text-sm ", {"text-error": !response.success}, {"text-green-700 dark:text-green-500": response.success}
                )}>{response.message}</p>
              </>
            )}
          </div>
        </div>
        <Button className='w-full 
          uppercase font-bold 
          bg-button-background text-button-foreground
          hover:bg-button-foreground hover:text-button-background
          '>
           {t('send_button_cta')}
        </Button>
      </div>
    </form>
  );
}
