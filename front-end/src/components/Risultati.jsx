import React, { useState, useEffect } from 'react';
import styles from './Risultati.module.css';  // Import the custom CSS

const Risultati = () => {
    const nomeSquadra = "REAL MALEDUCATI";

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/risultati")
            .then((res) => {
                if (!res.ok) throw new Error("Errore nel recupero dei risultati");
                return res.json();
            })
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const convertMese = (mese) => {
        const mesi = [
            "GEN", "FEB", "MAR", "APR", "MAG", "GIU",
            "LUG", "AGO", "SET", "OTT", "NOV", "DIC"
        ];
        return mesi[parseInt(mese) - 1] || mese;
    };

    if (loading) return <p className="text-center mt-4"></p>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
    if (!data.data || !data.data.partite || data.data.partite.length === 0)
        return <p className="text-center mt-4">Nessun risultato disponibile</p>;

    const lastIndex = data.data.partite.findLastIndex(p => p.risultato !== "");
    const partita = lastIndex !== -1 ? data.data.partite[lastIndex] : data.data.partite[0];
    const foundMatch = partita && partita.risultato !== "";

    return (

        <div className={styles.results_container} >
            <h1 className={styles.section_title}>ULTIMI RISULTATI</h1>

            <div className={styles.container_center}> 
                <div
                    className={styles.container_pointer}
                    onClick={() => {
                        if (partita.link_dettaglio) {
                            window.open(partita.link_dettaglio, "_blank");
                        }
                    }}
                    style={{ cursor: partita.link_dettaglio ? "pointer" : "default" }}
                >    

                    <div className={styles.container_positional}>

                        <div className={styles.data_partita}>
                            <div className={styles.div_toSpace}>
                                <span className={styles.data_numero}>{partita.data.split("/")[0]}</span>
                                <span className={styles.data_mese}>{convertMese(partita.data.split("/")[1])}</span>
                            </div>      
                        </div>

                        <div className={styles.orario_partita}>
                            <div className={styles.div_toSpace}>  
                                <div className={styles.div_toRight}>                    
                                    {partita.squadre[0].nome === nomeSquadra ? 
                                        <img src="/img/flaticon/home.png" className={styles.luogo_partita} alt="In casa" title="In casa" /> :
                                        <img src="/img/flaticon/airplane.png" className={styles.luogo_partita} alt="In trasferta" title="In trasferta" />
                                    }                        
                                    <span className={styles.orario}>{partita.ora}</span>
                                </div>  
                            </div>      
                        </div>

                    </div>

                    <div className={styles.result_card}>
                        <div className={styles.div_toAlign}>
                            <div className={styles.team_info}>
                                <div className={styles.logoContainer}>
                                    <img src={partita.squadre[0].logo} alt={partita.squadre[0].nome} className={styles.team_logo} />
                                </div>
                                <span className={styles.team_name}>{partita.squadre[0].nome}</span>
                            </div>
                        
                            <div className={styles.score}>
                                <span className={styles.score_text}> {foundMatch ? partita.risultato.replace(/\s+/g, "") : "?-?"} </span>
                            </div>

                            <div className={`${styles.team_info} right`}>
                                <div className={styles.logoContainer}>
                                    <img src={partita.squadre[1].logo} alt={partita.squadre[1].nome} className={styles.team_logo} />
                                </div>
                                <span className={styles.team_name}>{partita.squadre[1].nome}</span>                            
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        </div >
    );
};

export default Risultati;
