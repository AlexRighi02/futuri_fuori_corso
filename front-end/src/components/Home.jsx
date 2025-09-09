
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
                        '/img/img_avversari/focumeu.png',
                        '/img/img_avversari/taneto.png',
                        '/img/img_avversari/realmaleducati.png',
                        '/img/img_avversari/no_logo.png',
                        '/img/img_avversari/no_logo.png',
                        '/img/img_avversari/no_logo.png',
                        '/img/img_avversari/no_logo.png',
                        '/img/img_avversari/no_logo.png'
                    ]}
                    names={[
                        'Focumeu',
                        'Taneto',
                        'Real maleducati',
                        'Squadra 4',
                        'Squadra 5',
                        'Squadra 6',
                        'Squadra 7',
                        'Squadra 8'
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
