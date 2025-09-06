
import Classifica from '../Classifica'; // vai una cartella indietro
import Carosello_FFC from './Carosello_FFC';
import Carosello_Avversari from './Carosello_Avversari';
import Risultati from './Risultati';


const Home = () => {
    return (
        <div className="toBlur">
            <Carosello_FFC />

            <div id="risultati">
                <Risultati />
            </div>
            
            <div id="container_carosello">
                <Carosello_Avversari 
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
