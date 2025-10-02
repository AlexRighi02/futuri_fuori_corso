import requests
import json
from bs4 import BeautifulSoup

map_team = {
    "F.C. FUTURI FUORI CORSO": "/img/img_anteprima/futuri_fuori_corso.png",
    "FOCUMEU": "/img/img_anteprima/focumeu.png",
    "U.S. MONTECCHIO NEW TEAM": "/img/img_anteprima/new_team.png",
    "ATS TRINITA' ELITE": "/img/img_anteprima/trinita_elite.png",
    "GATTATICO CLUB RAPTORS": "/img/img_anteprima/gattatico_club_raptors.png",
    "INDOMINUS XI": "/img/img_anteprima/indominus.png",
    "U.S. MONTECCHIO YOUNG": "/img/img_anteprima/montecchio.png",
    "THE MOUNT II": "/img/img_anteprima/the_mount.png",
    "AN CALCIO A 7": "/img/img_anteprima/an_calcio.png",
    "ATS TRINITA'": "/img/img_anteprima/trinita.png"
}

url = "https://live.centrosportivoitaliano.it/25/Calcio-a-7/Emilia-Romagna/Reggio-Emilia/S3854/?j=NEU9REhGJjRGPVBOSyY0Rz1GTUQmNEg9RCY0ST1OJjRKPUdMSUgmNDI9Zg=="

payload = {}
headers = {
  'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.5',
  'Accept-Encoding': 'gzip, deflate, br, zstd',
  'Connection': 'keep-alive',
  'Cookie': 'pac1=dsf98qay; ASPSESSIONIDQATCDQTA=ABCAADGAECONBHFGALCFNFAI; CookieConsent={stamp:%27orcl06Ac8BbZSCf61CkolL9aaXFGpGtEa7Ek5CQkBYwH5FXZb1yFhw==%27%2Cnecessary:true%2Cpreferences:false%2Cstatistics:false%2Cmarketing:false%2Cmethod:%27explicit%27%2Cver:1%2Cutc:1758014022991%2Cregion:%27it%27}; pac2=042; pac3=CA7; amzn_consent=%7B%22geo%22%3A%7B%22countryCode%22%3A%22it%22%7D%2C%22amazonConsentFormat%22%3A%7B%22amznAdStorage%22%3A%22DENIED%22%2C%22amznUserData%22%3A%22DENIED%22%7D%2C%22timestamp%22%3A%222025-09-16T10%3A16%3A36.156Z%22%2C%22version%22%3A%221%22%7D; pac1=dsf98qay',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Sec-Fetch-User': '?1',
  'Priority': 'u=0, i',
  'TE': 'trailers'
}

headers.pop('Accept-Encoding', None)
response = requests.get(url, headers=headers)
soup = BeautifulSoup(response.text, 'html.parser')

list_partite = soup.find_all('a', class_='btn btn-gara')

json_squadre = {"partite": []}

for partita in list_partite:
    squadre = []
    
    # Partita è un link <a>
    href = partita['href']
    full_link = f"https://live.centrosportivoitaliano.it{href}"

    # Trova i due blocchi di squadra
    team_blocks = partita.select('div.d-flex.align-items-center.gap-2')
    for block in team_blocks:
        nome_tag = block.find('span', class_='nome-squadra')
        nome = nome_tag.get_text(strip=True) if nome_tag else "N/A"
        
        # logo_tag = block.find('img')
        # logo = logo_tag['src'] if logo_tag else None
        #print("ciao", map_team.get(nome.upper()))
        squadre.append({
            "nome": nome.upper(),
            "logo": map_team.get(nome.upper())
        })

    # Trova data e ora
    datetime_block = partita.find('div', class_='d-flex flex-column')
    spans = datetime_block.find_all('span') if datetime_block else []
    data = spans[0].get_text(strip=True) if len(spans) > 0 else "N/A"
    ora = spans[1].get_text(strip=True) if len(spans) > 1 else "N/A"

    # Trova risultato (nella parte sotto con due <span>)
    risultato_block = partita.select('div.d-flex.flex-column')[2]
    risultato_spans = risultato_block.select('span')
    risultato = ""
    if len(risultato_spans) <= 2:
        risultato = "-"
    else:
        risultato_1 = risultato_spans[1].get_text(strip=True)
        risultato_2 = risultato_spans[3].get_text(strip=True)
        risultato = f"{risultato_1}-{risultato_2}"

    json_squadre["partite"].append({
        "squadre": squadre,
        "data": data,
        "ora": ora,
        "risultato": risultato,
        "link_dettaglio": full_link
    })

# Output finale
with open("back-end/risultati.json", "w", encoding="utf-8") as f:
    json.dump(json_squadre, f, ensure_ascii=False, indent=4)

print("🎉 Partite salvate in back-end/risultati.json")
