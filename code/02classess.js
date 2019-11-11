"use strict";
class Player {
    constructor(sprint, run, charge, tac, kick, kickDist, def, arm,
        infGen, infMin, infMax, meleeZone, hp, baseSize,
        pictureSource, pictureAddress, name, playBook, icySponge, theGuild, identity, nameDisplayed, picRatio, abilities) {
        //variables declaration for player:
        this.classification = "squaddie";
        this.abilities = abilities?skillsComposition(...abilities):skillsComposition([],[],[],[]);
        this.sprint = sprint;
        this.run = run;
        this.runPaid = false;
        this.charge = charge;
        this.Acharge = charge;
        this.isCharging = false;
        this.wasCharging = false;
        this.declaringAcharge = false;
        this.chargeTarget = false;
        this.doICollide;

        this.tac = tac;
        this.Atac = tac;
        this.meleeZone = meleeZone;
        this.AmeleeZone = meleeZone;
        this.isEngaged = false; //doesn't work, yet;
        this.playBook = playBook;

        this.kick = kick;
        this.Akick = kick;
        this.kickDist = kickDist;
        this.AkickDist = kickDist;
        this.hasBall = false;
        this.hasSnowBall = false;
        this.isKicking = false;
        this.kickReRoll = 0;

        this.def = def;
        this.Adef = def;
        this.arm = arm;
        this.Aarm = arm;

        this.theGuild = theGuild;

        this.infGen = infGen;
        this.infMin = infMin;
        this.infMax = infMax;

        this.hp = hp;
        this.hpMin = hp;
        this.icySponge = icySponge;
        this.heal = 0;

        this.baseSize = baseSize;
        switch (this.baseSize) {
            case 1:
                this.baseRadius = 1.2 * cm
                break;
            case 2:
                this.baseRadius = 1.6 * cm
                break;
            default:
                this.baseRadius = 2.2 * cm
                break;
        }
        this.name = name+Math.floor(Math.random()*10000);
        this.nameSpec = name;
        this.pictureSource = pictureSource;
        this.pictureAddress = pictureAddress;
        this.picRatio = picRatio;
        this.nameDisplayed = nameDisplayed;
        this.img = new Image();//MEMORY LEAK!!!!!!?????

        this.posX; //initial position
        this.posY;
        this.dragOk = false; //when becomes true item becomes draggable
        this.baseRadius; //actual base radius the mmodel takes on map
        this.meleeRadius = this.baseRadius + this.meleeZone * inch;
        this.meleeColor;
        this.moveAura = false;
        this.oldX = this.posX;
        this.oldY = this.posY;

        this.isActivating = false;
        this.hasActivated = false;
        this.isMoving = false;
        this.hasMoved = false;
        this.isAttacking = false;
        this.hasAttacked = false;
        this.isKicking = false;
        this.hasKicked = false;
        this.hasSnapped = false;
        this.hasDropped = false;
        this.canSnap = false;

        this.isPushed = false;
        this.isDodging = false;
        this.dopplerColor;
        this.drawAbilityAura = 0;//used for drawing auras for abilities range
        this.drawAbilityTargetAura = 0;
        this.hoverButtonAura = 0;
        this.hoverTaretCircle = false;

        this.isBleeding = false;
        this.isBurning = false;
        this.isDiseased = false;
        this.isKnockedDown = false;
        this.isPoisoned = false;
        this.isSnared = false;
        this.removedConditions = 0;
        this.isTakenOut = false;
        this.bonusTime = false;
        this.pressedAbutton = false;
        this.remainingRun = this.run * inch + this.baseRadius;// - this.isSnared ? 2 * inch : 0;
        this.remainingSprint = this.sprint * inch + this.baseRadius;// - this.isSnared ? 2 * inch : 0;
        this.remainingDodge = 0; 
        this.remainingPush = 0;

        this.counterForAttack = [];
        this.willCounter;
        this.defensiveStance = 0;

        this.inCover = false;//terrains interaction options
        this.inFastGround = false;
        this.inRoughGround = false;
        this.inForest = false;
        this.isGliding = false;
        this.shouldntBeHere = 0;
        this.identity = squaddieIdentity(...identity);
    }
    /*------------------------------------------------------PLAYER--------------------------------------------*\
    \*-----------------------------------------------------METHODS--------------------------------------------*/
    drawConditions(position, img, bsc = this.baseRadius) {      
        let degree = Math.PI / 180;
        pcl.save();
        pcl.translate(this.posX, this.posY);
        pcl.rotate(((position) * -19 * degree) + (-45 * degree));
        pcl.beginPath();
        pcl.arc(0, bsc, 4, 2 * Math.PI, 0);
        pcl.clip();
        pcl.strokeStyle = this.theGuild.color;
        pcl.lineWidth = 1;
        pcl.fill();
        pcl.drawImage(img, -6, bsc - 3, 1.1*wlem, 1.1*wlem);
        pcl.stroke();
        pcl.restore();
    }
    drawPlayerIcon(x = this.posX, y = this.posY, opacity = 1, meleeColor = this.meleeColor) {
        //determine base size
        let bsc = this.baseRadius;
        //how to draw a model----------------------------------------------------------------------------
        //x and y coordinates indicate player position on a map
        //this.meleeRadius = bsc + this.meleeZone * inch // for collision detection
        //const 
        if(!this.img.src) this.img.src = this.pictureSource;
        pcl.lineWidth = 1;
        ctx.lineWidth = 1;
        if(this.drawAbilityAura>0 || this.drawAbilityTargetAura > 0){
            aurora(x,y,0,x,y,this.drawAbilityAura,abilityColor,yellowColor);
            for(let th = 0; th<teamz.length; th++){
                let m2 = teamz[th];
                if(this.drawAbilityTargetAura > 0 && distance(mouX,mouY,m2.posX,m2.posY)<=m2.baseRadius)
                    aurora(m2.posX,m2.posY,this.baseRadius+5,m2.posX,m2.posY,this.drawAbilityTargetAura * inch+m2.baseRadius, abilityColor,redColor);
            }
        }
        if(this.hoverButtonAura > 0 ){
            pcl.lineWidth = .1;
            ctx.lineWidth = .1;
            aurora(x,y,this.hoverButtonAura-this.hoverButtonAura/3,x,y,this.hoverButtonAura,"rgba(97, 64, 4, 0.35)",uniqColor);
        };
        if(this.hoverTargetCircle === true){};
        ctx.beginPath() //shows melee radius
        ctx.globalAlpha = opacity;
        aurora(x, y, this.baseRadius, x, y, this.meleeRadius, meleeColor, meleeColor);
        ctx.closePath();
        ctx.strokeStyle = this.theGuild.color;
        ctx.stroke();
       pcl.beginPath();
       pcl.arc(x, y, bsc, 0, Math.PI * 2, true);
       pcl.closePath();
       pcl.save();
       pcl.clip();
       pcl.beginPath();

       //draw icons
       pcl.drawImage(this.img, ...this.pictureAddress.map(el=>Math.abs(el)), x - bsc, y - bsc, bsc*2, bsc*2);
     //  pcl.arc(x, y, bsc, 0, Math.PI * 2, true);
       pcl.beginPath();
      // pcl.clip(); //clips picture to circle
       pcl.lineWidth = 1;
       pcl.restore();
        //----------------ball--marker--on--player-----------
        for (let v = 0; v < 7; v++) {
            if (v % 2 === 0) {
                pcl.beginPath(); //circle around image
                pcl.lineWidth = 3;
                pcl.strokeStyle = this.hasBall ? 'black' : this.hasSnowBall? 'darkblue' : this.theGuild.color;
                pcl.arc(x, y, bsc, v, v + 1, false);
                pcl.stroke();
            } else {
                pcl.beginPath(); //circle around image
                pcl.arc(x, y, bsc, v, v + 1, false);
                pcl.lineWidth = 3;
                pcl.strokeStyle = this.hasBall || this.hasSnowBall? 'white' : this.theGuild.color;
                pcl.stroke();
            }
        }
        //-----------------influence---indicator-------------------
        for (let infCircle = 0; infCircle < this.infMin; infCircle++) {
            pcl.save();
            pcl.translate(this.posX, this.posY);
            pcl.rotate(((1 + infCircle) * 19 * degree) + (45 * degree));
            pcl.beginPath();
            pcl.fillStyle = "yellow";
            pcl.lineWidth = 1.6;
            pcl.arc(0, bsc, 3, 2 * Math.PI, 0);
            pcl.fill();
            pcl.stroke();
            pcl.restore();
        }
        //----------------conditions---indicator--------------------------
        if (this.isBleeding) {
            this.drawConditions(1, bleedingIco, bsc)
        };
        if (this.isBurning) {
            this.drawConditions(2, burningIco, bsc)
        };
        if (this.isKnockedDown) {
            this.drawConditions(3, knockedDownIco, bsc)
        };
        if (this.isPoisoned) {
            this.drawConditions(4, poisonIco, bsc)
        };
        if (this.isSnared) {
            this.drawConditions(5, snaredIco, bsc)
        };
        if (this.isDiseased) {
            pcl.save();
            pcl.translate(this.posX, this.posY);
            pcl.rotate(((6) * -19 * degree) + (-45 * degree));
            pcl.beginPath();
            pcl.fillStyle = "rgb(143, 236, 22)";
            pcl.lineWidth = 1.6;
            pcl.arc(0, bsc, 3, 2 * Math.PI, 0);
            pcl.fill();
            pcl.stroke();
            pcl.restore();
        }
        pcl.beginPath(); //hp displayed
        pcl.lineWidth = 1;
        pcl.font = "900 24px IM Fell English ";
        pcl.fillStyle = this.hpMin === this.hp ? "rgb(133, 176, 233)" : this.hpMin > this.icySponge ? "rgb(247, 201, 0)" : "rgb(204, 75, 1)";
        pcl.strokeStyle = 'rgba(79, 82, 78, 0.753)';
        pcl.textAlign = "center";
        pcl.strokeText(this.hpMin, this.posX, this.posY + 2 + bsc);
        pcl.fillText(this.hpMin, this.posX, this.posY + 2 + bsc);
        pcl.closePath();
//<<-----====   control nodes for terrain detection drawn
    //     const longDist = 0.3;
    //     const shortDist = 0.73;
    //     const u = 3;
    //     const b = this.baseRadius + 3;
    //    pcl.fillStyle="red";
    //    pcl.fillRect(x-b,y,u,u);pcl.fillRect(x-inch-b,y,u,u);

    //    pcl.fillRect(x-shortDist*b,y-shortDist*b,u,u);
    //    pcl.fillRect(x-inch-longDist*b,y-inch-longDist*b,u,u);

    //    pcl.fillRect(x-u,y-b,u,u);pcl.fillRect(x-u,y-inch-b,u,u);
       
    //    pcl.fillRect(x-u+shortDist*b,y-shortDist*b,u,u);
    //    pcl.fillRect(x-u+inch+longDist*b,y-inch-longDist*b,u,u);

    //    pcl.fillRect(x-u+b,y-u,u,u);pcl.fillRect(x-u+inch+b,y-u,u,u);

    //    pcl.fillRect(x-u+shortDist*b,y-u+shortDist*b,u,u);
    //    pcl.fillRect(x-u+inch+longDist*b,y-u+inch+longDist*b,u,u);

    //    pcl.fillRect(x-u,y-u+b,u,u);pcl.fillRect(x-u,y-u+inch+b,u,u);

    //    pcl.fillRect(x-shortDist*b,y-u+shortDist*b,u,u);
    //    pcl.fillRect(x-inch-longDist*b,y-u+inch+longDist*b,u,u);

    } //end of player drawing function

