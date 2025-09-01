import React, { useEffect, useState } from 'react';
import Classifica_ranking from './components/Classifica_ranking';

const Classifica = () => {
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
      <div id="risultato">
        {errore && <p style={{ color: 'red' }}>Errore: {errore}</p>}
        {!errore && (
          !data
            ? <p></p>
            : data.errore
              ? <p style={{ color: 'red' }}>Errore: {data.errore}</p>
              : <Classifica_ranking classifica={data.data.classifica} />
        )}
      </div>      
    </div>
  );  
};
export default Classifica;
