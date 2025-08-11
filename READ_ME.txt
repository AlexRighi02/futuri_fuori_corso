Come testare il funzionamento del programma:
OPZIONE 1:
- avviare il server con: python3 server.py
- recarsi nella cartella front-end e avviare npm: npm start

OPZIONE 2:
- avviare i Dockerfile con: sudo docker build -t mio-progetto .
- far girare il sito sulla porta 8080: sudo docker run -p 8080:8080 mio-progetto
- andare sul browser nella porta 8080: http://localhost:8080/

OPZIONE 3:
Caricare le modifiche su Github:
- git add .
- git commit -m "commento"
- git push
Andare su Render, avviare il server e verificare tutto funzioni all'URL: https://sito-ffc.onrender.com/


N.B. Tutte le opzioni devono funzionare e soprattuto la numero 3.
___________________________________________________________________________________________________________________________________________________


Spiegazione dei programmi nel progetto:

Dockerfile:
Usa l’immagine leggera di Python 3.11 come base per avere Python installato senza troppi pacchetti extra.
Poi avvia l'installazione di Chromium e Chromedriver e pulisce la cache per mantenere l’immagine piccola.
Definisce i percorsi di Chromium (/usr/bin/chromium) e Chromedriver (/usr/bin/chromedriver) così che Selenium possa trovarli facilmente.
Inizia poi il setup di Python all'interno del container docker:
    - Imposta la cartella di lavoro in /app (repository del container).
    - Installa le librerie Python in requirements.txt tramite pip.
    - Copia tutto il resto del progetto dentro /app.
Indica che l’applicazione ascolterà sulla porta 8080.
Infine, esegue Gunicorn per far partire il server Flask. Lo fa ascoltando su tutte le interfacce (0.0.0.0) alla porta 8080, utilizzando 
il modulo server e l’istanza Flask app. N.B: Gunicorn è un server che fa da "ponte" tra il mondo esterno (browser, client HTTP) e la tua 
applicazione Python, rendendo il tutto più efficiente e pronto per la produzione.

___________________________________________________________________________________________________________________________________________________


server.py:
app = Flask(__name__)       ->      Crea l’istanza dell’applicazione Flask.
CORS(app)                   ->      Abilita CORS per permettere richieste da frontend o altre origini diverse da quella del server.

@app.route('/')
def home():                                                     Quando un client fa una richiesta GET a /, viene indirizzato al file index.html.
    return send_from_directory('.', 'index.html')       ->      Serve come pagina web principale (puoi cambiarla o personalizzarla).

@app.route('/esegui', methods=['GET'])
def esegui_script():                                    ->      Definisce un endpoint GET chiamato /esegui.

result = subprocess.run(
    ['python3', 'estrai_classifica.py'],
    check=True,
    stdout=subprocess.PIPE,           ->      Usa subprocess.run per eseguire lo script Python estrai_classifica.py e salva errori e output.
    stderr=subprocess.PIPE,
    text=True
)
                                                                
return jsonify({
    'data': data,
    'stdout': result.stdout,          ->      Ritorna un JSON con i dati letti da squadre.json, gli output e eventuali errori
    'stderr': result.stderr
})

if __name__ == '__main__':                               Qui il codice prova a leggere una variabile d’ambiente chiamata PORT. Se questa  
    port = int(os.environ.get("PORT", 8080))     ->      variabile esiste, usa quel valore come porta su cui far partire il server. Se la  
    app.run(host='0.0.0.0', port=port)                   variabile PORT non è definita, allora usa la porta 8080 come valore di default.

___________________________________________________________________________________________________________________________________________________


api.py:
Questo script Python per inviare richieste POST e parsare i dati HTML è stato creato partendo da una chiamata API effettuata tramite Postman.
Postman è uno strumento molto veloce e comodo perché permette di:
- Configurare e testare facilmente le richieste API con interfaccia grafica, senza scrivere codice iniziale.
- Visualizzare immediatamente la risposta del server, per capire cosa viene restituito.
- Generare automaticamente codice in diversi linguaggi (come Python, JavaScript, curl, ecc.) a partire dalla richiesta configurata.
- Sperimentare e modificare le richieste in modo interattivo, per ottimizzare parametri, header, e payload.
- Risparmiare tempo nello sviluppo perché evita di scrivere da zero tutte le chiamate HTTP e la gestione dei dettagli.
In questo modo, Postman accelera molto la fase di prototipazione e test delle API, permettendo di passare rapidamente dal test manuale alla 
scrittura del codice Python funzionante e pronto per essere integrato.

