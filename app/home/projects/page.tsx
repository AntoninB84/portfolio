import { Card } from "@/components/ui/card";
import ImageCarousel from "@/components/ui/home/projects/image-carousel";
import ProjectCard from "@/components/ui/home/projects/project-card";
import { fetchProjects } from "@/lib/_dao/project-dao";
import { ImageType } from "@/lib/_objects/objectImage";

export default async function Projects() {

    const projects = await fetchProjects();

    return (
        <div className="flex flex-col gap-20 p-20">
            {
                projects.map(project => {
                    const logos = project.images.filter((image) => {
                        return ((image.imagetype === ImageType.Logo.toString()) ? image.filename : undefined)
                    });
                    const logofilename = (logos.length > 0) ? logos[0].filename : undefined;

                    return <div className="flex flex-col-reverse lg:grid lg:grid-cols-6 gap-16" key={project.name}>
                        <ImageCarousel project={project} logofilename={logofilename} />
                        <ProjectCard project={project} logofilename={logofilename} />
                    </div>
                })
            }
    </div>
    );
}