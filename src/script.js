let clicks, upgrade, preco, moneyPS, kills
//Declara váriaveis globais que vão ser usadas em várias funções diferentes

function get(what) {
    return document.getElementById(what);
}

function Load(){
    //Seta essas várias para valores padrões
    clicks = 500
    preco = new Array(2)
    preco[0] = 5
    preco[1] = 30
    preco[2] = 120
    upgrade = new Array(50)
    for(var i = 0; i < upgrade.length; i++){
        upgrade[i] = 0
    }
    moneyPS = 0
    kills = 0
	get('music').play();
    /*alert("Você dominou o mundo...")
    alert("Depois de sua incrível jornada, todos amavam seu pão de queijo")
    alert("Mas nem tudo é perfeito...")
    alert("Perdido em seus pensamentos sobre pães de queijo e cafézinhos quentinhos...")
    alert("Você foi brutalmente atropelado por um carrinho de supermercado que você nem viu chegando...")
    alert("Você acorda desnorteado, você não estava mais no estacionamento do Carrefour")
    alert("Agora você estava em um mundo totalmente diferente, parecia um mundo de rpg... E você com o conhecimento de 5000 monges da malásia, sabia qual era sua missão")
    alert("Clicar!")*/
    AddEvent(get('options'),'click',function(){ShowMenu('options');});
    AddEvent(get('stats'),'click',function(){ShowMenu('stats');});
    AddEvent(get('login'),'click',function(){ShowMenu('login');});
    AddEvent(get('ascend'),'click',function(){PlaySound('snd/tick.mp3');Ascend();});
}
function Up(){
    //Váriavel para aumentar a grana cada vez que clica no cotuca
    let money = get("money")
    clicks += 1 + upgrade[0] //Aumenta o click baseado na quantidade de espadas que a pessoa tem
    money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
    //Atualiza o H1 que mostra a quantidade de grana
}
function Upgrade0(){
    //Compra o primeiro upgrade
    let money = get("money")
    let preco0 = get("productPrice0")
    let upgrade0 = get("productOwned0")
    if(clicks >= preco[0]){
        upgrade[0] += 1
        console.log("Upgrade comprado");
        clicks -= preco[0]
        if(upgrade[0] == 1)
        {
            //Caso seja a primeira compra mostra o proximo upgrade
            $("#product1").hide();
            get('product1').classList.remove('locked')
            $("#product1").show(500);
        }
        if(upgrade[0] < 10)
            preco[0] = 1.8 * preco[0]
        else
            preco[0] = 2.6  * upgrade[0]
        preco0.innerHTML = "R$" + Math.round(preco[0])
        money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade0.innerHTML = upgrade[0]
    }
    else
        console.log("Dinheiro insuficiente")
}
function Upgrade1(){
    let money = get("money")
    let preco1 = get("productPrice1")
    let upgrade1 = get("productOwned1")
    if(clicks >= preco[1]){
        upgrade[1] += 0.5
        console.log("Upgrade comprado");
        clicks -= preco[1]
        moneyPS += 0.5
        if(upgrade[1] == 0.5)
        {
            $("#product2").hide();
            get('product2').classList.remove('locked')
            $("#product2").show(500);
        }
        if(upgrade[1] < 10)
            preco[1] = 1.5 * preco[1]
        else
            preco[1] = 2.4 * preco[1]
        preco1.innerHTML = "R$" + Math.round(preco[1])
        money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade1.innerHTML = (Math.round(upgrade[1] * 100) / 10) / 5
        //get('product2').classList.remove('locked')
    }
    else
        console.log("Dinheiro insuficiente")
}
setInterval(farm, 1000)
function farm(){
    let money = get("money")
    clicks += moneyPS
    money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'

    evento0()
}
function evento0(){
    var random = Math.floor(Math.random() * 500)
    if(random == 1)
    {
        if(upgrade[0] >= 1 && kills < 1){
            alert("Você estava andando pela cidade, com sua maravilhosa espada, só que tu sem querer esbarrou em uma criança com ela")
            alert("E a criança foi decapitada na hora, Parabéns você fez sua primeira kill :D")
            kills += 1
        }
    }
}
function Upgrade2(){
    let money = get("money")
    let preco2 = get("productPrice2")
    let upgrade2 = get("productOwned2")
    if(clicks >= preco[2]){
        upgrade[2] += 1
        console.log("Upgrade comprado");
        clicks -= preco[2]
        moneyPS += 1
        if(upgrade[2] < 10)
            preco[2] = 1.2 * preco[2]
        else
            preco[2] = 1.5 * preco[2]
        preco2.innerHTML = "R$" + Math.round(preco[2])
        money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade2.innerHTML = upgrade[2]
        if(upgrade[2] == 1)
            prompt("Você escuta uma voz do além ecoar em seus ouvidos, -Qual seu nome pequeno guerreiro?")
    }
    else
        console.log("Dinheiro insuficiente")
}
let Objects = [];
var onMenu = '';
let ShowMenu=function(what)
{
	if (!what || what=='') what=onMenu;
	if (onMenu=='' && what!='') get('game').classList.add('onMenu');
	else if (onMenu!='' && what!=onMenu) addClass('onMenu');
	else if (what==onMenu) {removeClass('onMenu');what='';}
	//if (what=='log') l('donateBox').className='on'; else l('donateBox').className='';
	onMenu=what;
			
	get('options').className=(onMenu=='options')?'panelButton selected':'panelButton';
	get('stats').className=(onMenu=='stats')?'panelButton selected':'panelButton';
	get('login').className=(onMenu=='login')?'panelButton selected':'panelButton';
			
	/*if (onMenu=='') PlaySound('snd/clickOff2.mp3');
	else PlaySound('snd/clickOn2.mp3');*/
			
	UpdateMenu();
			
	if (what=='')
	{
		for (var i in Objects)
		{
			var me=Objects[i];
			if (me.minigame && me.minionResize) me.minionResize();
		}
	}
}

