from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import subprocess
import json
import os

app = Flask(__name__)  # puoi cambiare static_folder se vuoi
CORS(app)

@app.route('/')
def home():
    # Serve una pagina index.html (opzionale, puoi modificarla)
    return send_from_directory('.', 'index.html')

@app.route('/esegui', methods=['GET'])
def esegui_script():
    try:
        # Esegui il comando e cattura output ed errori
        result = subprocess.run(
            ['python3', 'estrai_classifica.py'],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True  # fa ritornare stringhe non byte
        )

        # Stampa su console (render.com li mostra nei suoi log)
        print("Output stdout di estrai_classifica.py:")
        print(result.stdout)
        print("Output stderr di estrai_classifica.py:")
        print(result.stderr)

        # Controlla se esiste il file JSON
        if not os.path.exists('squadre.json'):
            return jsonify({'errore': 'File squadre.json non trovato'}), 500

        with open('squadre.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify({
            'data': data,          # il contenuto JSON atteso
            'stdout': result.stdout,  # tutto ciò che lo script ha stampato su console (print)
            'stderr': result.stderr   # eventuali errori stampati su stderr
        })

    except subprocess.CalledProcessError as e:
        # Se lancia eccezione, stampa errori catturati
        print("Errore subprocess:", e)
        if e.stdout:
            print("stdout:", e.stdout)
        if e.stderr:
            print("stderr:", e.stderr)
        return jsonify({
            'errore': "Errore nell'esecuzione di estrai_classifica.py",
            'err ': e  # tutto ciò che lo script ha stampato su console (print)
        }), 500

    except Exception as e:
        print("Errore generico:", e)
        return jsonify({'errore': str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)

