import React, { useEffect, useState } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    fetch('/esegui')
      .then(response => {
        if (!response.ok) {
          
          return response.text().then(text => {
            throw new Error('Server ha risposto con errore: ' + text);
          });
        }
        
        return response.json();
      })
      .then(setData)
      .catch(err => {
        setErrore(err.message);
      });
  }, []);

  console.log(data)

  return (
    <div>
      <h1>Classifica Squadre</h1>
      <div id="risultato">
        {errore && <p style={{ color: 'red' }}>Errore: {errore}</p>}
        {!errore && !data && <p>Caricamento...</p>}
        {!errore && data && (
          data.errore ? (
            <p style={{ color: 'red' }}>Errore: {data.errore}</p>
          ) : (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )
        )}
      </div>
    </div>
  );
};

export default App;
