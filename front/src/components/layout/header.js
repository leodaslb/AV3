import styles from '@/components/layout/header.module.css'
import { Power } from 'lucide-react'
import Link from 'next/link'

export function Header() {
    return(
        <header className={styles.header}>
            <div className={styles.user}>
                <h2 className={styles.userName}>Usúario </h2>
                <Link href="/login" className={styles.logout} title="Logout">
                    <Power size={24} />
                </Link>
            </div>
        </header>
    )
    
}