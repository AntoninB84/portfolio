'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { updateProject, ProjectFormState } from '@/lib/_dao/project-dao';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { Techno } from '@/lib/_objects/techno';
import { Label } from '../../label';
import { Textarea } from '../../textarea';
import { Checkbox } from '../../checkbox';
import { Project } from '@/lib/_objects/project';

export default function EditProjectForm({project, technos}: {project: Project, technos: Techno[]}) {

   const updateProjectWithId = updateProject.bind(null, project.id);
   const initialState: ProjectFormState = { message: null, errors: {}};
   const [state, formAction] = useActionState(updateProjectWithId, initialState);

  const t = useTranslations();

  return (
    <form action={formAction} aria-describedby='form-error'>
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
                  defaultValue={project.name}
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
                  defaultValue={project.year}
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
                defaultChecked={project.ismobile}
              />
                {t('mobile')}
            </div>
            <div>
              <Checkbox
                className='col-span-1 me-2'
                name="isweb"
                defaultChecked={project.isweb}
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
              return <div key={techno.id}><Checkbox
                className='col-span-1 me-2'
                name="technos" 
                value={techno.id}
                defaultChecked={project.technos.filter((projectTechno) => projectTechno.id === techno.id).length > 0}
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
          {/* Description */}
          <Label htmlFor="description" className='mb-2'>{t('dashboardProjects.create.description-label')}</Label>
          <Textarea
            id='description'
            name='description'
            defaultValue={project.description}
          ></Textarea>
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
