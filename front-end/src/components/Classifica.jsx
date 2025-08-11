import styles from './Classifica.module.css';

const Classifica = ({ classifica }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th colSpan="9" style={{ textAlign: 'center' }}>CAMPIONATO CALCIO A 7 OPEN SILVER</th>
                </tr>
                <tr>
                    <th>Posizione</th>
                    <th>Logo</th>
                    <th>Squadra</th>
                    <th>Punti</th>
                    <th>Giocate</th>
                    <th>Vinte</th>
                    <th>Pareggiate</th>
                    <th>Perse</th>
                    <th>Gol Fatti</th>
                    <th>Gol Subiti</th>
                </tr>
            </thead>
            <tbody>
                {classifica.map((squadra, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                            <img src={squadra.logo} alt={squadra.squadra} className={styles.logo} />
                        </td>
                        <td>{squadra.squadra}</td>
                        <td>{squadra.punti}</td>
                        <td>{squadra.giocate}</td>
                        <td>{squadra.vinte}</td>
                        <td>{squadra.pareggiate}</td>
                        <td>{squadra.perse}</td>
                        <td>{squadra.golFatti}</td>
                        <td>{squadra.golSubiti}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Classifica;
