let clicks, upgrade, preco, moneyPS, kills, Equips, clicksEarned, clicksReset, resets, globalCpsMult, cpsSucked;
var startDate=new Date();
startDate.setTime(Date.now());
//Declara váriaveis globais que vão ser usadas em várias funções diferentes

function get(what) {
    return document.getElementById(what);
}

function Load(){
    //Seta essas várias para valores padrões
    clicks = 50000
	clicksEarned = clicks;
	clicksReset = 0;
	resets = 0;
	cpsSucked = 0;
	globalCpsMult = 0;
	Equips = 0;
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
	setVolume(volume)
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
    AddEvent(get('ascend'),'click',function(){PlaySound('../sound/clickSFX.mp3');Ascend();});
}
function Up(){
    //Váriavel para aumentar a grana cada vez que clica no cotuca
    let money = get("money")
    clicks += 1 + upgrade[0] //Aumenta o click baseado na quantidade de espadas que a pessoa tem
	clicksEarned += 1+ upgrade[0];
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
		Equips++;
        if(upgrade[0] < 10)
            preco[0] = 1.5 * preco[0]
		else if(upgrade[0] > 15)
			preco[0] = 1.1 * preco[0]
        else
            preco[0] = 1.4  * preco[0]
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
		Equips++;
        if(upgrade[1] < 10)
            preco[1] = 1.4 * preco[1]
		else if(upgrade[1] > 15)
			preco[1] = 1.1 * preco[1]
        else
            preco[1] = 1.4 * preco[1]
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
	clicksEarned += moneyPS;
    clicks += moneyPS
    money.innerHTML = "Moedas: " + Math.round(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
	if(onMenu == 'stats'){
		var status = document.getElementsByClassName('price plain')
		status[0].innerHTML = Beautify(clicks)
		status[1].innerHTML = Beautify(clicks)
		status[2].innerHTML = Beautify(clicks)
		var status2 = document.getElementsByClassName('listing')
		status2[4].innerHTML = '<b>Moedas por Click: </b>' + Beautify(upgrade[0] + 1)
		status2[5].innerHTML = '<b>Moedas por segundo: </b>' + Beautify(moneyPS,1) + '<small> (multiplicador: ' + Beautify(Math.round(globalCpsMult*100),1)+'%)</small> '
		status2[6].innerHTML = '<b>Moedas por Click: </b>' + Beautify(upgrade[0] + 1)
	}
	

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
        moneyPS += 2
		Equips++;
        if(upgrade[2] < 10)
            preco[2] = 1.3 * preco[2]
		else if(upgrade[2] > 15)
			preco[2] = 1.1 * preco[2]
        else
            preco[2] = 1.4 * preco[2]
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
	else if (what==onMenu) {get('game').classList.remove('onMenu');what='';}
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

var volume=1
let setVolume=function(what)
{
	volume=what;
	get('music').volume = (volume / 100) / 2;
}
var Sounds=[];
var SoundInsts=[];
for (var i=0;i<12;i++){SoundInsts[i]=new Audio();}
var SoundI=0;
var PlaySound=function(url,vol)
{
	var volumeSetting=volume;
	if (typeof vol!=='undefined') volume=vol;
	if (volume<-5) {volume+=10;volumeSetting=volumeMusic;}
	if (!volumeSetting || volume==0) return 0;
	if (typeof Sounds[url]=='undefined')
	{
		Sounds[url]=new Audio(url);
		Sounds[url].onloadeddata=function(e){PlaySound(url,vol);}
	}
	else if (Sounds[url].readyState>=2)
	{
		var sound=SoundInsts[SoundI];
		SoundI++;
		if (SoundI>=12) SoundI=0;
		sound.src=url
		//sound.src=Sounds[url].src;

		sound.volume=Math.pow(volume/100,2);

		try{sound.play();}catch(e){console.log('deu erro ao tocar')}
	}
}

function formatEveryThirdPower(notations)
{
	return function (val)
	{
		var base=0,notationValue='';
		if (!isFinite(val)) return 'Infinity';
		if (val>=1000000)
		{
			val/=1000;
			while(Math.round(val)>=1000)
			{
				val/=1000;
				base++;
			}
			if (base>=notations.length) {return 'Infinity';} else {notationValue=notations[base];}
		}
		return (Math.round(val*1000)/1000)+notationValue;
	};
}
function rawFormatter(val){return Math.round(val*1000)/1000;}

var formatShort=['k','M','B','T','Qa','Qi','Sx','Sp','Oc','No'];
var formatLong=[' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'];
var prefixes=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
var suffixes=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];

var numberFormatters=
[
	formatEveryThirdPower(formatShort),
	formatEveryThirdPower(formatLong),
	rawFormatter
];

var fps=30
var sayTime=function(time,detail)
{
	//time is a value where one second is equal to fps (30).
	//detail skips days when >1, hours when >2, minutes when >3 and seconds when >4.
	//if detail is -1, output something like "3 hours, 9 minutes, 48 seconds"
	if (time<=0) return '';
	var str='';
	var detail=detail||0;
	time=Math.floor(time);
	if (detail==-1)
	{
		//var months=0;
		var days=0;
		var hours=0;
		var minutes=0;
		var seconds=0;
		//if (time>=fps*60*60*24*30) months=(Math.floor(time/(fps*60*60*24*30)));
		if (time>=fps*60*60*24) days=(Math.floor(time/(fps*60*60*24)));
		if (time>=fps*60*60) hours=(Math.floor(time/(fps*60*60)));
		if (time>=fps*60) minutes=(Math.floor(time/(fps*60)));
		if (time>=fps) seconds=(Math.floor(time/(fps)));
		//days-=months*30;
		hours-=days*24;
		minutes-=hours*60+days*24*60;
		seconds-=minutes*60+hours*60*60+days*24*60*60;
		if (days>10) {hours=0;}
		if (days) {minutes=0;seconds=0;}
		if (hours) {seconds=0;}
		var bits=[];
		//if (months>0) bits.push(Beautify(months)+' month'+(days==1?'':'s'));
		if (days>0) bits.push(("%1 day",LBeautify(days)));
		if (hours>0) bits.push(("%1 hour",LBeautify(hours)));
		if (minutes>0) bits.push(("%1 minute",LBeautify(minutes)));
		if (seconds>0) bits.push(("%1 second",LBeautify(seconds)));
		if (bits.length==0) str=("less than 1 second");
		else str=bits.join(', ');
		/*//if (months>0) bits.push(Beautify(months)+' month'+(days==1?'':'s'));
		if (days>0) bits.push(Beautify(days)+' day'+(days==1?'':'s'));
		if (hours>0) bits.push(Beautify(hours)+' hour'+(hours==1?'':'s'));
		if (minutes>0) bits.push(Beautify(minutes)+' minute'+(minutes==1?'':'s'));
		if (seconds>0) bits.push(Beautify(seconds)+' second'+(seconds==1?'':'s'));
		if (bits.length==0) str='less than 1 second';
		else str=bits.join(', ');*/
	}
	else
	{
		/*if (time>=fps*60*60*24*30*2 && detail<1) str=Beautify(Math.floor(time/(fps*60*60*24*30)))+' months';
		else if (time>=fps*60*60*24*30 && detail<1) str='1 month';
		else */if (time>=fps*60*60*24 && detail<2) str=("%1 day",LBeautify(Math.floor(time/(fps*60*60*24))));//Beautify(Math.floor(time/(fps*60*60*24)))+' days';
		else if (time>=fps*60*60 && detail<3) str=("%1 hour",LBeautify(Math.floor(time/(fps*60*60))));//Beautify(Math.floor(time/(fps*60*60)))+' hours';
		else if (time>=fps*60 && detail<4) str=("%1 minute",LBeautify(Math.floor(time/(fps*60))));//Beautify(Math.floor(time/(fps*60)))+' minutes';
		else if (time>=fps && detail<5) str=("%1 second",LBeautify(Math.floor(time/(fps))));//Beautify(Math.floor(time/(fps)))+' seconds';
		else str=("less than 1 second");
	}
	return str;
}