#!/bin/bash

# Fermare lo script in caso di errori
set -e

# Directory della repository
REPO_DIR="/home/ubuntu/futuri_fuori_corso"
LOG_FILE="$REPO_DIR/Logs/cron_log.txt"

# Percorsi assoluti dei comandi
PYTHON="/usr/bin/python3"
GIT="/usr/bin/git"
FLY="/home/ubuntu/.fly/bin/flyctl"

# Vai nella directory della repo
cd "$REPO_DIR"

# Tutto l'output va sul log
{
echo "===================================="
echo "🚀 Avvio script: $(date)"

# Avvio dei programmi Python in background con nohup
echo "🚀 Avvio server.py..."
nohup $PYTHON back-end/server.py &

echo "🚀 Avvio api_risultati.py..."
nohup $PYTHON back-end/api_risultati.py &

echo "�� Avvio api_classifica.py..."
nohup $PYTHON back-end/api_classifica.py &

# Attendi qualche secondo per sicurezza
sleep 5

echo "📦 Aggiornamento repository..."
# Controlla se ci sono modifiche
if ! $GIT diff-index --quiet HEAD --; then
    echo "📦 Ci sono modifiche, aggiorno GitHub..."
    $GIT add .
    $GIT commit -m "Aggiornamento risultati e classifica"
    $GIT push

    # Deploy del sito
    echo "📦 Deploy del sito..."
    $FLY deploy
else
    echo "⚠️ Nessuna modifica significativa da inviare a GitHub."
fi

echo "🎉 Tutto fatto!"
echo "===================================="
} > "$LOG_FILE" 2>&1
