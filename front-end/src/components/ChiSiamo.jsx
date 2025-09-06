import styles from "./ChiSiamo.module.css";
import styles2 from "./Carosello_Avversari.module.css";
import styles3 from "./Rosa.module.css";
import styles4 from "./Footer.module.css";
import Carosello_Avversari from './Carosello_Avversari';


const ChiSiamo = () => {
  return (
    <div className={`toBlur`} >
      <div className={styles.containerTitolo}>
        <h1 className={styles3.title_rosa}>CHI SIAMO</h1>
        <div className={styles.container_chi_siamo}>
          <p className={`${styles.text} ${styles4.privacy_corpo}`} style={{ backgroundImage: 'url("/img/WallPaper_black.png")' }}>
            <strong className={styles4.privacy_bold}>LA SQUADRA:</strong> FC Futuri Fuori Corso è una squadra di calcio a 7, con sede in provincia di Reggio Emilia e affiliata all’ASD Taneto 20.14, che nasce nel 2025 dal desiderio di alcuni amici di costruire un gruppo unico, speciale, sincero, nel quale ognuno possa sentirsi parte di un tutto, vivendo il campo da gioco come una sana opportunità di crescere fianco a fianco. <br/><br/>

            <strong className={styles4.privacy_bold}>MISSION:</strong> Se lo sport per definizione è uno dei più grandi strumenti per unire e abbattere le barriere, la missione dei Futuri Fuori Corso è quella di mettere al centro il suo nucleo fondamentale, la sua essenza vera, quella spesso dimenticata o messa in secondo piano rispetto alla qualità tecnica del singolo: stare bene insieme.<br/><br/>

            <strong className={styles4.privacy_bold}>CAMPIONATO:</strong> Nella stagione 2025/2026 la squadra partecipa alla Bronze League del campionato provinciale di calcio a 7 organizzato dal CSI di Reggio Emilia, grazie al sostegno di numerosi e preziosi partner e alla gentile concessione di Matt Furie per l’utilizzo del nostro amato Pepe.<br/><br/>

            <strong className={styles4.privacy_bold}>STADIO:</strong> Giochiamo le partite in casa all’ormai ribattezzato “Tannetum Stadium” di Taneto di Gattatico (RE), in Via Tonelli, n. 20.<br/><br/>

            E se hai voglia di divertirti e fare un calcetto insieme a noi…non aspettare e scrivici! Ti basterà portare con te le scarpe e un sorriso! Perché siamo certi che la forza del gruppo sarà ciò che ci porterà tutti insieme sempre alla vittoria…e, soprattutto, al pub nel post partita.
          </p>
        </div>
      </div>

      <div className={styles2.containerSponsor}>
        <div className={styles.containerTitolo}>

        </div>
      </div>

      <div className={styles.containerSponsor}>
        <Carosello_Avversari
            images={[
                '/img/img_sponsor/green_arreda.png',
                '/img/img_sponsor/vittorio_malangone.png',
                '/img/img_sponsor/playa.png',
                '/img/img_sponsor/decathlon.png',
                '/img/img_sponsor/finelli.png',
            ]}
            names={[]}
            imageWidth={300}
            imageHeight={100}
            title="I NOSTRI PARTNER"
            subtitle=""
            marginTop={35}
        />
      </div>
    </div>
  );
};

export default ChiSiamo;