    myMove(e) {
        if (this.dragOk) {
            this.posX = mouX - canvas.offsetLeft;
            this.posY = mouY - canvas.offsetTop;
            this.meleeColor = yellowColor;
        }
    } //myMove

    squaddieDeploy(e, Gamer, mode) {
        let Y = Gamer.deployment;

        if (this.dragOk && mode === 'deployment' && mouX > 0 + this.baseRadius && mouY > Y[0] + (Y[0] < 10 * inch ? -this.baseRadius : this.baseRadius) && mouX < canvas.width - this.baseRadius && mouY < Y[1] - this.baseRadius) {
            this.posX = mouX;
            this.posY = mouY;
            this.meleeColor = yellowColor;
        }

        if (mode === 'comeback' && this.dragOk) {
            if (Y[0] <= 10 * inch && Boolean(Boolean(mouY <= 10 * inch && mouX <= this.baseRadius + 5 || mouY <= 10 * inch && mouX >= canvas.width - this.baseRadius - 5) || mouY <= this.baseRadius + 5)) {
                this.posX = mouX;
                this.posY = mouY;
                this.meleeColor = yellowColor;
            } else if (Boolean(Boolean(mouY >= canvas.height - 10 * inch - 5 + this.baseRadius && mouX <= this.baseRadius + 5 || mouY >= canvas.width - 10 * inch - 5 + this.baseRadius && mouX >= canvas.width - this.baseRadius - 5) || mouY >= canvas.width - this.baseRadius - 5)) {
                this.posX = mouX;
                this.posY = mouY;
                this.meleeColor = yellowColor;
            }

        }

        if(mode === 'd'){}

        // if (this.dragOk && mouX > 0 && mouY > 0 &&  mouX<canvas.width && mouY < 10*inch-this.baseRadius/2) {
        // }
    } //squaddie<deploy

