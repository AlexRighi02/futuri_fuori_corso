import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer
            className="footer"
            style={{
                backgroundImage: 'url("/img/WallPaper.png")'
            }}
        >
            <div className="footer-container">
                <div className="footer-left">
                    <h2>La Mia Azienda</h2>
                    <p>&copy; {new Date().getFullYear()} Tutti i diritti riservati.</p>
                </div>
                <div className="footer-center">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Termini di Servizio</a>
                    <a href="#">Contatti</a>
                </div>
                <div className="footer-right">
                    <a href="#" className="social-icon">🌐</a>
                    <a href="#" className="social-icon">🐦</a>
                    <a href="#" className="social-icon">📸< /a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
