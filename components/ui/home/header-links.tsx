'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, useTransition } from 'react';

export default function HeaderLinks() {
    const pathName = usePathname();
    const router = useRouter();
    const t = useTranslations('menu');
    const [isPending, startTransition] = useTransition();
    const [loadingPath, setLoadingPath] = useState<string | null>(null);
    
    const links = [
        { name: t('about'), href: '/home', },
        { name: t('projects'), href: '/home/projects', },
        { name: t('contact'), href: '/home/contact', },
        { name: t('login'), href: '/login', },
    ];

    const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === pathName) return; // Don't navigate if already on the page
        
        e.preventDefault();
        setLoadingPath(href);
        
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <>
        {links.map((link) => {
            const isLoading = isPending && loadingPath === link.href;
            
            return (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavigation(e, link.href)}
                    className= {clsx(
                        " uppercase font-bold" +
                        " hover:text-neutral-700 hover:dark:text-neutral-100" + 
                        "  text-xs sm:text-md md:text-lg",
                        " relative",
                        {
                            " text-main " : link.href === pathName,
                        },
                        {
                            " text-neutral-500 " : link.href !== pathName,
                        },
                        {
                            " opacity-50 pointer-events-none " : isLoading,
                        }
                    )}
                >
                    <p className="flex items-center gap-2">
                        {link.name}
                        {isLoading && (
                            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></span>
                        )}
                    </p>
                </Link>
            );
        })}
        </>
    );
}