onCrate = 0;
var mouseDown = 0;
var scale = 1;
var TopBarOffset = 32;
var windowW=window.innerWidth;
var windowH=window.innerHeight;
var T=0;
var drawT=0;

var mouseX=0;
var mouseY=0;
var mouseX2=0;
var mouseY2=0;
var mouseMoved=0;

function GetMouseCoords(e)
{
	var posx=0;
	var posy=0;
	if (!e) var e=window.event;
	if (e.pageX||e.pageY)
	{
		posx=e.pageX;
		posy=e.pageY;
	}
	else if (e.clientX || e.clientY)
	{
		posx=e.clientX+document.body.scrollLeft+document.documentElement.scrollLeft;
		posy=e.clientY+document.body.scrollTop+document.documentElement.scrollTop;
	}
	var x=0;
	var y=TopBarOffset;
	mouseX2=mouseX;
	mouseY2=mouseY;
	mouseX=(posx-x)/scale;
	mouseY=(posy-y)/scale;
	mouseMoved=1;
	lastActivity=time;
	if (mouseMoved || Scroll || Tooltip.dynamic) Tooltip.update();
}

function SetOnCrate(what)
{
	onCrate=what;
}   

Element.prototype.getBounds=function(){
	var bounds=this.getBoundingClientRect();
	var s=scale;
	bounds.x/=s;
	bounds.y/=s;
	bounds.width/=s;
	bounds.height/=s;
	bounds.top/=s;
	bounds.bottom/=s;
	bounds.left/=s;
	bounds.right/=s;
	return bounds;
};

function Crate(me,context,forceClickStr,id,style)
{

	var classes='crate';
	var enabled=0;
	var noFrame=0;
	var attachment='top';
	var mysterious=0;
	var clickStr='';
			
	if (me.type=='upgrade')
	{
		var canBuy=(context=='store'?me.canBuy():true);
		if (context=='store' && !canBuy) enabled=0;
		else if (context=='ascend' && me.bought==0) enabled=0;
		else enabled=1;
		if (me.bought>0) enabled=1;
		
		if (context=='stats' && !prefs.crates) noFrame=1;
		
		classes+=' upgrade';
				
	}
	else if (me.type=='achievement')
	{
		if (context=='stats' && me.won==0 && me.pool!='normal') return '';
		else if (context!='stats') enabled=1;
				
		if (context=='stats' && !prefs.crates) noFrame=1;
				
		classes+=' achievement';
		if (me.pool=='shadow') classes+=' shadow';
		if (me.won>0) enabled=1;
		else mysterious=1;
		if (!enabled) clickStr='AchievementsById['+me.id+'].click();';
				
		if (neuromancy) clickStr='AchievementsById['+me.id+'].toggle();';
	}
			
	if (forceClickStr) clickStr=forceClickStr;
			
	if (me.choicesFunction) classes+=' selector';
			
			
	var icon=me.icon;
		
	if (me.iconFunction) icon=me.iconFunction();
			
	if (me.bought && context=='store') enabled=0;
			
	if (enabled) classes+=' enabled';// else classes+=' disabled';
	if (noFrame) classes+=' noFrame';
			
	var text=[];
	if (sesame)
	{
		if (debuggedUpgradeCpS[me.name] || debuggedUpgradeCpClick[me.name])
		{
			text.push('x'+Beautify(1+debuggedUpgradeCpS[me.name],2));text.push(debugColors[Math.floor(Math.max(0,Math.min(debugColors.length-1,Math.pow(debuggedUpgradeCpS[me.name]/2,0.5)*debugColors.length)))]);
			text.push('x'+Beautify(1+debuggedUpgradeCpClick[me.name],2));text.push(debugColors[Math.floor(Math.max(0,Math.min(debugColors.length-1,Math.pow(debuggedUpgradeCpClick[me.name]/2,0.5)*debugColors.length)))]);
		}
		if (extraInfo) {text.push(Math.floor(me.order)+(me.power?'<br>P:'+me.power:''));text.push('#fff');}
	}
	var textStr='';
	for (var i=0;i<text.length;i+=2)
	{
		textStr+='<div style="opacity:0.9;z-index:1000;padding:0px 2px;background:'+text[i+1]+';color:#000;font-size:10px;position:absolute;top:'+(i/2*10)+'px;left:0px;">'+text[i]+'</div>';
	}
	return (prefs.screenreader?'<button aria-labelledby="ariaReader-'+me.type+'-'+me.id+'"':'<div')+
	(clickStr!=''?(' '+clickStr+'="'+clickStr+'"'):'')+
	' class="'+classes+'" '+
	getDynamicTooltip(
		'function(){return CrateTooltip('+(me.type=='upgrade'?'Upgrades':'Achievements')+'ById['+me.id+'],'+(context?'\''+context+'\'':'')+');}',
		attachment,true
	)+
	(id?'id="'+id+'" ':'')+
	'style="'+(mysterious?
		'background-position:'+(-0*48)+'px '+(-7*48)+'px;':
		writeIcon(icon))+
		((context=='ascend' && me.pool=='prestige')?'position:absolute;left:'+me.posX+'px;top:'+me.posY+'px;':'')+
		(style||'')+
	'">'+
	textStr+
	(prefs.screenreader?'<label class="srOnly" id="ariaReader-'+me.type+'-'+me.id+'"></label>':'')+
	(me.choicesFunction?'<div class="selectorCorner"></div>':'')+
	(prefs.screenreader?'</button>':'</div>');
}

