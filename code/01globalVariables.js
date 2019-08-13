"use strict";
let hlem = $(window).height() / 100;
let wlem = window.innerWidth / 100;
window.addEventListener('resize', function(e){
    hlem = window.innerHeight /100;
    wlem = window.innerWidth / 100; 
})//windowEvent
var canvaSqr = 70 * wlem;
$("body").append(`<section id="teaMenuScreen" width='${canvaSqr}px'></section>`)
$("#gameScreen").append(`<div id='app' style="z-index:6;  left:${(canvaSqr+1.5*wlem)}px; width:${27 * wlem}px;"></div>`);
$("#gameScreen").append(`<canvas id='screentint' width='${100 * wlem}px' height='${canvaSqr}px'>I'm sorry but Your browser needs an update to enjoy this game</canvas>`);
var canvases = `
<div>
    <canvas id='pitchfield' width='${canvaSqr}px' height='${canvaSqr}px'>I'm sorry but Your browser needs an update to enjoy this game</canvas>
    <canvas id="terrains_layer" width='${canvaSqr}px' height='${canvaSqr}px'>I'm sorry but Your browser needs an update to enjoy this game</canvas>
    <canvas id='gameItems' width='${canvaSqr}px' height='${canvaSqr}px'>I'm sorry but Your browser needs an update to enjoy this game</canvas>
    <canvas id='players' width='${canvaSqr}' height='${canvaSqr}'>I'm sorry but Your browser needs an update to enjoy this game</canvas>
</div>`;

        var canvas        ;
        var ctx           ;
        var playersCanvas ;
        var pcl           ;
        var screentint     = document.getElementById("screentint");;
        var sctx           = screentint.getContext("2d");          ;

let mouX;
let mouY;
document.body.style.cursor = 'none';

const inch = canvaSqr / 36 //here comes the game units
//const inch = inch0.toFixed(1)
const cm0 = canvaSqr / 81.2
const cm = cm0.toFixed(1)
const hi = 'hi';
const greenColor = 'rgba(133, 255, 102, .042)';//unused
const redColor = 'rgba(123, 66, 42, .42)';//red deployment zone, red melee zone
const yellowColor = 'rgba(237, 240, 57, 0.52)';//used to change melee zone color when drag'n'droping squaddie
const blueColor = 'rgba(112, 117, 185, 0.52)';//movement color
const purpleColor = 'rgba(170, 112, 185, 0.52)';//running color
const grayColor = 'rgba(134, 134, 141, 0.24)';// unengaging melee zone
const hasActivatedColor = 'rgba(134, 134, 141, 0.6)';//greys out squaddie icon
const dodgepushColor = 'rgba(146, 148, 42, 0.52)';//indicates dodges and pushes
const kickColor = 'rgba(199, 233, 145, 0.42)';//indicates kicking distance
const chargeColor = 'rgba(124, 56, 39, 0.4)';
const noColor = 'rgba(0,0,0,0)';
const abilityColor = "rgba(240, 212, 161, 0.932)";
let leafletBackground = new Image();//draws background for model info on hover
    leafletBackground.src='./icons/cursor/bg.jpg';
const backgroundTtoss = Math.floor((Math.random() * 5) + 1);
let bleedingIco = new Image();bleedingIco.src = './icons/Conditions/Bleeding.jpg';
let burningIco = new Image();burningIco.src = './icons/Conditions/Burning.jpg';
let knockedDownIco = new Image();knockedDownIco.src = './icons/Conditions/knockedDown.jpg';
let poisonIco = new Image();poisonIco.src = './icons/Conditions/Poison.jpg';
let snaredIco = new Image();snaredIco.src = './icons/Conditions/Snared.jpg';
let degree = Math.PI/180;
let healCursor = 0;//heal cursor display
let hasConditions = (m2)=>(m2.isBleeding||m2.isBurning||m2.isDiseased||m2.isKnockedDown||m2.isPoisoned||m2.isSnared)?true:false;
let fontz = new FontFace('IM Fell English', 'url(https://fonts.googleapis.com/css?family=Merienda)');
let showLeaflet = true;
let movementHistory = [];
const savedGameState = [];
//let endsquadieactivvariable;
let switcher;
let counter = -2;//used toi check when deployment phase ends
let wrath, receiver;//counterattacks solution??
let Gamer1, Gamer2 ,Gamer, otherGamer, teamz;
let neSpotx, neSpoty;
let ruler = false;//used to draw multiple doppplers
let rulerDopplers = [];
let rdLength = 0;
let rnd = Math.random();//this randomises who is to start
let rndDeploy = Math.random();
let cheetos = true;

