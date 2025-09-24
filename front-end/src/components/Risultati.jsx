import React, { useState, useEffect } from 'react';
import styles from './Risultati.module.css';
import PartitaContainer from './PartitaContainer'; // ⬅️ importa il nuovo componente

const Risultati = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/risultati')
      .then((res) => {
        console.log(res);
        if (!res.ok) throw new Error('Errore nel recupero dei risultati');
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

  if (loading) return <p className="text-center mt-4"></p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;
  if (!data?.data?.partite?.length) return <p className="text-center mt-4">Nessun risultato disponibile</p>;

  console.log(data.data.partite);
  // Tua logica per trovare l’ultima partita giocata con risultato
  //console.log(data.data.partite);

  const lastPlayedIndex = data.data.partite.findLastIndex((p) => /\d/.test(p.risultato)); // Controlla se c'è almeno un numero
  const partita = lastPlayedIndex !== -1 ? data.data.partite[lastPlayedIndex] : data.data.partite[0];

  //console.log(partita);

  return (
    <div className={styles.results_container}>
      <h1 className={styles.section_title}>ULTIMI RISULTATI</h1>

      {/* QUI usi il componente dinamico, passandogli la partita */}
      <PartitaContainer partita={partita} />
    </div>
  );
};

export default Risultati;