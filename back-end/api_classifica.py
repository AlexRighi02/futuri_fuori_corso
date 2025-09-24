import requests
import json
from bs4 import BeautifulSoup

from functools import cmp_to_key

def costruisci_scontri_diretti(partite):
    """
    Crea un dizionario con le statistiche degli scontri diretti
    tra coppie di squadre.
    Chiave: (squadraA, squadraB)
    Valore: {
        "vittorie_a": int,
        "vittorie_b": int,
        "gf_a": int,
        "gf_b": int
    }
    """
    scontri = {}

    for p in partite:
        squadre = p["squadre"]  # lista con due squadre
        squadra_a = squadre[0]["nome"]
        squadra_b = squadre[1]["nome"]

        risultato = p["risultato"]  # es: "2-1"
        gol_a, gol_b = map(int, risultato.split("-"))

        key_ab = (squadra_a, squadra_b)
        key_ba = (squadra_b, squadra_a)

        # inizializzo le due direzioni se non ci sono
        if key_ab not in scontri:
            scontri[key_ab] = {"vittorie_a": 0, "vittorie_b": 0, "gf_a": 0, "gf_b": 0}
        if key_ba not in scontri:
            scontri[key_ba] = {"vittorie_a": 0, "vittorie_b": 0, "gf_a": 0, "gf_b": 0}

        # aggiorno gol
        scontri[key_ab]["gf_a"] += gol_a
        scontri[key_ab]["gf_b"] += gol_b
        scontri[key_ba]["gf_a"] += gol_b
        scontri[key_ba]["gf_b"] += gol_a

        # aggiorno vittorie
        if gol_a > gol_b:
            scontri[key_ab]["vittorie_a"] += 1
            scontri[key_ba]["vittorie_b"] += 1
        elif gol_b > gol_a:
            scontri[key_ab]["vittorie_b"] += 1
            scontri[key_ba]["vittorie_a"] += 1
        # pareggi -> niente vittorie

    return scontri


def confronta_squadre(a, b, risultati_scontri):
    # 1) PUNTI
    if a["punti"] != b["punti"]:
        return b["punti"] - a["punti"]

    # Recupero scontri diretti
    scontro_ab = risultati_scontri.get((a["squadra"], b["squadra"]), {"vittorie_a": 0, "vittorie_b": 0, "gf_a": 0, "gf_b": 0})

    vittorie_a = scontro_ab["vittorie_a"]
    vittorie_b = scontro_ab["vittorie_b"]
    gf_a = scontro_ab["gf_a"]
    gf_b = scontro_ab["gf_b"]

    # 2) MAGGIOR NUMERO DI VITTORIE NEGLI SCONTRI DIRETTI
    if vittorie_a != vittorie_b:
        return vittorie_b - vittorie_a

    # 3) DIFFERENZA RETI NEGLI SCONTRI DIRETTI
    diff_reti_a = gf_a - gf_b
    diff_reti_b = gf_b - gf_a
    if diff_reti_a != diff_reti_b:
        return diff_reti_b - diff_reti_a

    # 4) MAGGIOR NUMERO DI RETI FATTE NEGLI SCONTRI DIRETTI
    if gf_a != gf_b:
        return gf_b - gf_a

    # 5) MAGGIOR NUMERO DI VITTORIE IN TUTTO IL CAMPIONATO
    if a["vinte"] != b["vinte"]:
        return b["vinte"] - a["vinte"]

    # 6) DIFFERENZA RETI IN TUTTO IL CAMPIONATO
    if a["differenza_reti"] != b["differenza_reti"]:
        return b["differenza_reti"] - a["differenza_reti"]

    # 7) MAGGIOR NUMERO DI RETI FATTE IN TUTTO IL CAMPIONATO
    if a["gol_fatti"] != b["gol_fatti"]:
        return b["gol_fatti"] - a["gol_fatti"]

    return 0  # perfetta parità


def ordina_classifica(lista_classifica, partite):
    scontri = costruisci_scontri_diretti(partite)
    return sorted(lista_classifica, key=cmp_to_key(lambda x, y: confronta_squadre(x, y, scontri)))


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

url = "https://live.centrosportivoitaliano.it/25/Calcio-a-7/Emilia-Romagna/Reggio-Emilia/C290/?j=NEU9REhGJjRGPVBOSyY0Rz1GTUQmNEg9RCY0ST1OJjQyPWU="

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

print(soup)

list_partite = soup.find_all('a', class_='btn btn-gara')

json_squadre = {"partite": []}

