import { useState } from 'react'
import reactLogo from './assets/react.svg'
import React, { Component } from 'react';
//import axios from 'axios'

import cotuca from '../public/img/cotuca.png'
import musica from './music/Musga.mp3'
import mestre from '../public/img/seller.png'

import './App.css'

const initialState = {
    player: { id: 0, money: 0, user: '', senha: '', moneyPS: 0, moneyLifetime: 0},
    lista: []
}
var firstLoading = true;

export default class Pag extends Component {

    state = { ...initialState}

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
                        <div className="cotucaDiv" onClick={() => {"Click(); PlaySound('../sound/cotucaSFX.mp3')"}}>
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
                                <canvas className="rowCanvas" id="rowCanvas7" width="530" height="128"/>
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
                        <div className="storeTitle">Mestre Kikoku Navara</div>
                        <div id="upgrades" className="storeSection upgradeBox">
                            <div onClick={() => {UpgradesById[0].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(0);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {if(!mouseDown) {SetOnCrate(get('upgrade0'));Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[0],'store');}();},'store');Tooltip.wobble();}}} id="upgrade0" style={{backgroundPosition: '-576px -192px'}}></div> 
                            <div onClick={() => {UpgradesById[11].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(11);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {if(!mouseDown) {SetOnCrate(get('upgrade1'));Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[11],'store');}();},'store');Tooltip.wobble();}}} id="upgrade1" style={{backgroundPosition: '-576px -192px'}}></div>
                            <div onClick={() => {UpgradesById[17].click(event);}} className="crate upgrade locked" onMouseOut={() => {SetOnCrate(17);Tooltip.shouldHide=1;Tooltip.hide();}} onMouseOver={() => {if(!mouseDown) {SetOnCrate(get('upgrade2'));Tooltip.dynamic=1;Tooltip.draw(this,function(){return function(){return CrateTooltip(UpgradesById[17],'store');}();},'store');Tooltip.wobble();}}} id="upgrade2" style={{backgroundPosition: '-576px -192px'}}></div>  
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
                                    <div className="title productName" id="productName13">Chico</div>
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
