let clicks, upgrade, preco, moneyPS, kills
//Declara váriaveis globais que vão ser usadas em várias funções diferentes

function get(what) {
    return document.getElementById(what);
}

function Load(){
    //Seta essas várias para valores padrões
    clicks = 500
    preco = new Array(2)
    preco[0] = 5
    preco[1] = 30
    preco[2] = 120
    upgrade = new Array(50)
    for(var i = 0; i < upgrade.length; i++){
        upgrade[i] = 0
    }
    moneyPS = 0
    kills = 0
    /*alert("Você dominou o mundo...")
    alert("Depois de sua incrível jornada, todos amavam seu pão de queijo")
    alert("Mas nem tudo é perfeito...")
    alert("Perdido em seus pensamentos sobre pães de queijo e cafézinhos quentinhos...")
    alert("Você foi brutalmente atropelado por um carrinho de supermercado que você nem viu chegando...")
    alert("Você acorda desnorteado, você não estava mais no estacionamento do Carrefour")
    alert("Agora você estava em um mundo totalmente diferente, parecia um mundo de rpg... E você com o conhecimento de 5000 monges da malásia, sabia qual era sua missão")
    alert("Clicar!")*/
}
function Up(){
    //Váriavel para aumentar a grana cada vez que clica no cotuca
    let money = get("money")
    clicks += 1 + upgrade[0] //Aumenta o click baseado na quantidade de espadas que a pessoa tem
    money.innerHTML = "dinheiros: " + Math.round(clicks) + '<div id="moneyPerSecond">por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
    //Atualiza o H1 que mostra a quantidade de grana
}
function Upgrade0(){
    //Compra o primeiro upgrade
    let money = get("money")
    let preco0 = get("productPrice0")
    let upgrade0 = get("productOwned0")
    if(clicks >= preco[0]){
        upgrade[0] += 1
        console.log("Upgrade comprado");
        clicks -= preco[0]
        if(upgrade[0] == 1)
        {
            //Caso seja a primeira compra mostra o proximo upgrade
            $("#product1").hide();
            get('product1').classList.remove('locked')
            $("#product1").show(500);
        }
        if(upgrade[0] < 10)
            preco[0] = 1.8 * preco[0]
        else
            preco[0] = 2.6  * upgrade[0]
        preco0.innerHTML = "R$" + Math.round(preco[0])
        money.innerHTML = "dinheiros: " + Math.round(clicks) + '<div id="moneyPerSecond">por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade0.innerHTML = upgrade[0]
    }
    else
        console.log("Dinheiro insuficiente")
}
function Upgrade1(){
    let money = get("money")
    let preco1 = get("productPrice1")
    let upgrade1 = get("productOwned1")
    if(clicks >= preco[1]){
        upgrade[1] += 0.5
        console.log("Upgrade comprado");
        clicks -= preco[1]
        moneyPS += 0.5
        if(upgrade[1] == 0.5)
        {
            $("#product2").hide();
            get('product2').classList.remove('locked')
            $("#product2").show(500);
        }
        if(upgrade[1] < 10)
            preco[1] = 1.5 * preco[1]
        else
            preco[1] = 2.4 * preco[1]
        preco1.innerHTML = "R$" + Math.round(preco[1])
        money.innerHTML = "dinheiros: " + Math.round(clicks) + '<div id="moneyPerSecond">por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade1.innerHTML = (Math.round(upgrade[1] * 100) / 10) / 5
        //get('product2').classList.remove('locked')
    }
    else
        console.log("Dinheiro insuficiente")
}
setInterval(farm, 1000)
function farm(){
    let money = get("money")
    clicks += moneyPS
    money.innerHTML = "dinheiros: " + Math.round(clicks) + '<div id="moneyPerSecond">por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'

    evento0()
}
function evento0(){
    var random = Math.floor(Math.random() * 200)
    if(random == 1)
    {
        if(upgrade[0] >= 1 && kills < 1){
            alert("Você estava andando pela cidade, com sua maravilhosa espada, só que tu sem querer esbarrou em uma criança com ela")
            alert("E a criança foi decapitada na hora, Parabéns você fez sua primeira kill :D")
            kills += 1
        }
    }
}
function Upgrade2(){
    let money = get("money")
    let preco2 = get("productPrice2")
    let upgrade2 = get("productOwned2")
    if(clicks >= preco[2]){
        upgrade[2] += 1
        console.log("Upgrade comprado");
        clicks -= preco[2]
        moneyPS += 1
        if(upgrade[2] < 10)
            preco[2] = 1.2 * preco[2]
        else
            preco[2] = 1.5 * preco[2]
        preco2.innerHTML = "R$" + Math.round(preco[2])
        money.innerHTML = "dinheiros: " + Math.round(clicks) + '<div id="moneyPerSecond">por segundo: ' + Math.round(moneyPS * 100) / 100 + '</div>'
        upgrade2.innerHTML = upgrade[2]
        if(upgrade[2] == 1)
            prompt("Você escuta uma voz do além ecoar em seus ouvidos, -Qual seu nome pequeno guerreiro?")
    }
    else
        console.log("Dinheiro insuficiente")
}

AddEvent(get('options'),'click',function(){Game.ShowMenu('options');});
AddEvent(get('stats'),'click',function(){Game.ShowMenu('stats');});
AddEvent(get('login'),'click',function(){Game.ShowMenu('login');});
AddEvent(get('legacyButton'),'click',function(){PlaySound('snd/tick.mp3');Game.Ascend();});

Game.ShowMenu=function(what)
{
    console.log(what)
	if (!what || what=='') what=Game.onMenu;
	if (Game.onMenu=='' && what!='') Game.addClass('onMenu');
	else if (Game.onMenu!='' && what!=Game.onMenu) Game.addClass('onMenu');
	else if (what==Game.onMenu) {Game.removeClass('onMenu');what='';}
	//if (what=='log') l('donateBox').className='on'; else l('donateBox').className='';
	Game.onMenu=what;
			
	get('options').className=(Game.onMenu=='prefs')?'panelButton selected':'panelButton';
	get('stats').className=(Game.onMenu=='stats')?'panelButton selected':'panelButton';
	get('login').className=(Game.onMenu=='log')?'panelButton selected':'panelButton';
			
	if (Game.onMenu=='') PlaySound('snd/clickOff2.mp3');
	else PlaySound('snd/clickOn2.mp3');
			
	Game.UpdateMenu();
			
	if (what=='')
	{
		for (var i in Game.Objects)
		{
			var me=Game.Objects[i];
			if (me.minigame && me.minigame.onResize) me.minigame.onResize();
		}
	}
}

//Função que adiciona eventos em objetos
function AddEvent(el,ev,func)
{
    //el = Objeto
    //ev = ação a ser lida ('click', 'hover', etc.)
    //func = função a ser executada
	//ie. myListener=AddEvent(l('element'),'click',function(){console.log('teste');});
	if (el.addEventListener) {el.addEventListener(ev,func,false);return [el,ev,func];}
	else if (el.attachEvent) {var func2=function(){func.call(el);};el.attachEvent('on'+ev,func2);return [el,ev,func2];}
	return false;
}