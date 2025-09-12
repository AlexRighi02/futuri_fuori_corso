import { useEffect, useState, useRef } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import styles from "./Navbar_FFC.module.css";

let elements_toBlur = document.getElementsByClassName("toBlur");

const Navbar_FFC = () => {
  const isMenuOpen = useRef(false); // <-- cambiato qui

  const clickMenu = () => {
    console.log(isMenuOpen.current);
    isMenuOpen.current = !isMenuOpen.current; // <-- uso .current

    if (isMenuOpen.current) {
      document.querySelector(".sideMenu").style.display = "block";

      for (const el of elements_toBlur) {
        el.style.backdropFilter = "blur(5px)";
        el.classList.add("is-blurred");
      }

      setTimeout(() => {
        document.querySelector(".sideMenu").style.transform = "translateX(0)";
      }, 0);
    } else {
      document.querySelector(".sideMenu").style.transform = "translateX(100%)";
      for (const el of elements_toBlur) {
        el.style.backdropFilter = "none";
        el.classList.remove("is-blurred");
      }
      setTimeout(() => {
        document.querySelector(".sideMenu").style.display = "none";
      }, 500);
    }
  };

  const closeMenu = (n) => {
    isMenuOpen.current = false;
    document.querySelector(".sideMenu").style.transform = "translateX(100%)";

    if (n===0) scrollToRoot();

    for (const el of elements_toBlur) {
      el.style.backdropFilter = "none";
      el.classList.remove("is-blurred");
    }

    setTimeout(() => {
      document.querySelector(".sideMenu").style.display = "none";
    }, 500);
  };

  const [rootRef, setRootRef] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const sideMenu = document.querySelector(".sideMenu");

      if (window.innerWidth > 992) {
        // chiudi automaticamente il menu
        sideMenu.style.transform = "translateX(100%)";

        for (let i = 0; i < elements_toBlur.length; i++) {
          elements_toBlur[i].style.backdropFilter = "none";
          elements_toBlur[i].classList.remove('is-blurred');
        }

        setTimeout(() => {
          if (sideMenu) sideMenu.style.display = "none";
        }, 500);

        isMenuOpen.current = false; // <-- uso .current
      }
    };

    window.addEventListener("resize", handleResize);

    const rootDiv = document.getElementById("root");
    if (rootDiv) {
      setRootRef(rootDiv);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToRoot = () => {
    if (rootRef) {
      rootRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Navbar expand="lg" className={`${styles.navbar} sticky-top`} style={{ backgroundImage: 'url("/img/WallPaper.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Container fluid className={`${styles.navContainer} blurred`}>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link as={Link} to="/" className={styles.link} onClick={scrollToRoot}>HOME</Nav.Link>
          <Nav.Link as={Link} to="/calendario" className={styles.link} onClick={scrollToRoot}>CALENDARIO</Nav.Link>
        </Nav>

        <Navbar.Brand href="#">
          <img src="/img/LogoFFC.svg" alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        <Nav className={`${styles.navMenu}`}>
          <Nav.Link as={Link} to="/rosa" className={styles.link} onClick={scrollToRoot}>ROSA</Nav.Link>
          <Nav.Link as={Link} to="/chi-siamo" className={styles.link} onClick={scrollToRoot}>CHI SIAMO</Nav.Link>
        </Nav>

        <Nav className={styles.navTendina}>
          <div className={styles.hamburger} onClick={clickMenu}>
            <div className={styles.containerSpan}><span className={styles.sp1_3}></span></div>
            <div className={styles.containerSpan}><span className={styles.sp2}></span></div>
            <div className={styles.containerSpan}><span className={styles.sp1_3}></span></div>
          </div>
        </Nav>

        <div className="sideMenu" style={{ backgroundImage: 'url("/img/WallPaper.png")', backgroundSize: 'cover' }}>
          <div className={styles.closeIcon} onClick={() => closeMenu(1)}>
            ✕
          </div>
          <Nav className={`${styles.sideNav} ${styles.blurredChild}`} >
            <Nav.Link as={Link} to="/" className={styles.link} onClick={() => closeMenu(0)}>HOME</Nav.Link>
            <Nav.Link as={Link} to="/calendario" className={styles.link} onClick={() => closeMenu(0)}>CALENDARIO</Nav.Link>
            <Nav.Link as={Link} to="/rosa" className={styles.link} onClick={() => closeMenu(0)}>ROSA</Nav.Link>
            <Nav.Link as={Link} to="/chi-siamo" className={styles.link} onClick={() => closeMenu(0)}>CHI SIAMO</Nav.Link>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default Navbar_FFC;
