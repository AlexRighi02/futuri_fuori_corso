import { useState, useEffect } from "react";
import styles from "./Risultati.module.css"; // importa il CSS come module
import styles2 from "./Rosa.module.css"; // importa il CSS come module
import PartitaContainer from './PartitaContainer'; // ⬅️ importa il nuovo componente

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
        <div className="toBlur">
            <div className={styles.calendarioContainer}>
                <h1 className={styles2.title_rosa}>CALENDARIO</h1>
                
                {data.partite.map((partita, index) => (
                    <PartitaContainer key={index} partita={partita} />
                ))}
            </div>
        </div>
    );
};

export default Calendario;
