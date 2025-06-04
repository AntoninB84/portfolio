import { Card } from "@/components/ui/card";
import clsx from "clsx";
import { fetchProjectById } from "@/lib/_dao/project-dao";
import EditProjectForm from "@/components/ui/dashboard/projects/edit-form";
import { getTranslations } from "next-intl/server";
import { fetchTechnos } from "@/lib/_dao/techno-dao";
import Image from 'next/image';
import { XCircleIcon } from "lucide-react";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import DeleteProjectImageDialog from "@/components/ui/dashboard/projects/delete-project-image-dialog";

export default async function UpdateProject(props: { params: Promise<{ id: string }> }) {
    const t = await getTranslations('dashboardProjects.edit');
    const params = await props.params;
    const id = params.id;

    const project = await fetchProjectById(id);
    const technos = await fetchTechnos();

    // if (!project) {
    //     notFound();
    // }

    return(
        <>
            <Card className="p-8">
                <h2 className={clsx("dashboard-page-title")}>{t('title', {name: project.name})}</h2>
                <EditProjectForm technos={technos} project={project}/>
            </Card>
            {
                (project.images.length > 0) &&
                    <Card className="p-8 mt-4">
                        <h2 className={clsx("dashboard-page-title")}>{t('images')}</h2>
                        <div className="grid grid-cols-3 gap-4">
                            {
                                project.images.map((image) => {
                                    return (
                                        <div className="col-span-1 relative" key={image.id}>
                                            <Image 
                                                src={`/uploads/${image.filename}`}
                                                alt={image.filename} 
                                                width={150} height={150}
                                                className='ps-4 object-cover'
                                            />
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <XCircleIcon className="cursor-pointer text-destructive absolute top-0 left-0"/>
                                                </AlertDialogTrigger>
                                                <DeleteProjectImageDialog id={image.id}/>
                                            </AlertDialog>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </Card>
            }
        </>
    );
}