import { useState } from 'react'
import React, { Component } from 'react';
import axios from 'axios'

import cotuca from '../public/img/cotuca.png'
import musica from './music/Musga.mp3'
import mestre from '../public/img/seller.png'

import './App.css'

const urlAPI = "http://localhost:5276/api/Player"
const initialState = {
    player: { username: '', senha: '', clicks: 0, 
              moneyThisRun: 0, moneyLifetime: 0, initialDate: '00/00/0000',
              sword: 0, shield: 0, armor: 0,
              boot: 0, staff: 0, elf: 0,
              orc: 0, sergio: 0, simone: 0,
              patricia: 0, sampaio: 0, maligno: 0,
              boletim: 0, upgrade0: 0, upgrade1: 0,
              upgrade2: 0},
}
var firstLoading = true;

export default class Pag extends Component {

    state = { ...initialState}

    componentDidMount(){
        window.jsx = this;
    }

    SaveGame(){
        var player = this.state.player;
        const metodo = 'put';
        const url = `${urlAPI}/${player.username}`;

        player.clicks = clicks;
        player.moneyLifetime = clicksEarned;
        player.moneyThisRun = resets;

        player.sword = upgrade[0];
        player.shield = upgrade[1];
        player.armor = upgrade[2];
        player.boot = upgrade[3];
        player.bow = upgrade[4];
        player.staff = upgrade[5];
        player.elf = upgrade[6];
        player.orc = upgrade[7];
        player.sergio = upgrade[8];
        player.simone = upgrade[9];
        player.patricia = upgrade[10];
        player.sampaio = upgrade[11];
        player.maligno = upgrade[12];
        player.boletim = upgrade[13];

        player.upgrade0 = upgrade0;
        player.upgrade1 = upgrade1;
        player.upgrade2 = upgrade2;
    
        axios[metodo](url, player).then(resp => { 
            this.setState({ player })
        })
    }
    DeleteAccount(){
        const player = this.state.player;
        const url = `${urlAPI}/${player.username}`;
        const metodo = 'delete'
        
        axios[metodo](url).then(() => {
            this.setState({ player: initialState.player })
            this.atualizarDados();
        })
    }
    validateData(data){
        var lowerCaseLetters = /[a-z]/g;
        var upperCaseLetters = /[A-Z]/g;
        var numbers = /[0-9]/g;

        if(data.match(lowerCaseLetters)){return true;}
        if(data.match(upperCaseLetters)){return true;}
        if(data.match(numbers)){return true;}

        return false;
    }
    
    CreateAccount(){
        var nomeValido = false;
        var senhaValida = false;
        var valido = false;

        if(get('regUser').value.length > 30){ alert('Nome muito grande'); return;}
        if(get('regUser').value.length > 15){ alert('Senha muito grande'); return;}

        nomeValido = this.validateData(get('regUser').value);
        senhaValida = this.validateData(get('regPassword').value);

        if(nomeValido && senhaValida){
            valido = true;
            axios['get'](`${urlAPI}/${get('regUser').value}`).then(resp => {
                alert('Este username já está sendo utilizado');
                return;
            })
        }

        if(!valido) { alert('Insira valores validos'); return; }

        const player = this.state.player;
        const metodo = 'post';

        player.username = get('regUser').value;
        player.senha = get('regPassword').value;
        player.initialDate = startDate;

        player.clicks = clicks;
        player.moneyLifetime = clicksEarned;
        player.moneyThisRun = resets;

        player.sword = upgrade[0];
        player.shield = upgrade[1];
        player.armor = upgrade[2];
        player.boot = upgrade[3];
        player.bow = upgrade[4];
        player.staff = upgrade[5];
        player.elf = upgrade[6];
        player.orc = upgrade[7];
        player.sergio = upgrade[8];
        player.simone = upgrade[9];
        player.patricia = upgrade[10];
        player.sampaio = upgrade[11];
        player.maligno = upgrade[12];
        player.boletim = upgrade[13];

        player.upgrade0 = upgrade0;
        player.upgrade1 = upgrade1;
        player.upgrade2 = upgrade2;
    
        axios[metodo](urlAPI, player).then(resp => {
            this.setState({ player })
        })
    }
    
    LoadGame(){
        var playerLogin = null;
        axios['get'](`${urlAPI}/${get('logUser').value}`).then(resp => {
            if(get('logPassword').value == resp.data.senha)
            {
                playerLogin = resp.data;
                this.setState({player: playerLogin})
                this.atualizarDados(playerLogin);
            }
            else {alert('Nome ou senha incorretos')}
        })
    }

