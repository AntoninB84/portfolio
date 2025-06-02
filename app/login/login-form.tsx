'use client';

import {AtSymbolIcon,KeyIcon,ExclamationCircleIcon} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
// import { Button } from '../ui/button';
import { useActionState } from 'react';
import { authenticate } from './actions';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate, undefined,
  );
  const t = useTranslations('loginPage');

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1">
        <h1 className='mb-3 text-2xl'>
          {t('title')}
        </h1>
        <p className='mb-3 text-lg'>
          {t('subtitle')}
        </p>
        <div className="w-full">
          <div className='mt-4'>
            <Label htmlFor="email" className="pb-2">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder={t('email_placeholder')}
              required
            />
          </div>
          <div className="mt-4">
            <Label htmlFor="password" className="pb-2">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder={t('password_placeholder')}
              required
              minLength={6}
            />
          </div>
        <div
          className="flex h-8 items-end space-x-1 mb-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
        </div>
       <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button className='w-full uppercase font-bold'>
           {t('login_button_cta')}
        </Button>
      </div>
    </form>
  );
}
