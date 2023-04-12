let dataInicial = new Date();
dataInicial.setTime(Date.now())

function get(what) {
    return document.getElementById(what);
}

var tinyCotuca=function()
{
	/*if (!HasAchiev('Tiny cookie'))
	{
		return '<div class="tinyCotuca" '+Game.clickStr+'="Game.ClickTinyCookie();"></div>';
	}*/
	return '';
}

var Beautify=function(val,floats)
{
	var negative=(val<0);
	var decimal='';
	var fixed=val.toFixed(floats);
	if (floats>0 && Math.abs(val)<1000 && Math.floor(fixed)!=fixed) decimal='.'+(fixed.toString()).split('.')[1];
	val=Math.floor(Math.abs(val));
	if (floats>0 && fixed==val+1) val++;
	//var format=!EN?2:Game.prefs.format?2:1;
	var format=prefs.format?2:1;
	var formatter=numberFormatters[format];
	var output=(val.toString().indexOf('e+')!=-1 && format==2)?val.toPrecision(3).toString():formatter(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	//var output=formatter(val).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
	if (output=='0') negative=false;
	return negative?'-'+output:output+decimal;
}

var ExportSave=function()
{
		//if (App) return false;
		prefs.showBackupWarning=0;
		prompt('<id ExportSave><h3>'+("Export save")+'</h3><div class="block">'+("Esse é seu código de save.<br>Deixe ele segura em algum lugar!")+'</div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;" readonly>'+WriteSave(1)+'</textarea></div>',[("All done!")]);//prompt('Copy this text and keep it somewhere safe!',WriteSave(1));
		get('textareaPrompt').focus();
		get('textareaPrompt').select();
	}
var ImportSave=function(def)
{
		//if (App) return false;
		prompt('<id ImportSave><h3>'+("Import save")+'</h3><div class="block">'+("Please paste in the code that was given to you on save export.")+'<div id="importError" class="warning" style="font-weight:bold;font-size:11px;"></div></div><div class="block"><textarea id="textareaPrompt" style="width:100%;height:128px;">'+(def||'')+'</textarea></div>',[[("Load"),'if (l(\'textareaPrompt\').value.length==0){return false;}if (ImportSaveCode(l(\'textareaPrompt\').value)){ClosePrompt();}else{l(\'importError\').innerHTML=\'(\'+("Error importing save")+\')\';}'],("Nevermind")]);//prompt('Please paste in the text that was given to you on save export.','');
		get('textareaPrompt').focus();
}

let WriteSlider=function(slider,leftText,rightText,startValueFunction,callback)
{
    if (!callback) callback='';
    return '<div class="sliderBox"><div style="float:left;" class="smallFancyButton">'+leftText+'</div><div style="float:right;" class="smallFancyButton" id="'+slider+'RightText">'+rightText.replace('[$]',startValueFunction())+'</div><input class="slider" style="clear:both;" type="range" min="0" max="100" step="1" value="'+startValueFunction()+'" onchange="'+callback+'" oninput="'+callback+'" onmouseup="PlaySound(\'../sound/clickSFX.mp3\');" id="'+slider+'"/></div>';
}

var prefs=[];

let WritePrefButton=function(prefName,button,on,off,callback,invert)
{
    var invert=invert?1:0;
    if (!callback) callback='';
    callback+='PlaySound(\'../sound/clickSFX.mp3\');';
    return '<a class="smallFancyButton prefButton option'+((prefs[prefName]^invert)?'':' off')+'" id="'+button+'" '+clickStr+'="Toggle(\''+prefName+'\',\''+button+'\',\''+on+'\',\''+off+'\',\''+invert+'\');'+callback+'">'+(prefs[prefName]?on:off)+'</a>';
}

var WriteSave=function(type)
{
	toSave=false;
	//type: none is default, 1=return string only, 2=return uncompressed string, 3=return uncompressed, commented string
	lastDate=parseInt(time);
	var str='';
	if (type==3) str+='\nGame version\n';
	str+=version+'|';
	str+='|';//just in case we need some more stuff here
	if (type==3) str+='\n\nRun details';
	str+=//save stats
	(type==3?'\n	run start date : ':'')+parseInt(startDate)+';'+
	(type==3?'\n	legacy start date : ':'')+parseInt(fullDate)+';'+
	(type==3?'\n	date when we last opened the game : ':'')+parseInt(lastDate)+';'+
	(type==3?'\n	bakery name : ':'')+(bakeryName)+';'+
	(type==3?'\n	seed : ':'')+(seed)+
	'|';
	if (type==3) str+='\n\nPacked preferences bitfield\n	';
	var str2=//prefs
	(prefs.particles?'1':'0')+
	(prefs.numbers?'1':'0')+
	(prefs.autosave?'1':'0')+
	(prefs.autoupdate?'1':'0')+
	(prefs.milk?'1':'0')+
	(prefs.fancy?'1':'0')+
	(prefs.warn?'1':'0')+
	(prefs.cursors?'1':'0')+
	(prefs.focus?'1':'0')+
	(prefs.format?'1':'0')+
	(prefs.notifs?'1':'0')+
	(prefs.wobbly?'1':'0')+
	(prefs.monospace?'1':'0')+
	(prefs.filters?'1':'0')+
	(prefs.cookiesound?'1':'0')+
	(prefs.crates?'1':'0')+
	(prefs.showBackupWarning?'1':'0')+
	(prefs.extraButtons?'1':'0')+
	(prefs.askLumps?'1':'0')+
	(prefs.customGrandmas?'1':'0')+
	(prefs.timeout?'1':'0')+
	(prefs.cloudSave?'1':'0')+
	(prefs.bgMusic?'1':'0')+
	(prefs.notScary?'1':'0')+
	(prefs.fullscreen?'1':'0')+
	(prefs.screenreader?'1':'0')+
	(prefs.discordPresence?'1':'0')+
	'';
	str2=pack3(str2);
	str+=str2+'|';
	if (type==3) str+='\n\nMisc game data';
	str+=
	(type==3?'\n	cookies : ':'')+parseFloat(cookies).toString()+';'+
	(type==3?'\n	total cookies earned : ':'')+parseFloat(cookiesEarned).toString()+';'+
	(type==3?'\n	cookie clicks : ':'')+parseInt(Math.floor(cookieClicks))+';'+
	(type==3?'\n	golden cookie clicks : ':'')+parseInt(Math.floor(goldenClicks))+';'+
	(type==3?'\n	cookies made by clicking : ':'')+parseFloat(handmadeCookies).toString()+';'+
	(type==3?'\n	golden cookies missed : ':'')+parseInt(Math.floor(missedGoldenClicks))+';'+
	(type==3?'\n	background type : ':'')+parseInt(Math.floor(bgType))+';'+
	(type==3?'\n	milk type : ':'')+parseInt(Math.floor(milkType))+';'+
	(type==3?'\n	cookies from past runs : ':'')+parseFloat(cookiesReset).toString()+';'+
	(type==3?'\n	elder wrath : ':'')+parseInt(Math.floor(elderWrath))+';'+
	(type==3?'\n	pledges : ':'')+parseInt(Math.floor(pledges))+';'+
	(type==3?'\n	pledge time left : ':'')+parseInt(Math.floor(pledgeT))+';'+
	(type==3?'\n	currently researching : ':'')+parseInt(Math.floor(nextResearch))+';'+
	(type==3?'\n	research time left : ':'')+parseInt(Math.floor(researchT))+';'+
	(type==3?'\n	ascensions : ':'')+parseInt(Math.floor(resets))+';'+
	(type==3?'\n	golden cookie clicks (this run) : ':'')+parseInt(Math.floor(goldenClicksLocal))+';'+
	(type==3?'\n	cookies sucked by wrinklers : ':'')+parseFloat(cookiesSucked).toString()+';'+
	(type==3?'\n	wrinkles popped : ':'')+parseInt(Math.floor(wrinklersPopped))+';'+
	(type==3?'\n	santa level : ':'')+parseInt(Math.floor(santaLevel))+';'+
	(type==3?'\n	reindeer clicked : ':'')+parseInt(Math.floor(reindeerClicked))+';'+
	(type==3?'\n	season time left : ':'')+parseInt(Math.floor(seasonT))+';'+
	(type==3?'\n	season switcher uses : ':'')+parseInt(Math.floor(seasonUses))+';'+
	(type==3?'\n	current season : ':'')+(season?season:'')+';';
	var wrinklers=SaveWrinklers();
	str+=
	(type==3?'\n	amount of cookies contained in wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amount))+';'+
	(type==3?'\n	number of wrinklers : ':'')+parseInt(Math.floor(wrinklers.number))+';'+
	(type==3?'\n	prestige level : ':'')+parseFloat(prestige).toString()+';'+
	(type==3?'\n	heavenly chips : ':'')+parseFloat(heavenlyChips).toString()+';'+
	(type==3?'\n	heavenly chips spent : ':'')+parseFloat(heavenlyChipsSpent).toString()+';'+
	(type==3?'\n	heavenly cookies : ':'')+parseFloat(heavenlyCookies).toString()+';'+
	(type==3?'\n	ascension mode : ':'')+parseInt(Math.floor(ascensionMode))+';'+
	(type==3?'\n	permanent upgrades : ':'')+parseInt(Math.floor(permanentUpgrades[0]))+';'+parseInt(Math.floor(permanentUpgrades[1]))+';'+parseInt(Math.floor(permanentUpgrades[2]))+';'+parseInt(Math.floor(permanentUpgrades[3]))+';'+parseInt(Math.floor(permanentUpgrades[4]))+';'+
	(type==3?'\n	dragon level : ':'')+parseInt(Math.floor(dragonLevel))+';'+
	(type==3?'\n	dragon aura : ':'')+parseInt(Math.floor(dragonAura))+';'+
	(type==3?'\n	dragon aura 2 : ':'')+parseInt(Math.floor(dragonAura2))+';'+
	(type==3?'\n	chime type : ':'')+parseInt(Math.floor(chimeType))+';'+
	(type==3?'\n	volume : ':'')+parseInt(Math.floor(volume))+';'+
	(type==3?'\n	number of shiny wrinklers : ':'')+parseInt(Math.floor(wrinklers.shinies))+';'+
	(type==3?'\n	amount of cookies contained in shiny wrinklers : ':'')+parseFloat(Math.floor(wrinklers.amountShinies))+';'+
	(type==3?'\n	current amount of sugar lumps : ':'')+parseFloat(Math.floor(lumps))+';'+
	(type==3?'\n	total amount of sugar lumps made : ':'')+parseFloat(Math.floor(lumpsTotal))+';'+
	(type==3?'\n	time when current sugar lump started : ':'')+parseFloat(Math.floor(lumpT))+';'+
	(type==3?'\n	time when last refilled a minigame with a sugar lump : ':'')+parseFloat(Math.floor(lumpRefill))+';'+
	(type==3?'\n	sugar lump type : ':'')+parseInt(Math.floor(lumpCurrentType))+';'+
	(type==3?'\n	vault : ':'')+vault.join(',')+';'+
	(type==3?'\n	heralds : ':'')+parseInt(heralds)+';'+
	(type==3?'\n	golden cookie fortune : ':'')+parseInt(fortuneGC)+';'+
	(type==3?'\n	CpS fortune : ':'')+parseInt(fortuneCPS)+';'+
	(type==3?'\n	highest raw CpS : ':'')+parseFloat(cookiesPsRawHighest)+';'+
	(type==3?'\n	music volume : ':'')+parseInt(Math.floor(volumeMusic))+';'+
			
	'|';//cookies and lots of other stuff
			
	if (type==3) str+='\n\nBuildings : amount, bought, cookies produced, level, minigame data';
	for (var i in Objects)//buildings
	{
		var me=Objects[i];
		if (type==3) str+='\n	'+me.name+' : ';
		if (me.vanilla)
		{
			str+=me.amount+','+me.bought+','+parseFloat(Math.floor(me.totalCookies))+','+parseInt(me.level);
			if (isMinigameReady(me)) str+=','+me.minigame.save(); else str+=','+(me.minigameSave||'');
			str+=','+(me.muted?'1':'0');
			str+=','+me.highest;
			str+=';';
		}
	}
	str+='|';
	if (type==3) str+='\n\nPacked upgrades bitfield (unlocked and bought)\n	';
	var toCompress=[];
	for (var i in UpgradesById)//upgrades
	{
		var me=UpgradesById[i];
		if (me.vanilla) toCompress.push(Math.min(me.unlocked,1),Math.min(me.bought,1));
	};
			
	toCompress=pack3(toCompress.join(''));//toCompress=pack(toCompress);//CompressLargeBin(toCompress);
			
	str+=toCompress;
	str+='|';
	if (type==3) str+='\n\nPacked achievements bitfield (won)\n	';
	var toCompress=[];
	for (var i in AchievementsById)//achievements
	{
		var me=AchievementsById[i];
		if (me.vanilla) toCompress.push(Math.min(me.won));
	}
	toCompress=pack3(toCompress.join(''));//toCompress=pack(toCompress);//CompressLargeBin(toCompress);
	str+=toCompress;
			
	str+='|';
	if (type==3) str+='\n\nBuffs : type, maxTime, time, arg1, arg2, arg3';
	for (var i in buffs)
	{
		var me=buffs[i];
		if (me.type)
		{
			if (type==3) str+='\n	'+me.type.name+' : ';
			if (me.type.vanilla)
			{
				str+=me.type.id+','+me.maxTime+','+me.time;
				if (typeof me.arg1!=='undefined') str+=','+parseFloat(me.arg1);
				if (typeof me.arg2!=='undefined') str+=','+parseFloat(me.arg2);
				if (typeof me.arg3!=='undefined') str+=','+parseFloat(me.arg3);
				str+=';';
			}
		}
	}
			
			
	if (type==3) str+='\n\nCustom :\n';
			
	str+='|';
	str+=saveModData();
			
	lastSaveData=str;
			
	if (type==2 || type==3)
	{
		return str;
	}
	else if (type==1)
	{
		str=escape(utf8_to_b64(str)+'!END!');
		return str;
	}
	else
	{
		if (useLocalStorage)
		{
			//so we used to save the game using browser cookies, which was just really neat considering the game's name
			//we're using localstorage now, which is more efficient but not as cool
			//a moment of silence for our fallen puns
			str=utf8_to_b64(str)+'!END!';
			if (str.length<10)
			{
				Notify('Saving failed!','Purchasing an upgrade and saving again might fix this.<br>This really shouldn\'t happen; please notify Orteil on his tumblr.');
			}
			else
			{
				str=escape(str);
				localStorageSet(SaveTo,str);//aaand save
				if (App) App.save(str);
				if (!localStorageGet(SaveTo))
				{
					Notify(("Error while saving"),("Export your save instead!"));
				}
				else if (document.hasFocus())
				{
					Notify(("Game saved"),'','',1,1);
				}
			}
		}
		else//legacy system
		{
			//that's right
			//we're using cookies
			//yeah I went there
			var now=new Date();//we storin dis for 5 years, people
			now.setFullYear(now.getFullYear()+5);//mmh stale cookies
			str=utf8_to_b64(str)+'!END!';
			saveData=escape(str);
			str=SaveTo+'='+escape(str)+'; expires='+now.toUTCString()+';';
			document.cookie=str;//aaand save
			if (App) App.save(str);
			if (document.cookie.indexOf(SaveTo)<0)
			{
				Notify(("Error while saving"),("Export your save instead!"),'',0,1);
			}
			else if (document.hasFocus())
			{
				Notify(("Game saved"),'','',1,1);
			}
		}
	}
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
					(App?'<div class="listing"><a class="option smallFancyButton" '+clickStr+'onClick="PlaySound(\'../sound/clickSFX.mp3\');toSave=true;toQuit=true;">'+("Salvar e sair")+'</a></div>':'')+
					'<div class="listing"><a class="option smallFancyButton" '+clickStr+'onClick="toSave=true;PlaySound(\'../sound/clickSFX.mp3\');">'+("Save")+'</a><label>'+("Salvar manualmente (O jogo salva automaticamente a cada minuto; atalho: ctrl+S)")+'</label></div>'+
					'<div class="listing"><a class="option smallFancyButton" '+clickStr+'onClick="ExportSave();PlaySound(\'../sound/clickSFX.mp3\');">'+("Exportar save")+'</a><a class="option smallFancyButton" '+clickStr+'="ImportSave();PlaySound(\'../sound/clickSFX.mp3\');">'+("Importar save")+'</a><label>'+("Você pode usar isso para fazer um backup ou transferir saves (atalho para importar: ctrl+O)")+'</label></div>'+
					(!App?('<div class="listing"><a class="option smallFancyButton" '+clickStr+'onClick="FileSave();PlaySound(\'../sound/clickSFX.mp3);">'+("Salvar em arquivo")+'</a><a class="option smallFancyButton" style="position:relative;"><input id="FileLoadInput" type="file" style="cursor:pointer;opacity:0;position:absolute;left:0px;top:0px;width:100%;height:100%;" onchange="FileLoad(event);" '+clickStr+'="PlaySound(\'../sound/clickSFX.mp3\');"/>'+("Load from file")+'</a><label>'+("Use para manter seu progresso em um backup")+'</label></div>'):'')+
					'<div class="listing" style="text-align:right;"><label>'+("Deletar todo progresso, incluindo conquistas")+'</label><a class="option smallFancyButton warning" '+clickStr+'="HardReset();PlaySound(\'../sound/clickSFX.mp3\');">'+("Deletar Save")+'</a></div>'+
							
				'</div>'+
			'</div>'+
			'<div class="block" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+
					
				'<div class="title">'+("Configurações")+'</div>'+
				((App && App.writeCloudUI)?App.writeCloudUI():'')+
				'<div class="listing">'+
					WriteSlider('volumeSlider',("Volume"),'[$]%',function(){return volume;},'setVolume(Math.round(get(\'volumeSlider\').value));get(\'volumeSliderRightText\').innerHTML=volume+\'%\';')+
					'<br>'+
				'</div>'+
				//'<div class="listing">'+WritePrefButton('autosave','autosaveButton','Autosave ON','Autosave OFF')+'</div>'+
				(!App?'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="CheckModData();PlaySound(\'../sound/clickSFX.mp3\');">'+("Check mod data")+'</a><label>('+("view and delete save data created by mods")+')</label></div>':'')+
						
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
		if (!HasAchiev('Olden days')) str+='<div id="oldenDays" style="text-align:right;width:100%;"><div '+clickStr+'="SparkleAt(mouseX,mouseY);PlaySound(\'../sound/clickSFX.mp3\');PlaySound(\'snd/shimmerClick.mp3\');Win(\'Olden days\');UpdateMenu();" class="icon" style="display:inline-block;transform:scale(0.5);cursor:pointer;width:48px;height:48px;background-position:'+(-12*48)+'px '+(-3*48)+'px;"></div></div>';
	}
	else if (onMenu=='stats')
	{
		var equips=0;
		equips=Equips;
		var upgrades='';
		var prestiges=0;
		var upgradesOwned=0;

				
		var list=[];
		//sort the upgrades
		/*for (var i in Upgrades){list.push(Upgrades[i]);}//clone first
		var sortMap=function(a,b)
		{
			if (a.order>b.order) return 1;
			else if (a.order<b.order) return -1;
			else return 0;
		}*/
		/*list.sort(sortMap);
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
		}*/
		/*var achievements=[];
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
		}*/
				
		/*var ascensionModeStr='';
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
				
		var dropMult=dropRateMult();*/

		var date=new Date();
		date.setTime(Date.now()-dataInicial);
		var timeInSeconds=date.getTime()/1000;
		var startDate=sayTime(timeInSeconds*fps,-1);
		date.setTime(Date.now()-fullDate);
		var fullDate=sayTime(date.getTime()/1000*fps,-1);
		if (!fullDate || !fullDate || fullDate.length<1) fullDate=("a long while");
		/*date.setTime(new Date().getTime()-lastDate);
		var lastDate=sayTime(date.getTime()/1000*fps,2);*/
				
		/*var heavenlyMult=GetHeavenlyMultiplier();
				
		var seasonStr=sayTime(seasonT,-1);*/
				
		str+='<div class="section">'+("Estátisticas")+'</div>'+
		'<div class="subsection">'+
		'<div class="title">'+("Geral")+'</div>'+
		'<div id="statsGeneral">'+
			'<div class="listing"><b>'+("Moedas no banco:")+'</b> <div class="price plain">'+tinyCotuca()+Beautify(clicks)+'</div></div>'+
			'<div class="listing"><b>'+("Moedas ganhas (nesse ano):")+'</b> <div class="price plain">'+tinyCotuca()+Beautify(clicksEarned)+'</div></div>'+
			'<div class="listing"><b>'+("Moedas ganhas (todos os anos):")+'</b> <div class="price plain">'+tinyCotuca()+Beautify(clicksEarned+clicksReset)+'</div></div>'+
			//(clicksReset>0?'<div class="listing"><b>'+("Cookies forfeited by ascending:")+'</b> <div class="price plain">'+tinyCotuca()+Beautify(clicksReset)+'</div></div>':'')+
			//(resets?('<div class="listing"><b>'+("Legacy started:")+'</b> '+(fullDate==''?("just now"):("%1 ago",fullDate))+', '+("with %1 ascension",LBeautify(resets))+'</div>'):'')+
			'<div class="listing"><b>'+("Run começou:")+'</b> '+(startDate==''?("just now"):("%1 ago",startDate))+'</div>'+
			'<div class="listing"><b>'+("Equipamentos:")+'</b> '+Beautify(equips)+'</div>'+
			'<div class="listing"><b>'+("Moedas por segundo:")+'</b> '+Beautify(moneyPS,1)+' <small>'+
				'('+("multiplicador:")+' '+Beautify(Math.round(globalCpsMult*100),1)+'%)'+
				(cpsSucked>0?' <span class="warning">('+("withered:")+' '+Beautify(Math.round(cpsSucked*100),1)+'%)</span>':'')+
				'</small></div>'+
			/*'<div class="listing"><b>'+("Raw cookies per second:")+'</b> '+Beautify(cookiesPsRaw,1)+' <small>'+
				'('+("highest this ascension:")+' '+Beautify(cookiesPsRawHighest,1)+')'+
				'</small></div>'+*/
			'<div class="listing"><b>'+("Moedas por Click:")+'</b> '+Beautify(upgrade[0] + 1,1)+'</div>'+
			//'<div class="listing"><b>'+("Cookie clicks:")+'</b> '+Beautify(cookieClicks)+'</div>'+
			//'<div class="listing"><b>'+("Hand-made cookies:")+'</b> '+Beautify(handmadeCookies)+'</div>'+
			//'<div class="listing"><b>'+("Golden cookie clicks:")+'</b> '+Beautify(goldenClicksLocal)+' <small>('+("all time:")+' '+Beautify(goldenClicks)+')</small></div>'+//' <span class="hidden">(<b>Missed golden cookies :</b> '+Beautify(missedGoldenClicks)+')</span></div>'+
			//(dropMult!=1?'<div class="listing"><b>'+("Random drop multiplier:")+'</b> <small>x</small>'+Beautify(dropMult,2)+'</div>':'')+
		'</div>'/*+
		'<br><div class="listing"><b>'+("Running version:")+'</b> '+version+'</div>'+
		
		/*((researchStr!='' || wrathStr!='' || pledgeStr!='' || santaStr!='' || dragonStr!='' || season!='' || ascensionModeStr!='' || canLumps())?(
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
		'<div style="padding-bottom:128px;"></div>'*/
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


let buyMode = 1;
let buyBulk = 1;
function storeBulkButton(id)
{
	if (id==0) buyMode=1;
	else if (id==1) buyBulk=1;
	else if (id==2) buyBulk=10;
	else if (id==3) buyBulk=100;
			
	if (buyMode==1 && buyBulk==-1) buyBulk=100;
	
	if (buyMode==1) get('storeBulkBuy').className='storePreButton storeBulkMode selected'; else get('storeBulkBuy').className='storePreButton storeBulkMode';
			
	if (buyBulk==1) get('storeBulk1').className='storePreButton storeBulkAmount selected'; else get('storeBulk1').className='storePreButton storeBulkAmount';
	if (buyBulk==10) get('storeBulk10').className='storePreButton storeBulkAmount selected'; else get('storeBulk10').className='storePreButton storeBulkAmount';
	if (buyBulk==100) get('storeBulk100').className='storePreButton storeBulkAmount selected'; else get('storeBulk100').className='storePreButton storeBulkAmount';
	
	if (buyMode==1)
	{
		get('products').className='storeSection';
	}
	else
	{
		get('storeBulkMax').style.visibility='visible';
		get('products').className='storeSection selling';
	}
	
	storeToRefresh=1;
	if (id!=-1) PlaySound('../sound/clickSFX.mp3');
	CanBuy();
}

function calculateBuyValue(id){

	var novoPreco = preco[id]
	if(buyBulk != 1)
	{
		for(var i = 0; i < buyBulk; i++)
		{
			novoPreco += preco[id]*1.15
		}
	}
	return novoPreco;
}