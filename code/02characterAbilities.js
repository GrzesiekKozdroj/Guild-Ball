"use strict";
let idear = 0;

let trapsArray = [];
class CharacterAbilities {
    constructor (...abil){
        //hunter specific
        this.placingTrap = false;
    }
    bigGameTraps(m1, Gamer){
        if(distance(m1.posX,m1.posY,mouX,mouY)<=2*inch+m1.baseRadius+smallBase){
            
        }
    }
}


function hasPassive (m1,name){
    return m1.abilities.passiveOwned.some(el => el.includes(name));
}
function hasPassiveUnused(m1,name){
    return m1.abilities.passiveOwned.some(el => el.includes(name) && el[1]<1)
}
function hasPassiveUsed(m1,name){
    return m1.abilities.passiveOwned.some(el => el.includes(name) && el[1]>0)
}
function makePassiveButton(id,text,picLink){
    return `<div 
                id="${id}" 
                class="passiveSkill skill" 
                style='
                    background:url(${picLink.icon}) ${picLink.picRatio[0]}% ${picLink.picRatio[1]}%;  
                    background-size:${picLink.picRatio[2]}%;
                    border-color:black;
                    font-size:0;'
                data-desc="${picLink.desc}" 
                data-type="${picLink.type}" 
                data-name="${picLink.name}" 
                data-icost="${picLink.cst?picLink.cst[0]:-2}" 
                data-pcost="${picLink.cst?picLink.cst[1]:-2}" 
                data-range="${picLink.rng?picLink.rng:-2}" 
                data-sus="${picLink.sus?picLink.sus:-2}" 
                data-opt="${picLink.opt?picLink.opt:-2}" 
                data-aura="${picLink.aura?picLink.aura:-2}" 
                data-id="${id}"
            >
            <p class="o2"></p>
            ${text}
        </div>`
}
function hasActive (m1,name){
    return m1.abilities.activeOwned.some(el => el.includes(name)) || m1.abilities.passiveGiven.some(el => el.includes(name));
}
function hasActiveGiven (m1,name){
    return m1.abilities.activeGiven.some(el => el.includes(name));
}
function hasPassiveGiven (m1,name){
    return m1.abilities.passiveGiven.some(el => el.includes(name));
}
function hasActiveUnused(m1,name){
    return m1.abilities.activeOwned.some(el => el.includes(name) && el[1]<1)
}
function makeActiveButton(id,text,picLink){

    return `<div 
        id="${id}" 
        class="activeSkill skill" 
        style='
            background:url(${picLink.icon}) ${picLink.picRatio[0]}% ${picLink.picRatio[1]}%;  
            background-size:${picLink.picRatio[2]}%;
            font-size:0;'
            data-desc="${picLink.desc}" 
            data-type="${picLink.type}" 
            data-name="${picLink.name}" 
            data-icost="${picLink.cst?picLink.cst[0]:-2}" 
            data-pcost="${picLink.cst?picLink.cst[1]:-2}" 
            data-range="${picLink.rng?picLink.rng:-2}" 
            data-sus="${picLink.sus?picLink.sus:-2}" 
            data-opt="${picLink.opt?picLink.opt:-2}" 
            data-aura="${picLink.aura?picLink.aura:-2}"
    >
        <p class="o1"></p>
        ${text}
    </div>`
}
function makeActiveOpt(m1,name){
    m1.abilities.activeOwned.forEach(el=>{if(el[0]===name){el[1]+=1}});
}
function makePassiveOpt(m1,name){
    m1.abilities.passiveOwned.forEach(el=>{if(el[0]===name){el[1]+=1}});
}

class Token {
    constructor(xo,yo,size,type,color){
        this.classification = "token";
        this.id = Math.floor(Math.random()*10000);
        this.posX = xo;
        this.posY = yo;
        this.baseRadius = size;
        this.type = type;
        this.icon = new Image();
        this.icon.src = this.type === "trap" ? "./icons/snared.png" : this.type === "Nature's Chill" ? "./icons/Terrains/fastGround01.svg":"";
        this.isInHand = false;
        this.isPlacable;
        this.color = color;
    }
    drawToken(x = this.posX, y = this.posY){
        //letx =  ; 
        //let y = ;
        if (this.type === "trap"){
            pcl.lineWidth = 1;
            ctx.lineWidth = 1;
            ctx.beginPath() 
            ctx.globalAlpha = 1;
            aurora(x, y, 0, x, y, this.baseRadius+1*inch, redColor, greenColor);
            ctx.closePath();
            ctx.stroke();
            pcl.beginPath();
            pcl.arc(x, y, this.baseRadius, 0, Math.PI * 2, true);
            pcl.fillStyle = "rgba(164, 192, 120, 0.74)";
            pcl.strokeStyle= this.color;
            pcl.fill();
            pcl.stroke();
            pcl.closePath();
            pcl.save();
            pcl.clip();
            pcl.beginPath();
            //draw icons
            pcl.drawImage(this.icon, x - this.baseRadius, y - this.baseRadius, this.baseRadius*2, this.baseRadius*2);
            pcl.lineWidth = 2;
            pcl.closePath();
            pcl.restore();
        }else if (this.type === "Nature's Chill"){
            pcl.save();
            pcl.beginPath() 
            pcl.globalAlpha = 1;
            pcl.arc(x,y,this.baseRadius, 0, Math.PI * 2, true);
            pcl.clip();
            pcl.drawImage(this.icon, x- this.baseRadius-.5*inch, y - this.baseRadius-.5*inch, this.baseRadius*2.5, this.baseRadius*2.5);
            pcl.stroke();
            pcl.closePath();
            pcl.restore();
        }
    }
    drawDoppler(){
        if(this.isInHand){
            this.posX = mouX;
            this.posY = mouY;
            if(terrainsDetector(this) ) this.isPlacable = true;
        }
    }
}
function cold_snap(m1) {
    if(hasActiveUnused(m1,"Cold Snap")){
        unpredictableMovement(m1);
        m1.drawAbilityTargetAura = 0;
        idear = "coldSnappB";
        m1.drawAbilityAura = m1.baseRadius + 9 * inch;
        mouseDrawTemplate = true;
        $("#players").on("click.usingAbility",()=>{
            if(idear==="coldSnappB" && distance(m1.posX,m1.posY,mouX,mouY)<=m1.baseRadius+6.5*inch){
                teamz.forEach(el=>{
                    if(distance(mouX,mouY,el.posX,el.posY)<=1.5*inch+el.baseRadius){
                            el.hpMin-=2;
                            snare(el);
                    }
                });
                makeActiveOpt(m1,"Cold Snap");
                commonAfterInstruction({ m1: m1 });
                mouseDrawTemplate = false;
            }
        })
    }
}
function GutAndString (m1,m2){
    if(m1.abilities.activeOwned.some(el=>el.includes("Gut and String")) 
    && !m2.abilities.activeGiven.some(el=>el==="Gut and String"))
    {
        m2.abilities.activeGiven.push("Gut and String");
        m2.remainingSprint-=2*inch;
        m2.remainingRun-=2*inch;
        m1.abilities.activeOwned.forEach(el=>{if(el[0]==="Gut and String"){el[1]+=1}});
    }
}




