import "../App.css"

import vars from '../scripts/var'

export default function Options() {
    return (
        <><div>
            <div className="section">Opções</div><div className="block" style={{ padding: "0px", margin: "8px 4px" }}>
                <div className="subsection" style={{ padding: "0px" }}>
                    <div className="title">Geral</div>
                    <div className="listing"><a className="option smallFancyButton" onClick="jsx.SaveGame();">Salvar</a><label>Salvar manualmente (atalho: ctrl+S)</label></div>
                    <div className="listing" style={{ textAlign: "right" }}><label>Deletar todo progresso, incluindo conquistas</label><a className="option smallFancyButton warning" onClick="jsx.DeleteAccount(); PlaySound(\'../sound/clickSFX.mp3\');">Deletar Save</a></div>
                </div>
            </div>
            <div className="block" style={{ padding: "0px", margin: "8px 4px" }}>
                <div className="subsection" style={{ padding: "0px" }}>
                    <div className="title">Configurações</div>
                    <div className="listing">
                        {WriteSlider('volumeSlider', ("Volume"), '[$]%', function () { return vars.volume; }, 'volume.setVolume(Math.round(script.get(\'volumeSlider\').value));script.get(\'volumeSliderRightText\').innerHTML=volume+\'%\';script.get(\'music\').play();')}
                        <br></br>
                    </div>
                </div>
            </div>
        </div><div style="height:128px;"></div></>
    )
}