    atualizarDados(playerLogou){
        var player = playerLogou;
    
        upgrade[0] = player.sword; upgrade[1] = player.shield; upgrade[2] = player.armor;
        upgrade[3] = player.boot; upgrade[4] = player.bow; upgrade[5] = player.staff;
        upgrade[6] = player.elf; upgrade[7] = player.orc; upgrade[8] = player.sergio;
        upgrade[9] = player.simone; upgrade[10] = player.patricia; upgrade[11] = player.sampaio;
        upgrade[12] = player.maligno; upgrade[13] = player.boletim;

        clicks = player.clicks;
        resets = player.moneyLifetime;
        clicksEarned = player.moneyThisRun;
        startDate = player.initialDate;

        moneyPS = 0;
        for(var i = 0; i <= 13; i++){
            preco[i] = 0;
        }

        for(var i = 0; i <= 13; i++)
        {
            if(i == 0){for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}
            else if(i == 1){moneyPS += i/2 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}
            else if(i == 2){moneyPS += 1 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}
            else if(i == 3){moneyPS += 100 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}
            else if(i == 4){moneyPS += 500 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}
            else if(i == 5){moneyPS += 5000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 5k
            else if(i == 6){moneyPS += 10000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 10k
            else if(i == 7){moneyPS += 50000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 50k
            else if(i == 8){moneyPS += 100000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 100k
            else if(i == 9){moneyPS += 1000000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 1m
            else if(i == 10){moneyPS += 5000000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 5m
            else if(i == 11){moneyPS += 10000000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 10m
            else if(i == 12){moneyPS += 50000000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 50m
            else if(i == 13){moneyPS += 100000000 * upgrade[i]; for(var j = 0; j < upgrade[i]; j++){preco[i] = preco[i] * 1.15}}// 100m

            if(upgrade[i] > 0)
            {
                if(get('product'+(i+1)) != null)
                {
                    if(get('product'+(i+1)).classList.contains('locked'))
                    {
                        $("#product"+(i+1)).hide();
                        get('product'+(i+1)).classList.remove('locked')
                        $("#product"+(i+1)).show(500);
                    }
                }
                get('productPrice'+i).innerHTML = "R$" + Beautify(preco[i])
                get('money').innerHTML = "Moedas: " + Beautify(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Beautify(moneyPS) + '</div>'
                get('productOwned'+i).innerHTML = Beautify(upgrade[i])

                Equips++;

                if(get('upgrade'+i) != null)
                {
                    if(upgrade[i] >= 10 && get('upgrade'+i).classList.contains('locked')){ 
                        $("#upgrade"+i).hide();
                        get('upgrade'+i).classList.remove('locked')
                        $("#upgrade"+i).show(250);
                    }
                }
            }else{
                if(get('rowCanvas'+(i+1)) != null){
                    get('rowCanvas'+(i+1)).classList.add('locked');
                    get('row'+(i+1)).classList.remove('enabled');
                }
                if(get('product'+(i+1)) != null)
                {
                    get('product'+(i+1)).classList.add('locked')
                    $("#product"+(i+1)).hide(500);
                }
                get('productPrice'+i).innerHTML = "R$" + Beautify(preco[i])
                get('money').innerHTML = "Moedas: " + Beautify(clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + Beautify(moneyPS) + '</div>'
                get('productOwned'+i).innerHTML = Beautify(upgrade[i])
                
                Equips--;

                if(get('upgrade'+i) != null)
                {
                    get('upgrade'+i).classList.add('locked')
                    $("#upgrade"+i).hide(500);
                }
            }
            var numDesenho = 14;
            if(upgrade[i] < 14)
                numDesenho = upgrade[i]

            for(var j = 0; j < numDesenho; j++)
            {
                draw(i+1);
            }
        }

        upgrade0 = player.upgrade0;
        upgrade1 = player.upgrade1;
        upgrade2 = player.upgrade2;

    }

  renderGame(){
    return(
        <div className="wrapper" >
            <div className="navbar">
                <div>
                    <b style={{fontWeight: "bold"}}> Cotuca Clicker </b>
                    <a href="https://github.com/Bey0ndzin" target="_blank" id="navbarBey">Bey0nd</a>
                    <a href="https://github.com/NurbTheSlime" target="_blank" id="navbarBey">Nurb</a>  
                    <a href="https://github.com/victor0barbosa" target="_blank" id="navbarBey">Torugo</a>  
                </div>
                <div style={{position: 'relative'}}>
                    <div style={{width:'22px', height:'32px', background:'url(../img/Youtube.png)', position:'absolute', left: '0px', top: '0px', pointerEvents: 'none'}}></div>
                    <a href="https://www.youtube.com/@Bey0ndzin" target="_blank" style={{paddingLeft: '16px'}} id="topbarDiscord">Youtube</a>
                </div>
            </div>
            <div id="game">
                <div className="sectionLeft">
                    <div id="money">
                        Moedas: 0
                        <div id="moneyPerSecond">Moedas por segundo: 0</div>
                    </div>
                    <div className="ancoragemCotuca">
                        <div className="cotucaDiv" onClick={() => {Click(); PlaySound('../sound/cotucaSFX.mp3')}}>
                            <img src={cotuca} alt="Png do Cotuca" className="cotuca" />
                        </div>
                    </div>
                </div>
                <audio id="music" src={musica} loop="loop"></audio>
                <div className="separatorLeft" id="leftBeam"></div>
                <div className="separatorRight" id="rightBeam"></div>
                <div className="sectionMiddle">
                    <div className="comments">
                        <div id="options" className="panelButton" onClick={() => {PlaySound('../sound/clickSFX.mp3')}}>
                            <div className="subButton">Opções</div>
                        </div>
                        <div id="stats" className="panelButton" onClick={() => {PlaySound('../sound/clickSFX.mp3')}}>
                            <div className="subButton">Status</div>
                        </div>
                        <div id="login" className="panelButton" onClick={() => {PlaySound('../sound/clickSFX.mp3')}}>
                            <div className="subButton">Login</div>
                        </div>
                        <div id="ascend" className="panelButton" onClick={() => {PlaySound('../sound/clickSFX.mp3')}}>
                            <div className="subButton">Ascender</div>
                        </div>
                        <div className="commentsText">
                            <div id="commentsText1" className="commentsText risingUp"></div>
                            <div id="commentsText2" className="commentsText risingAway"></div>
                        </div>
                        <div className="separatorBottom"></div>
                    </div>
                    <div className="centerArea">
                        <div className="buildingsMaster">
                            <div className="separatorBottom"></div>
                        </div>
                        <div id="rows">
                            <div className="row" id="row1">
                                <div className="separatorBottom"></div>
                                <div className="rowCanvas" id="rowCanvas1" width="530" height="128">
                                    <div id="enemy" className="rowEnemy">
                                        <img src="" id="enemyImg" alt="Inimigo"></img>
                                    </div>
                                    <div className="hpContainer">
                                        <div id='hp' className="hpBar" style={{height: '24px', width: '100%'}}>100%</div>
                                    </div>
                                    <button id="attack" className="row1Button">Atacar</button>
                                    <button id="spell" className="row1Button">Feitiço</button>
                                    <button id="spare" className="row1Button">Poupar</button>
                                    <button id="run" className="row1Button">Correr</button>
                                </div>
                            </div>
                            <div className="row" id="row2">
                                <div className="rowCanvas" id="rowCanvas2" width="530" height="128">
                                    <div id="target" className="rowTarget" onClick={() => {PlaySound('../sound/arrowSFX.mp3')}}>
                                        <img src="" id="targetImg" alt="Alvo"></img>
                                    </div>
                                </div>
                                <div className="separatorBottom"></div>
                            </div>
                            <div className="row" id="row3">
                                <div className="separatorBottom"></div>
                                <canvas className="rowCanvas" id="rowCanvas3" width="530" height="128"/>
                            </div>
                            <div className="row" id="row4">
                                <div className="separatorBottom"></div>
                                <canvas className="rowCanvas" id="rowCanvas4" width="530" height="128"/>
                            </div>
                            <div className="row" id="row5">
                                <div className="separatorBottom"></div>
                                <canvas className="rowCanvas" id="rowCanvas5" width="530" height="128"/>
                            </div>
                            <div className="row" id="row6">
                                <div className="separatorBottom"></div>
                                <canvas className="rowCanvas" id="rowCanvas6" width="530" height="128"/>
                            </div>
                            <div className="row" id="row7">
                                <div className="separatorBottom"></div>
                                <div className="rowCanvas" id="rowCanvas7" width="530" height="128">
                                    <img src="../img/react.svg" id="reactGirante" className="logo react" alt="React Girante"></img>
                                </div>
                            </div>
                        </div>
                        <div id="menu"></div>
                    </div>
                </div>
                <div className="sectionRight">
                    <div id="shopIcon" style={{width: '300px', textAlign: 'center', paddingBottom: '0px', position: 'relative', zIndex: '100', height: 'auto !important'}}>
                        <img src={mestre} alt=""></img>
                    </div>
                    <div className="store">
                        <div className="storeTitle">Mestre Kawara Nofuro</div>
                        <div id="upgrades" className="storeSection upgradeBox">
                        <div onClick={() => {UpgradesById[0].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(0);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {"if(!mouseDown) {SetOnCrate(get(upgrade0));Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[0],'store');}();},'store');Tooltip.wobble();}"}} id='upgrade0' style={{backgroundPosition: '-576px -192px'}}></div>
                            <div onClick={() => {UpgradesById[11].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(11);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {"if(!mouseDown) {SetOnCrate(this);Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[11],'store');}();},'store');Tooltip.wobble();}"}} id="upgrade1" style={{backgroundPosition: '-576px -192px'}}></div>
                            <div onClick={() => {UpgradesById[17].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(17);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {"if(!mouseDown) {SetOnCrate(this);Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[17],'store');}();},'store');Tooltip.wobble();}"}} id="upgrade2" style={{backgroundPosition: '-576px -192px'}}></div>  
                        </div>
                        <div id="products" className="storeSection">
                            <div id="storeBulk" className="storePre">
                                <div id="storeBulkBuy" className="storePreButton storeBulk Mode selected" onClick={() => {storeBulkButton(0);}}>Comprar</div>
                                <div id="storeBulk1" className="storePreButton storeBulkAmount selected" onClick={() => {storeBulkButton(1);}}>1</div>
                                <div id="storeBulk10" className="storePreButton storeBulkAmount" onClick={() => {storeBulkButton(2);}}>10</div>
                                <div id="storeBulk100" className="storePreButton storeBulkAmount" onClick={() => {storeBulkButton(3);}}>100</div>
                            </div>

                            <div className="product unlocked" id="product0" onClick={() => {Item(0)}}>
                                <div className="icon" id="productIcon0"></div>
                                <div className="content">
                                    <div className="title productName" id="productName0">Espada</div>
                                    <span className="price" id="productPrice0">R$5</span>
                                    <div className="title owned" id="productOwned0">0</div>
                                </div>
                            </div>

                            <div id="product1" className="product locked" onClick={() => {Item(1)}}>
                                <div className="icon" id="productIcon1"></div>
                                <div className="content">
                                    <div className="title productName" id="productName1">Escudo</div>
                                    <span className="price" id="productPrice1">R$50</span>
                                    <div className="title owned" id="productOwned1">0</div>
                                </div>
                            </div>

                            <div id="product2" className="product locked" onClick={() => {Item(2)}}>
                                <div className="icon" id="productIcon2"></div>
                                <div className="content">
                                    <div className="title productName" id="productName2">Armadura</div>
                                    <span className="price" id="productPrice2">R$120</span>
                                    <div className="title owned" id="productOwned2">0</div>
                                </div>
                            </div>

                            <div id="product3" className="product locked" onClick={() => {Item(3)}}>
                                <div className="icon" id="productIcon3"></div>
                                <div className="content">
                                    <div className="title productName" id="productName3">Bota</div>
                                    <span className="price" id="productPrice3">R$500</span>
                                    <div className="title owned" id="productOwned3">0</div>
                                </div>
                            </div>

                            <div id="product4" className="product locked" onClick={() => {Item(4)}}>
                                <div className="icon" id="productIcon4"></div>
                                <div className="content">
                                    <div className="title productName" id="productName4">Arco</div>
                                    <span className="price" id="productPrice4">R$1,500</span>
                                    <div className="title owned" id="productOwned4">0</div>
                                </div>
                            </div>

                            <div id="product5" className="product locked" onClick={() => {Item(5)}}>
                                <div className="icon" id="productIcon5"></div>
                                <div className="content">
                                    <div className="title productName" id="productName5">Cajado</div>
                                    <span className="price" id="productPrice5">R$5,000</span>
                                    <div className="title owned" id="productOwned5">0</div>
                                </div>
                            </div>

                            <div id="product6" className="product locked" onClick={() => {Item(6)}}>
                                <div className="icon" id="productIcon6"></div>
                                <div className="content">
                                    <div className="title productName" id="productName6">Elfo</div>
                                    <span className="price" id="productPrice6">R$15,000</span>
                                    <div className="title owned" id="productOwned6">0</div>
                                </div>
                            </div>

                            <div id="product7" className="product locked" onClick={() => {Item(7)}}>
                                <div className="icon" id="productIcon7"></div>
                                <div className="content">
                                    <div className="title productName" id="productName7">Orc</div>
                                    <span className="price" id="productPrice7">R$50,000</span>
                                    <div className="title owned" id="productOwned7">0</div>
                                </div>
                            </div>

                            <div id="product8" className="product locked" onClick={() => {Item(8)}}>
                                <div className="icon" id="productIcon8"></div>
                                <div className="content">
                                    <div className="title productName" id="productName8">Sérgio</div>
                                    <span className="price" id="productPrice8">R$100,000</span>
                                    <div className="title owned" id="productOwned8">0</div>
                                </div>
                            </div>

                            <div id="product9" className="product locked" onClick={() => {Item(9)}}>
                                <div className="icon" id="productIcon9"></div>
                                <div className="content">
                                    <div className="title productName" id="productName9">Simone</div>
                                    <span className="price" id="productPrice9">R$500,000</span>
                                    <div className="title owned" id="productOwned9">0</div>
                                </div>
                            </div>

                            <div id="product10" className="product locked" onClick={() => {Item(10)}}>
                                <div className="icon" id="productIcon10"></div>
                                <div className="content">
                                    <div className="title productName" id="productName10">Patrícia</div>
                                    <span className="price" id="productPrice10">R$1.000 million</span>
                                    <div className="title owned" id="productOwned10">0</div>
                                </div>
                            </div>

                            <div id="product11" className="product locked" onClick={() => {Item(11)}}>
                                <div className="icon" id="productIcon11"></div>
                                <div className="content">
                                    <div className="title productName" id="productName11">Sampaio</div>
                                    <span className="price" id="productPrice11">R$2.500 million</span>
                                    <div className="title owned" id="productOwned11">0</div>
                                </div>
                            </div>

                            <div id="product12" className="product locked" onClick={() => {Item(12)}}>
                                <div className="icon" id="productIcon12"></div>
                                <div className="content">
                                    <div className="title productName" id="productName12">Maligno</div>
                                    <span className="price" id="productPrice12">R$5.000 million</span>
                                    <div className="title owned" id="productOwned12">0</div>
                                </div>
                            </div>

                            <div id="product13" className="product locked" onClick={() => {Item(13)}}>
                                <div className="icon" id="productIcon13"></div>
                                <div className="content">
                                    <div className="title productName" id="productName13">Boletim</div>
                                    <span className="price" id="productPrice13">R$100.000 million</span>
                                    <div className="title owned" id="productOwned13">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  	
                <div id="tooltipAnchor" style={{opacity: '1', display: 'none', visibility: 'visible', inset: '528px auto auto 864px'}}>
                    <div id="tooltip" className="framed" onMouseOut={() => {Tooltip.hide()}} style={{inset: 'auto'}}>
                        
                    </div>
                </div>
            </div>
        </div>
    )
  }
  render(){
    if(firstLoading){
        const script = document.createElement('script');
        script.src = '../public/scripts/script'
        document.head.appendChild(script);

        const buttons = document.createElement('script');
        buttons.src = '../public/scripts/buttons'
        document.head.appendChild(buttons);

        const volume = document.createElement('script');
        volume.src = '../public/scripts/volume'
        document.head.appendChild(volume);

        const tooltip = document.createElement('script');
        tooltip.src = '../public/scripts/tooltip'
        document.head.appendChild(tooltip);

        const upgrade = document.createElement('script');
        upgrade.src = '../public/scripts/upgrade'
        document.head.appendChild(upgrade);

        const formatter = document.createElement('script');
        formatter.src = '../public/scripts/formatter'
        document.head.appendChild(formatter);

        const jquery = document.createElement('script');
        jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        document.head.appendChild(jquery);

        firstLoading = false;

        window.addEventListener('load', () => {Load()})
    }
    return(
        <div>
            {this.renderGame()}
        </div>
    )
  }
}
