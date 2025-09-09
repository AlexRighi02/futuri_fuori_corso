import styles from "./ChiSiamo.module.css";
import styles3 from "./Rosa.module.css";
import CaroselloAvversari from './Carosello_Avversari';


const ChiSiamo = () => {
  return (
    <div className={`toBlur`} >
      <div className={styles.containerTitolo}>
        <h1 className={styles3.title_rosa}>CHI SIAMO</h1>
      </div>
      <div className={styles.container_chi_siamo}>

        <div className={styles.row_left}>
          <div className={styles.container_row_left}>          
            <div className={styles.img_left}>
              <img src="/img/img_chi_siamo/squadra.jpg" alt="Chi Siamo" className={styles.img_chi_siamo} />
            </div>
            <div className={styles.text_right}>
              <h3 className={`${styles.h3_responsive} text-white`}> LA SQUADRA</h3>
              <p className={styles.p_right}>
                FC Futuri Fuori Corso è una squadra di calcio a 7, con sede in provincia di Reggio Emilia e affiliata all'ASD Taneto 20.14, che nasce nel 2025 dal desiderio di alcuni amici di 
                costruire un gruppo unico, speciale, sincero, nel quale ognuno possa sentirsi parte di un tutto, vivendo il campo come una sana opportunità di crescere fianco a fianco. <br/>
                Questo è quello che avremmo voluto scrivere. In pratica la realtà è che metà di noi non aveva niente da fare alla sera… e l'altra metà cercava una scusa per poter liberamente 
                mangiare e bere “la qualunque” al pub senza sentirsi in colpa come un Geppo qualsiasi che torna in palestra il 7 gennaio dopo essersi divorato durante le feste natalizie anche 
                i flaconi formato famiglia di citrosodina della nonna scaduti nel 2015. Da lunedì dieta, promesso.              
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.linea}/>

        <div className={`${styles.row_right} ${styles.toHide}`}>
          <div className={`${styles.container_row_right} ${styles.marginAll}`}>
            <div className={styles.text_left}>
              <h3 className="text-white">NOME E STEMMA</h3>
              <p className={styles.p_left}>
                Il nostro nome parla da solo. È il terrore di chiunque si appresta a iniziare un percorso universitario, la mesta consapevolezza di chi ormai si arrende all'inevitabile e 
                ineluttabile compimento del proprio funesto destino… la gufata di chi ha anni di fantacalcio alle spalle ed è consapevole della sua potenza. Tutto infatti nasce anni fa, tra
                i banchi dell'Università, da un gruppo di amici che evidentemente aveva altre priorità rispetto a stare attento alle lezioni di ingegneria del software. E che però alla fine,
                spoiler, è riuscito a portarsi fieramente a casa anche la corona d'alloro. <br/>
                La squadra nasce sotto l'insegna di “Pepe the Frog”, il nostro faro, che per qualsivoglia motivo rappresenta intimamente ognuno di noi. Perché, diciamocelo: esiste qualcosa di 
                noi che non possa essere descritto con un Pepe? Attenzione, perché siamo certi che a questa domanda il nostro Beppe risponderebbe con uno sticker di Pepe. E se volete inviarci il vostro…             
              </p>
            </div>
            <div className={styles.img_right}>
              <img src="/img/LogoFFC.svg" alt="Logo" className={`${styles.img_chi_siamo} ${styles.svg}`} />
            </div>
          </div>
        </div>
        <div className={`${styles.row_left} ${styles.toShow}`}>
          <div className={styles.container_row_left}>          
            <div className={styles.img_left}>
              <img src="/img/LogoFFC.svg" alt="Logo" className={`${styles.img_chi_siamo} ${styles.pepe} ${styles.svg}`} />
            </div>
            <div className={styles.text_left}>
              <h3 className={`${styles.h3_responsive} text-white`}> NOME E STEMMA</h3>
              <p className={styles.p_left}>
                Il nostro nome parla da solo. È il terrore di chiunque si appresta a iniziare un percorso universitario, la mesta consapevolezza di chi ormai si arrende all'inevitabile e 
                ineluttabile compimento del proprio funesto destino… la gufata di chi ha anni di fantacalcio alle spalle ed è consapevole della sua potenza. Tutto infatti nasce anni fa, tra
                i banchi dell'Università, da un gruppo di amici che evidentemente aveva altre priorità rispetto a stare attento alle lezioni di ingegneria del software. E che però alla fine,
                spoiler, è riuscito a portarsi fieramente a casa anche la corona d'alloro. <br/>
                La squadra nasce sotto l'insegna di “Pepe the Frog”, il nostro faro, che per qualsivoglia motivo rappresenta intimamente ognuno di noi. Perché, diciamocelo: esiste qualcosa di 
                noi che non possa essere descritto con un Pepe? Attenzione, perché siamo certi che a questa domanda il nostro Beppe risponderebbe con uno sticker di Pepe. E se volete inviarci il vostro…             
              </p>
            </div>
          </div>
        </div>   

        <hr className={styles.linea}/>

        <div className={styles.row_left}>
          <div className={`${styles.container_row_left} ${styles.margin_mission}`}>          
            <div className={styles.img_left}>
              <img src="/img/img_chi_siamo/mission.jpg" alt="Mission" className={`${styles.img_chi_siamo} ${styles.mission}`} />
            </div>
            <div className={styles.text_right}>
              <h3 className={`${styles.h3_responsive} text-white`}> MISSION</h3>
              <p className={styles.p_right}>
                Se lo sport per definizione è uno dei più grandi strumenti per unire e abbattere le barriere, la missione dei Futuri Fuori Corso è quella di mettere al centro il suo nucleo fondamentale, 
                la sua essenza vera, quella spesso dimenticata o messa in secondo piano rispetto alla qualità tecnica del singolo: stare bene insieme. <br/>
                Certo, se poi nel frattempo magari potessimo evitare di sparare continuamente i palloni in mezzo ai campi o in curva nel cimitero di Taneto, considerato che ormai sembra più un tiro al 
                piattello che una partita di calcio… diciamo che il mister non si metterebbe a piangere, ecco. Va bene che i piedi non sono tutto, ma ogni volta che prova un tiro Alex si sentono i defunti 
                cominciare a pregare di nuovo.              
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.linea}/>

        <div className={`${styles.row_right} ${styles.toHide}`}>
          <div className={`${styles.container_row_right} ${styles.marginAll_3}`}>
            <div className={styles.text_left}>
              <h3 className="text-white">CAMPIONATO</h3>
              <p className={styles.p_left}>
                Nella stagione 2025/2026 la squadra partecipa alla Bronze League del campionato provinciale di calcio a 7 organizzato dal CSI di Reggio Emilia, grazie al sostegno di numerosi e preziosi 
                partner e alla gentile concessione di Matt Furie per l'utilizzo del nostro amato Pepe. In realtà, tutte queste persone non sono esattamente consapevoli di aver reso possibile, col loro 
                contributo, la creazione di uno scempio calcistico che neanche Tressoldi, Gagliardini e Joao Mario con la stessa maglia potrebbero eguagliare. Poco importa: tanto ormai il danno è fatto 
                e ci giocheremo con onore le ultime posizioni… facciamo già i complimenti ai nostri avversari per la vittoria.             
              </p>
            </div>
            <div className={styles.img_right}>
              <img src="/img/img_chi_siamo/campionato.jpg" alt="CSI" className={`${styles.img_chi_siamo} ${styles.svg}`} />
            </div>
          </div>
        </div>
        <div className={`${styles.row_left} ${styles.toShow}`}>
          <div className={styles.container_row_left}>          
            <div className={styles.img_left}>
              <img src="/img/img_chi_siamo/campionato.jpg" alt="CSI" className={`${styles.img_chi_siamo} ${styles.csi} ${styles.svg}`} />
            </div>
            <div className={styles.text_left}>
              <h3 className={`${styles.h3_responsive} text-white`}> CAMPIONATO</h3>
              <p className={styles.p_left}>
                Nella stagione 2025/2026 la squadra partecipa alla Bronze League del campionato provinciale di calcio a 7 organizzato dal CSI di Reggio Emilia, grazie al sostegno di numerosi e preziosi 
                partner e alla gentile concessione di Matt Furie per l'utilizzo del nostro amato Pepe. In realtà, tutte queste persone non sono esattamente consapevoli di aver reso possibile, col loro 
                contributo, la creazione di uno scempio calcistico che neanche Tressoldi, Gagliardini e Joao Mario con la stessa maglia potrebbero eguagliare. Poco importa: tanto ormai il danno è fatto 
                e ci giocheremo con onore le ultime posizioni… facciamo già i complimenti ai nostri avversari per la vittoria.             
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.linea}/>

        <div className={styles.row_left}>
          <div className={`${styles.container_row_left} ${styles.marginAll_2}`}>          
            <div className={styles.img_left}>
              <img src="/img/img_chi_siamo/stadio.jpg" alt="Stadio" className={styles.img_chi_siamo} />
            </div>
            <div className={styles.text_right}>
              <h3 className={`${styles.h3_responsive} text-white`}> STADIO</h3>
              <p className={styles.p_right}>
                Giochiamo le partite in casa all'ormai ribattezzato “Tannetum Stadium” di Taneto di Gattatico (RE), in Via Tonelli, n. 20. Anche se vedere giocare calciatori del calibro di Fede, Tommi e 
                Ludo è uno spettacolo da mille e una notte, una gioia per gli occhi a dir poco poetica che non dimenticherete, vi assicuriamo che non facciamo pagare il biglietto. Per vedere Dibla, Done e 
                Lollo in campo, invece… potete lasciare un'offerta libera. I pali di Marti sono omaggio.              
              </p>
            </div>
          </div>
        </div>

        <hr className={styles.linea}/>

        <div className={`${styles.row_right} ${styles.toHide}`}>
          <div className={`${styles.container_row_right}`}>
            <div className={styles.text_left}>
              <h3 className="text-white">I NOSTRI SOCIAL</h3>
              <p className={styles.p_left}>
                Se volete divertirvi, seguirci, scoprire quante str…epitose novità creiamo ogni giorno per passare il tempo, potete trovarci sempre attivi sulla nostra pagina instagram, curata instancabilmente 
                da diversi nostri ragazzi, che per riuscire a stoppare un pallone devono andare a fare un'immersione nella vasca a Lourdes, ma in quanto a inventarsi contenuti stupidi sono veramente i numeri uno. 
                E pensate che sono sobri. Provate a immaginarli al pub dopo un bicchiere d'acqua frizzante… o, meglio ancora, venite direttamente a vederli.             
              </p>
            </div>
            <div className={styles.img_right}>
              <a href="https://www.instagram.com/futuri_fuori_corso/" target="_blank" rel="noopener noreferrer">
                <img src="/img/img_chi_siamo/insta.jpg" alt="Instagram" className={`${styles.img_chi_siamo} ${styles.insta}`} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.row_left}>
          <div className={`${styles.row_left} ${styles.toShow}`}>          
            <div className={styles.img_left}>
              <a href="https://www.instagram.com/futuri_fuori_corso/" target="_blank" rel="noopener noreferrer">
                <img src="/img/img_chi_siamo/insta.jpg" alt="Instagram" className={`${styles.img_chi_siamo} ${styles.insta}`} />
              </a>
            </div>
            <div className={styles.text_right}>
              <h3 className={`${styles.h3_responsive} text-white`}> I NOSTRI SOCIAL</h3>
              <p className={styles.p_left}>
                Se volete divertirvi, seguirci, scoprire quante str…epitose novità creiamo ogni giorno per passare il tempo, potete trovarci sempre attivi sulla nostra pagina instagram, curata instancabilmente 
                da diversi nostri ragazzi, che per riuscire a stoppare un pallone devono andare a fare un'immersione nella vasca a Lourdes, ma in quanto a inventarsi contenuti stupidi sono veramente i numeri uno. 
                E pensate che sono sobri. Provate a immaginarli al pub dopo un bicchiere d'acqua frizzante… o, meglio ancora, venite direttamente a vederli.             
              </p>
            </div>
          </div>
        </div>
      </div>


      <div className={styles.containerSponsor}>
        <CaroselloAvversari
            images={[
              '/img/img_sponsor/vittorio_malangone.png',
              '/img/img_sponsor/finelli.png',
              '/img/img_sponsor/green_arreda.png',
              '/img/img_sponsor/playa.png',
              '/img/img_sponsor/decathlon.png',
            ]}
            names={[]}
            imageWidth={450}
            imageHeight={150}
            title="I NOSTRI PARTNER"
            subtitle=""
            marginTop={35}
            marginBetween={110}
            marginPersonalized={true}
        />
      </div>
    </div>
  );
};

export default ChiSiamo;