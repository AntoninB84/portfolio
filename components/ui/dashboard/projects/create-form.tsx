'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProject, ProjectFormState } from '@/lib/_dao/project-dao';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Techno } from '@/lib/_objects/techno';
import RichTextEditor from '../../rich-text-editor';
import { Label } from '../../label';

export default function CreateProjectForm({technos}: {technos: Techno[]}) {

  const initialState: ProjectFormState = { message: null, errors: {}};
  const [state, formAction] = useActionState(createProject, initialState);

  const t = useTranslations();

  return (
    <form action={formAction} aria-describedby='form-error'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='col-span-1'>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              {t('dashboardProjects.create.name-label')}
            </label>
            <div className="relative mt-2 rounded-md">
              <Input
                  id="name"
                  name="name"
                  type="string"
                  placeholder={t('dashboardProjects.create.name-placeholder')}
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
        </div>
        <div className='col-span-1'>
          {/* Year */}
          <div className="mb-4">
            <label htmlFor="year" className="mb-2 block text-sm font-medium">
              {t('dashboardProjects.create.year-label')}
            </label>
            <div className="relative mt-2 rounded-md">
              <Input
                  id="year"
                  name="year"
                  type="number"
                  step={1}
                  defaultValue={2025}
                  placeholder="2025"
                  aria-describedby='year-error'
                  required
              />
            </div>
            <div id="year-error" aria-live="polite" aria-atomic="true">
              {state.errors?.year 
              && state.errors.year.map((error: string) => (
                  <p className='mt-2 text-sm text-error' key={error}>{error}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <Label className='mb-2'>{t('dashboardProjects.create.description-label')}</Label>
        <RichTextEditor
        ></RichTextEditor>
      </div>
      <div id="form-error" aria-live="polite" aria-atomic="true">
        <p className='mt-2 text-sm text-error' key={state.message}>{state.message}</p>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link href="/dashboard/projects">
          <Button>{t('cancel')}</Button>
        </Link>
        <Button type="submit" className='bg-button-background text-button-foreground'>{t('validate')}</Button>
      </div>
    </form>
  );
}
