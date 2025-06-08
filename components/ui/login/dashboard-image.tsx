'use client';

import { useTheme } from "next-themes";
import Image from "next/image";


export default function DashboardImage(){
    const { resolvedTheme } = useTheme();
    let src

     switch (resolvedTheme) {
        case 'light':
        src = '/light-dashboard.jpeg'
        break
        case 'dark':
        src = '/dark-dashboard.jpeg'
        break
        default:
        src = '/dark-dashboard.jpeg'
        break
    }

    return (
        <div className="relative min-h-[450px] hidden md:flex md:w-2/4 ml-8">
            <Image
                src={src}
                alt="dashboard"
                className="rounded-md"
                width={1150}
                height={850}
            />
        </div>
    );
}