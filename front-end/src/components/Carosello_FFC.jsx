import Carousel from 'react-bootstrap/Carousel';
import styles from './Carosello_FFC.module.css';

function Carosello_FFC() {
  const toCalendar = () => {
    // Logica per andare al calendario
    console.log('Navigating to calendar...');
  };

  const toRose = () => {
    // Logica per andare alla rosa
    console.log('Navigating to rose...');
  };

  return (
    <Carousel interval={3000}>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Sfondo_FFC_1.png'} onClick={toCalendar} style={{ cursor: 'pointer' }}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Sfondo_FFC_2.png'} onClick={toRose} style={{ cursor: 'pointer' }}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carosello_FFC;