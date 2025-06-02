'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
  Cog8ToothIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathName = usePathname();

  const t = useTranslations('dashboardPage.navlinks');
  const links = [
    { name: t('home'), href: '/dashboard', icon: HomeIcon },
    { name: t('projects'), href: '/dashboard/projects', icon: DocumentDuplicateIcon },
    { name: t('technos'), href: '/dashboard/technos', icon: Cog8ToothIcon },
  ];

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className= {clsx(
            "menuCard",
            {
              " text-main ": link.href === pathName,
            })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
