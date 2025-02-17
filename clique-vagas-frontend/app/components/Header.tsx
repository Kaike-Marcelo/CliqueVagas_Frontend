'use client'

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    
    // Efeito para debounce da pesquisa
    useEffect(() => {
        const handler = setTimeout(() => {
            if (searchQuery.trim()) {
                router.push(`/home?q=${encodeURIComponent(searchQuery)}`);
            } else if (pathname === '/home') {
                router.push('/home');
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery, router, pathname]);

    const isActive = (path: string) => pathname === path;

    return (
        <header className={styles.header}>
            <div className={styles['header-left']}>
                <img src="/img/cliquevagas.png" alt="Clique Vagas" style={{ height: '40px' }} />
                <input 
                    type="text" 
                    className={styles['search-input']} 
                    placeholder="Pesquisar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className={styles['header-right']}>
                <a
                    href="/home"
                    className={`${styles['nav-link']} ${isActive('/home') ? styles.active : ''}`}
                >
                    <img src="/img/home.png" alt="Home" /> Início
                </a>
                <a
                    href="/vagas"
                    className={`${styles['nav-link']} ${isActive('/vagas') ? styles.active : ''}`}
                >
                    <img src="/img/briefcase.png" alt="Briefcase" /> Vagas
                </a>
                <a
                    href="/perfil"
                    className={`${styles['nav-link']} ${isActive('/perfil') ? styles.active : ''}`}
                >
                    <img src="/img/profile.png" alt="Profile" /> Perfil
                </a>
            </div>
        </header>
    );
};

export default Header;
