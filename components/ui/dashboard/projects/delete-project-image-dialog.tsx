'use client';

import { useTranslations } from "next-intl";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction} from "../../alert-dialog";
import { deleteObjectImage } from "@/lib/_dao/objectImage-dao";

export default function DeleteProjectImageDialog({id}: {id: string}) {
  const t = useTranslations("");
  const deleteProjectImageWithId = deleteObjectImage.bind(null, id);

    return (
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboardProjects.delete-image-dialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
                {t.rich('dashboardProjects.delete-image-dialog.description')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <form action={deleteProjectImageWithId}>
              <AlertDialogAction className="bg-button-background text-button-foreground" type="submit">
                {t('validate')}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
      </AlertDialogContent>
    );
    
    
}