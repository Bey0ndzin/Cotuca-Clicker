import { useState } from 'react'
import React, { Component } from 'react';
import axios from 'axios'

import musica from './music/Musga.mp3'

import './App.css'
import SectionLeft from './components/SectionLeft'
import SectionMiddle from './components/SectionMiddle'
import SectionRight from './components/SectionRight'

import ScriptImporter from './JavaScript/ScriptImporter';
import VolumeImporter from './JavaScript/VolumeImporter';

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
        ScriptImporter.Load()
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
        const buttons = document.createElement('script');
        buttons.src = '../public/scripts/buttons'
        document.head.appendChild(buttons);

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

        window.addEventListener('mousemove', () => {GetMouseCoords()})
    }
    return(
        <div>
            {this.renderGame()}
        </div>
    )
  }
}