    myDown(e) {
        if (distance(this.posX, this.posY, mouX, mouY) < (this.baseRadius)||isTouchscreen) {
            this.dragOk = true;
            teamz.forEach(el=>{if(el.name!==this.name&&el.dragOk)el.dragOk=false})
        }
    } //myDown

    myUp(e) {
        if (this.shouldntBeHere < 1 )this.dragOk = false;
    }
    kickAura() {
        if (this.isKicking) {
            ctx.beginPath(); //draw kick distance aura
            aurora(this.posX, this.posY, this.baseRadius, this.posX, this.posY, this.kickDist * inch + this.baseRadius, kickColor, yellowColor);
            // ctx.fill();
            ctx.closePath();
        }
    }
    moveAuraf() {
        if (this.moveAura && !this.hasMoved || this.isCharging && !this.hasMoved) {
            //---sprint------------------------------
            ctx.beginPath(); //rysuje kolko jog
            aurora(this.posX, this.posY, this.baseRadius, this.posX, this.posY, this.remainingSprint > 0 ? this.remainingSprint : 0, this.isCharging ? noColor : yellowColor, this.isCharging ? noColor : blueColor);
            ctx.closePath();
            //---run/charge--------------------------
            if (counter < 6 && (this.infMin > 0 || this.runPaid) ) {
                ctx.beginPath();
                aurora(this.posX, this.posY, this.baseRadius, this.posX, this.posY, this.remainingRun,  yellowColor, this.isCharging ? chargeColor : purpleColor);
                ctx.closePath();
            }
        }
    }
    isDodgingAura() {
        if (this.isDodging) {
            ctx.beginPath(); //rysuje kolko jog
            aurora(this.posX, this.posY, this.baseRadius, this.posX, this.posY, this.baseRadius + this.remainingDodge, dodgepushColor, yellowColor);
            ctx.closePath();
        }
    } //dodgeAura
    isPushedAura() {
        if (this.isPushed) {
            ctx.beginPath();
            aurora(this.posX, this.posY, this.baseRadius, this.posX, this.posY, this.baseRadius + this.remainingPush, dodgepushColor, yellowColor);
            ctx.closePath();
        }
    } //dodgeAura

