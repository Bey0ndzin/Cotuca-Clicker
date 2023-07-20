import script from './script'
import vars from './var'
import volume from './volume'
import drawCanvas from './drawCanvas'
import formatter from './formatter'

function Item(id){
    if(vars.clicks >= calculateBuyValue(id)){

        vars.upgrade[id] += vars.buyBulk
        vars.clicks -= calculateBuyValue(id)
		if(script.get('product'+(parseInt(id)+1)) != null)
		{
			if(script.get('product'+(parseInt(id)+1)).classList.contains('locked'))
			{
				$("#product"+(parseInt(id)+1)).hide();
				script.get('product'+(parseInt(id)+1)).classList.remove('locked')
				$("#product"+(parseInt(id)+1)).show(500);
			}
		}
		vars.equips+=vars.buyBulk;

		var isBulking = vars.buyBulk>1? true : false;

		drawCanvas.draw(parseInt(id+1), isBulking);

		if(vars.buyBulk != 1)
		{
			for(var i = 0; i < vars.buyBulk; i++)
			{
				vars.preco[id] = 1.15 * vars.preco[id]
			}
		}
		else
			vars.preco[id] = 1.15 * vars.preco[id]
		
		if(vars.upgrade[0] >= 10 && script.get('upgrade0').classList.contains('locked')){ 
			$("#upgrade0").hide();
			script.get('upgrade0').classList.remove('locked')
			$("#upgrade0").show(250);
		}
		if(vars.upgrade[1] >= 10 && script.get('upgrade1').classList.contains('locked')){ 
			$("#upgrade1").hide();
			script.get('upgrade1').classList.remove('locked')
			$("#upgrade1").show(250);
		}
		if(vars.upgrade[2] >= 10 && vars.upgrade[3] >= 10 && script.get('upgrade2').classList.contains('locked')){ 
			$("#upgrade2").hide();
			script.get('upgrade2').classList.remove('locked')
			$("#upgrade2").show(250);
		}

		if(parseInt(id) == 1){vars.moneyPS += id/2}
		else if(parseInt(id) == 2){vars.moneyPS += 1 * vars.buyBulk}
		else if(parseInt(id) == 3){vars.moneyPS += 100 * vars.buyBulk}
		else if(parseInt(id) == 4){vars.moneyPS += 500 * vars.buyBulk}
		else if(parseInt(id) == 5){vars.moneyPS += 5000 * vars.buyBulk}// 5k
		else if(parseInt(id) == 6){vars.moneyPS += 10000 * vars.buyBulk}// 10k
		else if(parseInt(id) == 7){vars.moneyPS += 50000 * vars.buyBulk}// 50k
		else if(parseInt(id) == 8){vars.moneyPS += 100000 * vars.buyBulk}// 100k
		else if(parseInt(id) == 9){vars.moneyPS += 1000000 * vars.buyBulk}// 1m
		else if(parseInt(id) == 10){vars.moneyPS += 5000000 * vars.buyBulk}// 5m
		else if(parseInt(id) == 11){vars.moneyPS += 10000000 * vars.buyBulk}// 10m
		else if(parseInt(id) == 12){vars.moneyPS += 50000000 * vars.buyBulk}// 50m
		else if(parseInt(id) == 13){vars.moneyPS += 100000000 * vars.buyBulk}// 100m

        script.get('productPrice'+id).innerHTML = "R$" + formatter.Beautify(vars.preco[id])
        script.get('money').innerHTML = "Moedas: " + formatter.Beautify(vars.clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + formatter.Beautify(vars.moneyPS) + '</div>'
        script.get('productOwned'+id).innerHTML = formatter.Beautify(vars.upgrade[id])

		volume.PlaySound('../sound/buySFX.mp3')
		CanBuy();
	}

}

function CanBuy(){
	for(var i = 0; i <= 13; i++)
	{
		if(script.get('product'+i).classList.contains('locked'))
			i = i;
		else
		{
			if(vars.clicks < calculateBuyValue(i))
			{
				script.get('product'+i).classList.remove('enabled')
				script.get('product'+i).classList.add('disabled')
			}
			else
			{
				script.get('product'+i).classList.remove('disabled')
				script.get('product'+i).classList.add('enabled')
			}
		}
	}
}

function calculateBuyValue(id){

	var novoPreco = vars.preco[id]
	if(vars.buyBulk != 1)
	{
		for(var i = 0; i < vars.buyBulk; i++)
		{
			novoPreco += vars.preco[id]*1.15
		}
	}
	return novoPreco;
}

function storeBulkButton(id)
{
	if (id==0) vars.buyMode=1;
	else if (id==1) vars.buyBulk=1;
	else if (id==2) vars.buyBulk=10;
	else if (id==3) vars.buyBulk=100;
			
	if (vars.buyMode==1 && vars.buyBulk==-1) vars.buyBulk=100;
	
	if (vars.buyMode==1) script.get('storeBulkBuy').className='storePreButton storeBulkMode selected'; else script.get('storeBulkBuy').className='storePreButton storeBulkMode';
			
	if (vars.buyBulk==1) script.get('storeBulk1').className='storePreButton storeBulkAmount selected'; else script.get('storeBulk1').className='storePreButton storeBulkAmount';
	if (vars.buyBulk==10) script.get('storeBulk10').className='storePreButton storeBulkAmount selected'; else script.get('storeBulk10').className='storePreButton storeBulkAmount';
	if (vars.buyBulk==100) script.get('storeBulk100').className='storePreButton storeBulkAmount selected'; else script.get('storeBulk100').className='storePreButton storeBulkAmount';
	
	if (vars.buyMode==1)
	{
		script.get('products').className='storeSection';
	}
	else
	{
		script.get('storeBulkMax').style.visibility='visible';
		script.get('products').className='storeSection selling';
	}
	
	vars.storeToRefresh=1;
	if (id!=-1) volume.PlaySound('../sound/clickSFX.mp3');
	CanBuy();
}

const Shop = {
    CanBuy, Item, calculateBuyValue,
	storeBulkButton
}

export default Shop