import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Navbar_FFC.module.css";

const Navbar_FFC = () => {
  return (
    <Navbar expand="lg" className={`${styles.navbar} sticky-top`} variant="dark">
      <Container fluid className={styles.navContainer}>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link href="#home" className={styles.link}>HOME</Nav.Link>
          <Nav.Link href="#calendario" className={styles.link}>CALENDARIO</Nav.Link>
        </Nav>

        <Navbar.Brand href="#">
          <img src="/img/LogoFFC.svg" alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link href="#rosa" className={styles.link}>ROSA</Nav.Link>
          <Nav.Link href="#chi-siamo" className={styles.link}>CHI SIAMO</Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  );
};
export default Navbar_FFC;