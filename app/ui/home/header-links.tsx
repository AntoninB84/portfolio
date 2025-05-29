'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { quicksand } from '../fonts';

const links = [
    { name: "About me", href: '/home', },
    { name: "Projects", href: '/home/projects', },
    { name: "Contact me", href: '/home/contact', },
    { name: "Log in", href: '/login', },
];

export default function HeaderLinks() {
    const pathName = usePathname();

    return (
        <>
        {links.map((link) => {
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className= {clsx(
                        " uppercase font-bold" +
                        " hover:text-amber-700 hover:dark:text-cyan-800" + 
                        " text-md md:text-lg",
                        {
                            "text-amber-500 dark:text-cyan-600" : link.href === pathName,
                        }
                    )}
                >
                    <p>{link.name}</p>
                </Link>
            );
        })}
        </>
    );
}