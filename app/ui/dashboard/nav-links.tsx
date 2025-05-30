'use client';

import {
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../../ui/dashboard/dashboard.module.css';

export default function NavLinks() {
  const pathName = usePathname();

  const t = useTranslations('dashboardPage.navlinks');
  const links = [
    { name: t('home'), href: '/dashboard', icon: HomeIcon },
    { name: t('projects'), href: '/dashboard/projects', icon: DocumentDuplicateIcon },
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
            `cardAB ${styles.menuCard}`,
            {
              "mainColor": link.href === pathName,
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
