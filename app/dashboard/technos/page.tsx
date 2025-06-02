import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { fetchTechnos } from "@/lib/_dao/techno-dao";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { technoIndexColumns } from "./columns";

export default async function TechnoIndexPage() {
    const t = await getTranslations('dashboardTechnos.index');
    const data = await fetchTechnos();


    return (
        <div className="flex flex-col gap-2">
            <Link href="/dashboard/technos/create" className="w-min self-end">
                <Button >
                    <PlusIcon/> {t('create-button')}
                </Button>
            </Link>
            <Card className="p-8">
                <h2 className={clsx("dashboard-page-title")}>{t('title')}</h2>
                <DataTable columns={technoIndexColumns} data={data}/>
            </Card>
        </div>
    );
}