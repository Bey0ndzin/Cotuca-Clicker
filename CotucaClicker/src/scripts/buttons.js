let dataInicial = new Date();
dataInicial.setTime(Date.now())

import vars from './var'
import script from './script'

function get(what) {
    return document.getElementById(what);
}

var tinyCotuca=function()
{
	return '';
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

function register(){
	var log = script.get("loginForm")
	var reg = script.get("regForm")
    reg.style.transform = "translateX(0px)"
    log.style.transform = "translateX(0px)"
}

function login(){
	var log = script.get("loginForm")
	var reg = script.get("regForm")
    reg.style.transform = "translateX(500px)"
    log.style.transform = "translateX(450px)"
}

const Buttons = {
	login, register
}

export default Buttons