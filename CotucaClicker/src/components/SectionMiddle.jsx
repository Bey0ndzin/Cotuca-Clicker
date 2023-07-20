import "../App.css"

import volume from '../scripts/volume'
import script from '../scripts/script'
import buttons from "../scripts/buttons";
import vars from '../scripts/var'
import formatter from '../scripts/formatter'

export default function SectionMiddle() {
    return (
        <div className="sectionMiddle">
            <div className="comments">
                <div id="options" className="panelButton" onClick={() => { script.ShowMenu('options'); volume.PlaySound('../sound/clickSFX.mp3'); UpdateMenu();
                AddFunc(script.get('saveButton'), () => {volume.PlaySound('../sound/clickSFX.mp3'); /*toSave=true; toQuit=true;*/}); 
                AddFunc(script.get('closingX'), () => {script.ShowMenu()});
                if(script.get('volumeSlider'))
                    UpdateSliderFunction(function(){volume.setVolume(Math.round(script.get('volumeSlider').value));script.get('volumeSliderRightText').innerHTML=vars.volume+'%';script.get('music').play();}); }
                    }>
                    <div className="subButton">Opções</div>
                </div>
                <div id="stats" className="panelButton" onClick={() => { script.ShowMenu('stats'); volume.PlaySound('../sound/clickSFX.mp3'); UpdateMenu();
                
            }}>
                    <div className="subButton">Status</div>
                </div>
                <div id="login" className="panelButton" onClick={() => { script.ShowMenu('login'); volume.PlaySound('../sound/clickSFX.mp3'); UpdateMenu();
                AddFunc(script.get('btnLogin'), () => {volume.PlaySound('../sound/SwishSFX.mp3'); buttons.login()});
                AddFunc(script.get('btnReg'), () => {volume.PlaySound('../sound/SwooshSFX.mp3'); buttons.register()});
                AddFunc(script.get('clickReg'), () => { jsx.CreateAccount(); volume.PlaySound('../sound/clickSFX.mp3')});
                AddFunc(script.get('clickLogin'), () => { jsx.LoadGame(); volume.PlaySound('../sound/clickSFX.mp3')});
                AddFunc(script.get('closingX'), () => {script.ShowMenu()});
            }}>
                    <div className="subButton">Login</div>
                </div>
                <div id="ascend" className="panelButton" onClick={() => { volume.PlaySound('../sound/clickSFX.mp3') }}>
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
                            <div id="target" className="rowTarget" onClick={() => { volume.PlaySound('../sound/arrowSFX.mp3') }}>
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



function UpdateMenu()
{
	var str='';
	if (vars.onMenu!='')
	{
		str+='<div class="close menuClose" '+vars.clickStr+' id="closingX">x</div>';
	}
	if (vars.onMenu=='options')
	{
		str+='<div class="section">'+("Opções")+'</div>';
		
		str+=
			'<div class="block" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+
				'<div class="title">'+("Geral")+'</div>'+
					'<div class="listing"><a class="option smallFancyButton" '+vars.clickStr+' id="saveButton">'+("Salvar e sair")+'</a></div>'+
					'<div class="listing" style="text-align:right;"><label>'+("Deletar todo progresso, incluindo conquistas")+'</label><a class="option smallFancyButton warning" '+vars.clickStr+'="HardReset();PlaySound(\'../sound/clickSFX.mp3\');">'+("Deletar Save")+'</a></div>'+
							
				'</div>'+
			'</div>'+
			'<div class="block" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+
					
				'<div class="title">'+("Configurações")+'</div>'+
				'<div class="listing">'+
					    WriteSlider('volumeSlider',("Volume"),'[$]%',function(){return vars.volume;})+
					'<br>'+
			'</div>'+
		'</div>';
	}
	else if (vars.onMenu=='login')
	{
		str+='<div class="section">'+("Login")+'</div>';
		
		str+=
			'<div class="listing"><a class="option smallFancyButton" id="btnLogin">Login</a>' + 
			'<a class="option smallFancyButton" id="btnReg">Registrar</a></div>'+

			'<div class="block" id="loginForm" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+	
				'<div class="title">'+("Login")+'</div>'+
                    '<input type="text" id="logUser" placeholder="Nome" class="option smallFancyButton"><br>'+
					'<input type="password" id="logPassword" placeholder="Senha" class="option smallFancyButton"><br>'+
					'<a class="option smallFancyButton" id="clickLogin">'+("Entrar na Conta")+'</a></form>'+
							
				'</div>'+
			'</div>';
		
		str+=
			'<div class="block" id="regForm" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+
				'<div class="title">'+("Registrar")+'</div>'+
                    '<input type="text" id="regUser" placeholder="Nome" class="option smallFancyButton"><br>'+
					'<input type="password" id="regPassword" placeholder="Senha" class="option smallFancyButton"><br>'+
					'<a class="option smallFancyButton" id="clickReg">'+("Criar Conta")+'</a></form>'+
								
				'</div>'+
			'</div>';
	}
	else if (vars.onMenu=='stats')
	{
		var equips=0;
		equips=vars.equips;
		var upgrades='';
		var prestiges=0;
		var upgradesOwned=0;

				
		var list=[];

		var date=new Date();
		date.setTime(Date.now()-vars.startDate);
		var timeInSeconds=date.getTime()/1000;
		var startDate=script.sayTime(timeInSeconds*vars.fps,-1);
		date.setTime(Date.now()-fullDate);
		var fullDate=script.sayTime(date.getTime()/1000*vars.fps,-1);
		if (!fullDate || !fullDate || fullDate.length<1) fullDate=("a long while");
				
		str+='<div class="section">'+("Estátisticas")+'</div>'+
		'<div class="subsection">'+
		'<div class="title">'+("Geral")+'</div>'+
		'<div id="statsGeneral">'+
			'<div class="listing"><b>'+("Moedas no banco:")+'</b> <div class="price plain">'+formatter.Beautify(vars.clicks)+'</div></div>'+
			'<div class="listing"><b>'+("Moedas ganhas (nesse ano):")+'</b> <div class="price plain">'+formatter.Beautify(vars.clicksEarned)+'</div></div>'+
			'<div class="listing"><b>'+("Moedas ganhas (todos os anos):")+'</b> <div class="price plain">'+formatter.Beautify(vars.clicksEarned+vars.clicksReset)+'</div></div>'+
			'<div class="listing"><b>'+("Run começou:")+'</b> '+(startDate==''?("agora"):(startDate+" atrás"))+'</div>'+
			'<div class="listing"><b>'+("Equipamentos:")+'</b> '+formatter.Beautify(vars.equips)+'</div>'+
			'<div class="listing"><b>'+("Moedas por segundo:")+'</b> '+formatter.Beautify(vars.moneyPS,1)+' <small>'+
				'</small></div>'+
			'<div class="listing"><b>'+("Moedas por Click:")+'</b> '+formatter.Beautify(vars.upgrade[0]/2 + 1)+'</div>'+
		'</div>';
	}
    script.get('menu').innerHTML=str;
}

let WriteSlider=function(slider,leftText,rightText,startValueFunction)
{
    return '<div class="sliderBox"><div style="float:left;" class="smallFancyButton">'+leftText+'</div><div style="float:right;" class="smallFancyButton" id="'+slider+'RightText">'+rightText.replace('[$]',startValueFunction())+'</div><input class="slider" style="clear:both;" type="range" min="0" max="100" step="1" value="'+startValueFunction()+'" id="'+slider+'"/></div>';
}

function UpdateSliderFunction(callback){
    script.get('volumeSlider').onchange = callback
    script.get('volumeSlider').oninput = callback
    script.get('volumeSlider').onmouseup = volume.PlaySound('../sound/clickSFX.mp3')
}

function AddFunc(doc, func){
    if(doc)
        doc.onclick = func
}