"use strict";
/*-----------------------------------------------------BEHOLD THE GAME---------------------------------------------------*\
\*----------------------------------------------------------ENGINE-------------------------------------------------------*/
let bigBang = (e)=>{//document.addEventListener('DOMContentLoaded', function (e) {

    
    $("#gameScreen").prepend(canvases);
    if (Gamer1.guild.color === Gamer2.guild.color){
        let newPaintJob = "#" + Math.floor(Math.random() * 16777215).toString(16);
        Gamer1.guild.color = newPaintJob;
        Gamer1.squaddies.forEach(el=>{
            el.theGuild = new Guild(Gamer1.guild.color, Gamer1.guild.name, Gamer1.guild.icon, Gamer1.guild.squaddies, Gamer1.guild.fontColor, Gamer1.guild.mercenaries)
        })
        Gamer1.gp.color = newPaintJob;
    }
    canvas          = document.getElementById("gameItems");
    ctx             = canvas.getContext("2d");
    playersCanvas   = document.getElementById("players");
    pcl             = playersCanvas.getContext("2d");
    // screentint      = document.getElementById("screentint");
    // sctx            = screentint.getContext("2d");          
    canvas_element  = $('#terrains_layer');
    konvas          = canvas_element.get(0).getContext("2d");
    if(!cheetos){
        counter = 0;
    }
    offsetX = canvas.offsetLeft;
    offsetY = canvas.offsetTop;



 document.addEventListener('keydown', (e) => {
    console.log(e.key);
})
    plajBookWraz();
    //_____________________ON_GAME_PREPARATION_____________________________\\
    //\\_________________________________________________________________//\\
    let spawnBeginGame1 = 11 * inch; let topSpawnPositionY = 15 * inch, botSpawnPositionY = 21 * inch;
    Gamer1.squaddies.forEach(teaMate => {
        spawnBeginGame1 += 2 * inch;
        teaMate.posX = spawnBeginGame1;
        teaMate.posY = Gamer1.side === 'top' ? topSpawnPositionY : botSpawnPositionY;
    });
    let spawnBeginGame2 = 11 * inch;
    Gamer2.squaddies.forEach(teaMate => {
        spawnBeginGame2 += 2 * inch;
        teaMate.posX = spawnBeginGame2;
        teaMate.posY = Gamer2.side === 'top' ? topSpawnPositionY : botSpawnPositionY;
    })


    function update(e) {
///////////////////////////////////////////////////////////////////////////////////
//////////////_______DISPLAY__GAMER__MELEE_____________///////////////////////////
//////////////////////////////////////////////////////////////////////////////////
        for (let o = 0; o < Gamer1.squaddies.length; o++) { //colour update for team1
            let m1 = Gamer1.squaddies[o];
            for (let p = 0; p < Gamer2.squaddies.length; p++) {
                let m2 = Gamer2.squaddies[p]
                if (m1 === m2) {
                    m1.meleeColor = grayColor;
                } else if (distance(m1.posX, m1.posY, m2.posX, m2.posY) >
                    (m1.meleeRadius + m2.baseRadius)) {
                    m1.meleeColor = grayColor;
                } else if (distance(m1.posX, m1.posY, m2.posX, m2.posY) <=
                    (m1.meleeRadius + m2.baseRadius)
                ) {
                    m1.meleeColor = redColor;
                    break;
                }
            }

            if(m1.posX === undefined && !m1.isTakenOut){m1.posX = m1.oldX, m1.posY = m1.oldY};

            for (let p = 0; p < Gamer2.squaddies.length; p++) {
                let m2 = Gamer2.squaddies[p]
                if (m1 === m2) {
                    m1.dopplerColor = grayColor;
                } else if (distance(mouX, mouY, m2.posX, m2.posY) >
                    (m1.meleeRadius + m2.baseRadius)) {
                    m1.dopplerColor = grayColor;
                } else if (distance(mouX, mouY, m2.posX, m2.posY) <=
                    (m1.meleeRadius + m2.baseRadius)
                ) {
                    m1.dopplerColor = redColor;
                    break;
                }
            }
        }

        for (let v = 0; v < Gamer2.squaddies.length; v++) { //colour update for team2
            let m1 = Gamer2.squaddies[v];
            for (let q = 0; q < Gamer1.squaddies.length; q++) {
                let m2 = Gamer1.squaddies[q]
                if (m1 === m2) {
                    m1.meleeColor = grayColor;
                } else if (distance(m1.posX, m1.posY, m2.posX, m2.posY) >
                    (m1.meleeRadius + m2.baseRadius)) {
                    m1.meleeColor = grayColor;
                } else if (distance(m1.posX, m1.posY, m2.posX, m2.posY) <
                    (m1.meleeRadius + m2.baseRadius)
                ) {
                    m1.meleeColor = redColor;
                    break;
///////////////////////////____FIGHT____///////////////////////////////////////////////////
                }
            }
            for (let p = 0; p < Gamer1.squaddies.length; p++) {
                let m2 = Gamer1.squaddies[p]
                if (m1 === m2) {
                    m1.dopplerColor = grayColor;
                } else if (distance(mouX, mouY, m2.posX, m2.posY) >
                    (m1.meleeRadius + m2.baseRadius)) {
                    m1.dopplerColor = grayColor;
                } else if (distance(mouX, mouY, m2.posX, m2.posY) <
                    (m1.meleeRadius + m2.baseRadius)
                ) {
                    m1.dopplerColor = redColor;
                    break;
                }
            }
        }
        //cursor icons
        //heal

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////________MOVEMENT___CONSTANT___CONDITIONS_____CHECKERS//////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
//monitors if two guys would occupate the same space, makes them move away in a unpredictably wonky way
        for (let i = 0; i < teamz.length; i++) {
            let m1 = teamz[i];
            if(m1.shouldntBeHere > 0 && (counter < 2 || counter > 5) ) {m1.posY > canvas.height / 2 ? m1.posY++ : m1.posY--};
            //collisionBouncer(m1, teamz);//here only for dev cheats smothiness
            if(m1.isTakenOut){m1.posX = undefined;m1.posY=undefined}
//-------------------THE BELOW covers collisions during deployment
            for(let q=0;q<teamz.length;q++){
                let m2 = teamz[q];
                        if(Boolean(counter<2||counter>5)&&m1.name!=m2.name&&distance(m1.posX,m1.posY,m2.posX,m2.posY)<(m1.baseRadius+m2.baseRadius)){
                            let offseterX = m1.posX<m2.posX?-m1.baseRadius:m1.baseRadius;
                            let offseterY = m1.posY<m2.posY?-m1.baseRadius:m1.baseRadius;
                            let sX = m2.posX;
                            let sY = m2.posY;
                            m1.posX = m1.posX+offseterX/20;
                            m1.posY = m1.posY+offseterY/20;
                            m2.posX = sX;
                            m2.posY = sY;
                        }else if(distance(m1.posX,m1.posY,Gamer.gp.x,Gamer.gp.y)<(m1.baseRadius+2.5*cm)){
                            let offseterX = m1.posX<Gamer.gp.x?-m1.baseRadius:m1.baseRadius;
                            let offseterY = m1.posY<Gamer.gp.y?-m1.baseRadius:m1.baseRadius;
                            let sX = m2.posX;
                            let sY = m2.posY;
                            m1.posX = m1.posX+offseterX/20;
                            m1.posY = m1.posY+offseterY/20;
                            m2.posX = sX;
                            m2.posY = sY;
                        }else if(distance(m1.posX,m1.posY,otherGamer.gp.x,otherGamer.gp.y)<(m1.baseRadius+2.5*cm)){
                            let offseterX = m1.posX<otherGamer.gp.x?-m1.baseRadius:m1.baseRadius;
                            let offseterY = m1.posY<otherGamer.gp.y?-m1.baseRadius:m1.baseRadius;
                            m1.posX = m1.posX+offseterX/20;
                            m1.posY = m1.posY+offseterY/20;
                        }else{
                        m1.oldX = m1.posX;
                        m1.oldY = m1.posY;
                        }
                        //limits player position to pitchfield
                        if(!m1.isPushed){
                        if(m1.posX<m1.baseRadius){
                            m1.posX=m1.baseRadius
                        }else if(m1.posY<m1.baseRadius){
                            m1.posY=m1.baseRadius
                        }else if(canvas.height<m1.posY+m1.baseRadius){
                            m1.posY=canvas.height-m1.baseRadius
                        }else if(canvas.width<m1.posX+m1.baseRadius){
                            m1.posX=canvas.width-m1.baseRadius
                        }}
                        if(counter<2&&Gamer.side==='top'){
                            Gamer.squaddies.filter(m1=>m1.posY>10*inch-m1.baseRadius)
                            .forEach(m1=>m1.posY=10*inch-m1.baseRadius)
                        }else if(counter<2&&Gamer.side==='bottom'){
                            Gamer.squaddies.filter(m1=>m1.posY<canvas.height-10*inch+m1.baseRadius)
                            .forEach(m1=>m1.posY = canvas.height-10*inch+m1.baseRadius)
                        }
////////////////////////////
                        
                if(m1.name!==m2.name&&m1.hasBall&&m2.hasBall){
                    m2.hasBall = false;
                }
            } 
//----------------------------for m2. loop
            //-------------------DEATH HERE------------------------------
            if(m1.hpMin<1){
                generatePuddle(m1);
                removeConditionsFuncion(m1, Gamer, 0, 0);  
                if(!m1.isTakenOut){
                    if(Gamer.squaddies.some(el=>el.name===m1.name)){
                        otherGamer.score+= m1.identity.status === 'Mascot'? 1 : m1.nameDisplayed ==='Memory'?0 : 2;
                        otherGamer.momentum+=1;
                        if(counter===5)endSquaddieActivation(m1,Gamer1,Gamer2,Gamer, switcher,teamz,turnTransition);
                    } else if(!Gamer.squaddies.some(el=>el.name===m1.name)){
                    Gamer.score+= m1.identity.status === 'Mascot'? 1 : m1.nameDisplayed ==='Memory'?0 : 2;
                    Gamer.momentum+=1
                }      
                m1.isActivating = false;
                //m1.hasActivated = false;
                m1.isMoving = false;
                m1.hasMoved = false;
                m1.isAttacking = false;
                m1.hasAttacked = false;
                m1.isKicking = false;
                m1.hasKicked = false;
                m1.hasSnapped = false;
                m1.hasDroped = false;
                m1.isBleeding = false;
                m1.isBurning = false;
                m1.isDiseased = false;
                m1.isKnockedDown = false;
                m1.isPoisoned = false;
                m1.isSnared = false;
                m1.removedConditions = 0;
                m1.bonusTime = false;
                m1.pressedAbutton = false;
                m1.hasSnapped = false;
                
                if(m1.hasBall){
                    m1.hasBall = false;
                    ball.isOnGround = true;
                    scatterRandomiser(m1.posX,m1.posY,false,m1, true);console.log('12-228')
                }
                m1.hpMin = m1.icySponge;
                m1.posX = undefined;
                m1.posY = undefined;
                m1.hasActivated = true;
                m1.hasMoved = true;
                m1.isPushed = false;
                m1.isDodging = false;
                m1.isTakenOut = true;
                m1.isBurning = false;m1.isBleeding = false;m1.isDiseased= false;m1.isKnockedDown=false;m1.isPoisoned=false;m1.isSnared=false;
            }
            }
            if(m1.posX>canvas.width-m1.baseRadius||m1.posY>canvas.height-m1.baseRadius||m1.posX<=m1.baseRadius||m1.posY<=m1.baseRadius){
                if(m1.isPushed && !m1.isTakenOut){
                    Gamer.score+=2;
                    Gamer.momentum+=1

                if(m1.hasBall){
                    m1.hasBall = false;
                    ball.x=canvas.width/2;ball.y=canvas.height/2;
                    ball.isOnGround = true;
                    scatterRandomiser(canvas.width/2,canvas.height/2,false);console.log('12-250')
                }

                removeConditionsFuncion(m1, Gamer, 0, 0);        
                m1.isActivating = false;
                m1.hasActivated = false;
                m1.isMoving = false;
                m1.hasMoved = false;
                m1.isAttacking = false;
                m1.hasAttacked = false;
                m1.isKicking = false;
                m1.hasKicked = false;
                m1.isBleeding = false;
                m1.isBurning = false;
                m1.isDiseased = false;
                m1.isKnockedDown = false;
                m1.isPoisoned = false;
                m1.isSnared = false;
                m1.removedConditions = 0;
                m1.bonusTime = false;
                m1.pressedAbutton = false;
                m1.posX = undefined;
                m1.posY = undefined;
                m1.hasActivated = true;
                //m1.hasMoved = true;
                m1.isPushed = false;
                m1.isDodging = false;
                m1.posX = undefined;
                m1.posY = undefined;
            }

        }
//stops m1 from moving outside of his movement range;
            // if (m1.moveAura && distance(mouX, mouY, m1.posX, m1.posY) >=
            //     (m1.remainingRun + 10 - m1.baseRadius)&&m1.moveAura||m1.remainingRun<0.58*inch) {
            //         m1.moveAura = false;
            // } //if ends
            // if(m1.moveAura && distance(mouX, mouY, m1.posX, m1.posY) <=
            // (m1.remainingRun - m1.baseRadius)&&m1.moveAura){
            //     m1.oldX = m1.posX;
            //     m1.oldY = m1.posY;
            // }
            // //the below solves nagging canvas mouse run issue
            // if (distance(m1.posX, m1.posY, m1.oldX, m1.oldY) >m1.remainingRun+10&&m1.moveAura) {
            //    // m1.moveAura = false;
            //     m1.posX = m1.oldX;
            //     m1.posY = m1.oldY;
            // }

            if(m1.hasBall){
                ball.x = m1.posX;
                ball.y = m1.posY;
            }

        if(ball.x+ball.ballSize>canvas.width||ball.x-ball.ballSize<0||ball.y+ball.ballSize>canvas.height||ball.y-ball.ballSize<0){//ball off the pitch
            m1.hasBall = false;
            ball.isOnGround = true;
            ball.x=canvas.width/2;ball.y=canvas.height/2;
            scatterRandomiser(canvas.width/2,canvas.height/2,false,m1,true);console.log('308-12')
        }

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////_____GAMER__POOL__MANAGEMENT____/////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
            if (m1.dragOk) {
                m1.meleeColor = yellowColor;
            } //------when player is picked up his melee color changes
        } //for m1. loop
        //snapBallButtonCreator('end');

        draw();
        requestAnimationFrame(update);

    } //update
    function draw() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        pcl.clearRect(0, 0, pcl.canvas.width, pcl.canvas.height);
        sctx.clearRect(0, 0, sctx.canvas.width, sctx.canvas.height);
        konvas.clearRect(0,0,konvas.width,konvas.height);
        terrainsGenerator();
        drawDeploymentZones(counter);
        Gamer1.gp.drawGoalPost(Gamer1.momentum,Gamer1.score,Gamer1.influence);
        Gamer2.gp.drawGoalPost(Gamer2.momentum,Gamer2.score,Gamer2.influence);
//tokens display
        [...Gamer1.tokens,...Gamer2.tokens].forEach(el=>{
            if(el.type!=="trap"){
                el.drawToken();
                el.drawDoppler();
            }
        });
        [...Gamer1.tokens,...Gamer2.tokens].forEach(el=>{
            if(el.type==="trap"){
                el.drawToken();
                el.drawDoppler();
            }
        });
        ball.doppler();
        ball.draw_ball();
        ball.drawDropAura();
        drawTimeLeft (Gamer);
        for(let dm1 = 0; dm1 < teamz.length; dm1++){
            let Dm1 = teamz[dm1];
            // for(let dm2 = 0; dm2 < otherGamer.squaddies.length; dm2++){
            //     let Dm2 = otherGamer.squaddies[dm2];

            // };
            Dm1.moveAuraf();
            Dm1.kickAura();
            Dm1.isDodgingAura();
            Dm1.isPushedAura();
            Dm1.doppler(mouX, mouY, .5);
            Dm1.drawPlayerIcon();
            Dm1.playerStatus();
            if(Dm1.chargeTarget!==false){drawChargeCone(Dm1,Dm1.chargeTarget);}
            if(Dm1.declaringAcharge)aurora(Dm1.posX, Dm1.posY, Dm1.baseRadius, Dm1.posX, Dm1.posY,
                                            Dm1.remainingRun+Dm1.meleeRadius-Dm1.baseRadius-2, yellowColor, chargeColor);
            if(distance(Dm1.posX,Dm1.posY,mouX,mouY)<=Dm1.baseRadius&&showLeaflet){modelInfo(Dm1)};
            if(rulerDopplers.length>0)rulerDopplers.forEach( Rm1=>{Dm1.doppler(Rm1[0], Rm1[1], .5, Rm1[2], Rm1[3])} );
            puddles.forEach(el=>{drawPuddle(ctx, el.size, 0.5, el.x, el.y, el.shape, el.type)    })
        };
        if(!isTouchscreen) mouse(Gamer,otherGamer,ball);
        if(Gamer.gp.hasBall)aurora(Gamer.gp.x, Gamer.gp.y, (2.5*cm+5*inch), Gamer.gp.x, Gamer.gp.y, (2.5*cm+10*inch), kickColor, yellowColor);
    } //draw
    
    deploymentPhase(event);
    update();
    drawBackground();
    pitchConstructor();



