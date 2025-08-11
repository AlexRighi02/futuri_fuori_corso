import requests  # Per fare richieste HTTP
from bs4 import BeautifulSoup  # Per fare il parsing di HTML
import json  # Per lavorare con i dati JSON

# URL della pagina a cui inviare la richiesta POST
url = "https://www.csire.it/public/ajax/filtri.php"

# Dati che inviamo con la richiesta POST (payload)
payload = "albo=ok&classifiche=ok&campionato=183&squadra=2725&girone=C"

# Intestazioni HTTP da inviare insieme alla richiesta, per simulare un browser reale
headers = {
  'accept': '*/*',
  'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
  'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'origin': 'https://www.csire.it',
  'priority': 'u=1, i',
  'referer': 'https://www.csire.it/albo/risultati-calendario-classifiche-squadre.html',
  'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Google Chrome";v="138"',
  'sec-ch-ua-mobile': '?1',
  'sec-ch-ua-platform': '"Android"',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Mobile Safari/537.36',
  'x-requested-with': 'XMLHttpRequest',
  'Cookie': 'PHPSESSID=phse32o7n7pv32sh69c7iqch56; lb_csc={"level": ["necessary_cookies"], "version": "2"}'
}

# Invia la richiesta POST e salva la risposta
response = requests.request("POST", url, headers=headers, data=payload)

# Parsing del contenuto HTML ricevuto usando BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# Cerca la tabella con la classe CSS 'tbl-standard' dentro la pagina HTML
table = soup.find('table', class_='tbl-standard')

# Stampa l’intera tabella (per vedere cosa è stato scaricato)
#print(table)

# Crea una struttura dati JSON vuota per memorizzare le informazioni sulle squadre
json_data = {"classifica": []}

# Cicla su tutte le righe della tabella tranne la prima (che è l’intestazione)
for tr in table.find_all('tr')[1:] :
    # Trova tutte le celle della riga
    td = tr.find_all('td')

    # Estrae i dati da ciascuna colonna della tabella
    nome_squadra = td[1].find('a').text.strip() if td[1].find('a') else ''  # Nome della squadra
    logo_squadra = td[0].find('img')['src'] if td[0].find('img') else ''    # URL del logo
    logo_squadra = 'https://www.csire.it' + logo_squadra if logo_squadra else ''  # Completa l'URL del logo
    partite_giocate = int(td[3].text.strip())   # Numero di partite giocate
    punti = int(td[2].text.strip())             # Punti ottenuti
    vittorie = int(td[4].text.strip())          # Numero di vittorie
    perse = int(td[5].text.strip())              # Numero di partite perse
    pareggiate = int(td[6].text.strip())        # Numero di pareggi
    penalita = int(td[7].text.strip())          # Penalità subite
    gol_fatti = int(td[8].text.strip())         # Gol fatti
    gol_subiti = int(td[9].text.strip())        # Gol subiti
    diff_reti = gol_fatti - gol_subiti          # Differenza reti

    # Aggiunge i dati della squadra al JSON in formato dizionario
    json_data["classifica"].append({
        "squadra": nome_squadra,
        "logo": logo_squadra,
        "punti": punti,
        "giocate": partite_giocate,
        "vinte": vittorie,
        "perse": perse,
        "pareggiate": pareggiate,
        "penalita": penalita,
        "gol_fatti": gol_fatti,
        "gol_subiti": gol_subiti,
        "differenza_reti": diff_reti
    })

    # Salva il file JSON **ad ogni iterazione** (sovrascrive il file più volte)
    with open('classifica.json', 'w', encoding='utf-8') as f:
        json.dump(json_data, f, ensure_ascii=False, indent=4)

# Messaggio finale di conferma
print("✅ Dati delle squadre salvati in classifica.json")
