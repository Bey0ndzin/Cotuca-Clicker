upgradesToRebuild=1;
Upgrades={};
UpgradesById={};
UpgradesN=0;
UpgradesInStore=[];
UpgradesOwned=0;
lastActivity=Date.now();
time=Date.now();
promptOn=0;

keys=[];

AddEvent(window,'keyup',function(e){
	lastActivity=time;
	if (e.keyCode==27)
	{
		if (promptOn && !promptNoClose) {ClosePrompt();PlaySound('../sound/clickSFX.mp3');}
		if (AscendTimer>0) AscendTimer=AscendDuration;
	}//esc closes prompt
	if (promptOn)
	{
		if (e.keyCode==13) ConfirmPrompt();//enter confirms prompt
	}
	keys[e.keyCode]=0;
});
AddEvent(window,'keydown',function(e){
	if (promptOn)
	{
		if (e.keyCode==9)
		{
			//tab to shift through prompt buttons
			if (e.shiftKey) FocusPromptOption(-1);
			else FocusPromptOption(1);
			e.preventDefault();
		}
	}
	if (e.ctrlKey && e.keyCode==83) {toSave=true;e.preventDefault();}//ctrl-s saves the game
	else if (e.ctrlKey && e.keyCode==79) {ImportSave();e.preventDefault();}//ctrl-o opens the import menu
	
	if ((e.keyCode==16 || e.keyCode==17) && tooltip.dynamic) tooltip.update();
	keys[e.keyCode]=1;
	if (e.keyCode==9) keys=[];//reset keys on tab press
});

AddEvent(window,'visibilitychange',function(e){
	keys=[];//reset all key pressed on visibility change (should help prevent ctrl still being down after ctrl-tab)
});

function Upgrade(name,desc,price,icon,equip,which)
{
	this.id=UpgradesN;
	this.name=name;
	this.dname=this.name;
	this.desc=desc;
	this.baseDesc=this.desc;
	this.basePrice=price;
	this.unlocked=0;
	this.icon=icon;
	this.bought=0;
	this.order=this.id;
	this.power=0;
	this.unlockAt=0;
	this.parents=[];
	this.which=which;
	this.type='upgrade';
	this.buildingTie=0;
	this.equip=equip;
			
	last=this;
	Upgrades[this.name]=this;
	UpgradesById[this.id]=this;
	UpgradesN++;
	return this;
}
Upgrade.prototype.getType=function(){return 'Upgrade';}
		
Upgrade.prototype.getPrice=function()
{
	var price=this.basePrice;
	if (this.priceFunc) price=this.priceFunc(this);
	if (price==0) return 0;
	return Math.ceil(price);
}
		
