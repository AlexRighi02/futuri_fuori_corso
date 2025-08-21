import React, { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {

    const [showPrivacy, setShowPrivacy] = useState(false);

    return (
        <footer
            className={styles.footer} style={{ backgroundImage: 'url("/img/WallPaper_black.png")' }}>
            <div className={styles.footer_container}>
                <div className={styles.footer_content_sx}>
                    <h2 className={styles.footer_title}>FC FUTURI FUORI CORSO</h2>
                    <p className={styles.footer_description}>
                        Società di affiliazione: <br/>
                        ASD Taneto 20.14 <br/>
                        Via Tonelli, n. 20 <br/>
                        42043, Taneto di Gattatico (RE) <br/>
                        CF e P. IVA: {"02642110353"}
                    </p>
                    <div className={styles.container_copyright}>
                        <p className={styles.footer_copyright}>&copy; {2025} Tutti i diritti riservati.</p>
                        <p className={styles.footer_copyright}>&copy; {2005} “Pepe the Frog”, creato da Matt Furie. Tutti i diritti riservati. Utilizzo concesso alla squadra Futuri Fuori Corso, previa autorizzazione.</p>
                    </div>
                </div>

                <div className={styles.footer_content_dx}>
                    <h2 className={`${styles.footer_title} ${styles.right}`}>CONTATTI</h2>
                    <p className={`${styles.footer_description} ${styles.right}`}>
                        calcio.ffc@gmail.com <br/>
                        20.14asdtaneto@gmail.com
                    </p>

                    <div className={styles.container_copyright}>
                        <p className={styles.privacy_policy} onClick={() => setShowPrivacy(true)}>PRIVACY POLICY</p>
                    </div>
                </div>
            </div>

            {showPrivacy && (
                <div className={styles.overlay}>
                    <div className={styles.privacy_modal} style={{ backgroundImage: 'url("/img/WallPaper_black.png")' }}>
                        <button 
                          className={styles.close_button} 
                          onClick={() => setShowPrivacy(false)}
                        >
                          ✕
                        </button>
                        {/* Qui metti il tuo testo di privacy policy */}
                        <div className={styles.privacy_content}>
                            <h2 className={styles.privacy_title}>PRIVACY POLICY</h2>
                            <p className={styles.privacy_corpo}>
                                Informativa resa ai sensi del Regolamento UE 2016/679 (GDPR). Tutti i dati sono raccolti e trattati conformemente e in rispetto alla normativa vigente. <br />
                                <br />
                                TITOLARE DEL TRATTAMENTO: Alex Righi <br />
                                E-MAIL: alex.righi@outlook.it <br />
                                <br />
                                DATI RACCOLTI: Mail di contatto, nomi, richieste <br />
                                <br />
                                FINALITÀ DEL TRATTAMENTO: <br />
                                I dati raccolti vengono utilizzati esclusivamente per evadere le richieste dell'utente e per la gestione delle attività strettamente legate alla squadra “FC Futuri Fuori Corso” e all'associazione sportiva dilettantistica “ASD Taneto 20.14”.
                                <br /> <br />
                                CONSERVAZIONE DEI DATI: <br />
                                I dati raccolti vengono conservati esclusivamente per il tempo necessario a evadere i servizi richiesti e non saranno ceduti a terzi, né utilizzati per finalità diverse da quelle indicate.
                                <br /> <br />
                                DIRITTI DELL'INTERESSATO: <br />
                                L'utente può chiedere in qualunque momento l'accesso, la rettifica o la cancellazione dei propri dati inviando una richiesta scritta a calcio.ffc@gmail.com.
                            </p>
                        </div>
                    </div>
                </div>
            )}


        </footer>
    );
};

export default Footer;
