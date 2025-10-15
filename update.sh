#!/bin/bash

# Avvio dei programmi Python in background con nohup
python3 back-end/server.py &
python3 back-end/api_risultati.py &
python3 back-end/api_classifica.py &

# Attendi qualche secondo per sicurezza
sleep 5

# Controlla se ci sono modifiche
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "Aggiornamento risultati e classifica"
    git push https://AlexRighi02@github.com/AlexRighi02/futuri_fuori_corso.git

    fly deploy
fi
