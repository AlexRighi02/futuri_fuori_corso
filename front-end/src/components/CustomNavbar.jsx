import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import styles from './Navbar.module.css';

function CustomNavbar() {
    return (
        <div className={styles.wrapper}>
            {/* Logo grande a sinistra */}
            <div className={styles.logoContainer}>
                <img src="/img/LogoFFC.svg" alt="Logo" className={styles.logo} />
            </div>

            {/* Navbar con link centrati */}
            <Navbar expand="lg" className={styles.navbar}>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#calendario">Calendario</Nav.Link>
                    <Nav.Link href="#rosa">Rosa</Nav.Link>
                    <Nav.Link href="#gallery">Gallery</Nav.Link>
                    <Nav.Link href="#sponsor">Sponsor</Nav.Link>
                    <Nav.Link href="#chi-siamo">Chi siamo</Nav.Link>
                </Nav>
            </Navbar>

            {/* Icone social a destra */}
            <div className={styles.socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src="/img/facebook.svg" alt="Facebook" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src="/img/instagram.svg" alt="Instagram" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="/img/twitter.svg" alt="Twitter" />
                </a>
            </div>
        </div>
    );
}

export default CustomNavbar;
