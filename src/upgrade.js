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
	if (!OnAscend && AscendTimer==0)
	{
		if (e.ctrlKey && e.keyCode==83) {toSave=true;e.preventDefault();}//ctrl-s saves the game
		else if (e.ctrlKey && e.keyCode==79) {ImportSave();e.preventDefault();}//ctrl-o opens the import menu
	}
	if ((e.keyCode==16 || e.keyCode==17) && tooltip.dynamic) tooltip.update();
	keys[e.keyCode]=1;
	if (e.keyCode==9) keys=[];//reset keys on tab press
});

AddEvent(window,'visibilitychange',function(e){
	keys=[];//reset all key pressed on visibility change (should help prevent ctrl still being down after ctrl-tab)
});

function Upgrade(name,desc,price,icon,equip)
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
				console.log(this.equip)
				console.log(UpgradesById[this.id+1].equip)
				if(UpgradesById[this.id+1].equip == this.equip)
					get('upgrade0').onclick(UpgradesById[this.id+1].click(event))
				success=1;
			}
		}
	}
	if (this.bought && this.activateFunction) this.activateFunction();
	return success;
}
new Upgrade('Afiação I',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> I",100, "../img/sharpness",'sword');
new Upgrade('Afiação II',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> II",5000, "../img/sharpness",'sword');
/*new Upgrade('Afiação M',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> M",1000000000000, "../img/sharpness", null);
new Upgrade('Afiação D',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> D",10000000000, "../img/sharpness", sharpM);
new Upgrade('Afiação C',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> C",100000000, "../img/sharpness", sharpD);
new Upgrade('Afiação L',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> L",10000000, "../img/sharpness", sharpC);
new Upgrade('Afiação XX',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> XX",5000000, "../img/sharpness", sharpL);
new Upgrade('Afiação X',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> X",1000000, "../img/sharpness", sharpXX);
new Upgrade('Afiação V',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> V",100000, "../img/sharpness", sharpX);
new Upgrade('Afiação IV',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> IV",50000, "../img/sharpness", sharpV);
new Upgrade('Afiação III',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> III",10000, "../img/sharpness", sharpIV);
new Upgrade('Afiação II',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> II",5000, "../img/sharpness", sharpIII);
new Upgrade('Afiação I',"Sua espadinha fica encantada com <b>AFIAÇÃO</b> I",100, "../img/sharpness", sharpII);*/

//new Upgrade('Sharpness I',"Sua espadinha fica encantada com <b>SHARPNESS</b> I"+'<q>prod prod</q>',100,[0,0]);