for partita in list_partite:
    squadre = []

    # Trova i due blocchi di squadra
    team_blocks = partita.select('div.d-flex.align-items-center.gap-2')
    for block in team_blocks:
        nome_tag = block.find('span', class_='nome-squadra')
        nome = nome_tag.get_text(strip=True) if nome_tag else "N/A"
        squadre.append({
            "nome": nome.upper(),
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

    if risultato != "-":
        json_squadre["partite"].append({
            "squadre": squadre,
            "data": data,
            "ora": ora,
            "risultato": risultato
        })

# Output finale
with open("campionato.json", "w", encoding="utf-8") as f:
    json.dump(json_squadre, f, ensure_ascii=False, indent=4)

print("🎉 Partite salvate in campionato.json")

# CONCLUSO IL SALVATAGGIO DELLE PARTITE GIOCATE MI SALVO LA CLASSIFICA IN UN FILE JSON
# CRITERI PER I PIAZZAMENTI DELLA CLASSIFICA:
# 1) PUNTI
# SE DUE O PIù SQUADRE HANNO STESSI PUNTI, A QUEL PUNTO SI CONSIDERANO SOLO GLI SCONTRI DIRETTI TRA LE SQUADRE INTERESSATE
# 2) MAGGIOR NUMERO DI VITTORIE NEGLI SCONTRI DIRETTI
# 3) DIFFERENZA RETI NEGLI SCONTRI DIRETTI
# 4) MAGGIOR NUMERO DI RETI FATTE NEGLI SCONTRI DIRETTI
# 5) MAGGIOR NUMERO DI VITTORIE IN TUTTO IL CAMPIONATO
# 6) DIFFERENZA RETI IN TUTTO IL CAMPIONATO
# 7) MAGGIOR NUMERO DI RETI FATTE IN TUTTO IL CAMPIONATO

# POPOLO LA CLASSIFICA CON TUTTI IN NOMI IN MAP_TEAM, A SINISTRA
classifica = {}

# Inizializza la classifica con tutte le squadre presenti in map_team
for nome_squadra in map_team.keys():
    classifica[nome_squadra] = {
        "squadra": nome_squadra,
        "logo": map_team[nome_squadra],
        "punti": 0,
        "giocate": 0,
        "vinte": 0,
        "perse": 0,
        "pareggiate": 0,
        "gol_fatti": 0,
        "gol_subiti": 0,
        "differenza_reti": 0
    }

# ORA SCORRO IL FILE campionato.json E CALCOLO LA CLASSIFICA
with open("campionato.json", "r", encoding="utf-8") as f:
    dati_partite = json.load(f)
    
partite = dati_partite["partite"]    

for partita in partite:
    squadra1 = partita["squadre"][0]["nome"]
    squadra2 = partita["squadre"][1]["nome"]
    
    classifica[squadra1]["giocate"] += 1
    classifica[squadra2]["giocate"] += 1
    
    risultato = partita["risultato"]
    
    reti1, reti2 = map(int, risultato.split('-'))
    
    classifica[squadra1]["gol_fatti"] += reti1
    classifica[squadra1]["gol_subiti"] += reti2
    classifica[squadra2]["gol_fatti"] += reti2
    classifica[squadra2]["gol_subiti"] += reti1

    if reti1 > reti2:
        classifica[squadra1]["punti"] += 3
        classifica[squadra1]["vinte"] += 1
        classifica[squadra2]["perse"] += 1
    elif reti1 < reti2:
        classifica[squadra2]["punti"] += 3
        classifica[squadra2]["vinte"] += 1
        classifica[squadra1]["perse"] += 1
    else:
        classifica[squadra1]["punti"] += 1
        classifica[squadra2]["punti"] += 1
        classifica[squadra1]["pareggiate"] += 1
        classifica[squadra2]["pareggiate"] += 1
        
lista_classifica = []
for squadra, stats in classifica.items():
    differenza_reti = stats["gol_fatti"] - stats["gol_subiti"]
    lista_classifica.append({
        "squadra": squadra,
        "logo": stats["logo"],            
        "punti": stats["punti"],
        "giocate": stats["giocate"],
        "vinte": stats["vinte"],
        "pareggiate": stats["pareggiate"],
        "perse": stats["perse"],
        "gol_fatti": stats["gol_fatti"],
        "gol_subiti": stats["gol_subiti"],
        "differenza_reti": differenza_reti
    })

# lista_classifica deve essere già stata costruita prima
classifica_ordinata = ordina_classifica(lista_classifica, partite)

# Salvo la classifica ordinata
with open("classifica.json", "w", encoding="utf-8") as f:
    json.dump(classifica_ordinata, f, indent=4, ensure_ascii=False)

print("Classifica salvata in classifica.json")
