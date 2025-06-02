import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from "@/auth";
import { useTranslations } from 'next-intl';
import styles from '../../ui/dashboard/dashboard.module.css';

export default function SideNav() {
  const t = useTranslations("dashboardPage");

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden w-full grow cardAB md:block"></div>
        <form action={
          async () => {
            'use server';
            await signOut({ redirectTo: '/home'});
          }
        }>
          <button className={styles.menuCard + " cardAB"}>
            <PowerIcon className="w-6" />
            <div className="hidden md:block">{t('signout')}</div>
          </button>
        </form>
      </div>
    </div>
  );
}
