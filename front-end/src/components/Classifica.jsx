import styles from './Classifica.module.css';

const Classifica = ({ classifica }) => {
    const nomeSquadra = "avellino banfi"; // Nome della squadra da evidenziare
    const isMobile = window.innerWidth < 500;

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>{isMobile ? 'PT' : 'PUNTI'}</th>
                    <th>{isMobile ? 'G' : 'GIOCATE'}</th>
                    <th>{isMobile ? 'V' : 'VINTE'}</th>
                    <th>{isMobile ? 'P' : 'PAREGGIATE'}</th>
                    <th>{isMobile ? 'S' : 'PERSE'}</th>
                    <th className={styles.toHide}>{isMobile ? 'GF' : 'GOL FATTI'}</th>
                    <th className={styles.toHide}>{isMobile ? 'GS' : 'GOL SUBITI'}</th>
                    <th className={styles.toHide}>DIFF. RETI</th>
                </tr>
            </thead>
            <tbody>
                {classifica.map((squadra, index) => (
                    <tr key={index} className={`${ squadra.squadra.toUpperCase() === nomeSquadra.toUpperCase()? styles.highlights : ''}`}>
                        <td className={styles.posizione}>{index + 1}</td>
                        <td className={`${styles.squadra}`}>
                            <div className={styles.logoContainer}>
                                <img src={squadra.logo} alt={squadra.squadra} className={styles.logo} />
                            </div>
                            <div className={styles.nomeSquadra}>
                                {squadra.squadra.toUpperCase()}
                            </div>
                        </td>
                        <td>{squadra.punti}</td>
                        <td>{squadra.giocate}</td>
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

export default Classifica;