function CrateTooltip(me,context)
{

	var tags=[];
	var price='';
			
	var ariaText='';
			
	if (me.type=='upgrade')
	{
		ariaText+='Upgrade. ';
				
		if (me.pool=='prestige') tags.push(("[Tag]Heavenly",0,'Heavenly'),'#efa438');
		else if (me.pool=='click') tags.push(("[Tag]Cookie",0,'Cookie'),0);
		else tags.push(("[Tag]Melhoria",0,'Melhoria'),0);
				
		if (me.bought>0)
		{
			ariaText+='Você tem. ';
			tags.push(("Comprado"),0);
		}
				
		if (me.lasting && me.unked) tags.push(("Unked forever"),'#f2ff87');
				
		var canBuy=(context=='store'?me.canBuy():true);
		var cost=me.getPrice();

		
		if (me.priceLumps==0 && cost==0) price='';
		else
		{
			price='<div style="float:right;text-align:right;"><span class="price'+
			'">'+'R$'+Beautify(Math.round(cost))+'</span>'+'</div>';
					
			ariaText+=(me.bought?'Bought for':canBuy?'Can buy for':'Cannot afford the')+' '+Beautify(Math.round(cost))+' '+((me.priceLumps>0)?'sugar lumps':(me.pool=='prestige')?'heavenly chips':'clicks')+'. ';
		}
	}
	else if (me.type=='achievement')
	{
		ariaText+='Achievement. ';
		if (me.pool=='shadow') tags.push(("Shadow Achievement"),'#9700cf');
		else tags.push(("Achievement"),0);
		if (me.won>0) {tags.push(("Unked"),0);ariaText+='Unked. ';}
		else {tags.push(("ked"),0);mysterious=1;}
	}
			
	var tagsStr='';
	for (var i=0;i<tags.length;i+=2)
	{
		if (i%2==0) tagsStr+='<div class="tag" style="background-color:'+(tags[i+1]==0?'#fff':tags[i+1])+';">'+tags[i]+'</div>';
	}
	
	var icon=me.icon;
			
	if (me.iconFunction) icon=me.iconFunction();
			
			
	var tip='';
			
	if (tip!='') ariaText+=tip+' ';
			
	var desc=me.desc;
	if (me.descFunc) desc=me.descFunc(context);
	if (me.bought && context=='store' && me.displayFuncWhenOwned) desc=me.displayFuncWhenOwned()+'<div class="line"></div>'+desc;
	if (me.unkAt)
	{
		if (me.unkAt.require)
		{
			var it=Upgrades[me.unkAt.require];
			desc='<div style="font-size:80%;text-align:center;">'+(EN?'From':("Source:"))+' '+tinyIcon(it.icon)+' '+it.dname+'</div><div class="line"></div>'+desc;
		}
		else if (me.unkAt.text)
		{
			//var it=Upgrades[me.unkAt.require];
			desc='<div style="font-size:80%;text-align:center;">'+(EN?'From':("Source:"))+' <b>'+text+'</b></div><div class="line"></div>'+desc;
		}
	}
			
	ariaText+='Description: '+desc+' ';
			
	if (prefs.screenreader)
	{
		var ariaLabel=l('ariaReader-'+me.type+'-'+me.id);
		if (ariaLabel) ariaLabel.innerHTML=ariaText.replace(/(<([^>]+)>)/gi,' ');
	}
			
	return '<div style="position:absolute;left:1px;top:1px;right:1px;bottom:1px;background:linear-gradient(125deg,'+(me.pool=='prestige'?'rgba(15,115,130,1) 0%,rgba(15,115,130,0)':'rgba(50,40,40,1) 0%,rgba(50,40,40,0)')+' 20%);mix-blend-mode:screen;z-index:1;"></div><div style="z-index:10;padding:8px 4px;min-width:350px;position:relative;" id="TooltipCrate">'+
	'<div class="icon" style="float:left;margin-left:-8px;margin-top:-8px;'+writeIcon(icon)+'"></div>'+
	(me.bought && context=='store'?'':price)+
	'<div class="name">'+(me.dname)+'</div>'+
	tagsStr+
	'<div class="line"></div><div class="description">'+(desc)+'</div></div>'+
	(tip!=''?('<div class="line"></div><div style="font-size:10px;font-weight:bold;color:#999;text-align:center;padding-bottom:4px;line-height:100%;" class="crateTip">'+tip+'</div>'):'')
}

