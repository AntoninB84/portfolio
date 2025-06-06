'use client';

import { Project } from "@/lib/_objects/project";
import { Card } from "../../card";
import { ImageType, ObjectImage } from "@/lib/_objects/objectImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

export default function ImageCarousel({project, logofilename}: {project: Project, logofilename: string|undefined}){
    const images = project.images.filter((image) => image.imagetype === ImageType.Image);

    return (
        <div className="md:h-auto md:max-h-[500px] col-span-2">
            <Carousel className="h-full" opts={{loop: true}}>
                <CarouselContent className="h-full">
                    {
                        images.map((image: ObjectImage) => {
                            return(
                                <CarouselItem key={image.id} className="flex justify-center">
                                    <img
                                        alt="image"
                                        src={`/uploads/${image.filename}`}
                                        className="object-contain"
                                    />
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}