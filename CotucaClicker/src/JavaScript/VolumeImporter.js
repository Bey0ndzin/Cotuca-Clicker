import ScriptImporter from "./ScriptImporter";
import GlobalImporter from "./GlobalImporter";

function setVolume(what)
{
	GlobalImporter.volume=what;
	if(ScriptImporter.get('music') != null)
		ScriptImporter.get('music').volume = (GlobalImporter.volume / 100) / 2;
}

function PlaySound(url,vol)
{
	var volumeSetting=GlobalImporter.volume;
	if (typeof vol!=='undefined') GlobalImporter.volume=vol;
	if (GlobalImporter.volume<-5) {volume+=10;volumeSetting=volumeMusic;}
	if (!volumeSetting || GlobalImporter.volume==0) return 0;
	if (typeof Sounds[url]=='undefined')
	{
		Sounds[url]=new Audio(url);
		Sounds[url].onloadeddata=function(e){PlaySound(url,vol);}
	}
	else if (Sounds[url].readyState>=2)
	{
		var sound=GlobalImporter.SoundInsts[SoundI];
		GlobalImporter.SoundI++;
		if (SoundI>=12) GlobalImporter.SoundI=0;
		sound.src=url
		//sound.src=Sounds[url].src;

		sound.volume=Math.pow(GlobalImporter.volume/100,2);

		try{sound.play();}catch(e){console.log('deu erro ao tocar')}
	}
}

const VolumeImporter = {
    PlaySound,
    setVolume
}

export default VolumeImporter;