function writeIcon(icon)
{
	//returns CSS for an icon's background image
	//for use in CSS strings
	if(Array.isArray(icon))
		return ('background-image:url('+icon[0]+'.png); '+'background-position:'+(0)+'px '+(0)+'px;'+'background-size: cover');
	return ('background-image:url('+icon+'.png); '+'background-position:'+(0)+'px '+(0)+'px;'+'background-size: cover');
}

var Tooltip={text:'', x:0, y:0, origin:'', on:0, tt:get('Tooltip'), tta:get('TooltipAnchor'), shouldHide:1, dynamic:0, from:0};
Tooltip.draw=function(from,text,origin)
{
    this.tt=get('tooltip')
    this.tta=get('tooltipAnchor')
	this.shouldHide=0;
	this.text=text;
	this.from=from;
	this.origin=origin;
	var tt=this.tt;
	var tta=this.tta;
	tt.style.left='auto';
	tt.style.top='auto';
	tt.style.right='auto';
	tt.style.bottom='auto';

	if (typeof this.text==='function')
	{
		var text=this.text();
		if (text=='') tta.style.opacity='0';
		else
		{
			tt.innerHTML=unescape(text);
			tta.style.opacity='1';
		}
	}
	else tt.innerHTML=unescape(this.text);
	//tt.innerHTML=(typeof this.text==='function')?unescape(this.text()):unescape(this.text);
	tta.style.display='block';
	tta.style.visibility='hidden';
	Tooltip.update();
	tta.style.visibility='visible';
	this.on=1;
}
Tooltip.update=function()
{
	var X=0;
	var Y=0;
	var width=this.tt.offsetWidth;
	var height=this.tt.offsetHeight;
	if (this.origin=='store')
	{
		X=windowW-332-width;
		Y=mouseY-32;
		if (onCrate) Y=onCrate.getBounds().top-42;
		Y=Math.max(0,Math.min(windowH-height-44,Y));
	}
	else
	{
		if (onCrate)
		{
			var rect=onCrate.getBounds();
			if (rect.left==0 && rect.top==0)//if we get that bug where we get stuck in the top-left, move to the mouse (REVISION : just do nothing)
			{return false;/*rect.left=mouseX-24;rect.right=mouseX+24;rect.top=mouseY-24;rect.bottom=mouseY+24;*/}
			if (this.origin=='left')
			{
				X=rect.left-width-16;
				Y=rect.top+(rect.bottom-rect.top)/2-height/2-38;
				Y=Math.max(0,Math.min(windowH-height-19,Y));
				if (X<0) X=rect.right;
			}
			else
			{
				X=rect.left+(rect.right-rect.left)/2-width/2-8;
				Y=rect.top-height-TopBarOffset-16;
				X=Math.max(0,Math.min(windowW-width-16,X));
				if (Y<0) Y=rect.bottom-TopBarOffset;
			}
		}
		else if (this.origin=='bottom-right')
		{
			X=mouseX+8;
			Y=mouseY-32;
			X=Math.max(0,Math.min(windowW-width-16,X));
			Y=Math.max(0,Math.min(windowH-height-64,Y));
		}
		else if (this.origin=='bottom')
		{
			X=mouseX-width/2-8;
			Y=mouseY+24;
			X=Math.max(0,Math.min(windowW-width-16,X));
			Y=Math.max(0,Math.min(windowH-height-64,Y));
		}
		else if (this.origin=='left')
		{
			X=mouseX-width-24;
			Y=mouseY-height/2-8;
			X=Math.max(0,Math.min(windowW-width-16,X));
			Y=Math.max(0,Math.min(windowH-height-64,Y));
		}
		else if (this.origin=='this' && this.from)
		{
			var rect=this.from.getBounds();
			X=(rect.left+rect.right)/2-width/2-8;
			Y=(rect.top)-this.tt.clientHeight-48;
			X=Math.max(0,Math.min(windowW-width-16,X));
			//Y=Math.max(0,Math.min(windowH-this.tt.clientHeight-64,Y));
			if (Y<0) Y=(rect.bottom-24);
			if (Y+height+40>windowH)
			{
				X=rect.right+8;
				Y=rect.top+(rect.bottom-rect.top)/2-height/2-38;
				Y=Math.max(0,Math.min(windowH-height-19,Y));
			}
		}
		else
		{
			X=mouseX-width/2-8;
			Y=mouseY-height-32;
			X=Math.max(0,Math.min(windowW-width-16,X));
			Y=Math.max(0,Math.min(windowH-height-64,Y));
		}
	}
	this.tta.style.left=X+'px';
	this.tta.style.right='auto';
	this.tta.style.top=Y+'px';
	this.tta.style.bottom='auto';
	if (this.shouldHide) {this.hide();this.shouldHide=0;}
	else if (drawT%10==0 && typeof(this.text)==='function')
	{
		var text=this.text();
		if (text=='') this.tta.style.opacity='0';
		else
		{
			this.tt.innerHTML=unescape(text);
			this.tta.style.opacity='1';
		}
	}
}
Tooltip.hide=function()
{
	if (this.tta) this.tta.style.display='none';
	this.dynamic=0;
	this.on=0;
}

