import styles from "./Rosa.module.css";

const Rosa = () => {
  return (
    <div className="toBlur">
      <div className={styles.rosaContainer}>
        <h1 className={styles.title}>Rosa</h1>
        <p className={styles.description}>Benvenuti nella sezione Rosa.</p>
      </div>
    </div>
  );
};

export default Rosa;