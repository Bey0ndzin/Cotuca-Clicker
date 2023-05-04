let clicks, upgrade, preco, moneyPS, kills, Equips, clicksEarned, clicksReset, resets, globalCpsMult, cpsSucked;
let startDate=new Date();
startDate.setTime(Date.now());
//Declara váriaveis globais que vão ser usadas em várias funções diferentes

function get(what) {
    return document.getElementById(what);
}
function choose(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function Load(){
    //Seta essas várias para valores padrões
    clicks = 50000000000000
	clicksEarned = clicks;
	clicksReset = 0;
	resets = 0;
	cpsSucked = 0;
	globalCpsMult = 0;
	Equips = 0;
    preco = new Array(14)
    preco[0] = 5
    preco[1] = 50
    preco[2] = 120
	preco[3] = 500
	preco[4] = 1500
	preco[5] = 5000
	preco[6] = 15000
	preco[7] = 50000
	preco[8] = 100000
	preco[9] = 500000
	preco[10] = 1000000
	preco[11] = 2500000
	preco[12] = 5000000
	preco[13] = 100000000
    upgrade = new Array(14)
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
    alert("Agora você estava em um mundo totalmente diferente, parecia um mundo de rpg... E você com o conhecimento de 5000 monges da Malásia, sabia qual era sua missão")
    alert("Clicar!")*/
	console.log('options')
    AddEvent(get('options'),'click',function(){ShowMenu('options');});
    AddEvent(get('stats'),'click',function(){ShowMenu('stats');});
    AddEvent(get('login'),'click',function(){ShowMenu('login');});
    AddEvent(get('ascend'),'click',function(){PlaySound('../sound/clickSFX.mp3');Ascend();});
}
function Click(){
    //Váriavel para aumentar a grana cada vez que clica no cotuca
	PlaySound('../sound/clickSFX.mp3')
    clicks += 1+upgrade[0]/2 //Aumenta o click baseado na quantidade de espadas que a pessoa tem
	clicksEarned += 1+upgrade[0];
    get('money').innerHTML = "Moedas: " + Beautify(clicks) + 
	'<div id="moneyPerSecond">Moedas por segundo: '
	 + Beautify(moneyPS) + '</div>'
    //Atualiza o H1 que mostra a quantidade de grana
}
function Item(id){
    //Compra o primeiro upgrade
    if(clicks >= calculateBuyValue(id)){ //Verifica se a pessoa tem dinheiro o suficiente

        upgrade[id] += buyBulk
        clicks -= calculateBuyValue(id)
		if(get('product'+(parseInt(id)+1)) != null)
		{
			if(get('product'+(parseInt(id)+1)).classList.contains('locked'))
			{
				//Caso seja a primeira compra mostra o proximo upgrade
				$("#product"+(parseInt(id)+1)).hide();
				get('product'+(parseInt(id)+1)).classList.remove('locked')
				$("#product"+(parseInt(id)+1)).show(500);
			}
		}
		Equips+=buyBulk;

		draw(parseInt(id+1));

        //preco[id] = 1.15 * preco[id]
		if(buyBulk != 1)
		{
			for(var i = 0; i < buyBulk; i++)
			{
				preco[id] = 1.15 * preco[id]
			}
		}
		else
			preco[id] = 1.15 * preco[id]
		
		if(upgrade[0] >= 10 && get('upgrade0').classList.contains('locked')){ 
			$("#upgrade0").hide();
			get('upgrade0').classList.remove('locked')
			$("#upgrade0").show(250);
		}
		if(upgrade[1] >= 10 && get('upgrade1').classList.contains('locked')){ 
			$("#upgrade1").hide();
			get('upgrade1').classList.remove('locked')
			$("#upgrade1").show(250);
		}
		if(upgrade[2] >= 10 && upgrade[3] >= 10 && get('upgrade2').classList.contains('locked')){ 
			$("#upgrade2").hide();
			get('upgrade2').classList.remove('locked')
			$("#upgrade2").show(250);
		}

		if(parseInt(id) == 1){moneyPS += id/2}
		else if(parseInt(id) == 2){moneyPS += 1 * buyBulk}
		else if(parseInt(id) == 3){moneyPS += 100 * buyBulk}
		else if(parseInt(id) == 4){moneyPS += 500 * buyBulk}
		else if(parseInt(id) == 5){moneyPS += 5000 * buyBulk}// 5k
		else if(parseInt(id) == 6){moneyPS += 10000 * buyBulk}// 10k
		else if(parseInt(id) == 7){moneyPS += 50000 * buyBulk}// 50k
		else if(parseInt(id) == 8){moneyPS += 100000 * buyBulk}// 100k
		else if(parseInt(id) == 9){moneyPS += 1000000 * buyBulk}// 1m
		else if(parseInt(id) == 10){moneyPS += 5000000 * buyBulk}// 5m
		else if(parseInt(id) == 11){moneyPS += 10000000 * buyBulk}// 10m
		else if(parseInt(id) == 12){moneyPS += 50000000 * buyBulk}// 50m

        get('productPrice'+id).innerHTML = "R$" + Beautify(preco[id]) //Beautify(Math.round(preco[id]))
        get('money').innerHTML = "Moedas: " + Beautify(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Beautify(moneyPS) + '</div>'
        get('productOwned'+id).innerHTML = Beautify(upgrade[id])

		PlaySound('../sound/buySFX.mp3')
		CanBuy();
	}
    else
        console.log("Dinheiro insuficiente")

}
setInterval(farm, 1000)
function farm(){
	clicksEarned += moneyPS;
    clicks += moneyPS
    get("money").innerHTML = "Moedas: " + Beautify(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Beautify(moneyPS) + '</div>'

	if(onMenu == 'stats'){
		var status = document.getElementsByClassName('price plain')
		status[0].innerHTML = Beautify(clicks)
		status[1].innerHTML = Beautify(clicksEarned)
		status[2].innerHTML = Beautify(clicksEarned)
		var status2 = document.getElementsByClassName('listing')
		var date = new Date();
		date.setTime(Date.now()-startDate);
		var timeInSeconds=date.getTime()/1000;
		var startDate2=sayTime(timeInSeconds*fps,-1);
		status2[3].innerHTML = '<b>Run começou: '+'</b> '+(startDate2==''?("just now"):("%1 ago",startDate2));
		status2[4].innerHTML = '<b>Equipamentos: </b>' + Beautify(Equips)
		status2[5].innerHTML = '<b>Moedas por segundo: </b>' + Beautify(moneyPS,1) + '<small> (multiplicador: ' + Beautify(Math.round(globalCpsMult*100),1)+'%)</small> '
		status2[6].innerHTML = '<b>Moedas por Click: </b>' + Beautify(upgrade[0] + 1)
	}	
	
	CanBuy();
    evento0()
}
function CanBuy(){
	for(var i = 0; i <= 13; i++)
	{
		if(get('product'+i).classList.contains('locked'))
			i = i;
		else
		{
			if(clicks < calculateBuyValue(i))
			{
				get('product'+i).classList.remove('enabled')
				get('product'+i).classList.add('disabled')
			}
			else
			{
				get('product'+i).classList.remove('disabled')
				get('product'+i).classList.add('enabled')
			}
		}
	}
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
let Objects = [];
var onMenu = '';
let ShowMenu=function(what)
{
	if (!what || what=='') what=onMenu;
	if (onMenu=='' && what!='') get('game').classList.add('onMenu');
	else if (onMenu!='' && what!=onMenu) addClass('onMenu');
	else if (what==onMenu) {get('game').classList.remove('onMenu');what='';}
	//if (what=='log') get('donateBox').className='on'; else get('donateBox').className='';
	onMenu=what;

	console.log('options')
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
	//ie. myListener=AddEvent(get('element'),'click',function(){console.log('teste');});
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
		if (days>0) bits.push((Beautify(days)+" dias"));
		if (hours>0) bits.push(Beautify(hours)+(" horas"));
		if (minutes>0) bits.push((Beautify(minutes)+" minutos"));
		if (seconds>0) bits.push((Beautify(seconds)+" segundos"));
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

/*return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,'+(false?'rgba(15,115,130,1) 0%,rgba(15,115,130,0)':'rgba(50,40,40,1) 0%,rgba(50,40,40,0)')+' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;min-width:350px;padding:8px;position:relative;" id="tooltipBuilding"><div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;'+writeIcon(icon)+'"></div><div style="float:right;text-align:right;"><span class="price'+(canBuy?'':' disabled')+'">'+Beautify(Math.round(price))+'</span>'+costDetails(price)+'</div><div class="name">'+name+'</div>'+'<small><div class="tag">'+("owned: %1",me.amount)+'</div>'+(me.free>0?'<div class="tag">'+("free: %1!",me.free)+'</div>':'')+'</small>'+
'<div class="line"></div><div class="description"><q>'+desc+'</q></div>'+
(me.totalclicks>0?(
	'<div class="line"></div>'+
	(me.amount>0?'<div class="descriptionBk">'+("each %1 produces <b>%2</b> per second",[me.single,("%1 cookie",LBeautify((me.storedTotalCps/me.amount)*globalCpsMult,1))])+'</div>':'')+
	'<div class="descriptionBk">'+("%1 producing <b>%2</b> per second",[("%1 "+me.bsingle,LBeautify(me.amount)),("%1 cookie",LBeautify(me.storedTotalCps*globalCpsMult,1))])+' ('+("<b>%1%</b> of total CpS",Beautify(clicksPs>0?((me.amount>0?((me.storedTotalCps*globalCpsMult)/clicksPs):0)*100):0,1))+')</div>'+
	(synergiesStr?('<div class="descriptionBk">'+synergiesStr+'</div>'):'')+
	(EN?'<div class="descriptionBk"><b>'+Beautify(me.totalclicks)+'</b> '+(Math.floor(me.totalclicks)==1?'cookie':'clicks')+' '+me.actionName+' so far</div>':'<div class="descriptionBk">'+("<b>%1</b> produced so far",("%1 cookie",LBeautify(me.totalclicks)))+'</div>')
):'')+
'</div>';*/

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

var firstLoading = [true, true, true, true, true, true, true];
var secondsToSpellAgain = 0
var countElfo = 0, countOrc = 0, countSergio = 0, countSimone = 0, countMaligno = 0, countChico = 0;

function draw(id){
	var img = get('enemyImg')
	var img2 = get('targetImg')
	if(id == 1){
		if(firstLoading[0] == true){
			get('row1').classList.add('enabled')
			img.src = '../img/Slime foda.png'
			get('attack').addEventListener('click', () =>{
				var hp = get('hp').style.width;
				hp = parseInt(hp) - 1*upgrade[0]
				get('hp').style.width = hp+'%'
				get('hp').innerText = hp+'%'
				if(hp <= 0)
				{
					get('hp').style.width = 100+'%'
					get('hp').innerText = 100+'%'
					clicks += moneyPS * 0.1;
				}
				PlaySound('../sound/slashSFX.mp3')
			})
			get('spell').addEventListener('click', () =>{
				if(secondsToSpellAgain <= 0){
					var hp = get('hp').style.width;
					hp = parseInt(hp) - (10+upgrade[5]*5)
					get('hp').style.width = hp+'%'
					get('hp').innerText = hp+'%'
					if(hp < 0)
					{
						get('hp').style.width = 100+'%'
						get('hp').innerText = 100+'%'
						clicks += moneyPS * 0.1;
					}
					PlaySound('../sound/spellSFX.mp3')
					secondsToSpellAgain = 10
					get('spell').innerText = 'Aguarde '+secondsToSpellAgain+'s'
					diminuteSpellTime();
				}
			})
			get('spare').addEventListener('click', () =>{
				alert("Você sentiu dó desta pobre criatura e saiu andando...")
				get('hp').style.width = 100+'%'
				get('hp').innerText = 100+'%'
			})
			get('run').addEventListener('click', () =>{
				PlaySound('../sound/runSFX.mp3')
				alert("Você corre dessa criatura até suas pernas começarem a doer...")
				var random = Math.floor(Math.random() * 20)
				if(random == 1)
					alert("o monstro te seguiu por todo esse caminho, ele realmente é persistente né?");
				else{
					get('hp').style.width = 100+'%'
					get('hp').innerText = 100+'%'
				}
			})
			firstLoading[0] = false;
		}
	}
	if(id == 5){
		if(firstLoading[1] == true){
			get('row2').classList.add('enabled')
			img2.src = '../img/targetIcon.png'
		firstLoading[1] = false
		}
	}
	if(id == 7){
		var canvas = get('rowCanvas3');
		var ctx = canvas.getContext('2d');
		if(firstLoading[2] == true){
			get('row3').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var elfo = new Image();
				elfo.src = '../img/elfIcon.webp'

				elfo.onload = () => {
					ctx.drawImage(elfo, countElfo, 56, 64, 48)
				}
			}
		firstLoading[2] = false
		}

		if(countElfo < 11)
		{
			var elfo = new Image();
			elfo.src = '../img/elfIcon.webp'

			elfo.onload = () => {
				ctx.drawImage(elfo, countElfo*45, 56, 64, 48)
				countElfo++;
			}
		}
	}
	if(id == 8){
		var canvas = get('rowCanvas4');
		var ctx = canvas.getContext('2d');
		if(firstLoading[3] == true){
			get('row4').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var orc = new Image();
				orc.src = '../img/orcIcon.png'

				orc.onload = () => {
					ctx.drawImage(orc, countOrc, 56, 64, 48)
				}
			}
		firstLoading[3] = false
		}
		
		if(countOrc < 8)
		{
			var orc = new Image();
			orc.src = '../img/orcIcon.png'

			orc.onload = () => {
				ctx.drawImage(orc, countOrc*60, 56, 64, 48)
				countOrc++;
			}
		}
	}

	if(id == 9){
		var canvas = get('rowCanvas5');
		var ctx = canvas.getContext('2d');
		if(firstLoading[4] == true){
			get('row5').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var sergio = new Image();
				sergio.src = '../img/SergioIcon.png'

				sergio.onload = () => {
					ctx.drawImage(sergio, countSergio, 56, 64, 48)
				}
			}
		firstLoading[4] = false
		}
		
		if(countSergio < 14)
		{
			var sergio = new Image();
			sergio.src = '../img/SergioIcon.png'

			sergio.onload = () => {
				ctx.drawImage(sergio, countSergio*40, 56, 64, 48)
				countSergio++;
			}
		}
	}

	if(id == 10){
		var canvas = get('rowCanvas6');
		var ctx = canvas.getContext('2d');
		if(firstLoading[5] == true){
			get('row6').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var simone = new Image();
				simone.src = '../img/SimoneIcon.png'

				simone.onload = () => {
					ctx.drawImage(simone, countSimone, 56, 64, 48)
				}
			}
		firstLoading[5] = false
		}
		
		if(countSimone < 14)
		{
			var simone = new Image();
			simone.src = '../img/SimoneIcon.png'

			simone.onload = () => {
				ctx.drawImage(simone, countSimone*40, 56, 64, 48)
				countSimone++;
			}
		}
	}

	if(id == 11){
		var canvas = get('rowCanvas7');
		var ctx = canvas.getContext('2d');
		if(firstLoading[6] == true){
			get('row7').classList.add('enabled')
		firstLoading[6] = false
		}
	}
}

function diminuteSpellTime(){
	setTimeout(() => {
		console.log(secondsToSpellAgain)
		secondsToSpellAgain = secondsToSpellAgain - 1
		if(secondsToSpellAgain == 0)
			get('spell').innerText = 'Feitiço'
		if(secondsToSpellAgain > 0){
			diminuteSpellTime();
			get('spell').innerText = 'Aguarde '+secondsToSpellAgain+'s';
		}
	}, 800)
}