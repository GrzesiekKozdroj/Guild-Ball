"use strict";
let hlem = $(window).height() / 100;
let wlem = window.innerWidth / 100;
window.addEventListener('resize', function(e){
    hlem = window.innerHeight /100;
    wlem = window.innerWidth / 100; 
})//windowEvent
var canvaSqr = 70 * wlem;
//$("body").append(`<section id="teaMenuScreen" width='${canvaSqr}px'></section>`);
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
const dodgepushColor = 'rgba(146, 148, 42, 0.42)';//indicates dodges and pushes
const kickColor = 'rgba(199, 233, 145, 0.42)';//indicates kicking distance
const chargeColor = 'rgba(124, 56, 39, 0.4)';
const noColor = 'rgba(0,0,0,0)';
const abilityColor = "rgba(240, 212, 161, 0.932)";
const uniqColor = "rgba(97, 64, 4, 0.95)";
const rareColor = "#F5FF6C";
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
let cheetos = false;

const smallBase = 1.2 * cm;
let savedBeforVoodoo = [];
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
let mouseDrawTemplate = false;

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
//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},
const huntersIcoSize = 716;
const hiX = 100/6;
const hiY = 100/7;
const S="S";
const P="P";
const inchSymbol = "ˮ";
const skillzLizt = {
    ambush:{who:["Ulfr"],name:"Ambush",desc:`When charged by this model, enemy models must spend an additional +1 MP to use Defensive Stance. `,type:"trait"},

    anatomicalPrecision:{who:["Jaecar"],name:"Anatomical Precision",desc:`During an attack from this model enemy models suffer -1 ARM.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[0,3*hiY,huntersIcoSize]},

    aria:{who:["Esters"],name:"Aria",desc:`While within this aura, other friendly guild models may use heroic plays without spending MP.`,type:"trait"},

    arrowToTheKnee:{who:["Theron"],name:"Arrow To The Knee",cst:[2,-1],rng:8,sus:true,opt:false,desc:`Target enemy model suffers -2/-2ˮ KICK and 2 DMG.`,type:"play"},
//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},
    backToTheShadows:{who:["Egret","Jaecar"],name:"Back To The Shadows",desc:`At the end of this model’s activation, if it caused damage during the activation, it may make a 4ˮ dodge`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[hiX,0*hiY,huntersIcoSize]},

    bait:{who:["Steeljaw"],name:"Bait",cst:[2,1],rng:S,sus:false,opt:true,desc:`6ˮ pulse. This model may place two friendly trap markers within this pulse. Then choose two enemy models within this pulse. The chosen models suffer a 2ˮ push.`,type:"play"},

    barroomBrawl:{who:["Tapper"],name:"Barroom Brawl",desc:`When a friendly model declares a charge against an enemy model within this model’s melee zone, the friendly model spends 1 less influence on the charge.`,type:"trait"},

    bigGameTraps:{who:["Chaska","Jaecar","vMinx"],name:"Big Game Traits",desc:`Once per turn during this model’s activation, it may place a friendly trap marker within 2ˮ.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[6*hiX,0*hiY,huntersIcoSize]},

    blessingOfTheMoonGoddess:{who:["Skata"],name:"Moon Goddess Blessing",cst:[1,-1],rng:4,sus:true,opt:false,desc:`The next time target friendly model makes a successful attack, the friendly model may add an additional << playbook result.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[0*hiX,1*hiY,huntersIcoSize]},

    blessingOfTheSunFather:{who:["Hearne","Theron","vMinx"],name:"Blessing Of The Sun Father",rng:6,sus:true,desc:`Once during its activation, target friendly model within 6ˮ may use a character play without spending influence.`,type:"heroic"},

    boomBox:{who:["Chaska"],name:"Boom Box",cst:[3,-1],rng:6,sus:false,opt:true,desc:`Target enemy model suffers a 4" push directly away from this model and 4 DM`,type:"trait"},

    bringThemDown:{who:["Steeljaw"],name:"Bring Them Down",desc:`While this model is on the pitch, friendly human models gain Big Game Traps.(Big Game Traps: Once per turn during this model’s activation, it may place a friendly trap marker within 2ˮ.)`,type:"trait"},

    chainBolas:{who:["Zarola"],name:"Chain Bolas",cst:[2,-1],rng:8,sus:false,opt:true,desc:`Target enemy model suffers 2 DMG and the snared conditition.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[4*hiX,1*hiY,huntersIcoSize]},

    chemicalBreeze:{who:["Smoke"],name:"Chemical Breeze",cst:[1,-1],rng:6,sus:false,opt:false,desc:`Choose one: • Enemy models within 3ˮ of target friendly guild model suffer the burning condition.• Enemy models within 3ˮ of target friendly guild model suffer the poison condition.`,type:"play"},

    chemicalShower:{who:["Smoke"],name:"Chemical Shower",desc:`Enemy models within this pulse suffering the burning or poison condition suffer 3 condition DMG.`,type:"legendary",pulse:6},

    closeControl:{who:["Edge","Egret"],name:"Close Control",desc:`This model may ignore the first tackle playbook result that it suffers each turn. `,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[5*hiX,1*hiY,huntersIcoSize]},

    cloudJumper:{who:["Smoke"],name:"Cloud Jumper",desc:`Once per turn during this model\’s activation, it may choose an ongoing eff  ect AOE within 4ˮ and be placed anywhere within the chosen AOE.`,type:"trait"},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},

    disarm:{who:["Steeljaw"],name:"Disarm",cst:[-1,1],rng:P,sus:true,opt:false,desc:`Target enemy model suffers -2 TAC.`,type:"play"},

    coldSnap:{who:["Skatha"],name:"Cold Snap",cst:[2,1],rng:6,sus:false,opt:true,desc:`Position an AOE within range. Models hit suffer 2 DMG and the snared condition.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[6*hiX,1*hiY,huntersIcoSize]},

    commandingAura:{who:["Tapper"],name:"Commanding Aura",cst:[2,2],rng:S,sus:true,opt:true,desc:`4ˮ aura. While within this aura, friendly guild models gain +1 TAC and +1 DMG to playbook damage results.`,type:"trait"},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},
    
    entangle:{who:["Edge"],name:"Entangle",cst:[1,1],rng:6,sus:false,opt:false,desc:`Target enemy model suffers the snared condition`,type:"trait"},

    expertTrapper:{who:["Steeljaw"],name:"Expert Trapper",desc:`While this model is on the pitch, when an enemy model triggers a trap marker, choose one additional effect: • The enemy model suffers Weak Point.• The enemy model suffers the bleed condition.`,type:"trait"},

    feral:{who:["Seenah"],name:"Feral",desc:`Once per turn during this model\’s activation, it may make an attack without spending influence.`,type:"trait"},

    feralInstincts:{who:["Snow"],name:"Feral Instincts",cst:[1,-1],rng:4,sus:true,opt:true,desc:``,type:"Target friendly model gains Anatomical Precision.(Anatomical Precision: During an attack from this model enemy models suffer –1 ARM.)"},

    flurry:{who:["Egret"],name:"Flurry",cst:[2,-1],rng:8,sus:false,opt:true,desc:`Models within 2ˮ of target enemy model suffer 2 DMG.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[2*hiX,0*hiY,huntersIcoSize]},

    freeBar:{who:["Corker"],name:"Free Bar",desc:`Friendly non-mascot guild models within this pulse gain a beer token`,type:"heroic",pulse:4},

    fulmination:{who:["Midas"],name:"Fulmination",desc:`Once per turn during this model’s activation, it may remove the burning or poison condition from another model within 4ˮ. If it does, for the remainder of the turn when this model makes a successful attack, it may add an additional < playbook result.`,type:"trait"},

    furious:{who:["Fahad"],name:"Furious",desc:`When this model charges during its activation, it may do so without spending influence`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[3*hiX,2*hiY,huntersIcoSize]},

    gutAndString:{who:["Jaecar"],name:"Gut & String",cst:[-1,1],rng:P,sus:true,opt:false,desc:`Target enemy model suffers -2ˮ/–2ˮ MOV and –1 DEF.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[4*hiX,2*hiY,huntersIcoSize]},

    heightenedSenses:{who:["vMinx"],name:"Heightened Senses",desc:`This model gains +1 DEF against attacks and character plays made against it by a damaged enemy model.`,type:"trait"},

    huntersPrey:{who:["Theron"],name:"Hunter\'s Prey",desc:`Enemy models damaged by this model suffer the snared condition.`,type:"trait"},
//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},
    infuse:{who:["Smoke"],name:"Infuse",cst:[2,-1],rng:6,sus:false,opt:false,desc:`Target enemy model that is currently suff  ering the burning or poison condition suffers 3 condition DMG.`,type:"play"},

    ironFist:{who:["Corker"],name:"Iron Fist",cst:[1,-1],rng:S,sus:true,opt:true,desc:`This model gains +1 DMG to playbook damage results`,type:"play"},

    isolatedTarget:{who:["Fahad","Seenah"],name:"Isolated Target",desc:`This model gains +1 DMG to playbook damage results while attacking an enemy model that is suffering the snared condition`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[6*hiX,0*hiY,huntersIcoSize]},

    lastLight:{who:["vHearne"],name:"Last Light",desc:`Once per turn during this model\’s activation, choose a friendly model within 6ˮ. The chosen model may spend MP instead of influence to pay the CST of its next character play.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[0*hiX,3*hiY,huntersIcoSize]},

    leglessDrunk:{who:["Corker"],name:"Legless Drunk",desc:`The first time each turn this model suffers damage, except while making an advance, it suffers a push D6ˮ in a direction chosen by its controlling player.`,type:"trait"},

    lightFooted:{who:["Chaska","Edge","Hearne","Jaecar","Skatha","Theron","Ulfr","Zarola"],name:"Light Footed",desc:`When this model makes an advance it ignores the MOV penalty for rough terrain.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[1*hiX,3*hiY,huntersIcoSize]},

    linked:{who:["Fahad","Zarola"],name:"Linked",desc:`When this model\’s activation ends, the named friendly model may immediately take its activation if able to do so.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[33.6,43,huntersIcoSize]},

    loneHunter:{who:["Ulfr"],name:"Lone Hunter",desc:`While not within 4ˮ of another friendly model, this model gains +2 TAC.`,type:"trait"},

    lovedCreature:{who:["Snow"],name:"Loved Creature",desc:`The first time each turn this model suffers damage from an enemy attack or play, other friendly models gain +1 TAC for the remainder of the turn.`,type:"trait"},

    lunarEclipse:{who:["vHearne"],name:"Lunar Eclipse",desc:"Each time this model damages an enemy model, after the action is resolved this model may be placed within 1ˮ of the enemy model.",type:"trait",icon:"./icons/abil/hunt.png",picRatio:[5*hiX,3*hiY,huntersIcoSize]},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},

    lureOfgold: {who:["Midas"],name:"Lure of Gold",cst:[2,1],rng:6,zon:0,sus:false,opt:false,desc:`Target other friendly guild model may immediately
    make a Jog towards this model.`,type:"play"},

    magnumOpus:{who:["Midas"],name:"Magnum Opus",desc:`Enemy models within this pulse suffer the burning and poison conditions. Friendly models within this pulse gain Fulmination.`,type:"legendary",pulse:6},

    markedForDeath:{who:["vMinx"],name:"Marked For Death",cst:[2,1],rng:S,sus:true,opt:true,desc:`A friendly model that declares a charge against an enemy model that\’s within this model\’s melee zone spends 1 less influence and gains +2ˮ/+2ˮ MOV for the duration of the charge.`,type:"trait"},

    markedTarget:{who:["Tapper"],name:"Marked Target",cst:[1,1],rng:10,sus:true,opt:false,desc:`When a friendly model charges target enemy model, the friendly model gains +0ˮ/+2ˮ MOV for the duration of the charge.`,type:"play"},

    midasTouch:{who:["Midas"],name:"Midas Touch",desc:`When this model makes a successful attack, the target enemy model suffers the burning and poison conditions.`,type:"trait"},

    mirage:{who:["Ede"],name:"Mirage",desc:`Once per turn during this model\’s activation, if this model is within a piece of rough ground, fast ground, or a forest, this model may be placed anywhere within that piece of terrain.`,type:"trait"},

    moreTeeth:{who:["vMinx"],name:"More Teeth",cst:[-1,1],rng:S,sus:true,opt:false,desc:`This model may place a friendly trap marker within 2ˮ`,type:"trait"},

    mudConcealer:{who:["Chaska"],name:"Mud Concealer",desc:`While within rough terrain, this model gains +1 DEF.`,type:"trait"},

    naturesBlessing:{who:["Hearne"],name:"Nature\'s Blessing",desc:`Once per turn during its activation, this model may choose a piece of forest terrain within 4ˮ. This model may be placed anywhere within the chosen forest terrain.`,type:"trait"},

    naturesChill:{who:["Skatha"],name:"Nature\'s Chill",rng:8,sus:true,opt:true,desc:`At the start of this model’s activation, it may position an AOE within 8ˮ and not in base contact with terrain. This AOE is fast terrain and is removed from the pitch in the End Phase.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[3*hiX,4*hiY,huntersIcoSize]},

    naturesGrowth:{who:["Theron"],name:"Nature\'s Growth",desc:`At the start of this model\’s activation, it may position an AOE within 8ˮ and not in contact with terrain. The AOE is forest terrain and is removed in the End Phase`,type:"trait"},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},

    nimble:{who:["Fahad"],name:"Nimble",cst:[1,-1],rng:S,sus:true,opt:true,desc:`This model gains +1 DEF.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[5*hiX,4*hiY,huntersIcoSize]},

    oldJakes:{who:["Tapper"],name:"Old Jake\'s",desc:`Allocate 2 influence between other friendly guild models within 8ˮ`,type:"heroic"},

    packMentality:{who:["Snow"],name:"Pack Mentality",desc:`When another friendly model within this aura that isn’t suffering the knocked down condition suffers damage from an enemy attack or play, it may make a 1ˮ dodge directly towards this model.`,type:"trait"},

    perfectPositioning:{who:["Steeljaw"],name:"Perfect Positioning",desc:`This model may immediately remove any number of friendly trap markers from the pitch. It may then place up to 5 friendly trap markers within this pulse.`,type:"legendary",pulse:6},

    pinned:{who:["Theron"],name:"Pinned",cst:[2,-1],rng:8,sus:true,opt:true,desc:`Target enemy model suffers 2 DMG. While this model is on the pitch, the target enemy model may only move directly towards this model while advancing.`,type:"play"},

    quickFoot:{who:["Esters"],name:"Quick Foot",cst:[2,-1],rng:4,sus:true,opt:false,desc:`Target friendly model gains +2ˮ/+2ˮ MOV.`,type:"trait"},

    resilience:{who:["Esters"],name:"Resilience",desc:`The first time each turn this model is hit by an enemy attack or character play that targets this model, before triggering other abilities, the attack or character play is unsuccessful and the hit is ignored`,type:"trait"},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},

    singledOut:{who:["Hearne"],name:"Singled Out",cst:[-1,1],rng:P,sus:true,opt:false,desc:`Friendly models gain +2 TAC while attacking target enemy model.`,type:"trait"},

    skewered:{who:["Hearne","vHearne"],name:"Skewered",cst:[2,2],rng:6,sus:false,opt:true,desc:`Target enemy model suffers 3 DMG and the snared condition`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[3*hiX,5*hiY,huntersIcoSize]},

    skilledWithinShadow:{who:["Virtol"],name:"Skilled within Shadow",desc:`When this model targets an enemy model that is
    benefiting from cover with an Attack, this model gains
    [+2] TAC for the duration of the Attack.`,type:"trait"},

    smokeBomb:{who:["Smoke","Virtol"],name:"Smoke Bomb",cst:[1,-1],rng:4,sus:false,opt:true,desc:`Position an ongoing effect AOE within range. While within this AOE, models gain cover.`,type:"play"},

    snapFire:{who:["Egret"],name:"Snap Fire",cst:[1,-1],rng:6,sus:false,opt:false,desc:`Taret enemy model suffers 1 DMG`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[4*hiX,5*hiY,huntersIcoSize]},

    snowball:{who:["Skatha"],name:"Snow Ball",cst:[1,-1],rng:S,sus:true,opt:true,desc:`Place an additional ball in this model's possession. When this ball is used to score a goal, the friendly team gains 1 VP instead of 4 VP. At the end of this model’s activation, remove this ball from the pitch.`,type:"play",icon:"./icons/abil/hunt.png",picRatio:[5*hiX,5*hiY,huntersIcoSize]},

    soothingVoice:{who:["Esters"],name:"Soothing Voice",desc:`Friendly models within this pulse remove all conditions they’re suffering`,type:"heroic",pulse:3},

    spitAndSawdust:{who:["Corker"],name:"Spit And Sawdust",desc:`While this model is on the pitch, friendly guild models still engage enemy models while suffering the knocked down condition.`,type:"trait"},

    swiftStrikes:{who:["Egret"],name:"Swift Strikes",desc:`During this model’s activation, when it damages one or more enemy models it may make a 2ˮ dodge.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[0*hiX,6*hiY,huntersIcoSize]},

    sunStrike:{who:["Theron"],name:"Sun Strike",cst:[1,-1],rng:6,sus:true,opt:false,desc:`When target friendly model hits one or more enemy models with a character play, after resolving the play the friendly team gains 1 MP.`,type:"play"},

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},

    theMauling:{who:["Seenah"],name:"The Mauling",cst:[-1,2],rng:S,sus:false,opt:false,desc:`2ˮ pulse. Other models within this pulse suffer a 4" push directly away from this model and 3 DMG.`,type:"trait"},

    thePowerOfVoodoo:{who:["Zarola"],name:"The Power of Voodoo",desc:`Target friendly model within 6ˮ may immediately make a jog`,type:"legendary",icon:"./icons/abil/hunt.png",picRatio:[100/9*3,100/7*6,huntersIcoSize]},

    tooledUp:{who:["Esters"],name:"Tooled Up",cst:[1,-1],rng:4,sus:true,opt:true,desc:`Target friendly guild model gains +1 DMG to character plays that cause damage and to playbook damage results.`,type:"play"},

    toughHide:{who:["Seenah","Tapper"],name:"Tough Hide",desc:`This model suffers -1 DMG from enemy plays and playbook damage results.`,type:"trait"},

    toughSkin:{who:["Chaska","Corker"],name:"Tough Skin",cst:[1,-1],rng:4,sus:true,opt:true,desc:`Target friendly model gains +1 ARM.`,type:"trait"},

    unorthodox:{who:["Edge"],name:"Unorthodox",desc:`When this model makes a successful attack against an enemy model suffering the snared condition, it may add an additional << playbook result.`,type:"trait"},
    
    unpredictableMovement:{who:["Midas","Smoke","Zarola"],name:"Unpredictable Movement",desc:`Once per turn when an enemy model ends an advance
    within this model’s melee zone, this model may immediately
    make a 2ˮ Dodge.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[5*hiX,6*hiY,huntersIcoSize]},

    venomousStrike:{who:["Eret"],name:"Venomous Strikes",desc:`Enemy models damaged by this model suffer the poison condition.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[6*hiX,6*hiY,huntersIcoSize]},

    watchTheWorldBurn:{who:["Smoke"],name:"Watch The World Burn",desc:`At the end of this model’s activation, the friendly team gains 1 MP for each enemy model within this pulse that’s suffering the burning or poison condition.`,type:"trait", pulse:4},

    weakPoint:{who:["Steeljaw"],name:"Weak Point",cst:[-1,1],rng:P,sus:true,opt:false,desc:`Taret enemy model suffers -1 ARM.`,type:"play"},

    wheredTheyGo:{who:["Midas","Ulfr"],name:"Where'd They Go?",cst:[1,1],rng:S,sus:false,opt:true,desc:`This model may make a 4\ˮ dodge.`,type:"play"},

    whiskyChaser:{who:["Corker"],name:"Whisky Chaser",cst:[1,-1],rng:4,sus:true,opt:false,desc:`The next time target friendly guild model makes a successful attack, the friendly model may add an additional KD playbook result`,type:"play"},

    wintersBlessing:{who:["vHearne"],name:"Winter's Blessing",desc:`When this model makes an advance, it ignores the MOV penalty for rough terrain. When this model moves within one or more pieces of rough terrain during an advance, it gains +2ˮ/+2ˮ MOV for the remainder of the advance.`,type:"trait",icon:"./icons/abil/hunt.png",picRatio:[2*hiX,7*hiY,huntersIcoSize]},

    wintersNight:{who:["Skatha"],name:"Winter\'s Night",desc:`When a friendly model within this aura makes a successful attack, the friendly model may add an additional < playbook result.`,type:"legendary",aura:6,icon:"./icons/abil/hunt.png",picRatio:[3*hiX,7*hiY,huntersIcoSize]},

}

//{who:[""],name:"",cst:[,],rng:,sus:,opt:,desc:``,type:""},