import styles from './Carosello_Avversari.module.css';

function Carosello_Marquee({ 
  images = [], 
  names = [], 
  imageWidth = 150,
  imageHeight = 150,
  marginTop = 30,
  marginBetween = 120,
  title = "BRONZE LEAGUE 2025/26",
  marginPersonalized = false,
  subtitle = "GIRONE A"
}) {
  const loopImages = [...images, ...images];
  const loopNames = [...names, ...names];

  return (
    <div className={styles.marqueeWrapper} style={{ "--margin-top": `${marginTop}px`, "--margin-between": `${marginBetween}px`}}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title_campionato}>{title}</h1>
        {subtitle && <h2 className={styles.title_girone}>{subtitle}</h2>}
      </div>
      <div className={`${styles.marqueeContent} ${marginPersonalized ? styles.personalized_margin : ""}`}>
        {loopImages.map((src, index) => (
          <div className={styles.item} style={{ "--logo-size": `${imageWidth}px`, "--logo-height": `${imageHeight}px` }} key={index}>
            <div className={styles.imageWrapper}>
              <img 
                src={process.env.PUBLIC_URL + src} 
                className={styles.logo_avversari} 
                alt={loopNames[index]} 
              />
            </div>
            <div className={styles.textWrapper}>
              <p>{loopNames[index]?.toUpperCase()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carosello_Marquee;