    playerStatus() { //greys player out if hasActivated
        if (this.hasActivated) {
            this.oldX = this.posX;
            this.oldY = this.posY;
            pcl.beginPath();
            pcl.arc(this.posX, this.posY, this.baseRadius, 0, 2 * Math.PI, false);
            pcl.fillStyle = hasActivatedColor;
            pcl.fill();
        }
    }

    doppler(mx, my, opacity, sx = this.posX, sy = this.posY) { //draw a proxy model for positioning
        if ( 
            (
              (  (this.isCharging && !this.wasCharging) || 
                (this.moveAura && !this.wasCharging) || 
                this.isDodging || this.isPushed 
             ) && 
            distance(mouX,mouY,this.posX,this.posY)<=
                (
                    this.moveAura||this.isCharging?this.remainingRun:
                    this.isDodging?this.remainingDodge+this.baseRadius:
                    this.isPushed?this.remainingPush+this.baseRadius:
                    0
                )
            )|| 
                (ruler && this.isActivating)
            ){
            this.drawPlayerIcon(mx, my, opacity, this.dopplerColor);
            if( teamz.filter(el=>el.name!==this.name).every( el => 
                !lineCircleCollide( [this.posX, this.posY], [mouX, mouY], [el.posX, el.posY], this.baseRadius + el.baseRadius )) ){
            ctx.beginPath();
            ctx.moveTo(sx,sy);
            ctx.lineTo(mx, my);
            ctx.lineWidth = 2 * this.baseRadius;
            ctx.stroke();ctx.fill();
            ctx.closePath();
            }

            if(distance(mx,my,sx,sy)/inch>3)
            {
                ctx.save();
                ctx.translate(mx, my);
                ctx.rotate(angle(mx,my,sx,sy));
                ctx.font = `900 ${1.66*wlem}px IM Fell English `;
                ctx.fillStyle = "rgba(255,255,255,.6)";
                ctx.strokeStyle = "rgba(80,80,80,.6)";
                ctx.textAlign = "center";
                ctx.lineWidth = 1*wlem
                let howFar = distance(mx,my,sx,sy)/inch;
                ctx.strokeText( `<-- `+parseFloat(howFar).toFixed(1)+`" -->` , howFar/2*inch, 0);
                ctx.fillText  ( `<-- `+parseFloat(howFar).toFixed(1)+`" -->` , howFar/2*inch, 0);
                ctx.closePath();ctx.restore();
            }
        
        } //for
    } //end of player doppler function

