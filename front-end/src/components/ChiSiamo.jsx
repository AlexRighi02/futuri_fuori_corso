import styles from "./ChiSiamo.module.css";

const ChiSiamo = () => {
  return (
    <div className="toBlur">
      <div className={styles.chiSiamoContainer}>
        <h1 className={styles.title}>Chi siamo</h1>
        <p className={styles.description}>Benvenuti nella sezione Chi siamo.</p>
      </div>
    </div>
  );
};

export default ChiSiamo;