function getTooltip(text,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="setOnCrate(0);Tooltip.shouldHide=1;" onMouseOver="if (!mouseDown) {setOnCrate(this);Tooltip.dynamic=0;Tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');Tooltip.wobble();}"';
	else return 'onMouseOut="Tooltip.shouldHide=1;" onMouseOver="Tooltip.dynamic=0;Tooltip.draw(this,\''+escape(text)+'\',\''+origin+'\');Tooltip.wobble();"';
}
function getDynamicTooltip(func,origin,isCrate)
{
	origin=(origin?origin:'middle');
	if (isCrate) return 'onMouseOut="setOnCrate(0);Tooltip.shouldHide=1;" onMouseOver="if (!mouseDown) {setOnCrate(this);Tooltip.dynamic=1;Tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');Tooltip.wobble();}"';
	return 'onMouseOut="Tooltip.shouldHide=1;" onMouseOver="Tooltip.dynamic=1;Tooltip.draw(this,'+'function(){return '+func+'();}'+',\''+origin+'\');Tooltip.wobble();"';
}
function attachTooltip(el,func,origin)
{
	if (typeof func==='string')
	{
		var str=func;
		func=function(str){return function(){return str;};}(str);
	}
	origin=(origin?origin:'middle');
	AddEvent(el,'mouseover',function(func,el,origin){return function(){Tooltip.dynamic=1;Tooltip.draw(el,func,origin);};}(func,el,origin));
	AddEvent(el,'mouseout',function(){return function(){Tooltip.shouldHide=1;};}());
}
Tooltip.wobble=function()
{
	//disabled because this effect doesn't look good with the slight slowdown it might or might not be causing.
	if (false)
	{
		this.tt.className='framed';
		void this.tt.offsetWidth;
		this.tt.className='framed wobbling';
	}
}