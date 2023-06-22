import '../App.css';
import cotucaImg from '../assets/cotuca.png'
import ScriptImporter from '../JavaScript/ScriptImporter';
import VolumeImporter from '../JavaScript/VolumeImporter';

export default function SectionLeft(props) {
    return (
        <div className="sectionLeft">
            <div id="money">
                Moedas: 0
                <div id="moneyPerSecond">Moedas por segundo: 0</div>
            </div>
            <div className="ancoragemCotuca">
                <div className="cotucaDiv" onClick={() => {ScriptImporter.Click(); VolumeImporter.PlaySound('../sound/cotucaSFX.mp3')}}>
                    <img src={cotucaImg} alt="Png do Cotuca" className="cotuca" />
                </div>
            </div>
        </div>
    )
}

function click(){

}