const smallBase = 1.2 * cm;

// slow part
let mouse_position = [];
let kolor;
let canvas_element ;
let konvas         ;
const dummy = {//used for whe mouse has no players
    guild:{
        color:"black",
    },
    squddies:[],
}
let offsetX, offsetY;//used to realign mouse position
let puddles = [];//when models suffer TO they leave bloodied puddle to remember what happened;
let td = [];//<<<--------------===== generated terrains are stored here
let filtered_td = [];

fontz.load().then((font) => {document.fonts.add(font);});
const tp = [//terrains initial generation package
    {
        dir: [
            "./icons/Terrains/forest01.svg",//"https://svgshare.com/i/DSq.svg",//
            "./icons/Terrains/forest02.svg",//"https://svgshare.com/i/DU9.svg",//
            "./icons/Terrains/forest03.svg"//"https://svgshare.com/i/DRB.svg",//
        ],
        size: [5 , 6, 3.6, 4.8],
        kind: "forest",
        description:["forest",`-2/2" movement`,"gives cover"]
    },
    {
        dir: [
            "./icons/Terrains/fastGround01.svg",//https://svgshare.com/i/DTA.svg",//droj/0d69df5cd58343b600e623f79f7ab440.js",
            "./icons/Terrains/fastGround02.svg",//"https://svgshare.com/i/DTW.svg",//,
            "./icons/Terrains/fastGround03.svg"//"https://svgshare.com/i/DRA.svg",//
        ],
        size: [3, 3, 3, 3],
        kind: "fastGround",
        description:["fast ground",`+2/2" movement`]
    },
    {
        dir: [
            "./icons/Terrains/roughGround01.svg",//"https://svgshare.com/i/DU2.svg",
            "./icons/Terrains/roughGround02.svg",//"https://svgshare.com/i/DS6.svg",
            "./icons/Terrains/roughGround03.svg"//"https://svgshare.com/i/DSr.svg",
        ], 
        size: [3.5, 4.5, 3, 3.5],
        kind: "roughGround",
        description:["rough ground",`-2/2" movement`]
    },
    {
        dir: [
            `./icons/Terrains/wall01.svg`,
            `./icons/Terrains/wall01.svg`,
            `./icons/Terrains/wall01.svg`
        ],size: [5, 3.5, 1 ,2],
        kind: "wall",
        description:["wall","gives cover"]
    },{
        dir: [
            "./icons/Terrains/obstacle01.svg",//"https://svgshare.com/i/DTX.svg",
            "./icons/Terrains/obstacle02.svg",//"https://svgshare.com/i/DU1.svg",
            "./icons/Terrains/obstacle03.svg"//"https://svgshare.com/i/DTY.svg",
        ],
        size: [3, 4, 3, 4],
        kind: "obstacle",
        description:["obstacle","gives cover"]
    }
]

let dummyBall;
const coords = [//terrains positions
    [4 * inch, 11.5 * inch], [11 * inch, 11.5 * inch], [18 * inch, 12.5 * inch], [28 * inch, 11.5 * inch], [32 * inch, 11.5 * inch],
    [4 * inch, 18.5 * inch], [11 * inch, 18.5 * inch], [18 * inch, 18.5 * inch], [28 * inch, 18.5 * inch], [32 * inch, 18.5 * inch],
    [4 * inch, 24.5 * inch], [11 * inch, 24.5 * inch], [18 * inch, 22.5 * inch], [28 * inch, 24.5 * inch], [32 * inch, 24.5 * inch] //0,4,5,9,10,14
];

let diceRolledForDisplay = [];
/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////_____________PLAYBOOK__CELL__TEMPLATE_________/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
let $playBookTop = [];
let $playBookCircle = [];
let $teamplays = [];
var playBookWrap;

