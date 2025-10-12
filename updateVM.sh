#!/bin/bash

# Fermare lo script in caso di errori
set -e

# Directory della repository
REPO_DIR="/home/ubuntu/futuri_fuori_corso"

# Percorsi assoluti dei comandi
PYTHON="/usr/bin/python3"
GIT="/usr/bin/git"
FLY="/home/ubuntu/.fly/bin/flyctl"

# Vai nella directory della repo
cd "$REPO_DIR"

# Tutto l'output va sul log

# Avvio dei programmi Python in background con nohup
nohup $PYTHON back-end/server.py &
nohup $PYTHON back-end/api_risultati.py &
nohup $PYTHON back-end/api_classifica.py &

# Attendi qualche secondo per sicurezza
sleep 5

# Controlla se ci sono modifiche
if ! $GIT diff-index --quiet HEAD --; then
    $GIT add .
    $GIT commit -m "Aggiornamento risultati e classifica"
    $GIT push

    $FLY deploy
fi
