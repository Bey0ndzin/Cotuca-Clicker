upgradesToRebuild=1;
Upgrades={};
UpgradesById={};
UpgradesN=0;
UpgradesInStore=[];
UpgradesOwned=0;

function Upgrade(name,desc,price,icon)
{
	this.id=UpgradesN;
	this.name=name;
	this.dname=this.name;
	this.desc=desc;
	this.baseDesc=this.desc;
	this.basePrice=price;
	this.priceLumps=0;
	this.unlocked=0;
	this.icon = icon;
	this.bought=0;
	this.order=this.id;
	this.pool='';
	this.power=0;
	this.unlockAt=0;
	this.techUnlock=[];
	this.parents=[];
	this.type='upgrade';
	this.tier=0;
	this.buildingTie=0;
			
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

new Upgrade('Sharpness I',"Sua espadinha fica encantada com <b>SHARPNESS</b> I",100, "../img/sharpnessI");
//new Upgrade('Sharpness I',"Sua espadinha fica encantada com <b>SHARPNESS</b> I"+'<q>prod prod</q>',100,[0,0]);