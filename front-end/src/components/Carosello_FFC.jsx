import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

function Carosello_FFC() {
  const navigate = useNavigate();

  const toCalendar = () => {
    // Logica per andare al calendario
    navigate('/calendario');
  };

  const toRose = () => {
    // Logica per andare alla rosa
    navigate('/rosa');
  };

  return (
    <Carousel interval={5000}>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Carosello_FFC_1.png'} onClick={toCalendar} style={{ cursor: 'pointer' }} alt='Carosello FFC 1'/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Carosello_FFC_2.png'} onClick={toRose} style={{ cursor: 'pointer' }} alt='Carosello FFC 2'/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carosello_FFC;