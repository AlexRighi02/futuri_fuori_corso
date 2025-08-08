from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import subprocess
import json
import os

app = Flask(__name__, static_folder="static")  # puoi cambiare static_folder se vuoi
CORS(app)

@app.route('/')
def home():
    # Serve una pagina index.html (opzionale, puoi modificarla)
    return send_from_directory('static', 'index.html')

@app.route('/esegui', methods=['GET'])
def esegui_script():
    try:
        # Esegue lo script Python
        subprocess.run(['python3', 'estrai_classifica.py'], check=True)

        # Controlla che il file squadre.json esista
        if not os.path.exists('squadre.json'):
            return jsonify({'errore': 'File squadre.json non trovato'}), 500

        # Legge e ritorna il contenuto del JSON
        with open('squadre.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)

    except subprocess.CalledProcessError:
        return jsonify({'errore': 'Errore nell\'esecuzione di estrai_classifica.py'}), 500

    except Exception as e:
        return jsonify({'errore': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
