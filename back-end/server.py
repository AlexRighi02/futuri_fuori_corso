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
    return send_from_directory('./react-site/public/', 'index.html')

@app.route('/esegui', methods=['GET'])
def esegui_script():
    try:
        print("Avvio estrai_classifica.py")
        result = subprocess.run(
            ['python3', 'api.py'],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        print("Fine estrai_classifica.py")
        print("stdout:", result.stdout)
        print("stderr:", result.stderr)

        if not os.path.exists('classifica.json'):
            print("Errore: squadre.json non trovato")
            return jsonify({'errore': 'File squadre.json non trovato'}), 500

        with open('squadre.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify({
            'data': data,
            'stdout': result.stdout,
            'stderr': result.stderr
        })

    except subprocess.CalledProcessError as e:
        print("Errore subprocess:", e)
        print("stdout:", e.stdout)
        print("stderr:", e.stderr)
        strToReturn = e.stderr + " " + e.stdout
        return jsonify({'errore': "Errore nell'esecuzione di estrai_classifica.py", 'details': strToReturn}), 500

    except Exception as e:
        print("Errore generico:", e)
        return jsonify({'errore': str(e)}), 500


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)

