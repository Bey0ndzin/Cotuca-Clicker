import script from './script'
import vars from './var'
import volume from './volume'

function draw(id, isBulking){
	var img = script.get('enemyImg')
	var img2 = script.get('targetImg')
	if(id == 1){
		if(vars.firstLoading[0] == true){
			script.get('row1').classList.add('enabled')
			img.src = '../img/Slime foda.png'
			script.get('attack').addEventListener('click', () =>{
				var hp = script.get('hp').style.width;
				hp = parseInt(hp) - 1*vars.upgrade[0]
				script.get('hp').style.width = hp+'%'
				script.get('hp').innerText = hp+'%'
				if(hp <= 0)
				{
					script.get('hp').style.width = 100+'%'
					script.get('hp').innerText = 100+'%'
					vars.clicks += vars.moneyPS * 0.1;
				}
				volume.PlaySound('../sound/slashSFX.mp3')
			})
			script.get('spell').addEventListener('click', () =>{
				if(vars.secondsToSpellAgain <= 0){
					var hp = script.get('hp').style.width;
					hp = parseInt(hp) - (10+vars.upgrade[5]*5)
					script.get('hp').style.width = hp+'%'
					script.get('hp').innerText = hp+'%'
					if(hp <= 0)
					{
						script.get('hp').style.width = 100+'%'
						script.get('hp').innerText = 100+'%'
						vars.clicks += vars.moneyPS * 0.1;
					}
					volume.PlaySound('../sound/spellSFX.mp3')
					vars.secondsToSpellAgain = 10
					script.get('spell').innerText = 'Aguarde '+vars.secondsToSpellAgain+'s'
					diminuteSpellTime();
				}
			})
			script.get('spare').addEventListener('click', () =>{
				alert("Você sentiu dó desta pobre criatura e saiu andando...")
				script.get('hp').style.width = 100+'%'
				script.get('hp').innerText = 100+'%'
			})
			script.get('run').addEventListener('click', () =>{
				volume.PlaySound('../sound/runSFX.mp3')
				alert("Você corre dessa criatura até suas pernas começarem a doer...")
				var random = Math.floor(Math.random() * 20)
				if(random == 1)
					alert("o monstro te seguiu por todo esse caminho, ele realmente é persistente né?");
				else{
					script.get('hp').style.width = 100+'%'
					script.get('hp').innerText = 100+'%'
				}
			})
			vars.firstLoading[0] = false;
		}
	}
	if(id == 5){
		if(vars.firstLoading[1] == true){
			script.get('row2').classList.add('enabled')
			img2.src = '../img/targetIcon.png'
		vars.firstLoading[1] = false
		}
	}
	if(id == 7){
		var canvas = script.get('rowCanvas3');
		var ctx = canvas.getContext('2d');
		if(vars.firstLoading[2] == true){
			script.get('row3').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var elfo = new Image();
				elfo.src = '../img/elfIcon.webp'

				elfo.onload = () => {
					ctx.drawImage(elfo, vars.countElfo, 56, 64, 48)
				}
			}
		vars.firstLoading[2] = false
		}

		if(vars.countElfo < 11)
		{
			var elfo = new Image();
			elfo.src = '../img/elfIcon.webp'

			elfo.onload = () => {
				if(isBulking)
				{
					for(var i = 0; i < buyBulk; i++)
					{
						ctx.drawImage(elfo, vars.countElfo*40, 56, 64, 48)
						vars.countElfo++;
					}
				}
				else{
					ctx.drawImage(elfo, vars.countElfo*40, 56, 64, 48)
					vars.countElfo++;
				}
			}
		}
	}
	if(id == 8){
		var canvas = script.get('rowCanvas4');
		var ctx = canvas.getContext('2d');
		if(vars.firstLoading[3] == true){
			script.get('row4').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var orc = new Image();
				orc.src = '../img/orcIcon.png'

				orc.onload = () => {
					ctx.drawImage(orc, vars.countOrc, 56, 64, 48)
				}
			}
		vars.firstLoading[3] = false
		}
		
		if(vars.countOrc < 8)
		{
			var orc = new Image();
			orc.src = '../img/orcIcon.png'

			orc.onload = () => {
				if(isBulking)
				{
					for(var i = 0; i < buyBulk; i++)
					{
						ctx.drawImage(orc, vars.countOrc*40, 56, 64, 48)
						countOrc++;
					}
				}
				else{
					ctx.drawImage(orc, vars.countOrc*40, 56, 64, 48)
					vars.countOrc++;
				}
			}
		}
	}

	if(id == 9){
		var canvas = script.get('rowCanvas5');
		var ctx = canvas.getContext('2d');
		if(vars.firstLoading[4] == true){
			script.get('row5').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var sergio = new Image();
				sergio.src = '../img/SergioIcon.png'

				sergio.onload = () => {
					ctx.drawImage(sergio, vars.countSergio, 56, 64, 48)
				}
			}
		vars.firstLoading[4] = false
		}
		
		if(vars.countSergio < 14)
		{
			var sergio = new Image();
			sergio.src = '../img/SergioIcon.png'

			sergio.onload = () => {
				if(isBulking)
				{
					for(var i = 0; i < buyBulk; i++)
					{
						ctx.drawImage(sergio, vars.countSergio*40, 56, 64, 48)
						vars.countSergio++;
					}
				}
				else{
					ctx.drawImage(sergio, vars.countSergio*40, 56, 64, 48)
					vars.countSergio++;
				}
			}
		}
	}

	if(id == 10){
		var canvas = script.get('rowCanvas6');
		var ctx = canvas.getContext('2d');
		if(vars.firstLoading[5] == true){
			script.get('row6').classList.add('enabled')

			var fundo = new Image();
			fundo.src = '../img/PlatformBackground.png'

			fundo.onload = () =>{
				var ptrn = ctx.createPattern(fundo, 'repeat')
				ctx.rect(0, 0, 530, 128);
				ctx.fillStyle = ptrn;
				ctx.fill();
				//ctx.drawImage(fundo,0,0, 128, 130)

				var simone = new Image();
				simone.src = '../img/simoneIcon.png'

				simone.onload = () => {
					ctx.drawImage(simone, vars.countSimone, 56, 64, 48)
				}
			}
		vars.firstLoading[5] = false
		}
		
		if(vars.countSimone < 14)
		{
			var simone = new Image();
			simone.src = '../img/simoneIcon.png'

			simone.onload = () => {
				if(isBulking)
				{
					for(var i = 0; i < buyBulk; i++)
					{
						ctx.drawImage(simone, vars.countSimone*40, 56, 64, 48)
						vars.countSimone++;
					}
				}
				else{
					ctx.drawImage(simone, vars.countSimone*40, 56, 64, 48)
					vars.countSimone++;
				}
			}
		}
	}

	if(id == 11){
		if(vars.firstLoading[6] == true){
			script.get('row7').classList.add('enabled')
		vars.firstLoading[6] = false
		}
	}
}

function diminuteSpellTime(){
	setTimeout(() => {
		vars.secondsToSpellAgain = vars.secondsToSpellAgain - 1
		if(vars.secondsToSpellAgain == 0)
			script.get('spell').innerText = 'Feitiço'
		if(vars.secondsToSpellAgain > 0){
			diminuteSpellTime();
			script.get('spell').innerText = 'Aguarde '+vars.secondsToSpellAgain+'s';
		}
	}, 800)
}

const Canvas = {
    diminuteSpellTime, draw
}

export default Canvas