function plajBookWraz(){
    $("#app").find('.playbookWrap').parent().empty().off()
    return playBookWrap = {
    noWrap: [
        [],
        [], 'noWrapTop', 'noWrapBottom'
    ],
    firstWrap: [
        [],
        [], 'firstWrapTop', 'firstWrapBottom'
    ],
    secondWrap: [
        [],
        [], 'secondWrapTop', 'secondWrapBottom'
    ],
    thirdWrap: [
        [],
        [], 'thirdWrapTop', 'thirdWrapBottom'
    ],
    fourthWrap: [
        [],
        [], 'fourthWrapTop', 'fourthWrapBottom'
    ],
    fifthWrap: [
        [],
        [], 'fifthWrapTop', 'fifthWrapBottom'
    ],
    sixthWrap: [
        [],
        [], 'sixthWrapTop', 'sixthWrapBottom'
    ],
    seventhWrap: [
        [],
        [], 'seventhWrapTop', 'seventhWrapBottom'
    ],
}}
let message;
function collisionBouncer(m1, teamz) {
    //-------------------THE BELOW TO BECOME PART OF ANIME
    for (let q = 0; q < teamz.length; q++) {
        let m2 = teamz[q];
        if (m1.name != m2.name && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.baseRadius + m2.baseRadius)) {
            let offseterX = m1.posX < m2.posX ? -m1.baseRadius : m1.baseRadius;
            let offseterY = m1.posY < m2.posY ? -m1.baseRadius : m1.baseRadius;
            let sX = m2.posX;
            let sY = m2.posY;
            m1.posX = m1.posX + offseterX / 20;
            m1.posY = m1.posY + offseterY / 20;
            m2.posX = sX;
            m2.posY = sY;
        } else if (distance(m1.posX, m1.posY, Gamer.gp.x, Gamer.gp.y) <= (m1.baseRadius + 2.5 * cm)) {
            let offseterX = m1.posX < Gamer.gp.x ? -m1.baseRadius : m1.baseRadius;
            let offseterY = m1.posY < Gamer.gp.y ? -m1.baseRadius : m1.baseRadius;
            let sX = m2.posX;
            let sY = m2.posY;
            m1.posX = m1.posX + offseterX / 20;
            m1.posY = m1.posY + offseterY / 20;
            m2.posX = sX;
            m2.posY = sY;
        } else if (distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m1.baseRadius + 2.5 * cm)) {
            let offseterX = m1.posX < otherGamer.gp.x ? -m1.baseRadius : m1.baseRadius;
            let offseterY = m1.posY < otherGamer.gp.y ? -m1.baseRadius : m1.baseRadius;
            m1.posX = m1.posX + offseterX / 20;
            m1.posY = m1.posY + offseterY / 20;
        } else {
            m1.oldX = m1.posX;
            m1.oldY = m1.posY;
        }
    }
}
let isTouchscreen = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
function adminToolz(event,teaMate,Gamer,mode) {
        $('canvas').on('mousedown tap', function (event) {
            if (//event.button == 0
                counter<2 || counter > 5) { //if for pickup component 1 starts
                teaMate.myDown(event);
            } //if
        }); //mouseDown
        $('canvas').on('mousemove swipe', function (event) {
            if(counter<2 || counter > 5)teaMate.squaddieDeploy(event,Gamer,mode);
            //teaMate.myMove(event);
        }); //mouseMove
        $('canvas').on('mouseup touchend', function (event) {
            if(counter<2 || counter > 5)teaMate.myUp(event);
        }); //mouseUp
     
    }//FOR ADMIN TOOLZ

const isInMelee = (m1,m2) => { return distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius) ? true : false }
//               Magic Word:
//terser Tocca.js jquery-3.3.1.js 01globalVariables.js 02classess.js 02characterAbilities.js 03diceRoll.js 03abilitiesButtons.js 04toolsFunctions.js 05animation.js 06ball.js 07terrains.js 08guilds.js 09rostrerEvents.js  10playerTemplateFile.js 11mouseEvents.js 12pitchfield.js -o gimball.js -c -m
const angle = (cx, cy, ex, ey) => {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    return theta;
  }

const contextmenuEv = 'click tap';
const contextmenuAtt = 'click.attacks';

const defaultPreventer = (event)=>{
    event.preventDefault();
}
document.addEventListener('contextmenu',(e)=>{
    if(isTouchscreen)defaultPreventer(e);
});
document.addEventListener('mousemove', (e) => {
    if(counter<0){
        mouX = e.pageX - 6;
        mouY = e.pageY - 6;
    }else{
        mouX = e.pageX - canvas.offsetLeft;
        mouY = e.pageY - canvas.offsetTop;
    }
})