import '../App.css';

export default function SectionMiddle(props) {
    return (
        <div className="sectionMiddle">
            <div className="comments">
                <div id="options" className="panelButton" onClick={() => { PlaySound('../sound/clickSFX.mp3') }}>
                    <div className="subButton">Opções</div>
                </div>
                <div id="stats" className="panelButton" onClick={() => { PlaySound('../sound/clickSFX.mp3') }}>
                    <div className="subButton">Status</div>
                </div>
                <div id="login" className="panelButton" onClick={() => { PlaySound('../sound/clickSFX.mp3') }}>
                    <div className="subButton">Login</div>
                </div>
                <div id="ascend" className="panelButton" onClick={() => { PlaySound('../sound/clickSFX.mp3') }}>
                    <div className="subButton">Ascender</div>
                </div>
                <div className="commentsText">
                    <div id="commentsText1" className="commentsText risingUp"></div>
                    <div id="commentsText2" className="commentsText risingAway"></div>
                </div>
                <div className="separatorBottom"></div>
            </div>
            <div className="centerArea">
                <div className="buildingsMaster">
                    <div className="separatorBottom"></div>
                </div>
                <div id="rows">
                    <div className="row" id="row1">
                        <div className="separatorBottom"></div>
                        <div className="rowCanvas" id="rowCanvas1" width="530" height="128">
                            <div id="enemy" className="rowEnemy">
                                <img src="" id="enemyImg" alt="Inimigo"></img>
                            </div>
                            <div className="hpContainer">
                                <div id='hp' className="hpBar" style={{ height: '24px', width: '100%' }}>100%</div>
                            </div>
                            <button id="attack" className="row1Button">Atacar</button>
                            <button id="spell" className="row1Button">Feitiço</button>
                            <button id="spare" className="row1Button">Poupar</button>
                            <button id="run" className="row1Button">Correr</button>
                        </div>
                    </div>
                    <div className="row" id="row2">
                        <div className="rowCanvas" id="rowCanvas2" width="530" height="128">
                            <div id="target" className="rowTarget" onClick={() => { PlaySound('../sound/arrowSFX.mp3') }}>
                                <img src="" id="targetImg" alt="Alvo"></img>
                            </div>
                        </div>
                        <div className="separatorBottom"></div>
                    </div>
                    <div className="row" id="row3">
                        <div className="separatorBottom"></div>
                        <canvas className="rowCanvas" id="rowCanvas3" width="530" height="128" />
                    </div>
                    <div className="row" id="row4">
                        <div className="separatorBottom"></div>
                        <canvas className="rowCanvas" id="rowCanvas4" width="530" height="128" />
                    </div>
                    <div className="row" id="row5">
                        <div className="separatorBottom"></div>
                        <canvas className="rowCanvas" id="rowCanvas5" width="530" height="128" />
                    </div>
                    <div className="row" id="row6">
                        <div className="separatorBottom"></div>
                        <canvas className="rowCanvas" id="rowCanvas6" width="530" height="128" />
                    </div>
                    <div className="row" id="row7">
                        <div className="separatorBottom"></div>
                        <div className="rowCanvas" id="rowCanvas7" width="530" height="128">
                            <img src="../img/react.svg" id="reactGirante" className="logo react" alt="React Girante"></img>
                        </div>
                    </div>
                </div>
                <div id="menu"></div>
            </div>
        </div>
    )
}