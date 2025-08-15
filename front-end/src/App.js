import React, { useEffect, useState } from 'react';
import Classifica from './components/Classifica';

const App = () => {
  const [data, setData] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    fetch('/esegui')
      .then(res => res.ok ? res.json() : res.text().then(text => { throw new Error(text); }))
      .then(setData)
      .catch(err => setErrore(err.message));
  }, []);

  return (
    <div>
      <h1>Classifica Squadre</h1>
      <div id="risultato">
        {errore && <p style={{ color: 'red' }}>Errore: {errore}</p>}
        {!errore && (
          !data
            ? <p>Caricamento...</p>
            : data.errore
              ? <p style={{ color: 'red' }}>Errore: {data.errore}</p>
              : <Classifica classifica={data.data.classifica} />
        )}
      </div>
    </div>
  );
};

export default App;
