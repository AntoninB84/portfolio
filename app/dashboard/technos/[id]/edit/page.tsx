import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { fetchTechnoById } from "@/lib/_dao/techno-dao";
import EditTechnoForm from "@/components/ui/dashboard/techno/edit-form";
import { getTranslations } from "next-intl/server";

export default async function UpdateTechno(props: { params: Promise<{ id: string }> }) {
    const t = await getTranslations('dashboardTechnos.edit');
    const params = await props.params;
    const id = params.id;

    const techno = await fetchTechnoById(id);

    // if (!techno) {
    //     notFound();
    // }

    return(
        <Card className="p-8">
            <h2 className={clsx("dashboard-page-title")}>{t('title', {name: techno.name})}</h2>
            <EditTechnoForm techno={techno}/>
        </Card>
    );
}