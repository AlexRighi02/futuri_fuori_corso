import Carousel from 'react-bootstrap/Carousel';

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
    <Carousel interval={5000}>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Carosello_FFC_1.png'} onClick={toCalendar} style={{ cursor: 'pointer' }}/>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={process.env.PUBLIC_URL + '/img/Carosello_FFC_2.png'} onClick={toRose} style={{ cursor: 'pointer' }}/>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carosello_FFC;