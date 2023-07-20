import { useState } from 'react'
import React, { Component } from 'react';
import axios from 'axios'

import musica from './music/Musga.mp3'

import SectionLeft from './components/SectionLeft';
import SectionMiddle from './components/SectionMiddle';
import SectionRight from './components/SectionRight';

import tooltip from './scripts/tooltip'
import script from './scripts/script'
import vars from './scripts/var'

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

        player.clicks = vars.clicks;
        player.moneyLifetime = vars.clicksEarned;
        player.moneyThisRun = vars.resets;

        player.sword = vars.upgrade[0];
        player.shield = vars.upgrade[1];
        player.armor = vars.upgrade[2];
        player.boot = vars.upgrade[3];
        player.bow = vars.upgrade[4];
        player.staff = vars.upgrade[5];
        player.elf = vars.upgrade[6];
        player.orc = vars.upgrade[7];
        player.sergio = vars.upgrade[8];
        player.simone = vars.upgrade[9];
        player.patricia = vars.upgrade[10];
        player.sampaio = vars.upgrade[11];
        player.maligno = vars.upgrade[12];
        player.boletim = vars.upgrade[13];

        player.upgrade0 = vars.upgrade0;
        player.upgrade1 = vars.upgrade1;
        player.upgrade2 = vars.upgrade2;
    
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

        if(script.get('regUser').value.length > 30){ alert('Nome muito grande'); return;}
        if(script.get('regPassword').value.length > 15){ alert('Senha muito grande'); return;}

        nomeValido = this.validateData(script.get('regUser').value);
        senhaValida = this.validateData(script.get('regPassword').value);

        if(nomeValido && senhaValida){
            valido = true;
            axios['get'](`${urlAPI}/${script.get('regUser').value}`).then(resp => {
                alert('Este username já está sendo utilizado');
                return;
            })
        }

        if(!valido) { alert('Insira valores validos'); return; }

        const player = this.state.player;
        const metodo = 'post';

        player.username = script.get('regUser').value;
        player.senha = script.get('regPassword').value;
        player.initialDate = vars.startDate;

        player.clicks = vars.clicks;
        player.moneyLifetime = vars.clicksEarned;
        player.moneyThisRun = vars.resets;

        player.sword = vars.upgrade[0];
        player.shield = vars.upgrade[1];
        player.armor = vars.upgrade[2];
        player.boot = vars.upgrade[3];
        player.bow = vars.upgrade[4];
        player.staff = vars.upgrade[5];
        player.elf = vars.upgrade[6];
        player.orc = vars.upgrade[7];
        player.sergio = vars.upgrade[8];
        player.simone = vars.upgrade[9];
        player.patricia = vars.upgrade[10];
        player.sampaio = vars.upgrade[11];
        player.maligno = vars.upgrade[12];
        player.boletim = vars.upgrade[13];

        player.upgrade0 = vars.upgrade0;
        player.upgrade1 = vars.upgrade1;
        player.upgrade2 = vars.upgrade2;
    
        axios[metodo](urlAPI, player).then(resp => {
            this.setState({ player })
        })
    }
    
    LoadGame(){
        var playerLogin = null;
        axios['get'](`${urlAPI}/${script.get('logUser').value}`).then(resp => {
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
    
        vars.upgrade[0] = player.sword; vars.upgrade[1] = player.shield; vars.upgrade[2] = player.armor;
        vars.upgrade[3] = player.boot; vars.upgrade[4] = player.bow; vars.upgrade[5] = player.staff;
        vars.upgrade[6] = player.elf; vars.upgrade[7] = player.orc; vars.upgrade[8] = player.sergio;
        vars.upgrade[9] = player.simone; vars.upgrade[10] = player.patricia; vars.upgrade[11] = player.sampaio;
        vars.upgrade[12] = player.maligno; vars.upgrade[13] = player.boletim;

        vars.clicks = player.clicks;
        vars.resets = player.moneyLifetime;
        vars.clicksEarned = player.moneyThisRun;
        vars.startDate = player.initialDate;

        vars.moneyPS = 0;
        for(var i = 0; i <= 13; i++){
            vars.preco[i] = 0;
        }

        for(var i = 0; i <= 13; i++)
        {
            if(i == 0){for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}
            else if(i == 1){vars.moneyPS += i/2 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}
            else if(i == 2){vars.moneyPS += 1 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}
            else if(i == 3){vars.moneyPS += 100 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}
            else if(i == 4){vars.moneyPS += 500 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}
            else if(i == 5){vars.moneyPS += 5000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 5k
            else if(i == 6){vars.moneyPS += 10000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 10k
            else if(i == 7){vars.moneyPS += 50000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 50k
            else if(i == 8){vars.moneyPS += 100000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 100k
            else if(i == 9){vars.moneyPS += 1000000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 1m
            else if(i == 10){vars.moneyPS += 5000000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 5m
            else if(i == 11){vars.moneyPS += 10000000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 10m
            else if(i == 12){vars.moneyPS += 50000000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 50m
            else if(i == 13){vars.moneyPS += 100000000 * vars.upgrade[i]; for(var j = 0; j < vars.upgrade[i]; j++){vars.preco[i] = vars.preco[i] * 1.15}}// 100m

            if(vars.upgrade[i] > 0)
            {
                if(script.get('product'+(i+1)) != null)
                {
                    if(script.get('product'+(i+1)).classList.contains('locked'))
                    {
                        $("#product"+(i+1)).hide();
                        script.get('product'+(i+1)).classList.remove('locked')
                        $("#product"+(i+1)).show(500);
                    }
                }
                script.get('productPrice'+i).innerHTML = "R$" + formatter.Beautify(vars.preco[i])
                script.get('money').innerHTML = "Moedas: " + formatter.Beautify(vars.clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + formatter.Beautify(vars.moneyPS) + '</div>'
                script.get('productOwned'+i).innerHTML = formatter.Beautify(vars.upgrade[i])

                vars.equips++;

                if(script.get('upgrade'+i) != null)
                {
                    if(vars.upgrade[i] >= 10 && get('upgrade'+i).classList.contains('locked')){ 
                        $("#upgrade"+i).hide();
                        script.get('upgrade'+i).classList.remove('locked')
                        $("#upgrade"+i).show(250);
                    }
                }
            }else{
                if(script.get('rowCanvas'+(i+1)) != null){
                    script.get('rowCanvas'+(i+1)).classList.add('locked');
                    script.get('row'+(i+1)).classList.remove('enabled');
                }
                if(script.get('product'+(i+1)) != null)
                {
                    script.get('product'+(i+1)).classList.add('locked')
                    $("#product"+(i+1)).hide(500);
                }
                script.get('productPrice'+i).innerHTML = "R$" + formatter.Beautify(vars.preco[i])
                script.get('money').innerHTML = "Moedas: " + formatter.Beautify(vars.clicks) + '<div id="moneyPerSecond">Moedas por segundo: ' + formatter.Beautify(vars.moneyPS) + '</div>'
                script.get('productOwned'+i).innerHTML = formatter.Beautify(vars.upgrade[i])
                
                vars.equips--;

                if(script.get('upgrade'+i) != null)
                {
                    script.get('upgrade'+i).classList.add('locked')
                    $("#upgrade"+i).hide(500);
                }
            }
            var numDesenho = 14;
            if(vars.upgrade[i] < 14)
                numDesenho = vars.upgrade[i]

            for(var j = 0; j < numDesenho; j++)
            {
                draw(i+1);
            }
        }

        vars.upgrade0 = player.upgrade0;
        vars.upgrade1 = player.upgrade1;
        vars.upgrade2 = player.upgrade2;

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
            <div id="game" onLoad={script.Load}> 
                <SectionLeft></SectionLeft>
                <audio id="music" src={musica} loop="loop"></audio>
                <div className="separatorLeft" id="leftBeam"></div>
                <div className="separatorRight" id="rightBeam"></div>   
                <SectionMiddle></SectionMiddle>        
                <SectionRight></SectionRight>
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
        const jquery = document.createElement('script');
        jquery.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        document.head.appendChild(jquery);

        firstLoading = false;

        window.addEventListener('mousemove', () => {tooltip.GetMouseCoords()})
    }
    return(
        <div>
            {this.renderGame()}
        </div>
    )
  }
}
