var volume=1
let setVolume=function(what)
{
	volume=what;
	if(get('music') != null)
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