from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json


# 🔹 Attende il caricamento completo della pagina
def wait_for_page_load(driver, timeout=10):
    WebDriverWait(driver, timeout).until(
        lambda d: d.execute_script('return document.readyState') == 'complete'
    )


# 🔹 Nasconde eventuali banner di cookie che bloccano i click
def close_banner(driver, elemento):
    driver.execute_script("arguments[0].scrollIntoView(true);", elemento)


# 🔹 Funzione universale per cliccare un elemento con retry
def wait_and_click(driver, by, value, timeout=10, retries=3, element_index=None):
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

            # Scorri fino all'elemento
            close_banner(driver, elemento)

            # Nascondi eventuale banner #cm
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
# CONFIGURAZIONE BROWSER
# =====================================================
options = Options()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

service = Service(ChromeDriverManager().install())
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
html = driver.page_source
soup = BeautifulSoup(html, 'html.parser')

table = None
while True:
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table', class_='tbl-standard charts')
    if table:        
        break
    else:
        print("❌ Tabella non trovata, ritento")
        wait_for_page_load(driver)

driver.quit()

# =====================================================
# CREAZIONE JSON
# =====================================================
json_data = {"classifica": []}

for tr in table.find_all('tr')[1:]:  # Salta l'intestazione
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
