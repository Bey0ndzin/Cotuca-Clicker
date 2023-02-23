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
        //get('product2').classList.remove('ked')
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
		status2[3].innerHTML = '<b>Run começou: '+'</b>'+startDate.getDate()+'/'+startDate.getMonth()+' '+startDate.getHours()+':'+startDate.getMinutes()+':'+startDate.getSeconds()
		status2[4].innerHTML = '<b>Equipamentos: </b>' + Beautify(Equips)
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
	//if (what=='log') get('donateBox').className='on'; else get('donateBox').className='';
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

var getDynamicTooltip=function(func,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="Game.setOnCrate(0);Game.tooltip.shouldHide=1;" onMouseOver="if (!Game.mouseDown) {Game.setOnCrate(this);Game.tooltip.dynamic=1;Game.tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');Game.tooltip.wobble();}"';
	return 'onMouseOut="Game.tooltip.shouldHide=1;" onMouseOver="Game.tooltip.dynamic=1;Game.tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');Game.tooltip.wobble();"';
}

var getTooltip=function(text,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="Game.setOnCrate(0);Game.tooltip.shouldHide=1;" onMouseOver="if (!Game.mouseDown) {Game.setOnCrate(this);Game.tooltip.dynamic=0;Game.tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');Game.tooltip.wobble();}"';
	else return 'onMouseOut="Game.tooltip.shouldHide=1;" onMouseOver="Game.tooltip.dynamic=0;Game.tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');Game.tooltip.wobble();"';
}

var vanilla = 1;
var priceIncrease=1.15;
var buyBulk=1;
var buyBulkOld=buyBulk;//used to undo changes from holding Shift or Ctrl
var buyBulkShortcut=0;//are we pressing Shift or Ctrl?
		
