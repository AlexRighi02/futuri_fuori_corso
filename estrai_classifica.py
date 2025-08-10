#!/usr/bin/env python3
import shutil
import json
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

try:
    from webdriver_manager.chrome import ChromeDriverManager
    USE_WDM = True
except ImportError:
    USE_WDM = False


# =====================================================
# FUNZIONI UTILI
# =====================================================

def wait_for_page_load(driver, timeout=10):
    """Aspetta che la pagina sia completamente caricata"""
    WebDriverWait(driver, timeout).until(
        lambda d: d.execute_script('return document.readyState') == 'complete'
    )


def close_banner(driver, elemento):
    """Scorri fino all'elemento (per evitare overlay/banner)"""
    driver.execute_script("arguments[0].scrollIntoView(true);", elemento)


def wait_and_click(driver, by, value, timeout=10, retries=10, element_index=None):
    """Click robusto con retry"""
    for attempt in range(1, retries + 1):
        try:
            if element_index is None:
                elemento = WebDriverWait(driver, timeout).until(
                    EC.element_to_be_clickable((by, value))
                )
            else:
                elementi = WebDriverWait(driver, timeout).until(
                    EC.presence_of_all_elements_located((by, value))
                )
                elemento = elementi[element_index]

            print(f"✅ Elemento trovato: {elemento.text.strip() if elemento.text else value}")

            close_banner(driver, elemento)

            try:
                driver.execute_script("document.getElementById('cm').style.display = 'none';")
                print("✅ Banner #cm nascosto con JavaScript")
            except Exception:
                pass

            elemento.click()
            wait_for_page_load(driver)
            print(f"✅ Click eseguito su {value}")
            return True

        except Exception as e:
            print(f"⚠️ Tentativo {attempt} fallito per {value}: {e}")
            wait_for_page_load(driver)

    print(f"❌ Impossibile cliccare {value} dopo {retries} tentativi")
    return False


# =====================================================
# CONFIGURAZIONE CHROME
# =====================================================

options = Options()

# Modalità headless compatibile
options.add_argument("--headless=new")  # per Chrome >=109

# Flag per evitare DevToolsActivePort error
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--disable-gpu")
options.add_argument("--disable-extensions")
options.add_argument("--disable-software-rasterizer")
options.add_argument("--remote-debugging-port=9222")  # fondamentale
options.add_argument("--window-size=1920,1080")

# qui inserisci il codice per cercare il browser
for candidate in ["/usr/bin/chromium", "chromium", "chromium-browser", "google-chrome"]:
    path = shutil.which(candidate)
    if path:
        options.binary_location = path
        print(f"✅ Browser trovato: {path}")
        break

# Trova chromedriver
chromedriver_path = shutil.which("chromedriver")

if chromedriver_path:
    print(f"✅ Chromedriver trovato in: {chromedriver_path}")
    service = Service(chromedriver_path)
else:
    if USE_WDM:
        print("⚠️ Chromedriver non trovato, scarico con webdriver-manager...")
        chromedriver_path = ChromeDriverManager().install()
        service = Service(chromedriver_path)
    else:
        raise Exception("❌ Chromedriver non trovato e webdriver-manager non installato! Esegui: pip install webdriver-manager")

driver = webdriver.Chrome(service=service, options=options)


# =====================================================
# AVVIO NAVIGAZIONE
# =====================================================
url = "https://www.csire.it/albo/risultati-calendario-classifiche-squadre.html"
driver.get(url)
wait_for_page_load(driver)

# Navigazione step-by-step
wait_and_click(driver, By.ID, 'C07')
wait_and_click(driver, By.ID, '0780')
wait_and_click(driver, By.ID, '183')
wait_and_click(driver, By.ID, '2725')
wait_and_click(driver, By.ID, 'C')
wait_and_click(driver, By.CLASS_NAME, 'btn-search', element_index=1)
wait_and_click(driver, By.ID, 'btn_submenu_classifiche')

# =====================================================
# PARSING PAGINA
# =====================================================
table = None
while True:
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='tbl-standard charts')
    if table:
        break
    else:
        print("❌ Tabella non trovata, ritento...")
        wait_for_page_load(driver)

driver.quit()

# =====================================================
# CREAZIONE JSON
# =====================================================
json_data = {"classifica": []}

for tr in table.find_all('tr')[1:]:
    td = tr.find_all('td')

    nome_squadra = td[1].find('a').text.strip() if td[1].find('a') else ''
    logo_squadra = td[0].find('img')['src'] if td[0].find('img') else ''
    logo_squadra = 'https://www.csire.it' + logo_squadra if logo_squadra else ''

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

# =====================================================
# SALVATAGGIO JSON
# =====================================================
with open('squadre.json', 'w', encoding='utf-8') as f:
    json.dump(json_data, f, ensure_ascii=False, indent=4)

print("✅ Dati delle squadre salvati in squadre.json")
