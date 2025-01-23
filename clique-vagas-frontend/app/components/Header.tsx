import React from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles['header-left']}>
                <img src="/img/cliquevagas.png" alt="Clique Vagas" style={{ height: '40px' }} />
                <input type="text" className={styles['search-input']} placeholder="Pesquisar..." />
            </div>
            <div className={styles['header-right']}>
                <a href="#" className={styles['nav-link']}><img src="/img/home.png" alt="Home" /> Início</a>
                <a href="#" className={styles['nav-link']}><img src="/img/briefcase.png" alt="Briefcase" /> Vagas</a>
                <a href="#" className={styles['nav-link']}><img src="/img/profile.png" alt="Profile" /> Perfil</a>
            </div>
        </header>
    );
};

export default Header;
