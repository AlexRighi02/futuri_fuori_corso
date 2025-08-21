
import App from '../App'; // vai una cartella indietro
import Carosello_FFC from './Carosello_FFC';
import Carosello_Avversari from './Carosello_Avversari';
import Risultati from './Risultati';


const Home = () => {
    return (
        <div id="toBlur">
            <Carosello_FFC />

            <div id="risultati">
                <Risultati />
            </div>
            
            <div id="container_carosello">
                <Carosello_Avversari />
            </div>
            <App />        
        </div>
    );
};

export default Home;
