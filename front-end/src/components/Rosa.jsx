import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Rosa.module.css";

const players = {
  portieri: [
    {
      name: "Emanuele Giglioli",
      number: 1,
      img: "img/img_rosa/emanuele_giglioli.jpg",
    }
  ],
  difensori: [
    {
      name: "Giuseppe Malangone",
      number: 3,
      img: "img/img_rosa/giuseppe_malangone.jpg",
    },
    {
      name: "Giuseppe Di Blasi",
      number: 4,
      img: "img/img_rosa/giuseppe_di_blasi.jpg",
    },
    {
      name: "Gabriel Aleotti",
      number: 14,
      img: "img/img_rosa/gabriel_aleotti.jpg",
    },
    {
      name: "Andrea Montepietra",
      number: 21,
      img: "img/img_rosa/andrea_montepietra.jpg",
    },
  ],
  centrocampisti: [
    {
      name: "Giuseppe Esposito",
      number: 5,
      img: "img/img_rosa/giuseppe_esposito.jpg",
    },
    {
      name: "Carlo Santo",
      number: 7,
      img: "img/img_rosa/carlo_santo.jpg",
    },
    {
      name: "Andrea Mancin",
      number: 11,
      img: "img/img_rosa/andrea_mancin.jpg",
    },
    {
      name: "Lorenzo Di Michele",
      number: 18,
      img: "img/img_rosa/lorenzo_di_michele.jpg",
    },  
    {
      name: "Andrea Donelli",
      number: 22,
      img: "img/img_rosa/andrea_donelli.jpg",
    },
    {
      name: "Federico Boschi",
      number: 23,
      img: "img/img_rosa/federico_boschi.jpg",
    },
    {
      name: "Ludovico Contino",
      number: 27,
      img: "img/img_rosa/ludovico_contino.jpg",
    },
    {
      name: "Tommaso Panciroli",
      number: 77,
      img: "img/img_rosa/tommaso_panciroli.jpg",
    },
  ],
  attaccanti: [
    {
      name: "Alex Righi",
      number: 9,
      img: "img/img_rosa/alex_righi.jpg",
    },
    {
      name: "Martino Castellari",
      number: 10,
      img: "img/img_rosa/martino_castellari.jpg",
    },
    {
      name: "Luca Ceroni",
      number: 19,
      img: "img/img_rosa/luca_ceroni.jpg",
    },
  ],
  staff: [
    {
      name: "Gioele Malvica",
      number: "A",
      img: "img/img_rosa/gioele_malvica.jpg",
    },
    {
      name: "Thomas G. Aracri",
      number: "VA",
      img: "img/img_rosa/thomas_grande_aracri.jpg",
    },
  ],
};

const function_hover = (event, setHovered) => {
  if (event.type === "mouseenter") {
    setHovered(true);  // attiva l'effetto hover
  } else if (event.type === "mouseleave") {
    setHovered(false); // disattiva l'effetto hover
  }
};


const PlayerCard = ({ player }) => {
  const [isHovered, setIsHovered] = useState(false);
  const imgSrc = player.img === "" ? "img/unknown.png" : player.img;
  return (
    <div className={`card ${styles.playerCard}`} onMouseEnter={(e) => function_hover(e, setIsHovered)} onMouseLeave={(e) => function_hover(e, setIsHovered)}>
      <img src={imgSrc} className={`card-img ${styles.cardImg} ${isHovered ? styles.hover_img : styles.no_hover_img}`} alt={player.name} />
      <div className={`card-img-overlay d-flex ${styles.text_img}`}>
        <h5 className={styles.playerName}>{player.name.toUpperCase()}</h5>
        <span className={`${styles.playerNumber} ${isHovered ? styles.hover_number : styles.no_hover_number}`}>{player.number}</span>
      </div>
    </div>
  );
};

const Section = ({ title, players }) => (
  <div className={styles.section}>
    <h3 className="text-white">{title}</h3>
    <div className="d-flex flex-wrap gap-3">
      {players.map((p, idx) => (
        <PlayerCard key={idx} player={p} />
      ))}
    </div>
  </div>
);

const Rosa = () => {
  return (
    <div className={`toBlur`}>
      <div className={styles.appContainer}>
        <h1 className={`${styles.title_rosa} text-white mb-4`}>I NOSTRI FUTURI FUORI CORSO</h1>
        <div className={styles.overlay}>
          
          <div className={`${styles.container}`}>
            
            <Section title="PORTIERI" players={players.portieri} />
            <Section title="DIFENSORI" players={players.difensori} />
            <Section title="CENTROCAMPISTI" players={players.centrocampisti} />
            <Section title="ATTACCANTI" players={players.attaccanti} />
            <Section title="STAFF" players={players.staff} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rosa;
