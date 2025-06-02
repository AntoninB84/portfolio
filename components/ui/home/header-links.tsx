'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function HeaderLinks() {
    const pathName = usePathname();
    const t = useTranslations('menu');
    const links = [
        { name: t('about'), href: '/home', },
        { name: t('projects'), href: '/home/projects', },
        { name: t('contact'), href: '/home/contact', },
        { name: t('login'), href: '/login', },
    ];

    return (
        <>
        {links.map((link) => {
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    className= {clsx(
                        " uppercase font-bold" +
                        " text-neutral-500" + 
                        " hover:text-neutral-700 hover:dark:text-neutral-100" + 
                        " text-md md:text-lg",
                        {
                            " mainColor " : link.href === pathName,
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