function lunarEclipse(m1,m2){
    if(hasPassive(m1,'Lunar Eclipse')){
        commonPreInstruction({ m1: m1 });
    m2.drawAbilityAura = m1.baseRadius*2+1*inch+m2.baseRadius;
    idear = "lunarEclipse";
    ruler = true;
    $("#players").on('click.usingAbility', ()=>{
        if(distance(mouX,mouY,m2.posX,m2.posY)<=m1.baseRadius*2+m2.baseRadius+1*inch && 
            $('#app').find('.activeOptions').length < 1 && legalPlacementDetector(m1)){
            m1.posX = mouX;
            m1.posY = mouY;
            commonAfterInstruction({ m1: m1 });
            m2.drawAbilityAura=0;
            ruler = false;
        }
    })
    }
};

function Skewered (m1,m2){
    if(hasActiveUnused(m1,"Skewered")){
        m2.hpMin-=3;
        snare(m2);
        makeActiveOpt(m1,"Skewered");
        commonAfterInstruction({ m1: m1 });
        if(m1.nameSpec==="vHearne")lunarEclipse(m1,m2);
    }
}

function unpredictableMovement(m1){
    otherGamer.squaddies.forEach(m2=>{
        if(hasPassiveUnused(m2,"Unpredictable Movement") && m1.isMoving &&
            m2.name!==m1.name &&
            distance(m1.posX,m1.posY,m2.posX,m2.posY)<=m2.AmeleeZone*inch+m2.baseRadius+m1.baseRadius){
    $('body').append(`
    <div 
        id='unpredictableMovement${m2.name}' 
        class='counterbox unpredictableMovement background-${m2.theGuild.name}' 
        style=" 
            top:${m2.posY-145 + (offsetX ? offsetX : 0)}px;
            left:${m2.posX-75 + (offsetY ? offsetY : 0)}px;
            border:3px solid ${m2.theGuild.color};
        ">
        <button 
            id='opt8${m2.name}' 
            class='opt8'
            style = "
                border:2px solid ${m2.theGuild.color};
        ">  dodge<br>away!
        </button>

       <button 
            id='opt9${m2.name}' 
            class='opt2' 
            style = "
                border:2px solid ${m2.theGuild.color};
        ">not <br> yet</button>
    </div>`);
    $("body").on("click.unpredictableMovement", '#opt8'+m2.name,()=>{
    if(m1.isMoving){
        m1.moveAura = false;
        m1.hasMoved = true;
        m1.isMoving = false;
    }
    m2.isDodging = true;
    m2.dodgeSquaddie(2, teamz, m1);
    makePassiveOpt(m2,"Unpredictable Movement");
    $('body').find('#unpredictableMovement' + m2.name).off().remove();
});
$("body").on("click.unpredictableMovement", '#opt9'+m2.name,()=>{
    $('body').find('#unpredictableMovement' + m2.name).off().remove();
});
    return true    }else{return false}
    })
};

function chainBolas (m1,m2){
    if(hasActiveUnused(m1,"Chain Bolas")){
        m2.hpMin-=2;
        snare(m2);
        makeActiveOpt(m1,"Chain Bolas");
    }
}




function abilitiesCleaner(m1){//activates at the end of the turn and cleanses all effects.....
    m1.abilities.passiveGiven = [];
    m1.abilities.activeGiven = [];
    m1.abilities.activeOwned.forEach(el=>el[1]=0);
    m1.abilities.passiveOwned.forEach(el=>el[1]=0);
}

function movementHindrances(m1){
    let totalHindrance = (!hasPassive(m1,"Light Footed")&&m1.inRoughGround?2:0)+
                         (hasActiveGiven(m1,"Gut and String")?2:0)+
                         (m1.isSnared?2:0)+
                         (m1.isBurning?2:0)-
                         (hasPassive(m1,"Winters Blessing")?4:0);
    return totalHindrance*inch;
}