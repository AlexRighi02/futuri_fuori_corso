import React, { useState, useEffect } from 'react';
import './Risultati.css';  // Import the custom CSS

const Risultati = () => {
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



    if (loading) return <p className="text-center mt-4">Caricamento...</p>;
    if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
    if (!data.data || !data.data.partite || data.data.partite.length === 0)
        return <p className="text-center mt-4">Nessun risultato disponibile</p>;

    const partita = data.data.partite[0]

    // const partita = data.data.partite
    // console.log(partita)



    return (

        < div className="results-container" >
            <h2 className="section-title">ULTIMI RISULTATI</h2>
            <div className="result-card">
                <div className="team-info">
                    <img
                        src={partita.squadre[0].logo}
                        alt={partita.squadre[0].nome}
                        className="team-logo"
                    />
                    <span className="team-name">{partita.squadre[0].nome}</span>
                </div>

                <div className="score">
                    <span className="score-text">{partita.risultato}</span>
                    <div className="match-time">
                        {partita.data} - {partita.ora}
                    </div>
                </div>

                <div className="team-info right">
                    {partita.data !== "RIPOSA" ? (
                        <>
                            <span className="team-name">{partita.squadre[1].nome}</span>
                            <img
                                src={partita.squadre[1].logo}
                                alt={partita.squadre[1].nome}
                                className="team-logo"
                            />
                        </>
                    ) : (
                        <span className="team-name no-match">RIPOSA</span>
                    )}
                </div>
            </div>
        </div >
    );
};

export default Risultati;
