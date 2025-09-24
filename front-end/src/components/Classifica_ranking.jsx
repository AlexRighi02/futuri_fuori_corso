import styles from './Classifica_ranking.module.css';
import { useState, useEffect } from "react";

const Classifica_ranking = ({ classifica }) => {
    const nomeSquadra = "F.C. FUTURI FUORI CORSO"; // Nome della squadra da evidenziare
    const squadre_promosse = 1;
    const squadre_playoff = 4;

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener("resize", handleResize);

        // cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(classifica);


    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>{isMobile ? 'G' : 'GIOCATE'}</th>
                    <th>{isMobile ? 'PT' : 'PUNTI'}</th>
                    <th>{isMobile ? 'V' : 'VINTE'}</th>
                    <th>{isMobile ? 'P' : 'PAREGGIATE'}</th>
                    <th>{isMobile ? 'S' : 'PERSE'}</th>
                    <th className={styles.toHide}>{isMobile ? 'GF' : 'GOL FATTI'}</th>
                    <th className={styles.toHide}>{isMobile ? 'GS' : 'GOL SUBITI'}</th>
                    <th className={styles.toHide}>{isMobile ? 'DR' : 'DIFF. RETI'}</th>
                </tr>
            </thead>
            <tbody>
                {classifica.map((squadra, index) => (
                    <tr key={index} className={`${squadra.squadra.toUpperCase() === nomeSquadra.toUpperCase() ? styles.highlights : ''} ${index === classifica.length - 1 ? styles.lastRow : ''}`}>
                        <td className={`${styles.posizione}`}>
                            <span className={`${index < squadre_promosse ? styles.promozione : ''} ${index >= squadre_promosse && index < squadre_promosse + squadre_playoff ? styles.playoff : ''}`}>{index + 1}</span>
                        </td>
                        <td className={styles.squadra}>
                            <div className={styles.logoContainer}>
                                <img src={squadra.logo} alt={squadra.squadra} className={styles.logo} />
                            </div>
                            <div className={styles.nomeSquadra}>
                                {squadra.squadra.toUpperCase()}
                            </div>
                        </td>
                        <td>{squadra.giocate}</td>
                        <td>{squadra.punti}</td>
                        <td>{squadra.vinte}</td>
                        <td>{squadra.pareggiate}</td>
                        <td>{squadra.perse}</td>
                        <td className={styles.toHide}>{squadra.gol_fatti}</td>
                        <td className={styles.toHide}>{squadra.gol_subiti}</td>
                        <td className={styles.toHide}>{squadra.gol_fatti - squadra.gol_subiti}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Classifica_ranking;