//Função que adiciona eventos em objetos
function AddEvent(el,ev,func)
{
    //el = Objeto
    //ev = ação a ser lida ('click', 'hover', etc.)
    //func = função a ser executada
	//ie. myListener=AddEvent(l('element'),'click',function(){console.log('teste');});
	if (el.addEventListener) {el.addEventListener(ev,func,false);return [el,ev,func];}
	else if (el.attachEvent) {var func2=function(){func.call(el);};el.attachEvent('on'+ev,func2);return [el,ev,func2];}
	return false;
}

var cssClasses = [];
let addClass=function(what) 
{
    if (cssClasses.indexOf(what)==-1) cssClasses.push(what);
    updateClasses();
}
let removeClass=function(what) {
    var i=cssClasses.indexOf(what);
    if(i!=-1) {cssClasses.splice(i,1);}
    updateClasses();
}
let updateClasses=function() {
    get.className=cssClasses.join(' ');
}

let WriteSlider=function(slider,leftText,rightText,startValueFunction,callback)
{
    if (!callback) callback='';
    return '<div class="sliderBox"><div style="float:left;" class="smallFancyButton">'+leftText+'</div><div style="float:right;" class="smallFancyButton" id="'+slider+'RightText">'+rightText.replace('[$]',startValueFunction())+'</div><input class="slider" style="clear:both;" type="range" min="0" max="100" step="1" value="'+startValueFunction()+'" onchange="'+callback+'" oninput="'+callback+'" onmouseup="PlaySound(\'snd/tick.mp3\');" id="'+slider+'"/></div>';
}

var prefs=[];

let WritePrefButton=function(prefName,button,on,off,callback,invert)
{
    var invert=invert?1:0;
    if (!callback) callback='';
    callback+='PlaySound(\'snd/tick.mp3\');';
    return '<a class="smallFancyButton prefButton option'+((prefs[prefName]^invert)?'':' off')+'" id="'+button+'" '+clickStr+'="Toggle(\''+prefName+'\',\''+button+'\',\''+on+'\',\''+off+'\',\''+invert+'\');'+callback+'">'+(prefs[prefName]?on:off)+'</a>';
}
var volume=50
let setVolume=function(what)
	{
		volume=what;
		get('music').volume = volume / 100;
		/*for (var i in Sounds)
		{
			Sounds[i].volume=Game.volume;
		}*/
	}
