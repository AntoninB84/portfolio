import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Home() {
    const t = useTranslations('homePage');

    const localeBold = (chunks: any) => <span className="font-bold">{chunks}</span>

    return (
        <main className="flex flex-col items-center p-8">
            <div className="md:w-6/10 flex flex-col  items-center gap-8 mb-[100px] mt-8 sm:mt-0">
                <p>{t.rich('section1', {b: localeBold})}</p>
                <p>{t.rich('section2', {b: localeBold})}</p>
                <p>{t.rich('section3', {b: localeBold, a: (chunks) => <a className="text-blue-500 hover:text-blue-800" href="https://github.com/AntoninB84/portfolio">{chunks}</a>})}</p>
                <div className="h-[200px] w-[200px] relative rounded-full bg-accent">
                    <Image
                        src={'/profil.jpg'}
                        alt="Photo"
                        fill
                        className="rounded-full"
                    />
                </div>
                <p>{t.rich('section4', {b: localeBold})}</p>
                <p>{t.rich('section5', {b: localeBold})}</p>
                <p>{t.rich('section6', {b: localeBold})}</p>
                <p>{t.rich('section7', {b: localeBold})}</p>
                <p>{t.rich('section8', {b: localeBold})}</p>
                <p>{t.rich('section9', {b: localeBold})}</p>
                <p>{t.rich('section10', {b: localeBold, i: (chunks) => <i>{chunks}</i>})}</p>
                <p>{t.rich('section11', {b: localeBold})}</p>
            </div>
        </main>
    );
}
// export function HomeContent() {

//     return (
//         <main className="flex flex-col items-center p-8">
//             <div className="md:w-6/10 flex flex-col  items-center gap-8 mb-[100px] mt-8 sm:mt-0">
//                 <p>{t('intro1')}</p>
//                 <p>{t('intro2')}</p>
//                 <p>
//                     {t.rich('intro3', {
//                         github: (chunks) => (
//                             <a className="text-blue-500 hover:text-blue-800" href="https://github.com/AntoninB84/portfolio">{chunks}</a>
//                         ),
//                     })}
//                 </p>
//                 <div className="h-[200px] w-[200px] relative rounded-full bg-accent">
//                     <Image
//                         src={'/profil.jpg'}
//                         alt={t('photoAlt')}
//                         fill
//                         className="rounded-full"
//                     />
//                 </div>
//                 <p>{t('about1')}</p>
//                 <p>{t('about2')}</p>
//                 <p>{t('about3')}</p>
//                 <p>{t('about4')}</p>
//                 <p>{t('about5')}</p>
//                 <p>{t('about6')}</p>
//                 <p>{t('about7')}</p>
//             </div>
//         </main>
//     );
// }
