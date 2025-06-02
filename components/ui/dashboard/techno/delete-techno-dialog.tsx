'use client';

import { useTranslations } from "next-intl";
import { AlertDialogHeader, AlertDialogFooter, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction} from "../../alert-dialog";
import { deleteTechno } from "@/lib/_dao/techno-dao";

export default function DeleteTechnoDialog({id, name}: {id: string, name: string}) {
  const t = useTranslations("");
  const deleteTechnoWithId = deleteTechno.bind(null, id);

    return (
      <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('dashboardTechnos.delete-dialog.title')}</AlertDialogTitle>
            <AlertDialogDescription>
                {t.rich('dashboardTechnos.delete-dialog.description', {name: name, b: (chunks) => <b>{chunks}</b>})}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <form action={deleteTechnoWithId}>
              <AlertDialogAction className="bg-button-background text-button-foreground" type="submit">
                {t('validate')}
              </AlertDialogAction>
            </form>
          </AlertDialogFooter>
      </AlertDialogContent>
    );
    
    
}