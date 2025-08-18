import styles from './Carosello_Avversari.module.css';

function Carosello_Marquee() {
  const images = [
    '/img/img_avversari/focumeu.png',
    '/img/img_avversari/taneto.png',
    '/img/img_avversari/realmaleducati.png',
    '/img/img_avversari/no_logo.png',
    '/img/img_avversari/no_logo.png',
    '/img/img_avversari/no_logo.png',
    '/img/img_avversari/no_logo.png'
  ];

  const names = [
    'Focumeu',
    'Taneto',
    'Real maleducati',
    'SQUADRA 1',
    'SQUADRA 2',
    'SQUADRA 3',
    'SQUADRA 4'
  ];

  const loopImages = [...images, ...images]; // duplico le immagini
  const loopNames = [...names, ...names];

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title_campionato}>BRONZE LEAGUE 2025/26</h1>
        <h2 className={styles.title_girone}>GIRONE A</h2>
      </div>
      <div className={styles.marqueeContent}>
        {loopImages.map((src, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.imageWrapper}>
              <img src={process.env.PUBLIC_URL + src} className={styles.logo_avversari} />
            </div>
            <div className={styles.textWrapper}>
              <p>{loopNames[index].toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carosello_Marquee;
