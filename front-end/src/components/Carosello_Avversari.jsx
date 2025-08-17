import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Carosello_Avversari.module.css';

import { Navigation, Autoplay } from 'swiper/modules';

function Carosello_Avversari() {
  const images = [
    '/img/Carosello_FFC_1.png',
    '/img/Carosello_FFC_2.png',
    '/img/Carosello_FFC_1.png',
    '/img/Carosello_FFC_2.png',
    '/img/Carosello_FFC_1.png',
  ];

  const handleClick = (index) => {
    if (index === 0) {
      // esempio funzione
      console.log("Vai al calendario");
    } else if (index === 1) {
      console.log("Vai alle rose");
    }
  };

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      slidesPerView={3}       // quante immagini mostrate
      slidesPerGroup={1}      // quante scorrono ogni volta
      spaceBetween={10}       // spazio tra le immagini
      navigation              // frecce avanti/indietro
      autoplay={{ delay: 7000 }}
      loop={true}             // ciclo infinito
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={process.env.PUBLIC_URL + src}
            alt={`slide-${index}`}
            style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
            onClick={() => handleClick(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carosello_Avversari;