var App = {};
var clickStr='';
ON=' '+("ON");
OFF=' '+("OFF");
let UpdateMenu=function()
		{
			var str='';
			if (onMenu!='')
			{
				str+='<div class="close menuClose" '+clickStr+'onClick="ShowMenu();">x</div>';
				//str+='<div style="position:absolute;top:8px;right:8px;cursor:pointer;font-size:16px;" '+clickStr+'="ShowMenu();">X</div>';
			}
			if (onMenu=='options')
			{
				str+='<div class="section">'+("Opções")+'</div>';
				
				str+=
					'<div class="block" style="padding:0px;margin:8px 4px;">'+
						'<div class="subsection" style="padding:0px;">'+
						'<div class="title">'+("Geral")+'</div>'+
							(App?'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="PlaySound(\'snd/tick.mp3\');toSave=true;toQuit=true;">'+("Salvar e sair")+'</a></div>':'')+
							'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="toSave=true;PlaySound(\'snd/tick.mp3\');">'+("Save")+'</a><label>'+("Salvar manualmente (O jogo salva automaticamente a cada minuto; atalho: ctrl+S)")+'</label></div>'+
							'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="ExportSave();PlaySound(\'snd/tick.mp3\');">'+("Exportar save")+'</a><a class="option smallFancyButton" '+clickStr+'="ImportSave();PlaySound(\'snd/tick.mp3\');">'+("Importar save")+'</a><label>'+("Você pode usar isso para fazer um backup ou transferir saves (atalho para importar: ctrl+O)")+'</label></div>'+
							(!App?('<div class="listing"><a class="option smallFancyButton" '+clickStr+'="FileSave();PlaySound(\'snd/tick.mp3\');">'+("Salvar em arquivo")+'</a><a class="option smallFancyButton" style="position:relative;"><input id="FileLoadInput" type="file" style="cursor:pointer;opacity:0;position:absolute;left:0px;top:0px;width:100%;height:100%;" onchange="FileLoad(event);" '+clickStr+'="PlaySound(\'snd/tick.mp3\');"/>'+("Load from file")+'</a><label>'+("Use para manter seu progresso em um backup")+'</label></div>'):'')+
							'<div class="listing" style="text-align:right;"><label>'+("Deletar todo progresso, incluindo conquistas")+'</label><a class="option smallFancyButton warning" '+clickStr+'="HardReset();PlaySound(\'snd/tick.mp3\');">'+("Deletar Save")+'</a></div>'+
							
						'</div>'+
					'</div>'+
					'<div class="block" style="padding:0px;margin:8px 4px;">'+
						'<div class="subsection" style="padding:0px;">'+
					
						'<div class="title">'+("Configurações")+'</div>'+
						((App && App.writeCloudUI)?App.writeCloudUI():'')+
						'<div class="listing">'+
							WriteSlider('volumeSlider',("Volume"),'[$]%',function(){return volume;},'setVolume(Math.round(get(\'volumeSlider\').value));get(\'volumeSliderRightText\').innerHTML=volume+\'%\';')+
							'<br>'+
							(App?WritePrefButton('bgMusic','bgMusicButton',("Musica de fundo")+ON,("Musica de fundo")+OFF,'')+'<label>('+("Musica vai continuar tocando mesmo sem estar na página")+')</label><br>':'')+
						'</div>'+
						//'<div class="listing">'+WritePrefButton('autosave','autosaveButton','Autosave ON','Autosave OFF')+'</div>'+
						(!App?'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="CheckModData();PlaySound(\'snd/tick.mp3\');">'+("Check mod data")+'</a><label>('+("view and delete save data created by mods")+')</label></div>':'')+
						
						'</div>'+
					'</div>'+
				'</div>';
				
				if (App && App.writeModUI)
				{
					str+=
						'<div class="block" style="padding:0px;margin:8px 4px;">'+
							'<div class="subsection" style="padding:0px;">'+
							
							'<div class="title">'+("Mods")+'</div>'+
							App.writeModUI()+
							'</div>'+
						'</div>';
				}
				
				str+='<div style="height:128px;"></div>';
			}
			else if (onMenu=='login')
			{
				//str+=replaceAlget('[bakeryName]',bakeryName,updateLog);
				str+=updateLog;
				if (!HasAchiev('Olden days')) str+='<div id="oldenDays" style="text-align:right;width:100%;"><div '+clickStr+'="SparkleAt(mouseX,mouseY);PlaySound(\'snd/tick.mp3\');PlaySound(\'snd/shimmerClick.mp3\');Win(\'Olden days\');UpdateMenu();" class="icon" style="display:inline-block;transform:scale(0.5);cursor:pointer;width:48px;height:48px;background-position:'+(-12*48)+'px '+(-3*48)+'px;"></div></div>';
			}
			else if (onMenu=='stats')
			{
				var buildingsOwned=0;
				buildingsOwned=BuildingsOwned;
				var upgrades='';
				var cookieUpgrades='';
				var hiddenUpgrades='';
				var prestigeUpgrades='';
				var upgradesTotal=0;
				var upgradesOwned=0;
				var prestigeUpgradesTotal=0;
				var prestigeUpgradesOwned=0;
				
				var list=[];
				//sort the upgrades
				for (var i in Upgrades){list.push(Upgrades[i]);}//clone first
				var sortMap=function(a,b)
				{
					if (a.order>b.order) return 1;
					else if (a.order<b.order) return -1;
					else return 0;
				}
				list.sort(sortMap);
				for (var i in list)
				{
					var str2='';
					var me=list[i];
					
					str2+=crate(me,'stats');
					
					if (me.bought)
					{
						if (CountsAsUpgradeOwned(me.pool)) upgradesOwned++;
						else if (me.pool=='prestige') prestigeUpgradesOwned++;
					}
					
					if (me.pool=='' || me.pool=='cookie' || me.pool=='tech') upgradesTotal++;
					if (me.pool=='debug') hiddenUpgrades+=str2;
					else if (me.pool=='prestige') {prestigeUpgrades+=str2;prestigeUpgradesTotal++;}
					else if (me.pool=='cookie') cookieUpgrades+=str2;
					else if (me.pool!='toggle' && me.pool!='unused') upgrades+=str2;
				}
				var achievements=[];
				var achievementsOwned=0;
				var achievementsOwnedOther=0;
				var achievementsTotal=0;
				
				var list=[];
				for (var i in Achievements)//sort the achievements
				{
					list.push(Achievements[i]);
				}
				var sortMap=function(a,b)
				{
					if (a.order>b.order) return 1;
					else if (a.order<b.order) return -1;
					else return 0;
				}
				list.sort(sortMap);
				
				
				for (var i in list)
				{
					var me=list[i];
					//if (me.pool=='normal' || me.won>0) achievementsTotal++;
					if (CountsAsAchievementOwned(me.pool)) achievementsTotal++;
					var pool=me.pool;
					if (!achievements[pool]) achievements[pool]='';
					achievements[pool]+=crate(me,'stats');
					
					if (me.won)
					{
						if (CountsAsAchievementOwned(me.pool)) achievementsOwned++;
						else achievementsOwnedOther++;
					}
				}
				
				var ascensionModeStr='';
				var icon=ascensionModes[ascensionMode].icon;
				if (resets>0) ascensionModeStr='<span style="cursor:pointer;" '+getTooltip(
							'<div style="min-width:200px;text-align:center;font-size:11px;" id="tooltipChallengeMode">'+ascensionModes[ascensionMode].desc+'</div>'
							,'top')+'><div class="icon" style="display:inline-block;float:none;transform:scale(0.5);margin:-24px -16px -19px -8px;'+writeIcon(icon)+'"></div>'+ascensionModes[ascensionMode].dname+'</span>';
				
				var milkName=Milk.name;
				
				var researchStr=sayTime(researchT,-1);
				var pledgeStr=sayTime(pledgeT,-1);
				var wrathStr='';
				if (elderWrath==1) wrathStr=("awoken");
				else if (elderWrath==2) wrathStr=("displeased");
				else if (elderWrath==3) wrathStr=("angered");
				else if (elderWrath==0 && pledges>0) wrathStr=("appeased");
				
				var dropMult=dropRateMult();
				
				var date=new Date();
				date.setTime(Date.now()-startDate);
				var timeInSeconds=date.getTime()/1000;
				var startDate=sayTime(timeInSeconds*fps,-1);
				date.setTime(Date.now()-fullDate);
				var fullDate=sayTime(date.getTime()/1000*fps,-1);
				if (!fullDate || !fullDate || fullDate.length<1) fullDate=("a long while");
				/*date.setTime(new Date().getTime()-lastDate);
				var lastDate=sayTime(date.getTime()/1000*fps,2);*/
				
				var heavenlyMult=GetHeavenlyMultiplier();
				
				var seasonStr=sayTime(seasonT,-1);
				
				str+='<div class="section">'+("Statistics"+("stats"))+'</div>'+
				'<div class="subsection">'+
				'<div class="title">'+("General")+'</div>'+
				'<div id="statsGeneral">'+
					'<div class="listing"><b>'+("Cookies in bank:")+'</b> <div class="price plain">'+tinyCookie()+Beautify(cookies)+'</div></div>'+
					'<div class="listing"><b>'+("Cookies baked (this ascension):")+'</b> <div class="price plain">'+tinyCookie()+Beautify(cookiesEarned)+'</div></div>'+
					'<div class="listing"><b>'+("Cookies baked (all time):")+'</b> <div class="price plain">'+tinyCookie()+Beautify(cookiesEarned+cookiesReset)+'</div></div>'+
					(cookiesReset>0?'<div class="listing"><b>'+("Cookies forfeited by ascending:")+'</b> <div class="price plain">'+tinyCookie()+Beautify(cookiesReset)+'</div></div>':'')+
					(resets?('<div class="listing"><b>'+("Legacy started:")+'</b> '+(fullDate==''?("just now"):("%1 ago",fullDate))+', '+("with %1 ascension",LBeautify(resets))+'</div>'):'')+
					'<div class="listing"><b>'+("Run started:")+'</b> '+(startDate==''?("just now"):("%1 ago",startDate))+'</div>'+
					'<div class="listing"><b>'+("Buildings owned:")+'</b> '+Beautify(buildingsOwned)+'</div>'+
					'<div class="listing"><b>'+("Cookies per second:")+'</b> '+Beautify(cookiesPs,1)+' <small>'+
						'('+("multiplier:")+' '+Beautify(Math.round(globalCpsMult*100),1)+'%)'+
						(cpsSucked>0?' <span class="warning">('+("withered:")+' '+Beautify(Math.round(cpsSucked*100),1)+'%)</span>':'')+
						'</small></div>'+
					'<div class="listing"><b>'+("Raw cookies per second:")+'</b> '+Beautify(cookiesPsRaw,1)+' <small>'+
						'('+("highest this ascension:")+' '+Beautify(cookiesPsRawHighest,1)+')'+
						'</small></div>'+
					'<div class="listing"><b>'+("Cookies per click:")+'</b> '+Beautify(computedMouseCps,1)+'</div>'+
					'<div class="listing"><b>'+("Cookie clicks:")+'</b> '+Beautify(cookieClicks)+'</div>'+
					'<div class="listing"><b>'+("Hand-made cookies:")+'</b> '+Beautify(handmadeCookies)+'</div>'+
					'<div class="listing"><b>'+("Golden cookie clicks:")+'</b> '+Beautify(goldenClicksLocal)+' <small>('+("all time:")+' '+Beautify(goldenClicks)+')</small></div>'+//' <span class="hidden">(<b>Missed golden cookies :</b> '+Beautify(missedGoldenClicks)+')</span></div>'+
					(dropMult!=1?'<div class="listing"><b>'+("Random drop multiplier:")+'</b> <small>x</small>'+Beautify(dropMult,2)+'</div>':'')+
				'</div>'+
				'<br><div class="listing"><b>'+("Running version:")+'</b> '+version+'</div>'+
				
				((researchStr!='' || wrathStr!='' || pledgeStr!='' || santaStr!='' || dragonStr!='' || season!='' || ascensionModeStr!='' || canLumps())?(
				'</div><div class="subsection">'+
				'<div class="title">'+("Special")+'</div>'+
				'<div id="statsSpecial">'+
					(ascensionModeStr!=''?'<div class="listing"><b>'+("Challenge mode:")+'</b>'+ascensionModeStr+'</div>':'')+
					(season!=''?'<div class="listing"><b>'+("Seasonal event:")+'</b> '+seasons[season].name+
						(seasonStr!=''?' <small>('+("%1 remaining",seasonStr)+')</small>':'')+
					'</div>':'')+
					(researchStr!=''?'<div class="listing"><b>'+("Research:")+'</b> '+("%1 remaining",researchStr)+'</div>':'')+
					(wrathStr!=''?'<div class="listing"><b>'+("Grandmatriarchs status:")+'</b> '+wrathStr+'</div>':'')+
					(pledgeStr!=''?'<div class="listing"><b>'+("Pledge:")+'</b> '+("%1 remaining",pledgeStr)+'</div>':'')+
					(wrinklersPopped>0?'<div class="listing"><b>'+("Wrinklers popped:")+'</b> '+Beautify(wrinklersPopped)+'</div>':'')+
					((canLumps() && lumpsTotal>-1)?'<div class="listing"><b>'+("Sugar lumps harvested:")+'</b> <div class="price lump plain">'+Beautify(lumpsTotal)+'</div></div>':'')+
					//(cookiesSucked>0?'<div class="listing warning"><b>Withered :</b> '+Beautify(cookiesSucked)+' cookies</div>':'')+
					(reindeerClicked>0?'<div class="listing"><b>'+("Reindeer found:")+'</b> '+Beautify(reindeerClicked)+'</div>':'')+
					(santaStr!=''?'<div class="listing"><b>'+("Santa stages unlocked:")+'</b></div><div>'+santaStr+'</div>':'')+
					(dragonStr!=''?'<div class="listing"><b>'+("Dragon training:")+'</b></div><div>'+dragonStr+'</div>':'')+
				'</div>'
				):'')+
				((prestige>0 || prestigeUpgrades!='')?(
				'</div><div class="subsection">'+
				'<div class="title">'+("Prestige")+'</div>'+
				'<div id="statsPrestige">'+
					'<div class="listing"><div class="icon" style="float:left;background-position:'+(-19*48)+'px '+(-7*48)+'px;"></div>'+
						'<div style="margin-top:8px;"><span class="title" style="font-size:22px;">'+("Prestige level:")+' '+Beautify(prestige)+'</span> '+("at %1% of its potential <b>(+%2% CpS)</b>",[Beautify(heavenlyMult*100,1),Beautify(parseFloat(prestige)*heavenlyPower*heavenlyMult,1)])+'<br>'+("Heavenly chips:")+' <b>'+Beautify(heavenlyChips)+'</b></div>'+
					'</div>'+
					(prestigeUpgrades!=''?(
					'<div class="listing" style="clear:left;"><b>'+("Prestige upgrades unlocked:")+'</b> '+prestigeUpgradesOwned+'/'+prestigeUpgradesTotal+' ('+Math.floor((prestigeUpgradesOwned/prestigeUpgradesTotal)*100)+'%)</div>'+
					'<div class="listing crateBox">'+prestigeUpgrades+'</div>'):'')+
				'</div>'
				):'')+

				'</div><div class="subsection">'+
				'<div class="title">'+("Upgrades")+'</div>'+
				'<div id="statsUpgrades">'+
					(hiddenUpgrades!=''?('<div class="listing"><b>Debug</b></div>'+
					'<div class="listing crateBox">'+hiddenUpgrades+'</div>'):'')+
					'<div class="listing"><b>'+("Upgrades unlocked:")+'</b> '+upgradesOwned+'/'+upgradesTotal+' ('+Math.floor((upgradesOwned/upgradesTotal)*100)+'%)</div>'+
					'<div class="listing crateBox">'+upgrades+'</div>'+
					(cookieUpgrades!=''?('<div class="listing"><b>'+("Cookies")+'</b></div>'+
					'<div class="listing crateBox">'+cookieUpgrades+'</div>'):'')+
				'</div>'+
				'</div><div class="subsection">'+
				'<div class="title">'+("Achievements")+'</div>'+
				'<div id="statsAchievs">'+
					'<div class="listing"><b>'+("Achievements unlocked:")+'</b> '+achievementsOwned+'/'+achievementsTotal+' ('+Math.floor((achievementsOwned/achievementsTotal)*100)+'%)'+(achievementsOwnedOther>0?('<span style="font-weight:bold;font-size:10px;color:#70a;"> (+'+achievementsOwnedOther+')</span>'):'')+'</div>'+
					(cookiesMultByType['kittens']>1?('<div class="listing"><b>'+("Kitten multiplier:")+'</b> '+Beautify((cookiesMultByType['kittens'])*100)+'%</div>'):'')+
					'<div class="listing"><b>'+("Milk")+':</b> '+milkName+'</div>'+
					(milkStr!=''?'<div class="listing"><b>'+("Milk flavors unlocked:")+'</b></div><div>'+milkStr+'</div>':'')+
					'<div class="listing"><small style="opacity:0.75;">('+("Milk is gained with each achievement. It can unlock unique upgrades over time.")+')</small></div>'+
					achievementsStr+
				'</div>'+
				'</div>'+
				'<div style="padding-bottom:128px;"></div>'
				;
			}
			//str='<div id="selectionKeeper" class="selectable">'+str+'</div>';
			get('menu').innerHTML=str;
			if (App)
			{
				var anchors=get('menu').getElementsByTagName('a');
				for (var i=0;i<anchors.length;i++)
				{
					var it=anchors[i];
					if (it.href)
					{
						console.log(it.href);
						AddEvent(it,'click',function(href){return function(){
							App.openLink(href);
						}}(it.href));
						it.removeAttribute('href');
					}
				}
			}
			/*AddEvent(get('selectionKeeper'),'mouseup',function(e){
				console.log('selection:',window.getSelection());
			});*/
		}