'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { createProject, ProjectFormState } from '@/lib/_dao/project-dao';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Techno } from '@/lib/_objects/techno';
import { Label } from '../../label';
import { Textarea } from '../../textarea';
import { Checkbox } from '../../checkbox';
import { useState } from 'react';

export default function CreateProjectForm({technos}: {technos: Techno[]}) {

  const initialState: ProjectFormState = { message: null, errors: {}};
  const [state, formAction] = useActionState(createProject, initialState);

  const t = useTranslations();

  // Supported languages
  const languages = ['fr', 'en'];
  const [selectedLang, setSelectedLang] = useState('fr');
  const [descriptions, setDescriptions] = useState<{[key: string]: string}>({
    fr: '',
    en: '',
  });

  // Handle description change
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptions({
      ...descriptions,
      [selectedLang]: e.target.value,
    });
  };

  // On submit, add all descriptions to FormData
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Remove any previous descriptions
    formData.delete('descriptions');

    let descriptionArray: { locale: string; content: string; }[] = [];

    // Add all descriptions as objects
    languages.forEach((lang) => {
      descriptionArray.push({
        locale: lang,
        content: descriptions[lang],
      });
    });
    formData.append('descriptions', JSON.stringify(descriptionArray));

    formAction(formData);
  };

  return (
    <form onSubmit={handleSubmit} aria-describedby='form-error'>
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-2'>
          {/* Name */}
          <div>
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
        <div className='col-span-2'>
          {/* Year */}
          <div>
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
        <div className='col-span-2 mt-4 mb-4'>
          {/* Support type */}
          <Label className='mb-2'>{t('dashboardProjects.create.support-label')}</Label>
          <div className='grid grid-cols-4 gap-x-2'>
            <div>
              <Checkbox
                className='col-span-1 me-2'
                name="ismobile"
              />
                {t('mobile')}
            </div>
            <div>
              <Checkbox
                className='col-span-1 me-2'
                name="isweb"
              />
                {t('web')}
            </div>
          </div>
          <div id="support-error" aria-live="polite" aria-atomic="true">
              {state.errors?.ismobile && !state.errors.isweb 
              && state.errors.ismobile.map((error: string) => (
                  <p className='mt-2 text-sm text-error' key={error}>{error}</p>
                ))}
                 {state.errors?.isweb && !state.errors.ismobile 
              && state.errors.isweb.map((error: string) => (
                  <p className='mt-2 text-sm text-error' key={error}>{error}</p>
                ))}
          </div>
        </div>
        <div className='col-span-2 mt-4 mb-4'>
          {/* Technos */}
          <Label className='mb-2'>{t('dashboardProjects.create.technos-label')}</Label>
          <div className='grid grid-cols-3 gap-x-2 gap-y-4'>
            {technos.map((techno) => {
              return <div><Checkbox
                className='col-span-1 me-2'
                key={techno.id}
                name="technos" 
                value={techno.id}
              />
                {techno.name}
              </div>
            })}
          </div>
          <div id="technos-error" aria-live="polite" aria-atomic="true">
              {state.errors?.technos
              && state.errors.technos.map((error: string) => (
                  <p className='mt-2 text-sm text-error' key={error}>{error}</p>
                ))}
          </div>
        </div>
        <div className='col-span-4'>
          {/* Language selector */}
          <div className="mb-2 flex gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                type="button"
                variant={selectedLang === lang ? 'default' : 'outline'}
                onClick={() => setSelectedLang(lang)}
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>
          {/* Description input for selected language */}
          <Label htmlFor="descriptions" className='mb-2'>
            {t('dashboardProjects.create.description-label')} ({selectedLang.toUpperCase()})
          </Label>
          <Textarea
            id='descriptions'
            name='descriptions'
            value={descriptions[selectedLang]}
            onChange={handleDescriptionChange}
          />
          {/* Hidden input to satisfy validation (not used for actual data) */}
          <input type="hidden" name="descriptions" />
          <div id="descriptions-error" aria-live="polite" aria-atomic="true">
            {state.errors?.descriptions &&
              state.errors.descriptions.map((error: string) => (
                <p className='mt-2 text-sm text-error' key={error}>{error}</p>
              ))}
          </div>
        </div>
        <div className='col-span-1 mt-4 mb-4'>
          {/* Images */}
            <div>
              <label htmlFor="images" className="mb-2 block text-sm font-medium">
                {t('dashboardProjects.create.images-label')}
              </label>
              <div className="relative mt-2 rounded-md">
                <Input
                    id="images"
                    name="images"
                    type="file"
                    aria-describedby='images-error'
                    multiple
                />
              </div>
              <div id="images-error" aria-live="polite" aria-atomic="true">
                {state.errors?.images 
                && state.errors.images.map((error: string) => (
                    <p className='mt-2 text-sm text-error' key={error}>{error}</p>
                  ))}
              </div>
            </div>
        </div>
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
