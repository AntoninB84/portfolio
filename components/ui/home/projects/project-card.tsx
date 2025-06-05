import { Project } from "@/lib/_objects/project";
import { Card } from "../../card";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../tooltip";

export default function ProjectCard({project, logofilename}: {project: Project, logofilename: string|undefined}){
    return (
         <Card className="p-8 md:w-1/2">
            <div className="flex justify-between">
                <div className="flex gap-8 items-center">
                    <Image
                        className="rounded-md"
                        src={`/uploads/${logofilename}`}
                        alt="logo"
                        height={50}
                        width={50}
                    />
                    <div className="text-2xl">
                        {project.name}
                    </div>
                </div>
                
                <div className="justify-self-end">
                    <div className="flex flex-col">
                        <div className="font-bold">Type</div>
                        {project.ismobile ? "Mobile": ""} 
                        {project.isweb ? "Web" : ""}
                    </div>
                    
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="font-bold">Technologies</div>
                <div className="flex gap-4">
                    {
                        project.technos.map(techno => {
                            return <div className="h-[30px] w-[30px] relative" key={techno.name}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Image
                                            src={`/uploads/${techno.logofilename}`}
                                            alt="logo"
                                            fill
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={10}>
                                        <div className="text-lg">{techno.name}</div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        })
                    }
                </div>
                
            </div>
            <div>
                <p dangerouslySetInnerHTML={{__html: project.description}}></p>
            </div>
        </Card>
    );
}