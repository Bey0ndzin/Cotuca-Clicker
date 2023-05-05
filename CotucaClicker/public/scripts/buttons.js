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
}

var App = {};
var clickStr='';
var ON=' '+("ON");
var OFF=' '+("OFF");
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
					WriteSlider('volumeSlider',("Volume"),'[$]%',function(){return volume;},'setVolume(Math.round(get(\'volumeSlider\').value));get(\'volumeSliderRightText\').innerHTML=volume+\'%\';get(\'music\').play();')+
					'<br>'+
				'</div>'+
				//'<div class="listing">'+WritePrefButton('autosave','autosaveButton','Autosave ON','Autosave OFF')+'</div>'+
				(!App?'<div class="listing"><a class="option smallFancyButton" '+clickStr+'="CheckModData();PlaySound(\'../sound/clickSFX.mp3\');">'+("Check mod data")+'</a><label>('+("view and delete save data created by mods")+')</label></div>':'')+
						
				'</div>'+
			'</div>'+
		'</div>';
				
		str+='<div style="height:128px;"></div>';
	}
	else if (onMenu=='login')
	{
		str+='<div class="section">'+("Login")+'</div>';
		
		str+=
			(App?'<div class="listing"><a class="option smallFancyButton" onClick="PlaySound(\'../sound/SwishSFX.mp3\'); login();">Login</a>' + 
			'<a class="option smallFancyButton" onClick="PlaySound(\'../sound/SwooshSFX.mp3\'); register();">Registrar</a></div>':'')+

			'<div class="block" id="loginForm" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+	
				'<div class="title">'+("Login")+'</div>'+
					(App?'<form class="listing" style="text-align: center;"><input type="text" placeholder="Usuário" class="option smallFancyButton"><br>':'')+
					'<input type="password" placeholder="Senha" class="option smallFancyButton"><br>'+
					'<a class="option smallFancyButton" onClick="Login();PlaySound(\'../sound/clickSFX.mp3\');">'+("Entrar na Conta")+'</a></form>'+
							
				'</div>'+
			'</div>';
		
		str+=
			'<div class="block" id="regForm" style="padding:0px;margin:8px 4px;">'+
				'<div class="subsection" style="padding:0px;">'+
				'<div class="title">'+("Registrar")+'</div>'+
					(App?'<form class="listing" style="text-align: center;"><input type="text" placeholder="Usuário" class="option smallFancyButton"><br>':'')+
					'<input type="password" placeholder="Senha" class="option smallFancyButton"><br>'+
					'<a class="option smallFancyButton" onClick="SaveGame();PlaySound(\'../sound/clickSFX.mp3\');">'+("Criar Conta")+'</a></form>'+
								
				'</div>'+
			'</div>';
	}
	else if (onMenu=='stats')
	{
		var equips=0;
		equips=Equips;
		var upgrades='';
		var prestiges=0;
		var upgradesOwned=0;

				
		var list=[];

		var date=new Date();
		date.setTime(Date.now()-dataInicial);
		var timeInSeconds=date.getTime()/1000;
		var startDate=sayTime(timeInSeconds*fps,-1);
		date.setTime(Date.now()-fullDate);
		var fullDate=sayTime(date.getTime()/1000*fps,-1);
		if (!fullDate || !fullDate || fullDate.length<1) fullDate=("a long while");
				
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
			'<div class="listing"><b>'+("Moedas por Click:")+'</b> '+Beautify(upgrade[0] + 1,1)+'</div>'+
		'</div>';
	}
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

function register(){
	var log = get("loginForm")
	var reg = get("regForm")
    reg.style.transform = "translateX(0px)"
    log.style.transform = "translateX(0px)"
}

function login(){
	var log = get("loginForm")
	var reg = get("regForm")
    reg.style.transform = "translateX(500px)"
    log.style.transform = "translateX(450px)"
}