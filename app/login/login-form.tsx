'use client';

import {AtSymbolIcon,KeyIcon,ExclamationCircleIcon} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';
import { useActionState } from 'react';
import { authenticate } from './actions';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
        <h1 className={`mb-3 text-2xl`}>
          {t('title')}
        </h1>
        <div className="w-full">
          <div>
            <label
              className="input-label"
              htmlFor="email"
            >
              {t('email')}
            </label>
            <div className="relative">
              <input
                className="peer custom-input"
                id="email"
                type="email"
                name="email"
                placeholder={t('email_placeholder')}
                required
              />
              <AtSymbolIcon className="input-icon" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="input-label"
              htmlFor="password"
            >
              {t('password')}
            </label>
            <div className="relative">
              <input
                className="peer custom-input"
                id="password"
                type="password"
                name="password"
                placeholder={t('password_placeholder')}
                required
                minLength={6}
              />
              <KeyIcon className="input-icon" />
            </div>
          </div>
        <div
          className="flex h-8 items-end space-x-1"
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
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {t('login_button_cta')} <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        
      </div>
    </form>
  );
}