// slow part

setInterval(function(){if(Gamer.active && counter>=0){
    if(Gamer.time>=0)
        {
            Gamer.time-=1
        }
            else
        {
            Gamer.time = 60;
            endSquaddieActivation(Gamer.squaddies.filter(el=>el.isActivating)[0],Gamer1,Gamer2,Gamer, switcher,teamz,turnTransition)
        } 
    } 
}, 1000);
}


/*----------------------------------------------------GAME ENGINE-------------------------------------------------------*\
\*------------------------------------------------------DEFINED---------------------------------------------------------*/
/*--------------------------------------------TESTING-------------------------------------------------------------------*\
\*---------------------------------------------STARTS-------------------------------------------------------------------*/
    //var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16) //generates random color




function moseDraw () {
    if(counter<0){
        sctx.clearRect(0, 0, sctx.canvas.width, sctx.canvas.height);
        mouse();
        requestAnimationFrame(moseDraw);
    }
}
moseDraw();
const cheetah = (n) => {
    if (n) {
        $("#gameTypeForm").off().remove();
        let bookOfLife1 = [];[Skatha,Fahad,Zarola,Jaecar,Egret,vetHearne].forEach(el=>bookOfLife1.push(new Player(...el) ));
        let bookOfLife2 = [];[Wellington,Pepper,Cinnamon,Roast,Spice,Sugar].forEach(el=>bookOfLife2.push(new Player(...el) ));
        Gamer1 = new Gajmer(
            0,0,0,
            bookOfLife1,
            addInfGen (bookOfLife1),
            rnd > 0.5 ? true : false,//active?
            bookOfLife1[0].theGuild,
            rndDeploy > 0.5 ? [18 * inch, 6 * inch - 2.5 * cm] : [18 * inch, 30 * inch + 2.5 * cm],
            rndDeploy > 0.5 ?                [0, 10 * inch]    :    [26 * inch, 36*inch/*canvas.height*/],
            rndDeploy > 0.5 ?                       'top'      :        'bottom' 
        );


        Gamer2 = new Gajmer(
            0,0,0,
            bookOfLife2,
            addInfGen (bookOfLife2),
            rnd > 0.5 ? false : true,//active?
            bookOfLife2[0].theGuild,
            rndDeploy > 0.5 ? [18 * inch, 30 * inch + 2.5 * cm] : [18 * inch, 6 * inch - 2.5 * cm],
            rndDeploy > 0.5 ? [26 * inch, 36*inch /*canvas.height*/ ] : [0, 10 * inch],
            rndDeploy > 0.5 ? 'bottom'  : 'top'
        );

        $("#teaMenuScreen").remove();
        teamz = [...Gamer1.squaddies, ...Gamer2.squaddies];
        Gamer = rnd > 0.5 ? Gamer1 : Gamer2;
        otherGamer = rnd > 0.5 ? Gamer2 : Gamer1;

        counter = 5;
        //Gamer1.squaddies.forEach(el => el.posY = 16*inch);
        //Gamer2.squaddies.forEach(el => el.posY = 17*inch);
        teamz.forEach(el => {el.infMin = 5; el.hpMin-=4;el.isBleeding=true;});
        Gamer1.momentum += 2; Gamer2.momentum += 2;

        Gamer1.oponent = Gamer2;
        Gamer2.oponent = Gamer1;
        bigBang();
        switcher();
    }
    //socket.emit('gameOn');
}
cheetah(cheetos);
//alfa();