    dropper() { //drops the model on current mouse position;
        if (
            distance(18 * inch, 30 * inch+2.5*cm,mouX,mouY) > 2.5*cm && 
            distance(18 * inch, 6 * inch-2.5*cm,mouX,mouY)>2.5*cm //not on goal post
            &&
            !this.hasMoved && 
            (
                !ball.isOnGround || 
                (distance(mouX,mouY,ball.x,ball.y)>ball.ballSize && ball.isOnGround)
            )//not on a ball
            && 
            (
                distance(this.posX,this.posY,mouX,mouY)>this.baseRadius/2 || 
                this.remainingSprint < this.sprint * inch
            ) 
            &&
            teamz.filter(el=>el.name!==this.name).every(el=>el.posX>0?distance(el.posX,el.posY,mouX,mouY)>el.baseRadius:true)//not on anyone else
        ) {
            this.isMoving = true;
            anime(this, teamz, otherGamer, {mode: this.isCharging ? 'charging' : '' });

        }
    } //dropperr
    pushSquaddie(n) {
        this.remainingPush = n * inch;
        if (this.isPushed) {
            this.doppler(mouX, mouY, 0.5)
            $('canvas').on('click tap', () => {
                if (
                        distance(this.posX, this.posY, mouX, mouY) <= this.remainingPush + 2 / this.baseRadius+1.2*inch && 
                        this.isPushed && 
                        teamz.every(    el =>
                            el.remainingDodge<.5*inch || 
                            distance(mouX,mouY,el.posX,el.posY)>distance(mouX,mouY,this.posX,this.posY)
                        )
                    )
                        anime(this, teamz,otherGamer,{ox:mouX,oy:mouY});
            })
        }
    }; //pushSquaddie

    dodgeSquaddie(n, mode="default") {
        this.remainingDodge = n * inch;
        if (this.isDodging) {
            this.doppler(mouX, mouY, 0.5)
            $('canvas').on('click tap', () => {
                if (//otherGamer.squaddies.every(el=>el.dodge===false) && 
                    distance(this.posX, this.posY, mouX, mouY) <= this.remainingDodge + 2 / this.baseRadius+1.2*inch && 
                    this.isDodging) {
                    anime(this, teamz,otherGamer,{ox:mouX,oy:mouY,mode:mode});
                }
            }) //onclick
        } //is dodging??
    }; //dodgeSquaddie

} //Player
//---------------------------------------PLAYER ENDS-----------------------------------------------------//
//---------------------------------------GUILD CLASS-----------------------------------------------------//

class Guild {
    constructor(color, name, icon, squaddies, fontColor, mercenaries){
        this.color = color;
        this.name = name;
        this.icon = icon;
        this.squaddies = squaddies
        this.fontColor = fontColor;
        this.mercenaries = mercenaries;
    }
}

