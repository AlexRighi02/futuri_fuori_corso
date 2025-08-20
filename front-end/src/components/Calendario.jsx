import { useState, useEffect } from "react";
import "./Calendario.css"; // importa il CSS

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
            setData(result.data); // usa la proprietà partite
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
    if (!data || data.length === 0) return <div>No data available</div>;

    console.log(data)

    return (
        <div className="calendario-container">
            <h2 className="section-title">CALENDARIO</h2>
            <div className="card-grid">
                {data.partite.map((partita, index) => (
                    <div key={partita.codice} className="card">
                        <h3>{index + 1}ª Giornata</h3>
                        <p>
                            {partita.squadre[0].nome} vs {partita.squadre[1].nome}
                        </p>
                        <div className="logos">
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