Upgrade.prototype.canBuy=function()
{
	if (this.canBuyFunc) return this.canBuyFunc();
	if (clicks>=this.getPrice()) return true; else return false;
}
Upgrade.prototype.click=function(e)
{
	if ((e && e.shiftKey) || keys[16])
	{
		if (Has('Inspired checklist'))
		{
			if (this.isVaulted()) this.unvault();
			else this.vault();
			upgradesToRebuild=1;
			PlaySound('../sound/buySFX.mp3');
		}
	}
	else this.buy();
}
		
		
Upgrade.prototype.buy=function(bypass)
{
	var success=0;
	var cancelPurchase=0;
	if (this.clickFunction && !bypass) cancelPurchase=!this.clickFunction();
	if (!cancelPurchase)
	{
		if (this.choicesFunction)
		{
			if (choiceSelectorOn==this.id)
			{
				get('toggleBox').style.display='none';
				get('toggleBox').innerHTML='';
				choiceSelectorOn=-1;
				PlaySound('../sound/buySFX.mp3');
			}
			else
			{
				choiceSelectorOn=this.id;
				var choices=this.choicesFunction();
				var str='';
				str+='<div class="close" onclick="UpgradesById['+this.id+'].buy();">x</div>';
				str+='<h3>'+this.dname+'</h3>'+
				'<div class="line"></div>';
				if (typeof choices==='string')
				{
					str+=choices;
				}
				else if (choices.length>0)
				{
					var selected=0;
					for (var i in choices) {if (choices[i].selected) selected=i;}
					choiceSelectorChoices=choices;//this is a really dumb way of doing this i am so sorry
					choiceSelectorSelected=selected;
					str+='<h4 id="choiceSelectedName">'+choices[selected].name+'</h4>'+
					'<div class="line"></div>';
					
					for (var i in choices)
					{
						choices[i].id=i;
						choices[i].order=choices[i].order||0;
					}
						
					var sortMap=function(a,b)
					{
						if (a.order>b.order) return 1;
						else if (a.order<b.order) return -1;
						else return 0;
					}
					choices.sort(sortMap);
					
					for (var i=0;i<choices.length;i++)
					{
						if (!choices[i]) continue;
						var icon=choices[i].icon;
						var id=choices[i].id;
						if (choices[i].div) str+='<div class="line"></div>';
						str+='<div class="crate noFrame enabled'+(id==selected?' highlighted':'')+'" style="opacity:1;float:none;display:inline-block;'+writeIcon(icon)+'" '+clickStr+'="IUpgradesById['+this.id+'].choicesPick('+id+');IchoiceSelectorOn=-1;IUpgradesById['+this.id+'].buy();" onMouseOut="l(\'choiceSelectedName\').innerHTML=IchoiceSelectorChoices[IchoiceSelectorSelected].name;" onMouseOver="l(\'choiceSelectedName\').innerHTML=IchoiceSelectorChoices['+i+'].name;"'+
						'></div>';
					}
				}
				get('toggleBox').innerHTML=str;
				get('toggleBox').style.display='block';
				get('toggleBox').focus();
				Tooltip.hide();
				PlaySound('../sound/buySFX.mp3');
				success=1;
			}
		}
		else
		{
			var price=this.getPrice();
			if (clicks>=price && !this.bought)
			{
				clicks-=price;
				//clicksSpent+=price;
				Tooltip.hide();
				this.unlocked=1;
				this.bought=1;
				if (this.buyFunction) this.buyFunction();
				PlaySound('../sound/buySFX.mp3')
				if(UpgradesById[this.id+1] != null)
					if(UpgradesById[this.id+1].equip == this.equip)
					{
						if(this.id >= 17 && this.id <= 20){
							get('productIcon'+this.which).style.backgroundImage = 'url('+this.icon[0]+'.png)'
							get('productIcon'+(this.which+1)).style.backgroundImage = 'url('+this.icon[1]+'.png)'
							get('upgrade'+this.which).style.backgroundImage = 'url(../img/UpgradeFrame.png), ' + 'url('+UpgradesById[this.id+1].icon[0]+'.png)'
						}
						else{
							get('productIcon'+this.which).style.backgroundImage = 'url('+this.icon+'.png)'
							get('upgrade'+this.which).style.backgroundImage = 'url(../img/UpgradeFrame.png), ' + 'url('+UpgradesById[this.id+1].icon+'.png)'
						}
						var prox = this.id+1
						get('upgrade'+this.which).onclick = () => {UpgradesById[prox].click(event)}
						get('upgrade'+this.which).onmouseout = () => {SetOnCrate(prox);Tooltip.shouldHide=1;Tooltip.hide();}
						get('upgrade'+this.which).onmouseover = () => {if(!mouseDown) {SetOnCrate(get('upgrade'+this.which));Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[prox],'store');}();},'store');}}
						/*get('upgrade'+this.which).setAttribute('onclick', "UpgradesById["+(this.id+1)+"].click(event)")
						get('upgrade'+this.which).setAttribute('onmouseout', "SetOnCrate("+(this.id+1)+");Tooltip.shouldHide=1;Tooltip.hide();")
						get('upgrade'+this.which).setAttribute('onmouseover', "if(!mouseDown) {SetOnCrate('upgrade"+this.which+"');Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById["+(this.id+1)+"],'store');}();},'store');}")*/
					}
				if(this.id == 16)
					get('productIcon'+this.which).style.backgroundImage = 'url('+this.icon+'.png)'
				if(this.id == 20)
				{
					get('productIcon'+this.which).style.backgroundImage = 'url('+this.icon[0]+'.png)'
					get('productIcon'+(this.which+1)).style.backgroundImage = 'url('+this.icon[1]+'.png)'
				}
				success=1;
			}
		}
	}
	if (this.bought && this.activateFunction) this.activateFunction();
	return success;
}
new Upgrade('Afiação I',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> I (E ela até fica maior)",100, "../img/sharpness",'sword', 0); //0
new Upgrade('Afiação II',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> II",5000, "../img/sharpness",'sword',0);
new Upgrade('Afiação III',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> III",10000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação IV',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> IV",50000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação V',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> V",100000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação X',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> X",1000000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação XX',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> XX",5000000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação L',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> L",10000000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação C',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> C",100000000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação D',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> D",10000000000, "../img/sharpness", 'sword',0);
new Upgrade('Afiação M',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> M",1000000000000, "../img/sharpness", 'sword',0); //9

new Upgrade('Perfect Block', "Você aprende a dar PB nos seus adversários quebrando a postura deles", 500, "../img/escudoPb", 'shield',1) //11
new Upgrade('Aço do espAÇO', "Seu escudinho é reforçado com um aço de outra dimensão (esse é dos bons)", 15000, "../img/escudoAco", 'shield',1)
new Upgrade('adof ariedaM', "acipé atul amu arp anodalob acif oducse ues od ariedam A", 50000, "../img/escudoMad", 'shield',1)
new Upgrade('Benção do Druida', "Um druida que você achou caminhando por ai quer abençoar seu escudo", 150000, "../img/escudoBenc", 'shield',1)
new Upgrade('Maldição do Druida', "O mesmo druida fez uma trollagem hardcore e agora seu escudo ficou buxa", 500000, "../img/escudoMald", 'shield',1)
new Upgrade('Herói do escudo', "Tu aprendeu a manusear teu escudo corretamente e ficou realmente bom nisso...", 1500000, "../img/escudoHeroi", 'shield',1) //16

new Upgrade('Diamante poderoso', "Você pegou diamante para reforça seus equipamentos <p style='color:red'>!PODE ATRAIR INTERESSEIRAS!</p>", 5000, ["../img/armDima", '../img/botaDima'], 'armor',2) //17
new Upgrade('Obsidiana', "Você minerou obsidana para colocar na sua armadura para ficar mais resistente(tu vai ficar mais pesado também)", 500000, ["../img/armObs", '../img/botaObs'], 'armor',2)
new Upgrade('Pedra de Fogo', "Você pega uma pedra vulcânica pra deixar sua armadura flamejante", 1000000, ["../img/armFogo", '../img/botaFogo'], 'armor',2)
new Upgrade('Brilho Brilhoso', "Tu acha um líquido duvidoso para passar na sua armadura (vai ficar tinindo)", 5000000, ["../img/armBrilho", '../img/botaBrilho'], 'armor',2) //20

new Upgrade('???', "É sério que tu vai pegar algodão para passar no teu arco???", 15000, "../img/bowAlgodao.png", 'bow',4) //21
new Upgrade('Matinho', "Namoral que tu vai pegar e colocar mato agora no seu arco? Tu tem problema?", 100000, "../img/bowMato", 'bow',4)
new Upgrade('Molhado', "E ainda vai passar água no teu arco?????? Como assim isso vai funcionar mano deixa de ser idiota", 1500000, "../img/bowAgua", 'bow',4)
new Upgrade('Ecossistema', "Tu acha um líquido duvidoso para passar na sua armadura (vai ficar tinindo)", 5000000, ["../img/armBrilho", '../img/botaBrilho'], 'armor',2) //20

//new Upgrade('Sharpness I',"Sua espadinha fica encantada com <b>SHARPNESS</b> I"+'<q>prod prod</q>',100,[0,0]);