import requests
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

URL = "https://live.centrosportivoitaliano.it/25/Calcio-a-7/Emilia-Romagna/Reggio-Emilia/S3854/?j=NEU9REhGJjRGPVBOSyY0Rz1GTUQmNEg9RCY0ST1OJjRKPUdMSUgmNDI9Zg=="


def fetch_html():
    """Scarica la pagina usando requests."""
    try:
        r = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"}, timeout=15)
        r.raise_for_status()
        return r.text
    except Exception as e:
        print(f"❌ Errore HTTP: {e}")
        return ""


def parse_html(html):
    """Estrae le partite dall'HTML e ritorna un dict."""
    if not html:
        return {"partite": []}

    soup = BeautifulSoup(html, "html.parser")
    list_partite = soup.find_all("a", class_="btn btn-gara")
    json_squadre = {"partite": []}

    for partita in list_partite:
        squadre = []
        team_blocks = partita.find_all('div', class_='d-flex align-items-center gap-2')
        for block in team_blocks:
            nome_tag = block.find('span', class_='nome-squadra')
            nome = nome_tag.get_text(strip=True) if nome_tag else "N/A"
            squadre.append({
                "nome": nome.upper(),
                "logo": map_team.get(nome.upper())
            })

        datetime_block = partita.find('div', class_='d-flex flex-column')
        spans = datetime_block.find_all('span') if datetime_block else []
        data = spans[0].get_text(strip=True) if len(spans) > 0 else "N/A"
        ora = spans[1].get_text(strip=True) if len(spans) > 1 else "N/A"

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

    return json_squadre


# Debug locale
if __name__ == "__main__":
    html = fetch_html()
    risultati = parse_html(html)
    import json
    print(json.dumps(risultati, ensure_ascii=False, indent=2))
