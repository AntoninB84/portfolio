import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import CreateTechnoForm from "@/components/ui/dashboard/techno/create-form";

export default function CreateTechno() {
    const t = useTranslations('dashboardTechnos.create');

    return(
        <Card className="p-8">
            <h2 className={clsx("dashboard-page-title")}>{t('title')}</h2>
            <CreateTechnoForm></CreateTechnoForm>
        </Card>
    );
}