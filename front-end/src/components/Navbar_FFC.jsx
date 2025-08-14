import { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "./Navbar_FFC.module.css";

const Navbar_FFC = () => {

  let isMenuOpen = false;
  const clickMenu = () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      document.querySelector(".sideMenu").style.display = "block";
      setTimeout(() => {
        document.querySelector(".sideMenu").style.transform = "translateX(0)";
      }, 0);
    } else {
      document.querySelector(".sideMenu").style.transform = "translateX(100%)";
      setTimeout(() => {
        document.querySelector(".sideMenu").style.display = "none";
      }, 500);
    }
  };

  const closeMenu = () => {
    isMenuOpen = false;    
    document.querySelector(".sideMenu").style.transform = "translateX(100%)";
    setTimeout(() => {
      document.querySelector(".sideMenu").style.display = "none";
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        // chiudi automaticamente il menu
        isMenuOpen = false;
        document.querySelector(".sideMenu").style.transform = "translateX(100%)";
        setTimeout(() => {
          document.querySelector(".sideMenu").style.display = "none";
        }, 500);
      }
    };

    // Aggiungo listener
    window.addEventListener("resize", handleResize);

    // Pulizia del listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  return (
    <Navbar expand="lg" className={`${styles.navbar} sticky-top`} variant="dark">
      <Container fluid className={`${styles.navContainer} blurred`}>

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

        <Nav className={styles.navTendina}>
          <div className={styles.hamburger} onClick={clickMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>         
        </Nav>


        <div className="sideMenu">
          <div className={styles.closeIcon} onClick={closeMenu}>
            <i className="bi bi-x-lg"></i>
          </div>
          <Nav className={styles.sideNav}>
            <Nav.Link href="#home" className={styles.sideLink}>HOME</Nav.Link>
            <Nav.Link href="#calendario" className={styles.sideLink}>CALENDARIO</Nav.Link>
            <Nav.Link href="#rosa" className={styles.sideLink}>ROSA</Nav.Link>
            <Nav.Link href="#chi-siamo" className={styles.sideLink}>CHI SIAMO</Nav.Link>
          </Nav>
        </div>
        

      </Container>
    </Navbar>
  );
};
export default Navbar_FFC;