var ObjectsById=[];
var ObjectsN=0;
var BuildingsOwned=0;
var Object=function(name,desc,icon,iconColumn,art,price,cps,buyFunction)
{
	this.id=ObjectsN;
	this.name=name;
	this.dname=name;
	this.displayName=this.name;
	this.bsingle=this.single;this.bplural=this.plural;//store untranslated as we use those too
	this.desc=desc;
	if (true)//if (EN)
	{
		this.dname=(this.name);
		this.single=(this.single);
		this.plural=(this.plural);
		this.desc=((this.name+' quote'));
	}
	this.basePrice=price;
	this.price=this.basePrice;
	this.bulkPrice=this.price;
	this.cps=cps;
	this.baseCps=this.cps;
	this.mouseOn=false;
	this.mousePos=[-100,-100];
	this.productionAchievs=[];
			
	this.n=this.id;
	if (this.n!=0)
	{
		//new automated price and CpS curves
		//this.baseCps=Math.ceil(((this.n*0.5)*Math.pow(this.n*1,this.n*0.9))*10)/10;
		//this.baseCps=Math.ceil((Math.pow(this.n*1,this.n*0.5+2.35))*10)/10;//by a fortunate coincidence, this gives the 3rd, 4th and 5th buildings a CpS of 10, 69 and 420
		this.baseCps=Math.ceil((Math.pow(this.n*1,this.n*0.5+2))*10)/10;//0.45 used to be 0.5
		//this.baseCps=Math.ceil((Math.pow(this.n*1,this.n*0.45+2.10))*10)/10;
		//clamp 14,467,199 to 14,000,000 (there's probably a more elegant way to do that)
		var digits=Math.pow(10,(Math.ceil(Math.log(Math.ceil(this.baseCps))/Math.LN10)))/100;
		this.baseCps=Math.round(this.baseCps/digits)*digits;
				
		this.basePrice=(this.n*1+9+(this.n<5?0:Math.pow(this.n-5,1.75)*5))*Math.pow(10,this.n)*(Math.max(1,this.n-14));
		//this.basePrice=(this.n*2.5+7.5)*Math.pow(10,this.n);
		var digits=Math.pow(10,(Math.ceil(Math.log(Math.ceil(this.basePrice))/Math.LN10)))/100;
		this.basePrice=Math.round(this.basePrice/digits)*digits;
		if (this.id>=16) this.basePrice*=10;
		if (this.id>=17) this.basePrice*=10;
		if (this.id>=18) this.basePrice*=10;
		if (this.id>=19) this.basePrice*=10;
		this.price=this.basePrice;
		this.bulkPrice=this.price;
	}
			
	this.totalCookies=0;
	this.storedCps=0;
	this.storedTotalCps=0;
	this.icon=icon;
	this.iconColumn=iconColumn;
	this.art=art;
	this.buyFunction=buyFunction;
	this.ked=1;
	this.level=0;
	this.vanilla=vanilla;
			
	this.tieredUpgrades={};
	this.tieredAchievs={};
	this.synergies=[];
	this.fortune=0;
			
	this.amount=0;
	this.bought=0;
	this.highest=0;
	this.free=0;
			
	this.eachFrame=0;
			
	this.minigameUrl=0;//if this is defined, load the specified script if the building's level is at least 1
	this.minigameName=0;
	this.onMinigame=false;
	this.minigameLoaded=false;
			
	this.getPrice=function(n)
	{
		var price=this.basePrice*Math.pow(priceIncrease,Math.max(0,this.amount-this.free));
		price=modifyBuildingPrice(this,price);
		return Math.ceil(price);
	}
	this.getSumPrice=function(amount)//return how much it would cost to buy [amount] more of this building
	{
		var price=0;
		for (var i=Math.max(0,this.amount);i<Math.max(0,(this.amount)+amount);i++)
		{
			price+=this.basePrice*Math.pow(priceIncrease,Math.max(0,i-this.free));
		}
		price=modifyBuildingPrice(this,price);
		return Math.ceil(price);
	}
			
	this.buy=function(amount)
	{
		var success=0;
		var moni=0;
		var bought=0;
		if (!amount) amount=buyBulk;
		if (amount==-1) amount=1000;
		for (var i=0;i<amount;i++)
		{
			var price=this.getPrice();
			if (cookies>=price)
			{
				bought++;
				moni+=price;
				Spend(price);
				this.amount++;
				this.bought++;
				price=this.getPrice();
				this.price=price;
				if (this.buyFunction) this.buyFunction();
				recalculateGains=1;
				if (this.amount==1 && this.id!=0) get('row'+this.id).classList.add('enabled');
				this.highest=Math.max(this.highest,this.amount);
				BuildingsOwned++;
				success=1;
			}
		}
		if (success) {PlaySound('snd/buy'+choose([1,2,3,4])+'.mp3',0.75);this.refresh();}
		//if (moni>0 && amount>1) Notify(this.name,'Bought <b>'+bought+'</b> for '+Beautify(moni)+' cookies','',2);
	}
	this.tooltip=function()
	{
		var me=this;
		var ariaText='';
		var desc=me.desc;
		var name=me.dname;
		var icon=[me.iconColumn,0];
		if (me.ked)
		{
			name='???';
			desc='???';
			icon=[0,7];
		}
		//if (get('rowInfo'+me.id) && drawT%10==0) get('rowInfoContent'+me.id).innerHTML='&bull; '+me.amount+' '+(me.amount==1?me.single:me.plural)+'<br>&bull; producing '+Beautify(me.storedTotalCps,1)+' '+(me.storedTotalCps==1?'cookie':'cookies')+' per second<br>&bull; total : '+Beautify(me.totalCookies)+' '+(Math.floor(me.totalCookies)==1?'cookie':'cookies')+' '+me.actionName;
				
		var canBuy=false;
		var price=me.bulkPrice;
		if (cookies>=price) canBuy=true;
				
		var synergiesStr='';
		//note : might not be entirely accurate, math may need checking
		if (me.amount>0)
		{
			var synergiesWith={};
			var synergyBoost=0;
					
			if (me.name=='Grandma')
			{
				for (var i in GrandmaSynergies)
				{
					if (Has(GrandmaSynergies[i]))
					{
						var other=Upgrades[GrandmaSynergies[i]].buildingTie;
						var mult=me.amount*0.01*(1/(other.id-1));
						var boost=(other.storedTotalCps*globalCpsMult)-(other.storedTotalCps*globalCpsMult)/(1+mult);
						synergyBoost+=boost;
						if (!synergiesWith[other.plural]) synergiesWith[other.plural]=0;
						synergiesWith[other.plural]+=mult;
					}
				}
			}
					
			for (var i in me.synergies)
			{
				var it=me.synergies[i];
				if (Has(it.name))
				{
					var weight=0.05;
					var other=it.buildingTie1;
					if (me==it.buildingTie1) {weight=0.001;other=it.buildingTie2;}
					var boost=(other.storedTotalCps*globalCpsMult)-(other.storedTotalCps*globalCpsMult)/(1+me.amount*weight);
					synergyBoost+=boost;
					if (!synergiesWith[other.plural]) synergiesWith[other.plural]=0;
					synergiesWith[other.plural]+=me.amount*weight;
				}
			}
			if (synergyBoost>0)
			{
				for (var i in synergiesWith)
				{
					if (synergiesStr!='') synergiesStr+=', ';
					synergiesStr+='<span style="color:#fff;font-weight:bold;font-size:80%;background:#000;box-shadow:0px 0px 0px 1px rgba(255,255,255,0.2);border-radius:3px;padding:0px 2px;display:inline-bk;">'+i+' +'+Beautify(synergiesWith[i]*100,1)+'%</span>';
				}
				synergiesStr=("...also boosting some other buildings:")+' '+synergiesStr+' - '+("all combined, these boosts account for <b>%1</b> per second (<b>%2%</b> of total CpS)",[("%1 cookie",LBeautify(synergyBoost,1)),Beautify((synergyBoost/cookiesPs)*100,1)]);
			}
		}
				
		if (prefs.screenreader)
		{
			if (me.ked) ariaText='This building is not yet unked. ';
			else ariaText=name+'. ';
			if (!me.ked) ariaText+='You own '+me.amount+'. ';
			ariaText+=(canBuy?'Can buy 1 for':'Cannot afford the')+' '+Beautify(Math.round(price))+' cookies. ';
			if (!me.ked && me.totalCookies>0)
			{
				ariaText+='Each '+me.single+' produces '+Beautify((me.storedTotalCps/me.amount)*globalCpsMult,1)+' cookies per second. ';
				ariaText+=Beautify(me.totalCookies)+' cookies '+me.actionName+' so far. ';
			}
			if (!me.ked) ariaText+=desc;
					
			var ariaLabel=get('ariaReader-product-'+(me.id));
			if (ariaLabel) ariaLabel.innerHTML=ariaText.replace(/(<([^>]+)>)/gi,' ');
		}
				
		return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,'+(false?'rgba(15,115,130,1) 0%,rgba(15,115,130,0)':'rgba(50,40,40,1) 0%,rgba(50,40,40,0)')+' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;min-width:350px;padding:8px;position:relative;" id="tooltipBuilding"><div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;'+writeIcon(icon)+'"></div><div style="float:right;text-align:right;"><span class="price'+(canBuy?'':' disabled')+'">'+Beautify(Math.round(price))+'</span>'+costDetails(price)+'</div><div class="name">'+name+'</div>'+'<small><div class="tag">'+("owned: %1",me.amount)+'</div>'+(me.free>0?'<div class="tag">'+("free: %1!",me.free)+'</div>':'')+'</small>'+
		'<div class="line"></div><div class="description"><q>'+desc+'</q></div>'+
		(me.totalCookies>0?(
			'<div class="line"></div>'+
			(me.amount>0?'<div class="descriptionBk">'+("each %1 produces <b>%2</b> per second",[me.single,("%1 cookie",LBeautify((me.storedTotalCps/me.amount)*globalCpsMult,1))])+'</div>':'')+
			'<div class="descriptionBk">'+("%1 producing <b>%2</b> per second",[("%1 "+me.bsingle,LBeautify(me.amount)),("%1 cookie",LBeautify(me.storedTotalCps*globalCpsMult,1))])+' ('+("<b>%1%</b> of total CpS",Beautify(cookiesPs>0?((me.amount>0?((me.storedTotalCps*globalCpsMult)/cookiesPs):0)*100):0,1))+')</div>'+
			(synergiesStr?('<div class="descriptionBk">'+synergiesStr+'</div>'):'')+
			(EN?'<div class="descriptionBk"><b>'+Beautify(me.totalCookies)+'</b> '+(Math.floor(me.totalCookies)==1?'cookie':'cookies')+' '+me.actionName+' so far</div>':'<div class="descriptionBk">'+("<b>%1</b> produced so far",("%1 cookie",LBeautify(me.totalCookies)))+'</div>')
		):'')+
		'</div>';
	}
	this.levelTooltip=function()
	{
		var me=this;
		return '<div style="width:280px;padding:8px;" id="tooltipLevel"><b>'+("Level %1 %2",[Beautify(me.level),me.plural])+'</b><div class="line"></div>'+(EN?((me.level==1?me.extraName:me.extraPlural).replace('[X]',Beautify(me.level))+' granting <b>+'+Beautify(me.level)+'% '+me.dname+' CpS</b>.'):("Granting <b>+%1% %2 CpS</b>.",[Beautify(me.level),me.single]))+'<div class="line"></div>'+("Click to level up for %1.",'<span class="price lump'+(lumps>=me.level+1?'':' disabled')+'">'+("%1 sugar lump",LBeautify(me.level+1))+'</span>')+((me.level==0 && me.minigameUrl)?'<div class="line"></div><b>'+("Levelling up this building unks a mini")+'</b>':'')+'</div>';
	}
	this.levelUp=function(me){
		return function(free){spendLump(me.level+1,("level up your %1",me.plural),function()
		{
			me.level+=1;
			if (me.level>=10 && me.levelAchiev10) Win(me.levelAchiev10.name);
			if (!free) PlaySound('snd/upgrade.mp3',0.6);
			LoadMinigames();
			me.refresh();
			if (get('productLevel'+me.id)){var rect=get('productLevel'+me.id).getBounds();SparkleAt((rect.left+rect.right)/2,(rect.top+rect.bottom)/2-24+32-TopBarOffset);}
			if (me.minigame && me.minionLevel) me.minionLevel(me.level);
		},free)();};
	}(this);
	
	this.refresh=function()//show/hide the building display based on its amount, and redraw it
	{
		this.price=this.getPrice();
		this.bulkPrice=this.getSumPrice(buyBulk);
		this.rebuild();
		if (this.amount==0 && this.id!=0) get('row'+this.id).classList.remove('enabled');
		else if (this.amount>0 && this.id!=0) get('row'+this.id).classList.add('enabled');
		if (this.muted>0 && this.id!=0) {get('row'+this.id).classList.add('muted');get('mutedProduct'+this.id).style.display='inline-bk';}
		else if (this.id!=0) {get('row'+this.id).classList.remove('muted');get('mutedProduct'+this.id).style.display='none';}
		//if (!this.onMinigame && !this.muted) {}
		//else this.pics=[];
	}
	this.rebuild=function()
	{
		var me=this;
		//var classes='product';
		var price=me.bulkPrice;
		/*if (cookiesEarned>=me.basePrice || me.bought>0) {classes+=' unked';me.ked=0;} else {classes+=' ked';me.ked=1;}
		if (cookies>=price) classes+=' enabled'; else classes+=' disabled';
		if (me.l.className.indexOf('toggledOff')!=-1) classes+=' toggledOff';
		*/
		var icon=[0,me.icon];
		var iconOff=[1,me.icon];
		if (me.iconFunc) icon=me.iconFunc();
		
		var desc=me.desc;
		var name=me.dname;
		var displayName=me.displayName;
		if (!EN) displayName=name;
		//else if (!EN && name.length>16) displayName='<span style="font-size:75%;">'+name+'</span>';
		icon=[icon[0]*64,icon[1]*64];
		iconOff=[iconOff[0]*64,iconOff[1]*64];
		
		//me.l.className=classes;
		//get('productIcon'+me.id).style.backgroundImage='url(img/'+icon+')';
		get('productIcon'+me.id).style.backgroundPosition='-'+icon[0]+'px -'+icon[1]+'px';
		//get('productIconOff'+me.id).style.backgroundImage='url(img/'+iconOff+')';
				get('productIconOff'+me.id).style.backgroundPosition='-'+iconOff[0]+'px -'+iconOff[1]+'px';
				get('productName'+me.id).innerHTML=displayName;
				if (name.length>12/Langs[Id].w && (season=='fools' || !EN)) get('productName'+me.id).classList.add('longProductName'); else get('productName'+me.id).classList.remove('longProductName');
				get('productOwned'+me.id).textContent=me.amount?me.amount:'';
				get('productPrice'+me.id).textContent=Beautify(Math.round(price));
				get('productPriceMult'+me.id).textContent=(buyBulk>1)?('x'+buyBulk+' '):'';
				get('productLevel'+me.id).textContent='lvl '+Beautify(me.level);
			}
			this.muted=false;
			this.mute=function(val)
			{
				if (this.id==0) return false;
				this.muted=val;
				if (val) {get('productMute'+this.id).classList.add('on');get('row'+this.id).classList.add('muted');get('mutedProduct'+this.id).style.display='inline-bk';}
				else {get('productMute'+this.id).classList.remove('on');get('row'+this.id).classList.remove('muted');get('mutedProduct'+this.id).style.display='none';}
			};
			
			this.draw=function(){};
			
			var str='';
			if (this.id!=0) str+='<div class="row" id="row'+this.id+'"><div class="separatorBottom"></div>';
			str+='<div class="productButtons">';
				str+='<div id="productLevel'+this.id+'" class="productButton productLevel lumpsOnly" onclick="ObjectsById['+this.id+'].levelUp()" '+getDynamicTooltip('ObjectsById['+this.id+'].levelTooltip','this')+'></div>';
				str+='<div id="productMinigameButton'+this.id+'" class="productButton productMinigameButton lumpsOnly" onclick="ObjectsById['+this.id+'].switchMinigame(-1);PlaySound(ObjectsById['+this.id+'].onMinigame?\'snd/clickOn2.mp3\':\'snd/clickOff2.mp3\');"></div>';
				if (this.id!=0) str+='<div class="productButton productMute" '+getTooltip('<div style="width:150px;text-align:center;font-size:11px;" id="tooltipMuteBuilding"><b>'+("Mute")+'</b><br>('+("Minimize this building")+')</div>','this')+' onclick="ObjectsById['+this.id+'].mute(1);PlaySound(ObjectsById['+this.id+'].muted?\'snd/clickOff2.mp3\':\'snd/clickOn2.mp3\');" id="productMute'+this.id+'">'+("Mute")+'</div>';
				str+='<div id="productDragonBoost'+this.id+'" style="display:none;" class="productButton productDragonBoost" '+getDynamicTooltip('function(){if (ObjectsById['+this.id+'].minigame && ObjectsById['+this.id+'].minidragonBoostTooltip) return ObjectsById['+this.id+'].minidragonBoostTooltip(); else return 0;}','this')+'><div class="icon" style="vertical-align:middle;display:inline-bk;background-position:'+(-30*48)+'px '+(-12*48)+'px;transform:scale(0.5);margin:-20px -16px;"></div></div>';
			str+='</div>';
			if (this.id==0) get('sectionLeftExtra').innerHTML=get('sectionLeftExtra').innerHTML+str;
			else
			{
				str+='<canvas class="rowCanvas" id="rowCanvas'+this.id+'"></canvas>';
				str+='<div class="rowSpecial" id="rowSpecial'+this.id+'"></div>';
				str+='</div>';
				get('rows').innerHTML=get('rows').innerHTML+str;
				
				//building canvas
				this.pics=[];
				
				this.toResize=true;
				this.redraw=function()
				{
					var me=this;
					me.pics=[];
				}
				this.draw=function()
				{
					if (this.amount<=0) return false;
					if (this.toResize)
					{
						this.canvas.width=this.canvas.clientWidth;
						this.canvas.height=this.canvas.clientHeight;
						this.toResize=false;
					}
					var ctx=this.ctx;
					//clear
					//ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
					ctx.globalAlpha=1;
					
					//pic : a loaded picture or a function returning a loaded picture
					//bg : a loaded picture or a function returning a loaded picture - tiled as the background, 128x128
					//xV : the pictures will have a random horizontal shift by this many pixels
					//yV : the pictures will have a random vertical shift by this many pixels
					//w : how many pixels between each picture (or row of pictures)
					//x : horizontal offset
					//y : vertical offset (+32)
					//rows : if >1, arrange the pictures in rows containing this many pictures
					//frames : if present, slice the pic in [frames] horizontal slices and pick one at random
					
					var pic=this.art.pic;
					var bg=this.art.bg;
					var xV=this.art.xV||0;
					var yV=this.art.yV||0;
					var w=this.art.w||48;
					var h=this.art.h||48;
					var offX=this.art.x||0;
					var offY=this.art.y||0;
					var rows=this.art.rows||1;
					var frames=this.art.frames||1;

					if (typeof(bg)=='string') ctx.fillPattern(Pic(this.art.bg),0,0,this.canvas.width,this.canvas.height,128,128);
					else bg(this,ctx);
					/*
					ctx.globalAlpha=0.5;
					if (typeof(bg)=='string')//test
					{
						ctx.fillPattern(Pic(this.art.bg),-128+T%128,0,this.canvas.width+128,this.canvas.height,128,128);
						ctx.fillPattern(Pic(this.art.bg),-128+Math.floor(T/2)%128,-128+Math.floor(T/2)%128,this.canvas.width+128,this.canvas.height+128,128,128);
					}
					ctx.globalAlpha=1;
					*/
					var maxI=Math.floor(this.canvas.width/(w/rows)+1);
					var iT=Math.min(this.amount,maxI);
					var i=this.pics.length;
					
					
					var x=0;
					var y=0;
					var added=0;
					if (i!=iT)
					{
						//for (var iter=0;iter<3;iter++)
						//{
							var prevFrame=0;
							while (i<iT)
							//if (i<iT)
							{
								Math.seedrandom(seed+' '+this.id+' '+i);
								if (rows!=1)
								{
									x=Math.floor(i/rows)*w+((i%rows)/rows)*w+Math.floor((Math.random()-0.5)*xV)+offX;
									y=32+Math.floor((Math.random()-0.5)*yV)+((-rows/2)*32/2+(i%rows)*32/2)+offY;
								}
								else
								{
									x=i*w+Math.floor((Math.random()-0.5)*xV)+offX;
									y=32+Math.floor((Math.random()-0.5)*yV)+offY;
								}
								var usedPic=(typeof(pic)=='string'?pic:pic(this,i));
								var frame=-1;
								//if (frames>1) frame=Math.floor(Math.random()*frames);
								if (frames>1) {frame=prevFrame+Math.floor(Math.random()*(frames-1)+1);frame=frame%frames;}
								prevFrame=frame;
								this.pics.push({x:Math.floor(x),y:Math.floor(y),z:y,pic:usedPic,id:i,frame:frame});
								i++;
								added++;
							}
							while (i>iT)
							//else if (i>iT)
							{
								this.pics.sort(sortSpritesById);
								this.pics.pop();
								i--;
								added--;
							}
						//}
						this.pics.sort(sortSprites);
					}
					
					var len=this.pics.length;
					
					if (this.mouseOn)
					{
						var selected=-1;
						if (this.name=='Grandma')
						{
							//mouse detection only fits grandma sprites for now
							var marginW=-18;
							var marginH=-10;
							for (var i=0;i<len;i++)
							{
								var pic=this.pics[i];
								if (this.mousePos[0]>=pic.x-marginW && this.mousePos[0]<pic.x+64+marginW && this.mousePos[1]>=pic.y-marginH && this.mousePos[1]<pic.y+64+marginH) selected=i;
								if (selected==i && pic.pic=='elfGrandma.png' && mouseDown) Win('Baby it\'s old outside');
							}
							if (prefs.customGrandmas && customGrandmaNames.length>0)
							{
								var str=("Names in white were submitted by our supporters on Patreon.");
								ctx.globalAlpha=0.75;
								ctx.fillStyle='#000';
								ctx.font='9px Merriweather';
								ctx.textAlign='left';
								ctx.fillRect(0,0,ctx.measureText(str).width+4,12);
								ctx.globalAlpha=1;
								ctx.fillStyle='rgba(255,255,255,0.7)';
								ctx.fillText(str,2,8);
								if (EN)
								{
									ctx.fillStyle='rgba(255,255,255,1)';
									ctx.fillText('white',2+ctx.measureText('Names in ').width,8);
								}
							}
						}
					}
					
					Math.seedrandom();
					
					for (var i=0;i<len;i++)
					{
						var pic=this.pics[i];
						var sprite=Pic(pic.pic);
						if (selected==i && this.name=='Grandma')
						{
							ctx.font='14px Merriweather';
							ctx.textAlign='center';
							Math.seedrandom(seed+' '+pic.id/*+' '+pic.id*/);//(seed+' '+pic.id+' '+pic.x+' '+pic.y);
							var years=((Date.now()-new Date(2013,7,8))/(1000*60*60*24*365))+Math.random();//the grandmas age with the game
							var name=choose(grandmaNames);
							var custom=false;
							if (prefs.customGrandmas && customGrandmaNames.length>0 && Math.random()<0.2) {name=choose(customGrandmaNames);custom=true;}
							var text=("%1, age %2",[name,Beautify(Math.floor(70+Math.random()*30+years+this.level))]);
							var width=ctx.measureText(text).width+12;
							var x=Math.max(0,Math.min(pic.x+32-width/2+Math.random()*32-16,this.canvas.width-width));
							var y=4+Math.random()*8-4;
							Math.seedrandom();
							ctx.fillStyle='#000';
							ctx.strokeStyle='#000';
							ctx.lineWidth=8;
							ctx.globalAlpha=0.75;
							ctx.beginPath();
							ctx.moveTo(pic.x+32,pic.y+32);
							ctx.lineTo(Math.floor(x+width/2),Math.floor(y+20));
							ctx.stroke();
							ctx.fillRect(Math.floor(x),Math.floor(y),Math.floor(width),24);
							ctx.globalAlpha=1;
							if (custom) ctx.fillStyle='#fff';
							else ctx.fillStyle='rgba(255,255,255,0.7)';
							ctx.fillText(text,Math.floor(x+width/2),Math.floor(y+16));
							
							ctx.drawImage(sprite,Math.floor(pic.x+Math.random()*4-2),Math.floor(pic.y+Math.random()*4-2));
						}
						//else if (1) ctx.drawImage(sprite,0,0,sprite.width,sprite.height,pic.x,pic.y,sprite.width,sprite.height);
						else if (pic.frame!=-1) ctx.drawImage(sprite,(sprite.width/frames)*pic.frame,0,sprite.width/frames,sprite.height,pic.x,pic.y,(sprite.width/frames),sprite.height);
						else ctx.drawImage(sprite,pic.x,pic.y);
						
					}
					
					/*
					var picX=this.id;
					var picY=12;
					var w=1;
					var h=1;
					var w=Math.abs(Math.cos(T*0.2+this.id*2-0.3))*0.2+0.8;
					var h=Math.abs(Math.sin(T*0.2+this.id*2))*0.3+0.7;
					var x=64+Math.cos(T*0.19+this.id*2)*8-24*w;
					var y=128-Math.abs(Math.pow(Math.sin(T*0.2+this.id*2),5)*16)-48*h;
					ctx.drawImage(Pic('icons.png'),picX*48,picY*48,48,48,Math.floor(x),Math.floor(y),48*w,48*h);
					*/
				}
			}
			
			last=this;
			Objects[this.name]=this;
			ObjectsById.push(this);
			ObjectsN++;
			return this;
		}

		DrawBuildings=function()//draw building displays with canvas
		{
			if (drawT%3==0)
			{
				for (var i in Objects)
				{
					var me=Objects[i];
					if (me.id>0 && !me.onMinigame && !me.muted) me.draw();
					else me.pics=[];
				}
			}
		}
		
		sortSprites=function(a,b)
		{
			if (a.z>b.z) return 1;
			else if (a.z<b.z) return -1;
			else return 0;
		}
		sortSpritesById=function(a,b)
		{
			if (a.id>b.id) return 1;
			else if (a.id<b.id) return -1;
			else return 0;
		}