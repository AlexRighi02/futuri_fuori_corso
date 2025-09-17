
import Classifica from '../Classifica'; // vai una cartella indietro
import CaroselloFFC from './Carosello_FFC';
import CaroselloAvversari from './Carosello_Avversari';
import Risultati from './Risultati';


const Home = () => {
    return (
        <div className="toBlur">
            <CaroselloFFC />

            <div id="risultati">
                <Risultati />
            </div>

            <div id="container_carosello">
                <CaroselloAvversari
                    images={[
                        '/img/img_avversari/futuri_fuori_corso.png',
                        '/img/img_avversari/focumeu.png',
                        '/img/img_avversari/montecchio.png',
                        '/img/img_avversari/ATS_Trinita_Elite.png',
                        '/img/img_avversari/gattatico_club_raptors.png',
                        '/img/img_avversari/Indominus_XI.png',
                        '/img/img_avversari/montecchio.png',
                        '/img/img_avversari/the_mount.png',
                        '/img/img_avversari/AN_calcio_a_7.png',
                        '/img/img_avversari/trinita.png'
                    ]}
                    names={[
                        'F.C. Futuri Fuori Corso',
                        'Focumeu',
                        'U.S. Montecchio Calcio New Team',
                        'ATS Trinità Elite',
                        'Gattatico Club Raptors',
                        'Indominus XI',
                        'U.S. Montecchio Calcio Squadra A',
                        'The Mount II',
                        'AN Calcio a 7',
                        'ATS Trinità'
                    ]}
                    imageWidth={150}
                    imageHeight={150}
                    title="BRONZE LEAGUE 2025/26"
                    subtitle="GIRONE A"
                />

            </div>
            <Classifica />
        </div>
    );
};

export default Home;
