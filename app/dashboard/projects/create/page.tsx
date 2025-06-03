import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import clsx from "clsx";
import CreateProjectForm from "@/components/ui/dashboard/projects/create-form";
import { getTranslations } from "next-intl/server";
import { fetchTechnos } from "@/lib/_dao/techno-dao";

export default async function CreateProject() {
    const t = await getTranslations('dashboardProjects.create');
    const technos = await fetchTechnos();

    return(
        <Card className="p-8">
            <h2 className={clsx("dashboard-page-title")}>{t('title')}</h2>
            <CreateProjectForm technos={technos}></CreateProjectForm>
        </Card>
    );
}