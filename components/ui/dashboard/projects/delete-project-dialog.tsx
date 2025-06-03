'use client';

import { useTranslations } from "next-intl";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction} from "../../alert-dialog";
import { deleteProject } from "@/lib/_dao/project-dao";

export default function DeleteProjectDialog({id, name}: {id: string, name: string}) {
  const t = useTranslations("");
  const deleteProjectWithId = deleteProject.bind(null, id);

    return (
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboardProjects.delete-dialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
                {t.rich('dashboardProjects.delete-dialog.description', {name: name, b: (chunks) => <b>{chunks}</b>})}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <form action={deleteProjectWithId}>
              <AlertDialogAction className="bg-button-background text-button-foreground" type="submit">
                {t('validate')}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
      </AlertDialogContent>
    );
    
    
}