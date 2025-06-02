import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from "@/auth";
import { useTranslations } from 'next-intl';
import NavLinks from './nav-links';

export default function SideNav() {
  const t = useTranslations("dashboardPage");

  return (
    <div className="flex h-full flex-col">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 py-4 px-2 rounded-e-md bg-secondary ">
        <NavLinks />
        <div className="hidden w-full grow md:block"></div>
        <form action={
          async () => {
            'use server';
            await signOut({ redirectTo: '/home'});
          }
        }>
          <button className="menuCard">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">{t('signout')}</div>
          </button>
        </form>
      </div>
    </div>
  );
}
