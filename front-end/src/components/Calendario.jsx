import { useState, useEffect } from "react";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles2 from "./Rosa.module.css"; // importa il CSS come module
import styles3 from "./Calendario.module.css"; // importa il CSS come module
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
            <div className={styles3.calendarioContainer}>
                <div>
                    <h1 className={`${styles2.title_rosa} ${styles3.no_bottom}`}>CALENDARIO</h1>
                    <div className={styles3.container}>
                    {data.partite.map((partita, index) => {
                        let mesePrecedente = null;
                        let meseCorrente = null;
                        if (index !== 0) {                    
                            mesePrecedente = data.partite[index - 1].data.split('/')[1];
                            meseCorrente = partita.data.split('/')[1];
                        }
                        else {
                            meseCorrente = partita.data.split('/')[1];
                        }
                        
                        const mesiItaliani = [
                            "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
                            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
                        ];
                        const mese = (mesiItaliani[parseInt(meseCorrente, 10) - 1]).toUpperCase();

                        return (
                        <React.Fragment key={index}>
                            {(index === 0 || meseCorrente !== mesePrecedente) && (
                                <h3 className={`${styles3.meseLabel} text-white`}>
                                    {mese}
                                </h3>
                            )}
                            <PartitaContainer partita={partita} className={styles3.partitaContainer} />
                        </React.Fragment>
                        );
                    })}

                    <div className={styles3.toSpace}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calendario;
