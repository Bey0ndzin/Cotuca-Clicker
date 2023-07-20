import volume from './volume';
import vars from './var';
import shop from './shop';
import formatter from './formatter';
import buttons from './buttons'

function get(what) {
    return document.getElementById(what);
}

function choose(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function Load(){
    vars.clicks = 0
	vars.clicksEarned = vars.clicks;
	vars.clicksReset = vars.resets = vars.cpsSucked = vars.globalCpsMult = vars.equips = vars.moneyPS = vars.kills = 0;
    vars.preco = new Array(14)
	vars.upgrade0 = vars.upgrade1 = vars.upgrade2 = 0;
    vars.preco[0] = 5
    vars.preco[1] = 50
    vars.preco[2] = 120
	vars.preco[3] = 500
	vars.preco[4] = 1500
	vars.preco[5] = 5000
	vars.preco[6] = 15000
	vars.preco[7] = 50000
	vars.preco[8] = 100000
	vars.preco[9] = 500000
	vars.preco[10] = 1000000
	vars.preco[11] = 2500000
	vars.preco[12] = 5000000
	vars.preco[13] = 100000000
    vars.upgrade = new Array(14)
    for(var i = 0; i < vars.upgrade.length; i++){
        vars.upgrade[i] = 0;
    }
	volume.setVolume(vars.volume)
	/*if(get('music') != null)
		get('music').play();
    alert("Você dominou o mundo...")
    alert("Depois de sua incrível jornada, todos amavam seu pão de queijo")
    alert("Mas nem tudo é perfeito...")
    alert("Perdido em seus pensamentos sobre pães de queijo e cafézinhos quentinhos...")
    alert("Você foi brutalmente atropelado por um carrinho de supermercado que você nem viu chegando...")
    alert("Você acorda desnorteado, você não estava mais no estacionamento do Carrefour")
    alert("Agora você estava em um mundo totalmente diferente, parecia um mundo de rpg... E você com o conhecimento de 5000 monges da Malásia, sabia qual era sua missão")
    alert("Clicar!")*/
    AddEvent(get('ascend'),'click',function(){PlaySound('../sound/clickSFX.mp3');Ascend();});
}

function Click(){
	volume.PlaySound('../sound/clickSFX.mp3')
   	vars.clicks += 1+vars.upgrade[0]/2
	vars.clicksEarned += 1+vars.upgrade[0];
    get('money').innerHTML = "Moedas: " + formatter.Beautify(vars.clicks) + 
	'<div id="moneyPerSecond">Moedas por segundo: '
	 + formatter.Beautify(vars.moneyPS) + '</div>'
}

setInterval(farm, 1000)
function farm(){
	vars.clicksEarned += vars.moneyPS;
    vars.clicks += vars.moneyPS
    get("money").innerHTML = "Moedas: " + formatter.Beautify(vars.clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + formatter.Beautify(vars.moneyPS) + '</div>'

	if(vars.onMenu == 'stats'){
		var status = document.getElementsByClassName('price plain')
		status[0].innerHTML = formatter.Beautify(vars.clicks)
		status[1].innerHTML = formatter.Beautify(vars.clicksEarned)
		status[2].innerHTML = formatter.Beautify(vars.clicksEarned)
		var status2 = document.getElementsByClassName('listing')
		var date = new Date();
		date.setTime(Date.now()-vars.startDate);
		var timeInSeconds=date.getTime()/1000;
		var startDate2=sayTime(timeInSeconds*vars.fps,-1);
		status2[3].innerHTML = '<b>Run começou: '+'</b> '+(startDate2==''?("agora"):(startDate2+" atrás"));
		status2[4].innerHTML = '<b>Equipamentos: </b>' + formatter.Beautify(vars.equips)
		status2[5].innerHTML = '<b>Moedas por segundo: </b>' + formatter.Beautify(vars.moneyPS,1) + '<small></small> '
		status2[6].innerHTML = '<b>Moedas por Click: </b>' + formatter.Beautify(vars.upgrade[0]/2 + 1)
	}
	
	shop.CanBuy();
    evento0()
}

function evento0(){
    var random = Math.floor(Math.random() * 2500)
    if(random == 1)
    {
        if(upgrade[0] >= 1 && kills < 1){
            alert("Você estava andando pela cidade, exibindo sua maravilhosa espada, só que tu sem querer esbarrou em uma criança com ela")
            alert("E a criança foi decapitada na hora...")
			alert("Parabéns você fez sua primeira kill :D")
            kills += 1
        }
    }
}

let ShowMenu=function(what)
{
	if (!what || what=='') what=vars.onMenu;
	if (vars.onMenu=='' && what!='') get('game').classList.add('onMenu');
	else if (vars.onMenu!='' && what!=vars.onMenu) addClass('onMenu');
	else if (what==vars.onMenu) {get('game').classList.remove('onMenu');what='';}
	vars.onMenu=what;
			
	get('options').className=(vars.onMenu=='options')?'panelButton selected':'panelButton';
	get('stats').className=(vars.onMenu=='stats')?'panelButton selected':'panelButton';
	get('login').className=(vars.onMenu=='login')?'panelButton selected':'panelButton';
			
	if (what=='')
	{
		for (var i in vars.Objects)
		{
			var me=Objects[i];
			if (me.minigame && me.minionResize) me.minionResize();
		}
	}
}

function AddEvent(el,ev,func)
{
    //el = Objeto
    //ev = ação a ser lida ('click', 'hover', etc.)
    //func = função a ser executada
	//ie. myListener=AddEvent(get('element'),'click',function(){console.log('teste');});
	if (el.addEventListener) {el.addEventListener(ev,func,false);return [el,ev,func];}
	else if (el.attachEvent) {var func2=function(){func.call(el);};el.attachEvent('on'+ev,func2);return [el,ev,func2];}
	return false;
}

let addClass=function(what) 
{
    if (vars.cssClasses.indexOf(what)==-1) vars.cssClasses.push(what);
    updateClasses();
}
let removeClass=function(what) {
    var i=vars.cssClasses.indexOf(what);
    if(i!=-1) {vars.cssClasses.splice(i,1);}
    updateClasses();
}
let updateClasses=function() {
    get.className=vars.cssClasses.join(' ');
}

var sayTime=function(time,detail)
{
	if (time<=0) return '';
	var str='';
	var detail=detail||0;
	time=Math.floor(time);
	if (detail==-1)
	{
		var days=0;
		var hours=0;
		var minutes=0;
		var seconds=0;
		if (time>=vars.fps*60*60*24) days=(Math.floor(time/(vars.fps*60*60*24)));
		if (time>=vars.fps*60*60) hours=(Math.floor(time/(vars.fps*60*60)));
		if (time>=vars.fps*60) minutes=(Math.floor(time/(vars.fps*60)));
		if (time>=vars.fps) seconds=(Math.floor(time/(vars.fps)));
		hours-=days*24;
		minutes-=hours*60+days*24*60;
		seconds-=minutes*60+hours*60*60+days*24*60*60;
		if (days>10) {hours=0;}
		if (days) {minutes=0;seconds=0;}
		if (hours) {seconds=0;}
		var bits=[];
		if (days>0) bits.push((formatter.Beautify(days)+" dias"));
		if (hours>0) bits.push(formatter.Beautify(hours)+(" horas"));
		if (minutes>0) bits.push((formatter.Beautify(minutes)+" minutos"));
		if (seconds>0) bits.push((formatter.Beautify(seconds)+" segundos"));
		if (bits.length==0) str=("Menos de 1 segundo");
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
		else */if (time>=fps*60*60*24 && detail<2) str=("%1 day",Beautify(Math.floor(time/(fps*60*60*24))));//Beautify(Math.floor(time/(fps*60*60*24)))+' days';
		else if (time>=fps*60*60 && detail<3) str=("%1 hour",Beautify(Math.floor(time/(fps*60*60))));//Beautify(Math.floor(time/(fps*60*60)))+' hours';
		else if (time>=fps*60 && detail<4) str=("%1 minute",Beautify(Math.floor(time/(fps*60))));//Beautify(Math.floor(time/(fps*60)))+' minutes';
		else if (time>=fps && detail<5) str=("%1 second",Beautify(Math.floor(time/(fps))));//Beautify(Math.floor(time/(fps)))+' seconds';
		else str=("less than 1 second");
	}
	return str;
}

var getDynamicTooltip=function(func,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="setOnCrate(0);tooltip.shouldHide=1;" onMouseOver="if (!mouseDown) {setOnCrate(this);tooltip.dynamic=1;tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');tooltip.wobble();}"';
	return 'onMouseOut="tooltip.shouldHide=1;" onMouseOver="tooltip.dynamic=1;tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');tooltip.wobble();"';
}

var getTooltip=function(text,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="setOnCrate(0);tooltip.shouldHide=1;" onMouseOver="if (!mouseDown) {setOnCrate(this);tooltip.dynamic=0;tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');tooltip.wobble();}"';
	else return 'onMouseOut="tooltip.shouldHide=1;" onMouseOver="tooltip.dynamic=0;tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');tooltip.wobble();"';
}

CanvasRenderingContext2D.prototype.fillPattern=function(img,X,Y,W,H,iW,iH,offX,offY)
{
	//for when built-in patterns aren't enough
	if (img.alt!='blank')
	{
		var offX=offX||0;
		var offY=offY||0;
		if (offX<0) {offX=offX-Math.floor(offX/iW)*iW;} if (offX>0) {offX=(offX%iW)-iW;}
		if (offY<0) {offY=offY-Math.floor(offY/iH)*iH;} if (offY>0) {offY=(offY%iH)-iH;}
		for (var y=offY;y<H;y+=iH){for (var x=offX;x<W;x+=iW){this.drawImage(img,X+x,Y+y,iW,iH);}}
	}
}

const Script = {
	get, choose, Load,
	Click, farm, evento0,
	ShowMenu, AddEvent, addClass,
	removeClass, updateClasses, sayTime,
	getDynamicTooltip, getTooltip,
}

export default Script