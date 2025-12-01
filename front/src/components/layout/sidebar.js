'use client';
import Link from "next/link";
import styles from '@/components/layout/sidebar.module.css'
import { usePathname } from "next/navigation";


export default function Sidebar() {
    const pathname = usePathname();

    return (
        <>
        <aside className={styles.container}>
            <h1 className={styles.title}>Aerocode</h1>
            
            <ul className={styles.menu}>
                <li className={styles.menuItem}>
                    <Link href="/aeronaves" className={pathname === '/aeronaves' ? styles.active : ''}> Aeronaves</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/funcionarios" className={pathname === '/funcionarios' ? styles.active : ''}> Funcionarios</Link>
                </li>
                <li className={styles.menuItem}>
                    <Link href="/relatorios" className={pathname === '/relatorios' ? styles.active : ''}> Relatorios</Link>
                </li>
            </ul>
        </aside>
        </>
    )
}