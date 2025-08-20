"""
import requests
from bs4 import BeautifulSoup
import json

url = "https://www.csire.it/public/ajax/filtri.php"
payload = "albo=ok&risultati=ok&campionato=183&squadra=2725"
headers = {
    'accept': '*/*',
    'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.csire.it',
    'referer': 'https://www.csire.it/albo/risultati-calendario-classifiche-squadre.html',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
}

# Scarica la pagina
response = requests.post(url, headers=headers, data=payload)
soup = BeautifulSoup(response.text, "html.parser")

json_partite = {"partite": []}

for row in soup.find_all("tr"):
    squadre_nome = row.find_all("td", class_="squadra")
    squadre_logo = row.find_all("td", class_="logo-squadra")

    if not squadre_nome or not squadre_logo:
        continue

    squadre_dati = []
    for nome_td, logo_td in zip(squadre_nome, squadre_logo):
        nome = nome_td.get_text(strip=True) if nome_td else ""
        img = logo_td.find("img") if logo_td else None
        logo_url = "https://www.csire.it" + img["src"] if img and img.has_attr("src") else ""
        squadre_dati.append({"nome": nome, "logo": logo_url})

    # controlla se c'è REAL MALEDUCATI
    if any("REAL MALEDUCATI" in sq["nome"] for sq in squadre_dati):
        partita = {
            "squadre": squadre_dati,
            "data": row.find("td", class_="data").get_text(strip=True) if row.find("td", class_="data") else "",
            "ora": row.find("td", class_="ora").get_text(strip=True) if row.find("td", class_="ora") else "",
            "codice": row.find("td", class_="codice").get_text(strip=True) if row.find("td", class_="codice") else "",
            "risultato": row.find("span", class_="text-result").get_text(strip=True) if row.find("span", class_="text-result") else "",
            "link_dettaglio": "https://www.csire.it" + row.find("a", class_="button")["href"] if row.find("a", class_="button") and row.find("a", class_="button").has_attr("href") else ""
        }

        if partita["data"] != "RIPOSA":
            json_partite["partite"].append(partita)
            print("✅ Trovata partita:", partita)

# salva su file
with open("partite.json", "w", encoding="utf-8") as f:
    json.dump(json_partite, f, ensure_ascii=False, indent=4)

print("🎉 Partite salvate in partite.json")
"""

import requests
from bs4 import BeautifulSoup
import json
import time

url = "https://www.csire.it/public/ajax/filtri.php"
payload = "albo=ok&risultati=ok&campionato=183&squadra=2725"
headers = {
    'accept': '*/*',
    'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'origin': 'https://www.csire.it',
    'referer': 'https://www.csire.it/albo/risultati-calendario-classifiche-squadre.html',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
}

MAX_ATTEMPTS = 5  # massimo numero di tentativi
attempt = 0
success = False

while attempt < MAX_ATTEMPTS and not success:
    try:
        response = requests.post(url, headers=headers, data=payload, timeout=10)
        response.raise_for_status()  # genera errore se il codice HTTP non è 200
        success = True
    except requests.RequestException as e:
        attempt += 1
        print(f"⚠️ Tentativo {attempt} fallito: {e}")
        if attempt < MAX_ATTEMPTS:
            print("⏳ Riprovo tra 2 secondi...")
            time.sleep(2)
        else:
            print("❌ Impossibile ottenere la risposta dopo più tentativi.")
            exit(1)

soup = BeautifulSoup(response.text, "html.parser")
json_partite = {"partite": []}

for row in soup.find_all("tr"):
    squadre_nome = row.find_all("td", class_="squadra")
    squadre_logo = row.find_all("td", class_="logo-squadra")
    if not squadre_nome or not squadre_logo:
        continue

    squadre_dati = []
    for nome_td, logo_td in zip(squadre_nome, squadre_logo):
        nome = nome_td.get_text(strip=True) if nome_td else ""
        img = logo_td.find("img") if logo_td else None
        logo_url = "https://www.csire.it" + img["src"] if img and img.has_attr("src") else ""
        squadre_dati.append({"nome": nome, "logo": logo_url})

    if any("REAL MALEDUCATI" in sq["nome"] for sq in squadre_dati):
        partita = {
            "squadre": squadre_dati,
            "data": row.find("td", class_="data").get_text(strip=True) if row.find("td", class_="data") else "",
            "ora": row.find("td", class_="ora").get_text(strip=True) if row.find("td", class_="ora") else "",
            "codice": row.find("td", class_="codice").get_text(strip=True) if row.find("td", class_="codice") else "",
            "risultato": row.find("span", class_="text-result").get_text(strip=True) if row.find("span", class_="text-result") else "",
            "link_dettaglio": "https://www.csire.it" + row.find("a", class_="button")["href"] 
                              if row.find("a", class_="button") and row.find("a", class_="button").has_attr("href") else ""
        }
        if partita["data"] != "RIPOSA":
            json_partite["partite"].append(partita)
            print("✅ Trovata partita:", partita)

with open("partite.json", "w", encoding="utf-8") as f:
    json.dump(json_partite, f, ensure_ascii=False, indent=4)

print("🎉 Partite salvate in partite.json")

