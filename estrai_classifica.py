from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import time


# Creo una funzione chiamata close_banner() per chiudere eventuali banner dei cookie
def close_banner(driver, elemento):
    # Scrolla fino all'elemento
    driver.execute_script("arguments[0].scrollIntoView(true);", elemento)


def find_click_element_by_id(driver, element_id):
    try:
        # Attendi che il link con id specificato sia cliccabile
        elemento = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, element_id))
        )
        print(f"✅ Elemento trovato: {elemento.text}")
        
        # Se l'elemento non è cliccabile, prova a risolvere il bug
        close_banner(driver, elemento)

        elemento.click()
        print(f"✅ Click eseguito su #{element_id}")
        
        # Attendi che il contenuto si carichi
        time.sleep(0.25)

    except Exception as e:
        print("❌ Errore durante il click:", str(e))


def find_click_element_by_class(driver, element_class):
    try:
        # Attendi che il link con classe specificata sia cliccabile
        elementi = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CLASS_NAME, element_class))
        )
        elemento = elementi[1]  # Prendi il secondo elemento trovato -> Quello relativo alla ricerca filtrata
        print(f"✅ Elemento trovato: {elemento.text}")

        # Se l'elemento non è cliccabile, prova a risolvere il bug
        close_banner(driver, elemento)

        # Prova a nascondere il div che blocca il click
        try:
            driver.execute_script("document.getElementById('cm').style.display = 'none';")
            print("✅ Banner #cm nascosto con JavaScript")
        except Exception as e:
            print("⚠️ Impossibile nascondere #cm:", str(e))

        elemento.click()
        print(f"✅ Click eseguito su .{element_class}")

        # Attendi che il contenuto si carichi
        time.sleep(0.25)

    except Exception as e:
        print("❌ Errore durante il click:", str(e))


# Configura il browser headless (facoltativo)
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')  # Utile su Linux

# ChromeDriver scaricato automaticamente nella versione corretta
service = Service(ChromeDriverManager().install())

# ✅ CORRETTO: usa il Service
driver = webdriver.Chrome(service=service, options=options)

# Carica la pagina
url = "https://www.csire.it/albo/risultati-calendario-classifiche-squadre.html"
driver.get(url)

find_click_element_by_id(driver, 'C07')
find_click_element_by_id(driver, '0780')
find_click_element_by_id(driver, '183')
find_click_element_by_id(driver, '2725')
find_click_element_by_id(driver, 'C')
find_click_element_by_class(driver, 'btn-search')   
find_click_element_by_id(driver, 'btn_submenu_classifiche')


# Ottieni il nuovo HTML dopo il click
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

# Trova la tabella con le classifiche, ovvero un elemento <table> con class='tbl-standard charts'
table = soup.find('table', class_='tbl-standard charts')
driver.quit()
time.sleep(0.25)


# Creo la struttura JSON per i dati della classifica
json_data = {
    "classifica": []
}

# Prendo i dati dalla tabella della classifica
for tr in table.find_all('tr')[1:]:  # Salto la prima riga che è l'intestazione
    td = tr.find_all('td')

    # td[1] è una riga di questo tipo: <td class="squadra"><a href="/albo/squadre/five-club--open-a-7-golden-l--2745.html" title="FIVE CLUB">FIVE CLUB</a></td>... il nome della squadra è il testo dell'elemento <a>
    nome_squadra = td[1].find('a').text.strip() if td[1].find('a') else ''

    # td[0] è una riga di questo tipo: <td class="logo-squadra"><img src="/media/loghi_societa/04200545.jpg" alt="FIVE CLUB"></td>... il logo della squadra è l'attributo src dell'elemento <img>
    logo_squadra = td[0].find('img')['src'] if td[0].find('img') else ''
    logo_squadra = 'https://www.csire.it' + logo_squadra

    punti = int(td[2].text.strip())
    partite_giocate = int(td[3].text.strip())
    vittorie = int(td[4].text.strip())    
    sconfitte = int(td[5].text.strip())
    pareggi = int(td[6].text.strip())
    penalita = int(td[7].text.strip())
    gol_fatti = int(td[8].text.strip())
    gol_subiti = int(td[9].text.strip())
    differenza_reti = gol_fatti - gol_subiti

    json_data["classifica"].append({
        "squadra": nome_squadra,
        "logo": logo_squadra,
        "punti": punti,
        "giocate": partite_giocate,
        "vinte": vittorie,
        "perse": sconfitte,
        "pareggiate": pareggi,
        "penalita": penalita,
        "reti_fatte": gol_fatti,
        "reti_subite": gol_subiti,
        "differenza_reti": differenza_reti
    })

print(json_data)

# Stampo i dati JSON
import json

with open('squadre.json', 'w', encoding='utf-8') as f:
    json.dump(json_data, f, ensure_ascii=False, indent=4)

print("✅ Dati delle squadre salvati in squadre.json")