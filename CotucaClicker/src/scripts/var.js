import Formatter from "./formatter";

let clicks, upgrade, preco, moneyPS, kills, equips, clicksEarned, clicksReset, resets, globalCpsMult, cpsSucked;
let upgrade0, upgrade1, upgrade2;
var cssClasses = [];
var fps=30;

var firstLoading = [true, true, true, true, true, true, true];
var secondsToSpellAgain = 0
var countElfo = 0, countOrc = 0, countSergio = 0, countSimone = 0, countMaligno = 0;

let Objects = [];
var onMenu = '';
var App = {};
var clickStr='';
var ON=' '+("ON");
var OFF=' '+("OFF");

let startDate=new Date();
startDate.setTime(Date.now());

var formatShort=['k','M','B','T','Qa','Qi','Sx','Sp','Oc','No'];
var formatLong=[' thousand',' million',' billion',' trillion',' quadrillion',' quintillion',' sextillion',' septillion',' octillion',' nonillion'];
var prefixes=['','un','duo','tre','quattuor','quin','sex','septen','octo','novem'];
var suffixes=['decillion','vigintillion','trigintillion','quadragintillion','quinquagintillion','sexagintillion','septuagintillion','octogintillion','nonagintillion'];

var numberFormatters=
[
	Formatter.formatEveryThirdPower(formatShort),
	Formatter.formatEveryThirdPower(formatLong),
	Formatter.rawFormatter
];

var prefs=[];

var volume=1
var Sounds=[];
var SoundInsts=[];
for (var i=0;i<12;i++){SoundInsts[i]=new Audio();}
var SoundI=0;

let buyMode = 1;
let buyBulk = 1;

const Var = {
    clicks, upgrade, preco,
    moneyPS, kills, equips,
    clicksEarned, clicksReset, resets,
    globalCpsMult, cpsSucked, upgrade0,
    upgrade1, upgrade2, startDate,
    firstLoading, secondsToSpellAgain, countElfo,
    countOrc, countSergio, countSimone,
    countMaligno, Objects, onMenu,
    cssClasses, fps, formatShort,
    formatLong, prefixes, suffixes,
    numberFormatters, prefs, volume,
    Sounds, SoundInsts, SoundI,
    buyMode, buyBulk, App,
    clickStr, ON, OFF,
}

export default Var