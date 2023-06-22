let clicks, upgrade, preco, moneyPS, kills, Equips, clicksEarned, clicksReset, resets, globalCpsMult, cpsSucked;
let upgrade0, upgrade1, upgrade2;
let startDate=new Date();
startDate.setTime(Date.now());
var volume=1
var Sounds=[];
var SoundInsts=[];
for (var i=0;i<12;i++){SoundInsts[i]=new Audio();}
var SoundI=0;

const GlobalImporter = {
    clicks, upgrade, preco,
    moneyPS, kills, Equips,
    clicksEarned, clicksReset, resets,
    globalCpsMult, cpsSucked, upgrade0,
    upgrade1, upgrade2, startDate,
    volume, Sounds, SoundInsts, 
    SoundI
}

export default GlobalImporter;
