import os
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright

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
STORAGE_STATE = "storage_state.json"

def fetch_html():
    """Scarica la pagina usando Playwright e ritorna l'HTML."""
    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            headless=True,
            args=[
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-gpu",
                "--disable-software-rasterizer"
            ]
        )

        # Riutilizza cookie/sessione se già salvata
        if os.path.exists(STORAGE_STATE):
            context = browser.new_context(
                storage_state=STORAGE_STATE,
                user_agent="Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
                locale="it-IT",
                extra_http_headers={"Accept-Language": "it-IT,it;q=0.9"}
            )
        else:
            context = browser.new_context(
                user_agent="Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0",
                locale="it-IT",
                extra_http_headers={"Accept-Language": "it-IT,it;q=0.9"}
            )

        page = context.new_page()
        page.goto(URL, wait_until="networkidle", timeout=60000)

        try:
            page.wait_for_selector("a.btn.btn-gara", timeout=20000)
        except Exception:
            print("⚠️ Attenzione: potresti essere ancora bloccato da Cloudflare")

        html = page.content()
        context.storage_state(path=STORAGE_STATE)
        browser.close()
        return html

def parse_html(html):
    """Estrae le partite dall'HTML e ritorna un dict."""
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
    print(html)
    risultati = parse_html(html)
    import json
