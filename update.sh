#!/bin/bash

# Fermare lo script in caso di errori
set -e

# Vai nella directory dello script (repo principale)
cd "$(dirname "$0")"

echo "🚀 Avvio server.py..."
python3 back-end/server.py &

echo "🚀 Avvio api_risultati.py..."
python3 back-end/api_risultati.py &

echo "🚀 Avvio api_classifica.py..."
python3 back-end/api_classifica.py &

# Attendi 5 secondi per sicurezza (puoi modificare)
sleep 5

echo "✅ Programmi avviati."

# Esegui aggiornamento Git
echo "📦 Aggiornamento repository..."
git add .
git commit -m "Aggiornamento risultati e classifica"
git push

echo "📦 Deploy del sito..."
fly deploy

echo "🎉 Tutto fatto!"