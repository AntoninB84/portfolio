import { Card } from "@/components/ui/card";
import ImageCarousel from "@/components/ui/home/projects/image-carousel";
import ProjectCard from "@/components/ui/home/projects/project-card";
import { fetchProjects } from "@/lib/_dao/project-dao";
import { ImageType } from "@/lib/_objects/objectImage";

export default async function Projects() {

    const projects = await fetchProjects();

    return (
        <div className="flex flex-col gap-20 ps-10 pe-10">
            {
                projects.map(project => {
                    const logos = project.images.filter((image) => {
                        return ((image.imagetype === ImageType.Logo.toString()) ? image.filename : undefined)
                    });
                    const logofilename = (logos.length > 0) ? logos[0].filename : undefined;

                    return <div className="flex flex-col md:flex-row md:gap-10 gap-5" key={project.name}>
                        <ImageCarousel project={project} logofilename={logofilename} />
                        <ProjectCard project={project} logofilename={logofilename} />
                    </div>
                })
            }
        </div>
    );
}