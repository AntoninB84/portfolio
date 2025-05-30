import styles from '../ui/home/home.module.css';

export default function Home() {
    return (
        <main className="flex flex-col gap-[32px] items-center sm:items-start">
            <div className={styles.test}></div>
            <p>Test de texte couleur</p>
        </main>
    );
}