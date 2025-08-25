import { useState, useEffect } from "react";
import styles from "./Calendario.module.css"; // importa il CSS come module

const Calendario = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("/risultati");

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data);
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data || !data.partite || data.partite.length === 0)
        return <div>No data available</div>;

    return (
        <div className={styles.calendarioContainer}>
            <h2 className={styles.sectionTitle}>CALENDARIO</h2>
            <div className={styles.cardGrid}>
                {data.partite.map((partita, index) => (
                    <div key={partita.codice} className={styles.card}>
                        <h3>{index + 1}ª Giornata</h3>
                        <p>
                            {partita.squadre[0].nome} vs {partita.squadre[1].nome}
                        </p>
                        <div className={styles.logos}>
                            <img src={partita.squadre[0].logo} alt={partita.squadre[0].nome} />
                            <img src={partita.squadre[1].logo} alt={partita.squadre[1].nome} />
                        </div>
                        <p>Data: {partita.data}</p>
                        <p>Ora: {partita.ora}</p>
                        <p>Risultato: {partita.risultato}</p>
                        <a href={partita.link_dettaglio} target="_blank" rel="noopener noreferrer">
                            Dettaglio
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendario;
