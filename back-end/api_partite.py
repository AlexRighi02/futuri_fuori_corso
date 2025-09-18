from playwright.sync_api import sync_playwright
import json
from bs4 import BeautifulSoup

map_team = {
    "F.C. FUTURI FUORI CORSO": "/img/img_avversari/futuri_fuori_corso.png",
    "FOCUMEU": "/img/img_avversari/focumeu.png",
    "U.S. MONTECCHIO NEW TEAM": "/img/img_avversari/new_team.png",
    "ATS TRINITA' ELITE": "/img/img_avversari/trinita_elite.png",
    "GATTATICO CLUB RAPTORS": "/img/img_avversari/gattatico_club_raptors.png",
    "INDOMINUS XI": "/img/img_avversari/indominus.png",
    "U.S. MONTECCHIO YOUNG": "/img/img_avversari/montecchio.png",
    "THE MOUNT II": "/img/img_avversari/the_mount.png",
    "AN CALCIO A 7": "/img/img_avversari/an_calcio.png",
    "ATS TRINITA'": "/img/img_avversari/trinita.png"
}

url = "https://live.centrosportivoitaliano.it/25/Calcio-a-7/Emilia-Romagna/Reggio-Emilia/S3854/?j=NEU9REhGJjRGPVBOSyY0Rz1GTUQmNEg9RCY0ST1OJjRKPUdMSUgmNDI9Zg=="

json_squadre = {"partite": []}

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)  # headless=True per Fly.io
    page = browser.new_page()
    page.goto(url, timeout=60000)  # timeout 60s per sicurezza

    # Otteniamo il contenuto HTML renderizzato
    html = page.content()
    soup = BeautifulSoup(html, 'html.parser')

    # PARSING IDENTICO A QUELLO CHE VOLEVATE MANTENERE
    list_partite = soup.find_all('a', class_='btn btn-gara')
    print(f"🎉 Trovate {len(list_partite)} partite.")
    for partita in list_partite:
        squadre = []

        # blocco squadre
        team_blocks = partita.find_all('div', class_='d-flex align-items-center gap-2')
        for block in team_blocks:
            nome_tag = block.find('span', class_='nome-squadra')
            nome = nome_tag.get_text(strip=True) if nome_tag else "N/A"
            squadre.append({
                "nome": nome.upper(),
                "logo": map_team.get(nome.upper())
            })

        # data e ora
        datetime_block = partita.find('div', class_='d-flex flex-column')
        spans = datetime_block.find_all('span') if datetime_block else []
        data = spans[0].get_text(strip=True) if len(spans) > 0 else "N/A"
        ora = spans[1].get_text(strip=True) if len(spans) > 1 else "N/A"

        # risultato
        risultato_block = partita.find('div', class_='d-none d-sm-flex')
        risultato_spans = risultato_block.find_all('span') if risultato_block else []
        risultato_1 = risultato_spans[0].get_text(strip=True) if len(risultato_spans) > 0 else " "
        risultato_2 = risultato_spans[1].get_text(strip=True) if len(risultato_spans) > 1 else " "
        risultato = f"{risultato_1}-{risultato_2}"

        json_squadre["partite"].append({
            "squadre": squadre,
            "data": data,
            "ora": ora,
            "risultato": risultato
        })

    browser.close()

# Salvataggio su JSON
with open("risultati.json", "w", encoding="utf-8") as f:
    json.dump(json_squadre, f, ensure_ascii=False, indent=4)

print("🎉 Partite salvate in risultati.json")
