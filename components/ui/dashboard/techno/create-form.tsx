'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createTechno, TechnoFormState } from '@/lib/_dao/techno-dao';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function CreateTechnoForm() {
  const initialState: TechnoFormState = { message: null, errors: {}};
  const [state, formAction] = useActionState(createTechno, initialState);

  const t = useTranslations();

  return (
    <form action={formAction} aria-describedby='form-error'>
      <div>
    
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t('dashboardTechnos.create.name-label')}
          </label>
          <div className="relative mt-2 rounded-md">
            <Input
                id="name"
                name="name"
                type="string"
                placeholder={t('dashboardTechnos.create.name-placeholder')}
                aria-describedby='name-error'
                required
            />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name 
            && state.errors.name.map((error: string) => (
                <p className='mt-2 text-sm text-error' key={error}>{error}</p>
              ))}
          </div>
        </div>

        {/* logo */}
        <div className="mb-4">
          <label htmlFor="logo" className="mb-2 block text-sm font-medium">
            {t('dashboardTechnos.create.logo-label')}
          </label>
          <div className="relative mt-2 rounded-md">
            <Input
                id="logo"
                name="logo"
                type="file"
                aria-describedby='logo-error'
                required
            />
          </div>
          <div id="logo-error" aria-live="polite" aria-atomic="true">
            {state.errors?.logo 
            && state.errors.logo.map((error: string) => (
                <p className='mt-2 text-sm text-error' key={error}>{error}</p>
              ))}
          </div>
        </div>

        <div id="form-error" aria-live="polite" aria-atomic="true">
          <p className='mt-2 text-sm text-error' key={state.message}>{state.message}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/technos">
          <Button>{t('cancel')}</Button>
        </Link>
        <Button type="submit" className='bg-button-background text-button-foreground'>{t('validate')}</Button>
      </div>
    </form>
  );
}
