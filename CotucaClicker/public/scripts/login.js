import axios from 'axios';

const urlAPI = "http://localhost:5276/api/player"
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

function SaveGame(){
    const player = this.state.player;
    const metodo = 'post';

    axios[metodo](urlAPI, player).then(resp => {
        this.setState({player: initialState.player, lista})
    })
}

function LoadGame(){
    var player;
    const metodo = 'get';

    axios[metodo](urlAPI).then(resp => {
        player = resp.data;
    })

    clicks = player.clicks;
    moneyLifetime = player.moneyLifetime;
    moneyThisRun = player.moneyThisRun;
    startDate = player.initialDate;

    upgrade[0] = player.sword;
    upgrade[1] = player.shield;
    upgrade[2] = player.armor;
    upgrade[3] = player.boot;
    upgrade[4] = player.bow;
    upgrade[5] = player.staff;
    upgrade[6] = player.elf;
    upgrade[7] = player.orc;
    upgrade[8] = player.sergio;
    upgrade[9] = player.simone;
    upgrade[10] = player.patricia;
    upgrade[11] = player.sampaio;
    upgrade[12] = player.maligno;
    upgrade[13] = player.boletim;

    /*upgrade0 = player.upgrade0;
    upgrade1 = player.upgrade1;
    upgrade2 = player.upgrade2;*/
}