//--------------------------------------GAMER CLASS------------------------------------------------------//
class Gajmer { 
    constructor(momentum, score, goals, squaddies, influence, active, Guild, gp,deployment,side){
        this.momentum = momentum;
        this.score = score;
        this.goals = goals;
        this.influence = influence;
        this.squaddies = squaddies;
        this.active = active;
        this.guild = Guild;
        this.gp = new GoalPost(...gp, this.guild.color);
        this.side = side;
        this.deployment = deployment;
        this.time = 2700;
        this.tokens = [];
        this.oponent;
    }
    interaction(teaMate, options = {}){
        if(this.tokens)
            this.tokens.forEach( (el,i)=>{
                if(!el.isInHand && el.type ==="trap" && options.isMovingNow &&
                    distance(teaMate.posX,teaMate.posY,el.posX,el.posY)<=el.baseRadius+teaMate.baseRadius+1*inch && 
                    this.oponent.squaddies && this.oponent.squaddies.some(el=>el.name===teaMate.name) )
                        {
                            snare(teaMate);
                            teaMate.hpMin-=1;
                            this.tokens.splice(i,1);
                        }
                if(!el.isInHand && el.type==="Nature's Chill" && distance(teaMate.posX,teaMate.posY,el.posX,el.posY)<=1.5*inch+teaMate.baseRadius &&
                    !teaMate.inFastGround)
                        {
                            teaMate.inFastGround = true;teaMate.remainingRun += 2* inch; teaMate.remainingSprint += 2 * inch;
                        }
                    }
                  
            )
    }
}

function squaddieIdentity(nationality, race, gender, role, status, guildStatus){
    return {
        nationality:nationality,
        race:race,
        gender:gender,
        role:role,
        status:status,
        guildStatus:guildStatus
    }
}

function skillsComposition (passiveGiven,passiveOwned,activeGiven,activeOwned) {
        let skila = []; passiveGiven.forEach(el=>skila.push([el,0]));
        let skilb = []; passiveOwned.forEach(el=>skilb.push([el,0]));
        let skilc = []; activeGiven.forEach(el=>skilc.push([el,0]));
        let skild = []; activeOwned.forEach(el=>skild.push([el,0]));
    return {
        passiveGiven:skila, //[],
        passiveOwned:skilb,//[ "light footed","anatomical precision"],
        activeGiven:skilc,// [],
        activeOwned:skild,// [ ["back to shadows",0], ["big game traps", 0], ["Gut & String ", 0] ]
    }
}

function aurora(x0 = 0,y0 = 0,r0 = 0,x1 = 0,y1 = 0,r1 = 0,color1 = "rgba(255,255,255,0)",color2 = "rgba(255,255,255,0)"){
    if(x0 > 0 && r0>=0 && r1>=0){
    let grd = ctx.createRadialGradient(x0,y0,r0,x1,y1,r1);
    grd.addColorStop(1, color1);
    grd.addColorStop(r1<5*inch?0.9:0.95, color2);
    grd.addColorStop(r1<5*inch?0.6:0.85, "rgba(255,255,255,0)");
    // Fill with gradient
    ctx.beginPath();
    ctx.fillStyle = grd; 
    ctx.arc(x0,y0,r1,0, 2 * Math.PI, false);
    ctx.fill();
    ctx.closePath();
    }
}

function drawCircleOnSquaddie(x,y,r,color){
    sctx.fillStyle=color;
    sctx.globalAlpha = .6;
    sctx.lineWidth=.1*wlem;
    sctx.beginPath();
    sctx.arc(x+7,y+7,r,0, Math.PI*2);
    sctx.fill();
    sctx.stroke();
    sctx.closePath();
}

function drawTemplateOnMouse(){
    if(mouseDrawTemplate){
        ctx.beginPath();
        ctx.arc(mouX,mouY,1.5*inch,0, Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        teamz.forEach(el=>{if (distance(mouX,mouY,el.posX,el.posY)<=1.5*inch+el.baseRadius){
            drawCircleOnSquaddie(el.posX,el.posY,el.baseRadius,el.theGuild.color);
        }});
    }
}