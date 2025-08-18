from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
import subprocess
import json
import os

FRONTEND_BUILD = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "front-end", "build")

app = Flask(__name__, static_folder=FRONTEND_BUILD, static_url_path='')
CORS(app)

@app.route('/')
def home():
    return app.send_static_file('index.html')

# Route per qualsiasi altra pagina React
@app.route('/<path:path>')
def static_proxy(path):
    file_path = os.path.join(FRONTEND_BUILD, path)
    if os.path.isfile(file_path):
        return send_from_directory(FRONTEND_BUILD, path)
    else:
        return app.send_static_file('index.html')

@app.route('/esegui', methods=['GET'])
def esegui_script():
    try:
        result = subprocess.run(
            ['python3', 'api.py'],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if not os.path.exists('classifica.json'):
            return jsonify({'errore': 'File classifica.json non trovato'}), 500
        with open('classifica.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify({'data': data, 'stdout': result.stdout, 'stderr': result.stderr})
    except subprocess.CalledProcessError as e:
        return jsonify({'errore': "Errore nell'esecuzione di api.py", 'details': e.stderr + " " + e.stdout}), 500
    except Exception as e:
        return jsonify({'errore': str(e)}), 500
    
    
@app.route('/risultati', methods=['GET'])
def esegui_apir():
    try:
        result = subprocess.run(
            ['python3', 'apirisultati.py'],
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        if not os.path.exists('partite.json'):
            return jsonify({'errore': 'File partite.json non trovato'}), 500
        with open('partite.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify({'data': data, 'stdout': result.stdout, 'stderr': result.stderr})
    except subprocess.CalledProcessError as e:
        return jsonify({'errore': "Errore nell'esecuzione di apirisultati.py", 'details': e.stderr + " " + e.stdout}), 500
    except Exception as e:
        return jsonify({'errore': str(e)}), 500


@app.route('/link_post.txt', methods=['GET'])
def get_link_post():
    try:
        with open("Post_Instagram/link_post.txt", "r", encoding="utf-8") as f:
            content = f.read()
        return jsonify({"successo": True, "contenuto": content})
    except Exception as e:
        return jsonify({"errore": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host='0.0.0.0', port=port)
