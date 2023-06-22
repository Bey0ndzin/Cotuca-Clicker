import GlobalImporter from "./GlobalImporter";
import VolumeImporter from "./VolumeImporter";

function Load(){
    GlobalImporter.clicks = 5000
	GlobalImporter.clicksEarned = GlobalImporter.clicks;
	GlobalImporter.clicksReset = GlobalImporter.resets = GlobalImporter.cpsSucked = GlobalImporter.globalCpsMult = GlobalImporter.Equips = 0;
    GlobalImporter.preco = new Array(14)
	GlobalImporter.upgrade0 = GlobalImporter.upgrade1 = GlobalImporter.upgrade2 = 0;
    GlobalImporter.preco[0] = 5
    GlobalImporter.preco[1] = 50
    GlobalImporter.preco[2] = 120
	GlobalImporter.preco[3] = 500
	GlobalImporter.preco[4] = 1500
	GlobalImporter.preco[5] = 5000
	GlobalImporter.preco[6] = 15000
	GlobalImporter.preco[7] = 50000
	GlobalImporter.preco[8] = 100000
	GlobalImporter.preco[9] = 500000
	GlobalImporter.preco[10] = 1000000
	GlobalImporter.preco[11] = 2500000
	GlobalImporter.preco[12] = 5000000
	GlobalImporter.preco[13] = 100000000
    GlobalImporter.upgrade = new Array(14)
    for(var i = 0; i < GlobalImporter.upgrade.length; i++){
        GlobalImporter.upgrade[i] = 0;
    }
    GlobalImporter.moneyPS = 0;
    GlobalImporter.kills = 0;
	VolumeImporter.setVolume(GlobalImporter.volume)
	/*if(get('music') != null)
		get('music').play();*/
    /*alert("Você dominou o mundo...")
    alert("Depois de sua incrível jornada, todos amavam seu pão de queijo")
    alert("Mas nem tudo é perfeito...")
    alert("Perdido em seus pensamentos sobre pães de queijo e cafézinhos quentinhos...")
    alert("Você foi brutalmente atropelado por um carrinho de supermercado que você nem viu chegando...")
    alert("Você acorda desnorteado, você não estava mais no estacionamento do Carrefour")
    alert("Agora você estava em um mundo totalmente diferente, parecia um mundo de rpg... E você com o conhecimento de 5000 monges da Malásia, sabia qual era sua missão")
    alert("Clicar!")*/
    AddEvent(get('options'),'click',function(){ShowMenu('options');});
    AddEvent(get('stats'),'click',function(){ShowMenu('stats');});
    AddEvent(get('login'),'click',function(){ShowMenu('login');});
    AddEvent(get('ascend'),'click',function(){PlaySound('../sound/clickSFX.mp3');Ascend();});
}

function get(what) {
    return document.getElementById(what);
}

function AddEvent(el,ev,func)
{
    //el = Objeto
    //ev = ação a ser lida ('click', 'hover', etc.)
    //func = função a ser executada
	if (el.addEventListener) {el.addEventListener(ev,func,false);return [el,ev,func];}
	else if (el.attachEvent) {var func2=function(){func.call(el);};el.attachEvent('on'+ev,func2);return [el,ev,func2];}
	return false;
}

function Click(){
	VolumeImporter.PlaySound('../sound/clickSFX.mp3')
   	GlobalImporter.clicks += 1+GlobalImporter.upgrade[0]/2
	GlobalImporter.clicksEarned += 1+upgrade[0];
    get('money').innerHTML = "Moedas: " + Beautify(GlobalImporter.clicks) + 
	'<div id="moneyPerSecond">Moedas por segundo: '
	 + Beautify(GlobalImporter.moneyPS) + '</div>'
}

const ScriptImporter = {
    get, Load, AddEvent,
    Click
}

export default ScriptImporter;