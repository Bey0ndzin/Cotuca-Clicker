import "../App.css"

import cotuca from '../assets/cotuca.png'
import script from '../scripts/script'

export default function SectionLeft() {
    return (
        <div className="sectionLeft">
            <div id="money">
                Moedas: 0
                <div id="moneyPerSecond">Moedas por segundo: 0</div>
            </div>
            <div className="ancoragemCotuca">
                <div className="cotucaDiv" onClick={script.Click}>
                    <img src={cotuca} alt="Png do Cotuca" className="cotuca" />
                </div>
            </div>
        </div>
    )
}