'use client';

import { TechnoFormState, updateTechno } from '@/lib/_dao/techno-dao';
import { TechnoForm } from '@/lib/_objects/techno';
import Link from 'next/link';
import { useActionState } from 'react';
import { Button } from '../../button';
import { Input } from '../../input';
import { useTranslations } from 'next-intl';

export default function EditTechnoForm({
  techno,
}: {
  techno: TechnoForm;
}) {

  const updateTechnoWithId = updateTechno.bind(null, techno.id);
  const initialState: TechnoFormState = { message: null, errors: {}};
  const [state, formAction] = useActionState(updateTechnoWithId, initialState);

  const t = useTranslations();
  
  return (
     <form action={formAction} aria-describedby='form-error'>
      <div className="rounded-md">
    
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
                defaultValue={techno.name}
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
