import { useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import styles from "./Navbar_FFC.module.css";

const Navbar_FFC = () => {

  let isMenuOpen = false;
  const clickMenu = () => {
    console.log(isMenuOpen);
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      document.querySelector(".sideMenu").style.display = "block";
      document.getElementById("toBlur").style.filter = "blur(5px)";
      setTimeout(() => {
        document.querySelector(".sideMenu").style.transform = "translateX(0)";
      }, 0);
    } else {
      document.querySelector(".sideMenu").style.transform = "translateX(100%)";
      document.getElementById("toBlur").style.filter = "none";
      setTimeout(() => {
        document.querySelector(".sideMenu").style.display = "none";
      }, 500);
    }
  };

  const closeMenu = () => {
    isMenuOpen = false;
    document.querySelector(".sideMenu").style.transform = "translateX(100%)";
    document.getElementById("toBlur").style.filter = "none";
    setTimeout(() => {
      document.querySelector(".sideMenu").style.display = "none";
    }, 500);
  };

  useEffect(() => {
    const handleResize = () => {
      const sideMenu = document.querySelector(".sideMenu");
      const toBlur = document.getElementById("toBlur");

      //if (!sideMenu || !toBlur) return; // Se manca uno dei due, esci

      if (window.innerWidth > 992) {
        // chiudi automaticamente il menu
        sideMenu.style.transform = "translateX(100%)";
        toBlur.style.filter = "none";

        setTimeout(() => {
          if (sideMenu) sideMenu.style.display = "none";
        }, 500);

        isMenuOpen = false;
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
    <Navbar expand="lg" className={`${styles.navbar} sticky-top`} style={{ backgroundImage: 'url("/img/WallPaper.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container fluid className={`${styles.navContainer} blurred`}>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link as={Link} to="/" className={styles.link}>HOME</Nav.Link>
          <Nav.Link as={Link} to="/calendario" className={styles.link}>CALENDARIO</Nav.Link>
        </Nav>

        <Navbar.Brand href="#">
          <img src="/img/LogoFFC.svg" alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link as={Link} to="/rosa" className={styles.link}>ROSA</Nav.Link>
          <Nav.Link as={Link} to="/chi-siamo" className={styles.link}>CHI SIAMO</Nav.Link>
        </Nav>

        <Nav className={styles.navTendina}>
          <div className={styles.hamburger} onClick={clickMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Nav>

        <div className="sideMenu" style={{ backgroundImage: 'url("/img/WallPaper.png")', backgroundSize: 'cover' }}>
          <div className={styles.closeIcon} onClick={closeMenu}>
            <i className="bi bi-x-lg"></i>
          </div>
          <Nav className={`${styles.sideNav} ${styles.blurredChild}`} >
            <Nav.Link as={Link} to="/" className={styles.link}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/calendario" className={styles.link}>CALENDARIO</Nav.Link>
            <Nav.Link as={Link} to="/rosa" className={styles.link}>ROSA</Nav.Link>
            <Nav.Link as={Link} to="/chi-siamo" className={styles.link}>CHI SIAMO</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
export default Navbar_FFC;