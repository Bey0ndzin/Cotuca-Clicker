import script from './script'
import vars from './var'

function setVolume(what)
{
	vars.volume=what;
	if(script.get('music') != null)
		script.get('music').volume = (vars.volume / 100) / 2;
}

function PlaySound(url,vol)
{
	var volumeSetting=vars.volume;
	if (typeof vol!=='undefined') vars.volume=vol;
	if (vars.volume<-5) {vars.volume+=10;volumeSetting=volumeMusic;}
	if (!volumeSetting || vars.volume==0) return 0;
	if (typeof vars.Sounds[url]=='undefined')
	{
		vars.Sounds[url]=new Audio(url);
		vars.Sounds[url].onloadeddata=function(e){PlaySound(url,vol);}
	}
	else if (vars.Sounds[url].readyState>=2)
	{
		var sound=vars.SoundInsts[vars.SoundI];
		vars.SoundI++;
		if (vars.SoundI>=12) vars.SoundI=0;
		sound.src=url
		//sound.src=Sounds[url].src;

		sound.volume=Math.pow(vars.volume/100,2);

		try{sound.play();}catch(e){console.log('deu erro ao tocar')}
	}
}

const Volume = {
	setVolume, PlaySound
}

export default Volume