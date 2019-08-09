//__animation__of__movement__///////////////////
//////////////////////////////////////////////////
function anime(m1, teams, otherGamer,options) {
    let endX = options.ox||mouX,
        endY = options.oy||mouY;
    movementHistory.push(
        [
            [m1.posX, m1.posY],
            [m1.remainingSprint, m1.remainingRun], 
            m1.name,
            [m1.remainingDodge, m1.remainingPush]//added
        ]);
    let safeX = m1.posX,
        safeY = m1.posY;
    let notOnTokenX, notOnTokenY;
    let x = m1.posX,
        y = m1.posY;
        const speedRatio = Math.abs(distance(x, y, mouX, mouY))*7;
    let duration = 1000>speedRatio?1000:speedRatio;
    let startTime;
        if(options.mode==='charging' && m1.isKnockedDown){
            endX = m1.posX; endY = m1.posY;
           endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz);
        }else if (Boolean(!m1.isDodging && !m1.isPushed) && m1.isKnockedDown){endX=m1.posX;endY=m1.posY}else if(options.mode==='charging'){m1.isCharging=true}
    //below builds an array of engaging players

    let startingEngagedBy = [];
    for(let sE = 0; sE < otherGamer.squaddies.length; sE++){
        let sEm2 = otherGamer.squaddies[sE]
        if(m1.posX > 0 && distance(sEm2.posX, sEm2.posY, m1.posX, m1.posY) <= (m1.baseRadius + sEm2.meleeRadius)){
            startingEngagedBy.push(sEm2)
        }
    }
    let continueMovement = false;



    let anim = (time) => {
        //if(!isNaN(m1.posX))
        if (!startTime) {
            startTime = time;
        }

        let deltaTime = (time - startTime) / duration;
    

        Gamer.interaction(m1);
        otherGamer.interaction(m1);
    


        let checkgoalcollision = distance(m1.posX, m1.posY, 18 * inch, 6 * inch - 2.5 * cm) < 2.5 * cm || distance(m1.posX, m1.posY, 18 * inch, 30 * inch + 2.5 * cm) < 2.5 * cm ? true : false;
        let checkCollision = teams
            .some(el => distance(m1.posX, m1.posY, el.posX, el.posY) <= (m1.baseRadius + el.baseRadius) && el.name !== m1.name);

            

            //<<-------=========== conditions to stop movement combined into one list of instructions.
        if (deltaTime >= 1 || checkCollision || checkgoalcollision || m1.shouldntBeHere > 1 || ( !m1.isPushed && !m1.isDodging && ( distance(m1.posX, m1.posY, endX, endY ) >= m1.remainingRun) && m1.shouldntBeHere === 1) ||  m1.remainingRun < 5  ||(m1.isCharging && m1.shouldntBeHere===1) ) {


        if (!checkCollision && !checkgoalcollision && deltaTime <= 1 ){
            m1.posX = x + ((endX - x) * deltaTime);
            m1.posY = y + ((endY - y) * deltaTime);
        } else if(checkCollision || checkgoalcollision || m1.shouldntBeHere > 1 || (m1.wasCharging && m1.shouldntBeHere === 1) ){
            wallCrushed = true;
            collisionBouncer(m1, teamz);
        }
            if (m1.isMoving && m1.isActivating || m1.isMoving && counter > 5) {
                if ((m1.remainingSprint < 26 && m1.infMin===0) || m1.remainingRun < 26) {
                    m1.moveAura = false;
                    //if(m1.runPaid && teaMate.remainingRun === teaMate.remainingSprint)m1.infMin++
                }
            } else if (m1.isPushed) {
                if (m1.remainingPush < 0.22 * inch) {
                    m1.isPushed = false;
                    if ( $('#app').find('.activeOptions').length<1 && wrath.willCounter && !teamz.some(el=>el.isDodging) ){distance(m1.posX,m1.posY,receiver.posX,receiver.posY)<=(wrath.meleeRadius+receiver.baseRadius)?waaar(otherGamer, Gamer,wrath, receiver,'counterattack'):'';wrath.willCounter=false;}
                }
                !m1.isActivating?snapBallButtonCreator('end'):console.log(m1.posX,m1.posY);
            } else if (m1.isDodging) {
                if (m1.remainingDodge < 0.22 * inch) {
                    m1.isDodging = false;
                    if(options.mode==="Back to the Shadows"){endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition)}
                    if ( $('#app').find('.activeOptions').length<1 && wrath && wrath.willCounter && !teamz.some(el=>el.isPushed) ){distance(m1.posX,m1.posY,receiver.posX,receiver.posY)<=(wrath.meleeRadius+receiver.baseRadius)?waaar(otherGamer, Gamer, wrath, receiver,'counterattack'):'';wrath.willCounter=false;}
                }
                !m1.isActivating?snapBallButtonCreator('end'):console.log(m1.posX,m1.posY);
            }
            if(  (ball.isOnGround && distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + ball.ballSize) ) ||
            m1.shouldntBeHere > 0 && Gamer1.tokens.every(el=>distance(m1.posX,m1.posY,el.posX,el.posY)<=m1.baseRadius+el.baseRadius) ||
            Gamer2.tokens.every(el=>distance(m1.posX,m1.posY,el.posX,el.posY)<=m1.baseRadius+el.baseRadius)){//<<--------== can't stand on a ball, wall, or obstacle
                m1.posX = notOnTokenX;
                m1.posY = notOnTokenY;
                continueMovement = false;
            }
            startTime = null;
            if (checkCollision || checkgoalcollision) {
                m1.posX = safeX;
                m1.posY = safeY;
                continueMovement = false;
            }
            if(  m1.wasCharging && (deltaTime >= 1 || m1.shouldntBeHere >= 1 || m1.inForest || m1.isOnGround) ){
                m1.isCharging = false;
                let engagementCheck = [];
                for (let qu = 0; qu<otherGamer.squaddies.length; qu++){
                    let el = otherGamer.squaddies[qu];
                    if(distance(m1.posX,m1.posY,el.posX,el.posY)<=el.baseRadius+m1.meleeRadius){
                        engagementCheck.push(el.name)
                    }
                }
                if(m1.isKnockedDown || m1.chargeTarget && distance(m1.posX,m1.posY,m1.chargeTarget.posX, m1.chargeTarget.posY) > m1.meleeRadius + m1.chargeTarget.baseRadius
                     && !continueMovement
                    //&& ( m1.shouldntBeHere >= 1 || distance(m1.posX, m1.posY, endX, endY)<=10) 
                    //<----==allows partin blows but doesnt end activation if failed charge
                    ){
                    endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz);//parting blows interactions screw thingz up
                    //mia
                }
            }

            m1.chargeTarget = false;
        } else {
            if(!isNaN(m1.posX)&&m1.posX>0){
                safeX = m1.posX; 
                safeY = m1.posY;

                if( Gamer1.tokens.every(el=>distance(m1.posX,m1.posY,el.posX,el.posY)>m1.baseRadius+el.baseRadius) &&
                    Gamer2.tokens.every(el=>distance(m1.posX,m1.posY,el.posX,el.posY)>m1.baseRadius+el.baseRadius) &&
                    (ball.isOnGround && distance(m1.posX, m1.posY, ball.x, ball.y) > (m1.baseRadius + ball.ballSize) &&
                    m1.shouldntBeHere < 1) || (!ball.isOnGround && m1.shouldntBeHere < 1) ){
                    notOnTokenX = m1.posX; notOnTokenY = m1.posY;
                };
            };
            m1.posX = x + ((endX - x) * deltaTime);
            m1.posY = y + ((endY - y) * deltaTime);
            if (m1.posX > 0){
                if( m1.isMoving && m1.isActivating) {
                    m1.remainingSprint -= distance(m1.posX, m1.posY, safeX, safeY);
                    m1.remainingRun -= distance(m1.posX, m1.posY, safeX, safeY);
                };
                if(m1.isDodging)m1.remainingDodge -= distance(m1.posX, m1.posY, safeX, safeY);
                if(m1.isPushed)m1.remainingPush -= distance(m1.posX, m1.posY, safeX, safeY);
                if(m1.hasBall && !ball.isOnGround){
                    ball.x = m1.posX;
                    ball.y = m1.posY;
                }
            }

        ///////////////////////////////////////////////__PARTING__BLOWS__///////////////////////////////////////////
        if (m1.posX > 0 && (m1.isMoving || m1.isCharging) ) {
            let currentlyEngaging = []
            for (cE = 0; cE < otherGamer.squaddies.length; cE++){ 
                cEm2 = otherGamer.squaddies[cE];
                if( distance(cEm2.posX, cEm2.posY, m1.posX, m1.posY) <= (m1.baseRadius + cEm2.meleeRadius)) currentlyEngaging.push(cEm2);
            }

            if (currentlyEngaging.length < startingEngagedBy.length) {
                let toDoAttacks = startingEngagedBy.filter(n=>{return currentlyEngaging.indexOf(n)>-1?false:n;});
                
                deltaTime = toDoAttacks.length > 0 ? 1.1 : deltaTime;

                 continueMovement = ()=>{anime(m1, teams, otherGamer,{ox:endX,oy:endY,mode:options.mode})}

                toDoAttacks.forEach( (el,i)=>{waaar(Gamer, otherGamer, el, m1,'parting blow',continueMovement),toDoAttacks.splice(i,1)} );

            }else if (currentlyEngaging.length >= startingEngagedBy.length){
                startingEngagedBy = currentlyEngaging;
            }
        }//is there anyone engaging? check
            !continueMovement?requestAnimationFrame(anim):false;
        }
    }
    anim()
}
