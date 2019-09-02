"use strict";
function healFunction(teaMate, Gamer, ammountHealed, momentumUsed, healingScore) {
    teaMate.heal += healingScore;
    teaMate.hpMin += ammountHealed;
    teaMate.hpMin = teaMate.hpMin > teaMate.hp ? teaMate.hp : teaMate.hpMin;
    Gamer.momentum -= momentumUsed;
}

function removeConditionsFuncion(teaMate, Gamer, momentumUsed, conditionsScore) {
    teaMate.removedConditions += conditionsScore;
    teaMate.isBleeding = false;
    if (teaMate.isKnockedDown) {
        teaMate.isKnockedDown = false;
        teaMate.def += 1;
        //teaMate.hasMoved
        teaMate.meleeZone = teaMate.AmeleeZone;
        teaMate.meleeRadius = teaMate.baseRadius + teaMate.meleeZone * inch
    }
    teaMate.isBurning = false;
    teaMate.isPoisoned = false;
    teaMate.isDiseased = false;
    if(teaMate.isSnared)
    {
        teaMate.isSnared = false;
        teaMate.remainingSprint +=2*inch;
        teaMate.remainingRun +=2*inch;
        teaMate.def+=1;
    }
    Gamer.momentum -= momentumUsed;
}

//__conditions____functions_____
function knockedDown(m2, ball) {
    if (!m2.isKnockedDown) {
        m2.isKnockedDown = true;
        if (m2.isKnockedDown) {
            m2.meleeRadius = 0;
            m2.def -= 1;
            if (m2.hasBall) {
                m2.hasBall = false;
                ball.isOnGround = true;
                scatterRandomiser(m2.posX, m2.posY, false, m2);
            }
            //m2.hasMoved = true;
        }
    }
};

function snare(m2) {
    if (!m2.isSnared) {
        m2.isSnared = true;
        m2.remainingRun -= 2 * inch;
        m2.remainingSprint -= 2 * inch;
        m2.def -= 1;
    }
}

function burn(m2) {
    if (!m2.isBurning) {
        m2.isBurning = true;
        m2.remainingRun -= 2 * inch;
        m2.remainingSprint -= 2 * inch;
    }
}

function diseaseSpread(m1, teamz) {
    //waiting for ratcatchers
}

function burning() { };

function poisoned(victim) { 
    victim.isPoisoned = true;
};

function snared() { };

function diseased() { };

function bleeding() { };
///////////////////////////////////////////////////////////////////////////////////////////////////////////


function playbookStitcher(m1,m2, i, wrap, mode) {
    //const playbookMAP = {damage,momentum,dodges,pushes,tackle};
    //----top--of--playbook-------------------------------------
    if (m1.playBook[i][0].length === 0) {
        wrap[0].push(`<li class='playBookNull activeOptions'></li>`)
    } else if (m1.playBook[i][0].length !== 0) {
        let dmg = m1.playBook[i][0][0]===0?0:m1.playBook[i][0][0] + (m2.isSnared && hasPassive(m1,"Isolated Target") ? 1 : 0);
        let mom = mode === 'attack' ? m1.playBook[i][0][1] : 0;
        let ddge = mode !== 'parting blow' ? m1.playBook[i][0][2] : 0;
        let psh = mode !== 'parting blow' ? m1.playBook[i][0][3] : 0;
        let tackle = m1.playBook[i][0][4];
        let KD = m1.playBook[i][0][5];
        let hasDamage = dmg === 0 ? '' : dmg + `<br>`;
        let hasDodges = ddge === 0 ? '' : ddge > 1 ? '<<' : '<';
        let hasPushes = psh === 3 ? '>>>' : psh === 2 ? '>>' : psh === 1 ? '>' : '';
        let isMomentus = mom === 0 ? 'white' : m1.theGuild.color;
        let isTackle = tackle === 0 ? '' : 'T<br>';
        let isKD = KD === 0 ? '' : 'KD<br>';
        let ability = (m1.playBook[i][0].length>7&&m1.playBook[i][0][6]>0)?'oo<br>':m1.playBook[i][0].length>7?'o<br>':'';
        let bookElement = `${ability}${isKD}${isTackle}${hasDamage}${hasPushes}${hasDodges}`;
        const shouldIbother = true//Boolean(dmg + mom + ddge + psh + tackle + KD > 0);
        let $plajbookEl = shouldIbother ? `<li class='plajBookTopCell ${wrap[2]} activeOptions' 
                        data-dmg=${dmg} data-mom=${mom} data-ddge=${ddge} data-psh=${psh} data-tackle=${tackle} data-kd=${KD} 
                        data-abil=${ability!==''?'0'+i:false}
                        style="background-color:${isMomentus}; animation:showDice ${i*.1}s forwards; color:${mom ? 'white' : 'black'}">${bookElement}</li>` :
            `<li class='playBookNull'></li>`;
        wrap[0].push($plajbookEl);
        // }//sitching plajbook FOR
    }
    //--------bottom--of--playbook-------------------------------------
    let dmg = m1.playBook[i][1][0]===0?0: m1.playBook[i][1][0] + (m2.isSnared && hasPassive(m1,"Isolated Target") ? 1 : 0);
    let mom = mode === 'attack' ? m1.playBook[i][1][1] : 0;
    let ddge = mode !== 'parting blow' ? m1.playBook[i][1][2] : 0;
    let psh = mode !== 'parting blow' ? m1.playBook[i][1][3] : 0;
    let tackle = m1.playBook[i][1][4];
    let KD = m1.playBook[i][1][5];
    let hasDamage = dmg === 0 ? '' : dmg + `<br>`;
    let hasDodges = ddge === 0 ? '' : ddge > 1 ? '<<' : '<';
    let hasPushes = psh === 3 ? '>>>' : psh === 2 ? '>>' : psh === 1 ? '>' : '';
    let isMomentus = mom === 0 ? 'white' : m1.theGuild.color;
    let isTackle = tackle === 0 ? '' : 'T<br>';
    let isKD = KD === 0 ? '' : 'KD<br>';
    let ability = (m1.playBook[i][1].length>7&&m1.playBook[i][1][6]>0)?'oo<br>':m1.playBook[i][1].length>7?'o<br>':'';
    let bookElement = `${ability}${isKD}${isTackle}${hasDamage}${hasPushes}${hasDodges}`;
    const shouldIbother = true//Boolean(dmg + mom + ddge + psh + tackle + KD > 0)
    let $plajbookEl = shouldIbother ? `<li class='plajBookCell ${wrap[3]} activeOptions' 
                                data-dmg=${dmg} data-mom=${mom} data-ddge=${ddge} data-psh=${psh} data-tackle=${tackle} data-kd=${KD} 
                                data-abil=${ability!==''?'1'+i:false}
                                style="background-color:${isMomentus}; animation:showDice ${i*.1}s forwards; color:${mom ? 'white' : 'black'}">${bookElement}</li>` : `<li class='playBookNull'></li>`;
    wrap[1].push($plajbookEl);
    $('#app').empty().append(appMaker(m1, Gamer));
}

function buttonStitching(wrap, m1, m2, ball, Gamer, mode, continueMovement) {
    //stitching playbook FOR---TOP
    for (let yIo = 2; yIo < 4; yIo++) {
        $(`.${wrap[yIo]}`).each(function () {
                let dmg = Number($(this).data('dmg'));
                let ddge = Number($(this).data('ddge'));
                let psh = Number($(this).data('psh'));
                let tackle = Number($(this).data('tackle'));
                let kd = Number($(this).data('kd'));
                let abil = $(this).data('abil')!==false?Number($(this).data('abil')):false;
                let momentum = Number($(this).data('mom'));
            $(this).on("click", function () {
                wrap[0] = [];
                wrap[1] = [];
                if ( !abil && typeof(abil) !== 'number' &&
                    ( (m2.isKnockedDown && dmg < 1 && ddge < 1 && psh < 1 && ((m2.hasBall && tackle < 1) || (!m2.hasBall && tackle > 0))) || (!m2.hasBall && dmg < 1 && ddge < 1 && psh < 1 && ((!m2.isKnockedDown && kd < 1) || (m2.isKnockedDown && kd > 0)) ) )
                    ){
                    let circumstances = tackle > 0 ? `tackle if there is no ball` : kd > 0 ? `knock down lying person` : `do this`;
                    sendMessage(`${m1.nameDisplayed} can't ${circumstances}, choose different result.`)
                } else {
                    if (mode === 'attack' || mode === 'counterattack' || m2.willCounter && Boolean(ddge > 0 || psh > 0 ||
                    m1.abilities.passiveOwned.some(el=>el.includes("Swift Strikes") ) && m1.isActivating) ) {
                        //<<---== this needs to be passed to anime function through m1.dodgeSquaddie and m2.pushSquaddie
                            wrath = m2; receiver = m1;
                            if(hasPassiveGiven(m1,"Blessing of the Moon Goddess"))
                            {
                                ddge +=2; 
                                m1.abilities.passiveGiven.forEach(
                                    (el,i)=>{ if(el==="Blessing of the Moon Goddess") m1.abilities.passiveGiven.splice(i,1) });
                            }
                        if (ddge > 0) {
                            m1.isDodging = true;
                            m1.dodgeSquaddie(ddge, teamz, m2);
                        };
                        if (psh > 0) {
                            m2.isPushed = true;
                            m2.pushSquaddie(psh, teamz, m2);
                        };
                        if (dmg > 0) {
                            if(ddge === 0 && m1.abilities.passiveOwned.some(el=>el.includes("Swift Strikes") ) && m1.isActivating) 
                            {
                                m1.isDodging = true; 
                                m1.dodgeSquaddie(2, teamz, m2);
                            }
                        else if (ddge > 0 && m1.abilities.passiveOwned.some(el=>el.includes("Swift Strikes") ) && m1.isActivating)
                            {
                                m1.remainingDodge+=2*inch;
                            };
                                lunarEclipse(m1,m2);
                        }
                    };
                    if (tackle > 0 && m2.hasBall && (!hasPassive(m2,"Close Control") || hasPassiveUsed(m2,"Close Control"))) {
                        if (!ball.isOnGround) {
                            m2.hasBall = false;
                            m1.hasBall = true;
                            ball.x = m1.posX;
                            ball.y = m1.posY
                        }
                    } else if (tackle > 0 && m2.hasBall && hasPassiveUnused(m2,"Close Control")){
                        m2.abilities.passiveOwned.forEach(el => {if(el.includes("Close Control")){el[1]++}})
                    }
                    if (kd === 1 && !m2.isKnockedDown) {
                        knockedDown(m2, ball);
                        m2.willCounter = false;
                    };
                    if (mode === 'parting blow') {
                        continueMovement()
                    }
                    if(abil!==false && typeof(m1.playBook[abil>9?abil-10:abil][abil>9?1:0][7])==="function")
                    {
                        m1.playBook[abil>9?abil-10:abil][abil>9?1:0][7](m1,m2);
                    } else if (abil!==false && typeof(m1.playBook[abil>9?abil-10:abil][abil>9?1:0][6])==="function")
                    {
                        m1.playBook[abil>9?abil-10:abil][abil>9?1:0][6](m1,m2);
                    }
                    if(dmg>0)
                    {
                        if(m1.abilities.activeOwned.some(el=>el.includes("Back to the Shadows") ))
                            m1.abilities.activeOwned.filter(el=>el.includes("Back to the Shadows")).forEach(el=>el[1]++);
                        
                        if(m1.abilities.passiveOwned.some(el=>el.includes("Venomous Strike") ) && m1.isActivating &&
                            otherGamer.squaddies.some(el=>el.name===m2.name))
                            {poisoned(m2)};
                    }
                    //knocked down guys can still counter and countering any pushes or dodges makes the attack expire immediately
                    m2.hasMoved = mode === 'parting blow' && Number($(this).data('kd')) > 0 ? true : m2.hasMoved;
                    Gamer.momentum += momentum;
                    m2.hpMin -= dmg; Number($(this).data('dmg'));
                    m1.wasCharging = false;
                    m1.bonusTime = false;
                    $(this).parent().parent().empty().off();
                    $('#app').find('#actionButtons').empty().append(actionButtons(m1, Gamer, Gamer.guild.color));
                    if (m2.willCounter && ddge < 1 && psh < 1 &&  $('#app').find('.activeOptions').length < 1 && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m2.meleeRadius + m1.baseRadius) && !m1.abilities.passiveOwned.some(el=>el.includes("Swift Strikes") ) && m1.isActivating) {
                        waaar(otherGamer, Gamer, m2, m1, 'counterattack');
                        m2.willCounter = false;
                    }
                    m1.hoverButtonAura = 0;
                    m2.hoverButtonAura = 0;
                    if(m2.hpMin<1){plajBookWraz();}
                }
    if(momentum>0)$(".momentumShow").text(`${Gamer.momentum}`).addClass("momentumGrow");

            });
    $(this).on('mouseenter', function() {
        m1.hoverButtonAura = ddge*inch + m1.baseRadius;
        m2.hoverButtonAura = psh*inch + m2.baseRadius;
    });
    $(this).on('mouseleave', function() {
        m1.hoverButtonAura = 0;
        m2.hoverButtonAura = 0;
    });
        }); //if paybook has length
    }//for yIo
} //buttons loop


function waaar(Gamer, otherGamer, m1, victim, mode = 'attack', continueMovement) {console.log("Fahad Charge")
    m1.moveAura = false;
    let m2 = victim;
    mouseDrawTemplate = false;
    m2.drawAbilityAura = 0;
    m1.drawAbilityAura = 0;
    m1.drawAbilityTargetAura = 0;
    m2.drawAbilityTargetAura = 0;
    //--02-S---selected squaddie makes an attack                                                  && 
    if ($('#app').find('.activeOptions').length < 1 && !m2.isPushed && !m2.isDodging &&
        //BUG: I can postpone counterattack while i.e. dodging from attack and not finshing dodge but attacking again.
        mode === 'parting blow' || Boolean(mode === 'counterattack' && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius)) ||
        (m1.infMin > 0 || (m1.wasCharging && hasPassive(m1,"Furious")) ) && m1.isActivating && !m1.isKnockedDown && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius) && !m2.willCounter) {

        if (m1.isDodging || m1.isPushed || m2.isDodging || m2.isPushed) {
            m1.isPushed = false;
            m2.isPushed = false;
            m1.isDodging = false;
            m2.isDodging = false;
        }
        if (m1.isMoving || mode === 'charge') {
            m1.isMoving = false;
            m1.hasMoved = true;
            m1.moveAura = false;
        };
        movementHistory = [];
        if (mode === 'attack' || mode === 'charge') {
            plajBookWraz();//clears playbook container template
            m1.hasAttacked = true;
            m1.infMin -= m1.wasCharging && hasPassive(m1,"Furious")? 0 : m1.wasCharging? 2 : 1;
            $playBookCircle = [];
            $playBookTop = [];
        }//if mode=attack
        let neededToHit = m2.def + m2.defensiveStance - ( m2.abilities.activeGiven.some(el=>el==="Gut and String")?1:0 ) +
                        (hasPassiveGiven(m2,"Nimble")?1:0);
            neededToHit = neededToHit < 2 ? 2 : neededToHit;
        let theRoll = diceRoller(Gamer, otherGamer, m1, m2, mode); //diceRoll(actualTac)
        let successRolls = theRoll.filter(el => el >= neededToHit);
        let armourCount = m2.arm > 0 && m1.abilities.passiveOwned && m1.abilities.passiveOwned.some(el=>el.includes("Anatomical Precision")) ? m2.arm - 1 : m2.arm ;
        let successPlaybookLength = successRolls.length - armourCount;//////////  HERE ANATOMICAL PRECISION
        diceRolledForDisplay = [];
        diceRolled(theRoll, neededToHit, Gamer.guild.color, m2.arm);
        m2.defensiveStance = 0;
        message = `now you can see how succesful ${m1.nameDisplayed} attack was, and you can choose direct consequences. Press escape to cancel pushes or doges if waiting for counterattack.`;

        //the--actual--playbook--with--no--sucesfull--rolls--------------------------------
        if (successPlaybookLength < 1) {//the--actual--playbook--with--no--sucesfull--rolls--------------------------------

            playBookWrap.noWrap[0].push(`<li class='busted'>missed!</li>`);
            $('#app').empty();
            $('#app').append(appMaker(m1, Gamer));
            $('.busted').on('click', () => {
                playBookWrap.noWrap[0] = [];
                $('.busted').off();
                $('#app').empty();
                $('#app').append(appMaker(m1, Gamer));

                if (m2.willCounter && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m1.baseRadius + m2.meleeRadius && $('#app').find('.activeOptions').length < 1) {

                    waaar(otherGamer, Gamer, m2, m1, 'counterattack');
                    m2.willCounter = false;
                }
            })

        } else {//the--actual--playbook--with--sucesfull--rolls--------------------------------
            //the--actual--playbook--with--sucesfull--rolls--------------------------------
            let wraps = Math.floor(successPlaybookLength / m1.playBook.length);
            let wrapsRest = successPlaybookLength % m1.playBook.length;


            for (let pkb = 0; pkb < wrapsRest; pkb++) {
                playbookStitcher(m1,m2, pkb, playBookWrap.noWrap, mode);
            }
            for (let i = 0; i < m1.playBook.length; i++) {
                if (wraps >= 1) {
                    playbookStitcher(m1,m2, i, playBookWrap.firstWrap, mode);
                }
                if (wraps >= 2) {
                    playbookStitcher(m1,m2, i, playBookWrap.secondWrap, mode);
                }
                if (wraps >= 3) {
                    playbookStitcher(m1,m2, i, playBookWrap.thirdWrap, mode);
                }
                if (wraps >= 4) {
                    playbookStitcher(m1,m2, i, playBookWrap.fourthWrap, mode);
                }
                if (wraps >= 5) {
                    playbookStitcher(m1,m2, i, playBookWrap.fifthWrap, mode);
                }
                if (wraps >= 6) {
                    playbookStitcher(m1,m2, i, playBookWrap.sixthWrap, mode);
                }
                if (wraps >= 7) {
                    playbookStitcher(m1,m2, i, playBookWrap.seventhWrap, mode);
                }
            }
            buttonStitching(playBookWrap.noWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.firstWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.secondWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.thirdWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.fourthWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.fifthWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.sixthWrap, m1, m2, ball, Gamer, mode, continueMovement);
            buttonStitching(playBookWrap.seventhWrap, m1, m2, ball, Gamer, mode, continueMovement);
        } //end of ELSE
        // break;


    } else if //no influence to attack
        (m1.infMin === 0 && m1.isActivating && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius) &&
        distance(mouX, mouY, m2.posX, m2.posY) < m2.baseRadius
    ) {
        message = `${m1.nameDisplayed} has no influence to attack ${m2.nameDisplayed}.`
        $('#app').empty();
        $('#app').append(appMaker(m1, Gamer));
    }
    // } //IF for WAAR//Other squaddies loop

} //waaar


function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
} //drawCircle()

function calctrig(x1,y1,d1,x2,y2,d2) {
    if(d1 < 0 || d2 < 0) return;
    let a = d2;
    let b = d1;
    let c = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    let A = Math.acos((b*b+c*c-a*a)/(2*b*c));
    let theta = Math.atan2(y2-y1,x2-x1);
    let phi1 = theta+A;
    let phi2 = theta-A;
    let x3 = d1 * Math.cos(phi1) + x1;
    let y3 = d1 * Math.sin(phi1) + y1;

    let x4 = d1 * Math.cos(phi2) + x1;
    let y4 = d1 * Math.sin(phi2) + y1; 
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.moveTo(x1,y1);
    ctx.lineTo(x3,y3);
    ctx.moveTo(x1,y1);
    ctx.lineTo(x4,y4);
    ctx.stroke();
    ctx.closePath();
}

function drawChargeCone(m1,m2){
    drawCircle(m2.posX,m2.posY,m1.meleeRadius+m2.baseRadius+m1.baseRadius-5,'rgba(69, 244, 142, 0.1)');
    aurora(m2.posX,m2.posY,m1.meleeRadius+m2.baseRadius,m2.posX,m2.posY,m1.meleeRadius+m2.baseRadius+m1.baseRadius-5,chargeColor,yellowColor);
    calctrig(m1.posX,m1.posY,m1.remainingRun+m1.meleeRadius-m1.baseRadius,m2.posX,m2.posY,m2.baseRadius*2+m1.meleeRadius-2+m1.baseRadius);
}

function distance(x1, y1, x2, y2) { //get distance between objects
    let xDistance = x1 - x2;
    let yDistance = y1 - y2;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
} //distance



function saveGameState(){
    //empty dead function
}


///--------mouse drawn

function drawCross(x, y, s, color) {
    //crossess------------------
    sctx.beginPath();
    sctx.strokeStyle = color;
    sctx.fillStyle = color;
    sctx.moveTo(x, y);
    sctx.lineTo(x, y + s);
    sctx.lineTo(x + s, y + s);
    sctx.lineTo(x + s, y);
    sctx.lineTo(x + 2 * s, y);
    sctx.lineTo(x + 2 * s, y - s);
    sctx.lineTo(x + s, y - s);
    sctx.lineTo(x + s, y - 2 * s);
    sctx.lineTo(x, y - 2 * s);
    sctx.lineTo(x, y - s);
    sctx.lineTo(x - s, y - s);
    sctx.lineTo(x - s, y);
    sctx.closePath();
    sctx.lineWidth = 1;
    sctx.stroke();
    sctx.fill();
}

function heals(color) {
    //healingSign------------------------
    drawCross(34, 49, 4, color);
    drawCross(40, 31, 3, color);
    drawCross(30, 35, 2, color);
    drawCross(48, 40, 2.5, color);
}

function drawSword() {
    //sword---------------------------
    sctx.beginPath();
    sctx.strokeStyle = 'rgb(185, 190, 178)';
    sctx.arc(49, 31, 2, 0, Math.PI * 2); //sword hilt
    sctx.moveTo(30, 50); //sword-middle
    sctx.lineTo(50, 30);
    sctx.moveTo(38, 32);
    sctx.lineTo(47, 42); //sword cross
    sctx.moveTo(43, 36); //blaed start on cross
    sctx.lineTo(28, 48);
    sctx.lineTo(25, 54); //blade tip
    sctx.lineTo(32, 52);
    sctx.lineTo(44, 38); //blade end on cross
    sctx.closePath();
    sctx.fillStyle = 'grey'
    sctx.lineWidth = 1;
    sctx.fill();
    sctx.stroke();
}


function legalPlacementDetector(m1) {

    //color needs to be an array of these parameters and if any has a property, i means it is actvating duye to terrains:
    let x = mouX; let y = mouY;
    const shortDist = 0.73;
    const u = 1;
    const b = m1.baseRadius + 3;
    const closeNodes = [
        [x - b, y, u, u],//12
        [x - shortDist * b, y - shortDist * b, u, u],//1:30
        [x - u, y - b, u, u],//3
        [x - u + shortDist * b, y - shortDist * b, u, u],//4:20
        [x - u + b, y - u, u, u],//6
        [x - u + shortDist * b, y - u + shortDist * b, u, u],//8:30
        [x - u, y - u + b, u, u],//9
        [x - shortDist * b, y - u + shortDist * b, u, u], //10:30
    ];
    let colorClose = [];
    let typesofTerrain = [];//types of nearby terrains

    for (let ui = 0; ui < closeNodes.length; ui++) {//builds arrays of color nodes
        colorClose.push(konvas.getImageData(...closeNodes[ui]).data[3]);
    }

    for (let wT = 0; wT < filtered_td.length; wT++) {//builds and array of nearby terrain pieces
        if (distance(mouX, mouY, filtered_td[wT][1][0], filtered_td[wT][1][1]) < 6 * inch) {
            typesofTerrain.push(filtered_td[wT][0].kind);
        }
    }//the below always returns false!!
    //------------------------------------------------------
    console.log("colors",Boolean(!colorClose.includes(255) || 
    (
        colorClose.includes(255) && !typesofTerrain.includes("wall") && !typesofTerrain.includes("obstacle")
    )),"ball",Boolean(!ball.isOnGround || distance(mouX, mouY, ball.x, ball.y) > ball.ballSize + m1.baseRadius),"squaddies",teamz.filter(el => el.name !== m1.name && distance(el.posX, el.posY, mouX, mouY) <= el.baseRadius + m1.baseRadius).lenth,"goalposts",Boolean(distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) > m1.baseRadius + 2.5 * cm && 
    distance(mouX, mouY, otherGamer.gp.x, otherGamer.gp.y) > m1.baseRadius + 2.5 * cm))
    //----------------------------------------------------------
    if (
        (!colorClose.includes(255) || 
            (
                colorClose.includes(255) && !typesofTerrain.includes("wall") && !typesofTerrain.includes("obstacle")
            )
        ) 
        && 
        (
            !ball.isOnGround || distance(mouX, mouY, ball.x, ball.y) > ball.ballSize + m1.baseRadius
        ) 
        && 
        teamz.filter(el => el.name !== m1.name && distance(el.posX, el.posY, mouX, mouY) <= el.baseRadius + m1.baseRadius).length<1 &&
        distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) > m1.baseRadius + 2.5 * cm && 
        distance(mouX, mouY, otherGamer.gp.x, otherGamer.gp.y) > m1.baseRadius + 2.5 * cm) 
        {
            return true
        } else { return false }
}


function mouse(Gamer = dummy, otherGamer = dummy, ball) {
    //if (teamz.filter(el => el.moveAura || el.isDodging || el.isPushed).length > 0 || ball.isInHand) {} else {
    drawTemplateOnMouse();
    sctx.globalAplha = 1;
    sctx.strokeStyle = 'white';
    sctx.fillStyle = Gamer.guild.color;
    sctx.save();
    //pointy--element---------
    sctx.beginPath();
    sctx.translate(mouX + (offsetX ? offsetX : 0), mouY + (offsetY ? offsetY : 0));
    sctx.moveTo(22, 42);
    sctx.lineTo(0, 0);
    sctx.lineTo(20, 10);
    sctx.bezierCurveTo(30, 20, 20, 30, 23, 45);
    sctx.moveTo(58, 40);
    sctx.lineWidth = 1;
    sctx.stroke();
    sctx.fill();
    sctx.stroke();
    //place for function
    sctx.beginPath();
    sctx.arc(32, 22, 5, 0, Math.PI * 2);
    sctx.fill();
    sctx.lineWidth = 1;
    sctx.stroke();
    sctx.closePath();
    //place for function
    if (counter > -1) otherGamer.squaddies.forEach(el => {
        let m1 = Gamer.squaddies.filter(el => el.isActivating)[0];//if(m1 && mouX > 0)legalPlacementDetector(m1);
        if (distance(el.posX, el.posY, mouX, mouY) <= el.baseRadius) {
            drawSword();
            let m2 = el;
            if (showLeaflet && counter > -1) {
                let bonusDice = 0;
                let neededToHit = m2.def + m2.defensiveStance - ( m2.abilities.activeGiven.some(el=>el==="Gut and String")?1:0 );
                if (neededToHit < 2) {
                    bonusDice = 2-neededToHit
                    neededToHit = 0;
                } else if (neededToHit > 6){
                    bonusDice = 6 - neededToHit 
                    neededToHit = 6;
                }
                let diceCount = m1 ? bonusDice +
                    m1.tac + (m2.inCover ? -1 : 0) + (m1.wasCharging ? 4 : 0) + (m1.bonusTime ? 1 : 0) + Gamer.squaddies.filter(el => el.name !== m1.name).filter(el => distance(el.posX, el.posY, m2.posX, m2.posY) <= (el.meleeRadius + m2.baseRadius)).length - otherGamer.squaddies.filter(el => el.name !== m2.name).filter(el => distance(m1.posX, m1.posY, el.posX, el.posY) <= (el.meleeRadius + m1.baseRadius)).length : ``;
                if (m1 && m2
                    && distance(m1.posX, m1.posY, m2.posX, m2.posY) > 4 * inch
                ) {
                    ctx.save();
                    ctx.translate(m1.posX, m1.posY);
                    ctx.rotate(angle(m1.posX, m1.posY, m2.posX, m2.posY));
                    ctx.font = "900 24px IM Fell English ";
                    ctx.fillStyle = "rgba(255,255,255,.4)";
                    ctx.strokeStyle = "rgba(80,80,80,.4)";
                    ctx.textAlign = "center";
                    ctx.lineWidth = 15
                    let howFar = (distance(m1.posX, m1.posY, m2.posX, m2.posY) - m1.baseRadius - m2.baseRadius) / inch;
                    ctx.strokeText(`<-- ` + parseFloat(howFar).toFixed(1) + `" -->`, howFar / 2 * inch, 0);
                    ctx.fillText(`<-- ` + parseFloat(howFar).toFixed(1) + `" -->`, howFar / 2 * inch, 0);
                    ctx.closePath(); ctx.restore();
                }
                sctx.beginPath();
                sctx.lineWidth = 15;
                sctx.font = "900 42px IM Fell English ";
                sctx.fillStyle = m1 && diceCount > m1.tac ? "blue" : m1 && diceCount === m1.tac ? "green" : "red";
                sctx.strokeStyle = purpleColor;
                sctx.textAlign = "center";
                sctx.strokeText(diceCount, 0, 24 - 52);
                sctx.fillText(diceCount, 0, 24 - 52);
            }
        }
        if (counter > -1 && m1 && distance(otherGamer.gp.x, otherGamer.gp.y, mouX, mouY) <= 2.5 * cm) {
            ctx.save();
            ctx.translate(m1.posX, m1.posY);
            ctx.rotate(angle(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y));
            ctx.font = "900 24px IM Fell English ";
            ctx.fillStyle = "rgba(255,255,255,.4)";
            ctx.strokeStyle = "rgba(80,80,80,.4)";
            ctx.textAlign = "center";
            ctx.lineWidth = 15
            let howFar = (distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) - m1.baseRadius - 2.5 * cm) / inch;
            ctx.strokeText(`<-- ` + parseFloat(howFar).toFixed(2) + `" -->`, howFar / 2 * inch, 0);
            ctx.fillText(`<-- ` + parseFloat(howFar).toFixed(2) + `" -->`, howFar / 2 * inch, 0);
            ctx.closePath(); ctx.restore();

        }
    })

    if (counter > -1 && showLeaflet && mouX > 0 && konvas.getImageData(mouX, mouY, 1, 1).data[3] > 0) {//shows terrains description
        for (let wT = 0; wT < filtered_td.length; wT++) {//builds and array of nearby terrain pieces
            if (distance(mouX, mouY, filtered_td[wT][1][0], filtered_td[wT][1][1]) < 6 * inch) {
                sctx.beginPath(); //hp displayed
                sctx.lineWidth = 15;
                sctx.globalAlpha = 0.42;
                sctx.font = "900 21px IM Fell English ";
                sctx.fillStyle = "rgb(133, 176, 233)";
                sctx.strokeStyle = 'rgba(79, 82, 78, 0.753)';
                sctx.textAlign = "center";
                for (let txt = 0; txt < filtered_td[wT][0].description.length; txt++) {
                    sctx.strokeText(filtered_td[wT][0].description[txt], 0, txt * 24 - 52);
                }
                for (let txt = 0; txt < filtered_td[wT][0].description.length; txt++) {
                    sctx.fillText(filtered_td[wT][0].description[txt], 0, txt * 24 - 52);
                }
                sctx.closePath();
            }
        }
    }
    if(counter > -1 && showLeaflet && mouX > 0){
        Gamer.tokens.forEach((el,i)=>{
            if(distance(mouX,mouY,el.posX,el.posY)<=el.baseRadius&&!el.isInHand){
                sctx.beginPath();
                sctx.lineWidth = 15;
                sctx.globalAlpha = 1;
                sctx.font = "900 21px IM Fell English ";
                sctx.fillStyle = Gamer.guild.color;
                sctx.strokeStyle = 'rgba(79, 82, 78, 0.753)';
                sctx.textAlign = "center";
                sctx.globalAlpha=.3;
                sctx.strokeText(el.type,0, 24 - 52);
                sctx.lineWidth = 5;
                sctx.globalAlpha=.5;
                sctx.strokeStyle = 'rgba(99, 122, 108, 0.753)';
                sctx.strokeText(el.type,0, 24 - 52);
                sctx.globalAlpha=.9;
                sctx.fillText(el.type,0, 24 - 52);
                sctx.closePath();
            }
        });
        otherGamer.tokens.forEach((el,i)=>{
            if(distance(mouX,mouY,el.posX,el.posY)<=el.baseRadius&&!el.isInHand){
                sctx.beginPath();
                sctx.lineWidth = 15;
                sctx.globalAlpha = 1;
                sctx.font = "900 21px IM Fell English ";
                sctx.fillStyle = otherGamer.guild.color;
                sctx.strokeStyle = 'rgba(79, 82, 78, 0.753)';
                sctx.textAlign = "center";
                sctx.globalAlpha=.3;
                sctx.strokeText(el.type,0, 24 - 52);
                sctx.lineWidth = 5;
                sctx.globalAlpha=.5;
                sctx.strokeStyle = 'rgba(99, 122, 108, 0.753)';
                sctx.strokeText(el.type,0, 24 - 52);
                sctx.globalAlpha=.9;
                sctx.fillText(el.type,0, 24 - 52);
                sctx.closePath();
            }
        });
    }
    if(mouX>36*inch+2 && mouX<36.25*inch+2&&Gamer.time){//display time left       
        let timeLeft = Math.floor(Gamer.time/60)+':'+Gamer.time%60;
        sctx.beginPath();
        sctx.lineWidth = 15;
        sctx.globalAlpha = 1;
        sctx.font = "900 21px IM Fell English ";
        sctx.fillStyle = "rgb(133, 176, 233)";
        sctx.strokeStyle = 'rgba(79, 82, 78, 0.753)';
        sctx.textAlign = "center";
        sctx.strokeText(timeLeft,0, mouY < 16*inch? 1*inch + 16 : -1*inch-16    );
        sctx.fillText(timeLeft,0,   mouY < 16*inch? 1*inch + 16 : -1*inch-16    );
        sctx.closePath();
        
    }
    if (healCursor === 2 &&
        Gamer.squaddies.filter(m2 => Gamer.momentum > (!m2.isDiseased ? 1 : 2)).filter(m2 => distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius).filter(m2 => m2.removedConditions < 1).filter(m2 => m2.heal < 2).filter(m2 => hasConditions(m2)).length > 0
    ) {
        heals('blue')
    } else if (healCursor === 1 &&
        Gamer.squaddies.filter(m2 => Gamer.momentum > (!m2.isDiseased ? 1 : 2)).filter(m2 => distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius).filter(m2 => m2.hpMin < m2.hp).filter(m2 => m2.heal < 1).filter(m2 => m2.removedConditions < 2).length > 0
    ) {
        heals('red')
    }
    sctx.restore();
    sctx.lineWidth = 1;
    sctx.stroke();
    sctx.closePath();
    //}
}


function modelInfo(m1) {
    sctx.save();
    sctx.globalAlpha = 0.7;
    sctx.lineWidth = 1;
    sctx.translate(mouX < 100 ? mouX : mouX > canvas.width - 120 ? mouX - 225 : mouX - 113, (mouY < canvas.height / 2) ? mouY + 60 : mouY - 350);
    sctx.beginPath();
    sctx.drawImage(leafletBackground, 0, 0, 250, 300);
    sctx.font = "800 25px IM Fell English";
    sctx.textAlign = "center";
    sctx.fillStyle = 'black';
    sctx.fillText(m1.nameDisplayed, 125, 35);
    sctx.font = "800 12px IM Fell English";
    const terrainAffecting = m1.inCover && m1.inRoughGround ? "in forest" : m1.inCover ? "in cover" : m1.inFastGround ? "on fast ground" : m1.inRoughGround ? "on rough terrain" : ``;
    sctx.fillText(terrainAffecting, 125, 170);
    const aG = [], aO = [], pG = [], pO = [];
        m1.abilities.activeGiven.forEach(el=>aG.push(typeof(el)==="string" ?el : el[0]));
        m1.abilities.activeOwned.forEach(el=>aO.push(el[0]));
        m1.abilities.passiveGiven.forEach(el=>pG.push(typeof(el)==="string" ?el : el[0]));
        m1.abilities.passiveOwned.forEach(el=>pO.push(el[0]));
    let abilities = [...aG,...aO,...pG,...pO];
    for(let hblts = 0; hblts < abilities.length; hblts++){
        let lowerLevel = hblts*20;
        sctx.fillStyle = hblts<aG.length?'red':hblts<aG.length+aO.length?'blue':hblts<aG.length+aO.length+pG.length?'purple':'green';
        sctx.fillText(JSON.stringify(abilities[hblts]), 125, 190+lowerLevel);
    }

    for (let i = 0; i < 6; i++) { //draw stats
        sctx.save();
        let attributes = ['MOV', 'TAC', 'KICK', 'DEF', 'ARM', 'INF'];
        let attributesValues = [
            [m1.sprint, m1.run], m1.tac, [m1.kick, m1.kickDist], 
            m1.def, m1.arm, [m1.infMin, m1.infMax]
        ];
        sctx.beginPath();
        sctx.globalAlpha = 0.2;
        sctx.fillStyle = m1.theGuild.color;
        sctx.fillRect(40 * i + 6, 64, 38, 30);
        sctx.stroke();
        sctx.fill();
        sctx.restore();
        sctx.fillStyle = 'black';
        sctx.fillText(attributes[i], 40 * i + 26, 76);
        sctx.fillText(attributesValues[i], 40 * i + 26, 90);
        sctx.stroke();
        sctx.fill();
    }
    sctx.beginPath(); //draw playbooks
    sctx.strokeStyle = m1.theGuild.color;
    sctx.moveTo(10, 80);
    sctx.lineTo(240, 80);
    sctx.globalAplha = 1;
    for (let i = 0; i < m1.playBook.length; i++) {
        let x = 27 * (i + 1);
        let l = x - 5;
        let r = x + 5;
        let y = 117;
        let v = 125;
        let z = 127;
        if (m1.playBook[i][0].length === 0) { //do nothing
        } else {
            let dmg = m1.playBook[i][0][0];
            let mom = m1.playBook[i][0][1];
            let ddge = m1.playBook[i][0][2];
            let psh = m1.playBook[i][0][3];
            let tackle = m1.playBook[i][0][4];
            let KD = m1.playBook[i][0][5];
            sctx.beginPath();
            if (mom === 1) {
                sctx.fillStyle = m1.theGuild.color;
                sctx.strokeStyle = 'white'
            } else {
                sctx.fillStyle = 'white';
                sctx.strokeStyle = 'black'
            };
            sctx.arc(x, y, 13, 0, Math.PI * 2);
            sctx.fill();
            sctx.stroke();
            sctx.lineWidth = 1;
            sctx.font = "800 12px Arial";
            sctx.textAlign = "center";
            if (mom === 1) {
                sctx.fillStyle = 'white';
                sctx.strokeStyle = 'white'
            } else {
                sctx.fillStyle = 'black';
                sctx.strokeStyle = 'black'
            };
            if (dmg !== 0) {
                sctx.fillText(dmg, x, ddge > 0 || psh > 0 || KD > 0 || tackle > 0 ? y : v);
                sctx.closePath();
            }
            if (ddge > 2) {
                sctx.fillText('<<<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
                sctx.closePath();
            } else if (ddge === 2) {
                sctx.fillText('<<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
                sctx.closePath();
            } else if (ddge === 1) {
                sctx.fillText('<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
                sctx.closePath();
            };
            if (psh > 2) {
                sctx.fillText('>>>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);

                sctx.closePath();
            } else if (psh === 2) {
                sctx.fillText('>>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
                sctx.closePath();
            } else if (psh === 1) {
                sctx.fillText('>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
                sctx.closePath();
            };
            if (tackle === 1) {
                sctx.fillText('T', x, dmg > 0 || ddge > 0 || psh > 0 ? y : KD > 0 ? y : v);
                sctx.closePath();
            };
            if (KD === 1) {
                sctx.fillText('KD', x, dmg > 0 || ddge > 0 ? y : tackle > 0 ? y : v);
                sctx.closePath();
            };
            sctx.stroke();
        }
        //--------bottom--of--playbook-------------------------------------
        y += 28;
        v += 28;
        z += 28;
        let dmg = m1.playBook[i][1][0];
        let mom = m1.playBook[i][1][1];
        let ddge = m1.playBook[i][1][2];
        let psh = m1.playBook[i][1][3];
        let tackle = m1.playBook[i][1][4];
        let KD = m1.playBook[i][1][5];
        sctx.beginPath();
        if (mom === 1) {
            sctx.fillStyle = m1.theGuild.color;
            sctx.strokeStyle = 'white'
        } else {
            sctx.fillStyle = 'white';
            sctx.strokeStyle = 'black'
        };
        sctx.arc(x, y, 12, 0, Math.PI * 2);
        sctx.fill();
        sctx.stroke();
        sctx.lineWidth = 1;
        sctx.font = "900 12px Arial";
        sctx.textAlign = "center";
        if (mom === 1) {
            sctx.fillStyle = 'white';
            sctx.strokeStyle = 'white'
        } else {
            sctx.fillStyle = 'black';
            sctx.strokeStyle = 'black'
        };
        if (dmg !== 0) {
            sctx.fillText(dmg, x, ddge > 0 || psh > 0 || KD > 0 || tackle > 0 ? y : v);
            sctx.closePath();
        }
        if (ddge > 2) {
            sctx.fillText('<<<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
            sctx.closePath();
        } else if (ddge === 2) {
            sctx.fillText('<<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
            sctx.closePath();
        } else if (ddge === 1) {
            sctx.fillText('<', psh > 0 ? l : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
            sctx.closePath();
        };
        if (psh > 2) {
            sctx.fillText('>>>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);

            sctx.closePath();
        } else if (psh === 2) {
            sctx.fillText('>>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
            sctx.closePath();
        } else if (psh === 1) {
            sctx.fillText('>', ddge > 0 ? r : x, dmg > 0 || KD > 0 || tackle > 0 ? v : v);
            sctx.closePath();
        };
        if (tackle === 1) {
            sctx.fillText('T', x, dmg > 0 || ddge > 0 || KD > 0 || psh > 0 ? v : y);
            sctx.closePath();
        };
        if (KD === 1) {
            sctx.fillText('KD', x, dmg > 0 || ddge > 0 || KD > 0 || tackle > 0 ? y : v);
            sctx.closePath();
        };
        sctx.stroke();
    }
    let conditionesForDisplay = [m1.isDiseased, m1.isBleeding, m1.isBurning, m1.isKnockedDown, m1.isPoisoned, m1.isSnared]
    let conditionIcons = [, bleedingIco, burningIco, knockedDownIco, poisonIco, snaredIco]
    for (let i = 0; i < conditionesForDisplay.length; i++) {
        sctx.save();
        sctx.beginPath();
        if (conditionesForDisplay[i] === true)
            if (i !== 0) {
                sctx.drawImage(conditionIcons[i], (i + 1) * 23, 40, 20, 20);
            } else {
                sctx.fillStyle = 'rgb(108, 255, 50)';
                sctx.fillRect((i + 1) * 23, 40, 20, 20);
            }
        sctx.restore();
    }
    sctx.stroke();
    sctx.beginPath(); //hp displayed
    sctx.lineWidth = 12;
    sctx.font = "900 30px IM Fell English ";
    sctx.fillStyle = m1.hpMin === m1.hp ? "rgb(133, 176, 233)" : m1.hpMin > m1.icySponge ? "rgb(247, 201, 0)" : "rgb(218, 33, 0)";
    sctx.strokeStyle = 'rgba(79, 82, 78, 0.753)';
    sctx.textAlign = "center";
    sctx.strokeText(m1.hpMin===m1.hp?m1.hpMin:m1.hpMin+` / `+m1.hp, 205, 40);
    sctx.fillText(m1.hpMin===m1.hp?m1.hpMin:m1.hpMin+` / `+m1.hp, 205, 40);
    sctx.closePath();
    sctx.restore();
}

function escapist(m1, otherGamer, m2 = m1) {
            idear = 0;//used to identify abilities and smoothly jump between them
            rulerDopplers = [];
            ruler = false;mouseDrawTemplate = false;
            $('body').find('.snapBallButton').remove();
            $('body').find('.counterbox').off().remove();
            $(".infoAbilBox").remove();
            teamz.forEach(el => {
                if (el.canSnap) {
                    el.canSnap = false;
                    $('body').find('.snapBallButton').remove();
                }
                el.remainingDodge = 0;
                el.remainingPush = 0;
                el.isDodging = false;
                el.isPushed = false;
                el.drawAbilityAura=0;
                el.pressedAbutton = idear==="powerOfVooDoo" ? false : el.pressedAbutton;
                if(hasActiveGiven(el,"The Power of Voodoo")){console.log("bob")
                    el.isMoving = false;
                    el.hasMoved = savedBeforVoodoo[0];
                    el.moveAura = false;
                    el.remainingRun =    savedBeforVoodoo[0]?0:savedBeforVoodoo[1]//el.run*inch+el.baseRadius-movementHindrances(el);
                    el.remainingSprint = savedBeforVoodoo[2]//el.sprint*inch+el.baseRadius-movementHindrances(el);
                    el.abilities.activeGiven.forEach((em,i)=>{if(em.includes("The Power of Voodoo"))el.abilities.activeGiven.splice(i,1)  } ) 
                    $('#players').off("click.abilitiesMove");
                    savedBeforVoodoo = [];
                }
            });
            m1.drawAbilityTargetAura = 0;
            m1.declaringAcharge = false;
            m1.chargeTarget = false;
            $('#players').off('click.sprintCharge');
            m1.moveAura = false;
            m1.isKicking = false;
            ball.beingKicked = false;
            //if(m1.isMoving && m1.remainingSprint<m1.sprint*inch) m1.hasMoved = true;
            //if(!m1.remainingSprint<(m1.isSnared || m1.isBurning || m1.inRoughGround ? m1.sprint*inch-2*inch:m1.sprint*inch) )m1.isMoving = false;
            if (m1.isCharging) {
                m1.isCharging = false;
                m1.hasMoved = false;
            }
            m1.drawAbilityAura = 0;//cancels drawing max rane of abilities.
            $("#players").off('click.usingAbility');
            //m1.isCharging = false;
            m1.pressedAbutton = false;
            m1.isDodging = false; m2.isDodging = false;
            m1.isPushed = false; m2.isPushed = false;
            m1.remainingDodge = 0; m2.remainingDodge = 0;
            m1.remainingPush = 0; m2.remainingPush = 0;
            if (wrath && wrath.willCounter && distance(m1.posX, m1.posY, wrath.posX, wrath.posY) <= (m1.baseRadius + wrath.meleeRadius) && $('#app').find('.activeOptions').length < 1) {
                waaar(otherGamer, Gamer, wrath, receiver, 'counterattack'); wrath.willCounter = false
            }
            otherGamer.squaddies.forEach(el => el.isPushed = false);
            healCursor = 0;
            ball.isInHand = false;

            Gamer.tokens.forEach(   (el,i) => 
                {
                    if(el.isInHand === true){
                        Gamer.tokens.splice(i,1);
                    }
                }
            )
}

function drawDeploymentZones(counter/*, Gamer1, Gamer2*/) {
    if (counter < 2) {
        ctx.fillStyle = blueColor;
        ctx.beginPath();
        ctx.fillRect(0, 0, canvas.width, 10 * inch); //draws top team deployment
        ctx.fillStyle = redColor;
        ctx.beginPath();
        ctx.fillRect(0, canvas.height - 10 * inch, canvas.width, 10 * inch); //draws bottom team deployment
    }
    if (counter > 6) {
        let comebackZoneColor = ctx.createLinearGradient(0, 0, canvas.width, canvas.width);
        comebackZoneColor.addColorStop(0, 'red');
        comebackZoneColor.addColorStop(0.25, 'green');
        comebackZoneColor.addColorStop(0.5, 'yellow');
        comebackZoneColor.addColorStop(0.75, 'green');
        comebackZoneColor.addColorStop(1, 'blue');
        ctx.fillStyle = comebackZoneColor;
        ctx.save();
        ctx.globalAlpha = 0.42;
        ctx.beginPath();
        ctx.fillRect(0, 1 * inch, 1 * inch, 9 * inch);
        ctx.fillRect(0, 0, canvas.width, 1 * inch);
        ctx.fillRect(canvas.width - 1 * inch, 1 * inch, canvas.width, 9 * inch);
        ctx.fillRect(0, canvas.height - 10 * inch, 1 * inch, canvas.height - 1 * inch);
        ctx.fillRect(inch, canvas.height - inch, canvas.width - 2 * inch, canvas.height);
        ctx.fillRect(canvas.width - 1 * inch, canvas.height - 10 * inch, canvas.height - 1 * inch, canvas.width - 1 * inch);
        ctx.restore();
    }
}

function sendMessage(txt) {
    message = txt;
    $('#app').find('.message').text(message);
}

const snapBallButtonCreator = (mode, name) =>
    ball.isOnGround ?
        teamz.filter(el => distance(el.posX, el.posY, ball.x, ball.y) <= (el.baseRadius + ball.ballSize + (mode === 'end' ? inch : 0))).filter(el => el.name !== name).filter(el => !el.canSnap).filter(el => !el.isKnockedDown).forEach((el, i) => {
            el.canSnap = true;
            $('body').append(`
                <div 
                    id="snapBall${el.name}" 
                    class="snapBallButton" 
                    style=" 
                        top:${el.posY - el.baseRadius + 2 + (offsetY ? offsetY : 0)}px; 
                        left:${el.posX - el.baseRadius + 2 + (offsetX ? offsetX : 0)}px; 
                        width:${el.baseRadius * 2}px; height:${el.baseRadius * 2}px; 
                        background-color:${el.theGuild.color}; 
                        opacity:${1 / i}; "
                    >snap<br>&nbsp;ball
                </div>
            `);
            $('#snapBall' + el.name).on('click', () => {
                $('body').find('.snapBallButton').remove();
                teamz.forEach(el => { el.hasBall = false, el.canSnap = false });
                el.hasBall = true; ball.isOnGround = false;
            })
        }) : '';

const generatePuddle = (m1) => {
    let shejp = []
    for (let o = 0; o < m1.hp; o++) {
        shejp.push(Math.random() - 0.5);
    }
    puddles.push({
        x: m1.posX,
        y: m1.posY,
        size: m1.baseRadius,
        segments: m1.hp,
        shape: shejp,
        type: m1.identity.race[0]
    })
}

//generatePuddle({posX:230,posY:220, baseRadius:2.5*cm, hp:21})
const drawPuddle = (ctx, radius, noise, x, y, shape, type) => {
    ctx.strokeStyle = type !== "Mechanica" ? "rgba(141, 4, 4, 0.022)" : "rgba(37, 34, 34, 0.04)";
    ctx.fillStyle = type !== "Mechanica" ? "rgba(141, 0, 0, 0.092)" : "rgba(37, 34, 34, 0.1)";
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.lineWidth = 10;
    for (let i = 0; i < shape.length; i++) {
        ctx.rotate(2 * Math.PI / shape.length);
        ctx.lineTo(radius - (radius * noise * shape[i]) / 2 - 10, 0);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawBackground() {
    switch (backgroundTtoss) {
        case 1:
        // $("#pitchfield").css("background-image","url(../icons/pitch/01.jpg)");
        // break;
        case 2:
            document.querySelector("#pitchfield").style.backgroundImage = ("background-image", "url(./icons/Pitch/02.jpg)");
            break;
        case 3:
            document.querySelector("#pitchfield").style.backgroundImage = ("background-image", "url(./icons/Pitch/03.jpg)");
            break;
        case 4:
            document.querySelector("#pitchfield").style.backgroundImage = ("background-image", "url(./icons/Pitch/04.jpg)");
            break;
        case 5:
            document.querySelector("#pitchfield").style.backgroundImage = ("background-image", "url(./icons/Pitch/05.jpg)");
            break;
        default:
            break;
    };
}

const movementActionReverse = () => {
    if (movementHistory.length > 0) {
        let mHi = movementHistory.length - 1;
        teamz.forEach(el => {
            if (el.name === movementHistory[mHi][2] && movementHistory.length > 0) {
                let prefState = el.remainingSprint < 26 ? true : false;
                el.posX = movementHistory[mHi][0][0];
                el.posY = movementHistory[mHi][0][1];
                el.remainingSprint = movementHistory[mHi][1][0];
                el.remainingRun = movementHistory[mHi][1][1];
                if (el.runPaid && (el.remainingSprint-el.baseRadius) > 0 && el.remainingRun!==el.remainingSprint) {
                    el.infMin++;
                    el.runPaid = false
                }
                movementHistory.splice(-1, 1);
                let nefState = el.remainingSprint-el.baseRadius > 0 ? true : false;
                if (el.runPaid && ( /*hitTheWall ||*/ prefState && nefState && el.remainingRun!==el.remainingSprint) ){
                    el.runPaid = false;
                    el.infMin++;
                }
            }
        });
    }
}

function addInfGen (squaddies){
    let sum = 0;
    for(let bov = 0; bov<squaddies.length;bov++){
        sum+=squaddies[bov].infGen
    }
    return sum;
}
function squadz(objx){
    let squads = [];
    for(let ox = 0; ox<objx.squaddies.length;ox++){
        let obj = objx.squaddies[ox];
        			let xXx = new Player(
        				obj.sprint,
        				obj.run,
        				obj.charge,
        				obj.tac,
        				obj.kick,
        				obj.kickDist,
        				obj.def,
        				obj.arm,
        				obj.infGen,
        				obj.infMin,
        				obj.infMax,
        				obj.meleeZone,
        				obj.hp,
        				obj.baseSize,
        				obj.pictureSource,
        				obj.pictureAddress,
        				obj.name,
        				obj.playBook,
        				obj.icySponge,
        				obj.theGuild,
        				[
        					obj.identity.nationality,
        					obj.identity.race,
        					obj.identity.gender,
        					obj.identity.role,
        					obj.identity.status,
        					obj.identity.guildStatus
        				],
        				obj.nameDisplayed
                    );
                    xXx.meleeZone = obj.meleeZone;
                    xXx.meleeRadius = obj.meleeRadius;
        			xXx.runPaid = obj.runPaid;
        			xXx.isCharging = obj.isCharging;
            		xXx.wasCharging = obj.wasCharging;
            		xXx.doICollide = obj.doICollide;
            		xXx.isEngaged = obj.isEngaged; //doesn't work, yet;
            		xXx.hasBall = obj.hasBall;
            		xXx.kickReRoll = obj.kickReRoll;
            		xXx.theGuild = obj.theGuild;
            		xXx.hpMin = obj.hpMin;
            		xXx.heal = obj.heal;
            		xXx.baseSize = obj.baseSize;
            		xXx.name = obj.name;
            		xXx.posX=obj.posX; //initial position
            		xXx.posY=obj.posY;
            		xXx.dragOk = false; //when becomes true item becomesdraggable
            		xXx.meleeColor = obj.meleeColor;
            		xXx.moveAura = obj.moveAura;
            		xXx.oldX = obj.oldX;
            		xXx.oldY = obj.oldY;
            		xXx.isActivating = obj.isActivating;
            		xXx.hasActivated = obj.hasActivated;
            		xXx.isMoving = obj.isMoving;
            		xXx.hasMoved = obj.hasMoved;
            		xXx.isAttacking = obj.isAttacking;
            		xXx.hasAttacked = obj.hasAttacked;
            		xXx.hasKicked = obj.hasKicked;
            		xXx.hasSnapped = obj.hasSnapped;
            		xXx.hasDropped = obj.hasDropped;
            		xXx.canSnap = obj.canSnap;
            		xXx.isPushed = obj.isPushed;
            		xXx.isDodging = obj.isDodging;
            		xXx.dopplerColor = obj.dopplerColor;
            		xXx.isBleeding = obj.isBleeding;
            		xXx.isBurning = obj.isBurning;
            		xXx.isDiseased = obj.isDiseased;
            		xXx.isKnockedDown = obj.isKnockedDown;
            		xXx.isPoisoned = obj.isPoisoned;
            		xXx.isSnared = obj.isSnared;
            		xXx.removedConditions = obj.removedConditions;
            		xXx.isTakenOut = obj.isTakenOut;
            		xXx.bonusTime = obj.bonusTime;
            		xXx.pressedAbutton = obj.pressedAbutton;
            		xXx.remainingRun = obj.remainingRun;
            		xXx.remainingSprint = obj.remainingSprint;
            		xXx.remainingDodge = obj.remainingDodge; 
            		xXx.remainingPush = obj.remainingPush;
            		xXx.counterForAttack.push(...obj.counterForAttack);
            		xXx.willCounter= obj.willCounter;
            		xXx.defensiveStance = obj.defensiveStance;
            		xXx.inCover = obj.inCover;
            		xXx.inFastGround = obj.inFastGround;
            		xXx.inRoughGround = obj.inRoughGround;
            		xXx.inForest = obj.inForest;
            		xXx.isGliding = obj.isGliding;
                    xXx.shouldntBeHere = obj.shouldntBeHere;
                    xXx.picRatio = obj.picRatio;
                    xXx.nameSpec = obj.nameSpec;
                        if(obj.abilities.passiveGiven){
        let skila = []; obj.abilities.passiveGiven.forEach(el=>skila.push(el[0]));
        let skilb = []; obj.abilities.passiveOwned.forEach(el=>skilb.push(el[0]));
        let skilc = []; obj.abilities.activeGiven.forEach(el=>skilc.push(el[0]));
        let skild = []; obj.abilities.activeOwned.forEach(el=>skild.push(el[0]));
                    xXx.abilities = skillsComposition(
                        skila,
                        skilb,
                        skilc,
                        skild)
                        }
        			squads.push(xXx);
    }
    return squads;
}
function cloneX (objc){
    let squaddies =  squadz(objc);
    let tokenz = [];
    for(let tz= 0; tz <objc.tokens.length;tz++){
        let tkn = objc.tokens[tz];
        let tknx = new Token(tkn.posX,tkn.posY,tkn.baseRadius,tkn.type);
            tknx.classification = tkn.classification;
            tknx.id = tkn.id;
            tknx.isInHand = tkn.isInHand;
            tknx.isPlacable = tkn.isPlacable;
        tokenz.push(tknx);
    }
    let GameDataSlice = new Gajmer(objc.momentum, objc.score, objc.goals,squaddies, objc.influence, objc.active, squaddies[0].theGuild, 
                                   [objc.gp.x,objc.gp.y,squaddies[0].theGuild.color],
                                   objc.deployment,objc.side);
        GameDataSlice.time =  objc.time;
        GameDataSlice.tokens.push(...tokenz);//<------UNDEFINES ANY FURTHER ENEMY MOVEMENTS
        GameDataSlice.oponent =  objc.oponent;//requiers special attention
	return GameDataSlice;
}
function ballCloneX (ball){
    let xXx = new Ball_marker(ball.x,ball.y);
    xXx.isOnGround = ball.isOnGround;
    xXx.isInHand = ball.isInHand;
    xXx.teaMate = ball.teaMate;
    return xXx;
}

function addHexColor(c1, c2) {
    let hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
    while (hexStr.length < 6) { hexStr = '0' + hexStr; } 
    return hexStr;
  }

  function gradient(startColor, endColor, steps) {
    var start = {
            'Hex'   : startColor,
            'R'     : parseInt(startColor.slice(1,3), 16),
            'G'     : parseInt(startColor.slice(3,5), 16),
            'B'     : parseInt(startColor.slice(5,7), 16)
    }
    var end = {
            'Hex'   : endColor,
            'R'     : parseInt(endColor.slice(1,3), 16),
            'G'     : parseInt(endColor.slice(3,5), 16),
            'B'     : parseInt(endColor.slice(5,7), 16)
    }
    diffR = end['R'] - start['R'];
    diffG = end['G'] - start['G'];
    diffB = end['B'] - start['B'];

    stepsHex  = new Array();
    stepsR    = new Array();
    stepsG    = new Array();
    stepsB    = new Array();

    for(var i = 0; i <= steps; i++) {
            stepsR[i] = start['R'] + ((diffR / steps) * i);
            stepsG[i] = start['G'] + ((diffG / steps) * i);
            stepsB[i] = start['B'] + ((diffB / steps) * i);
            stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
    }
    return stepsHex;

}


function endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition) {
    m1.hoverButtonAura = 0;
    if(m1.abilities.activeOwned.some(el=>el.includes("Back to the Shadows")  && el[1]>0) ){
        $('#players').off();$("#app").off();$(`.playbookNodes`).empty()
        if(m1.moveAura){m1.isMoving = false; m1.moveAura = false}
        m1.isDodging = true;
        m1.dodgeSquaddie(4,"Back to the Shadows");
        m1.abilities.activeOwned.forEach(el=>{if(el.includes("Back to the Shadows"))el[1]=0});
        $('#app').on('click', `#passActivation` + m1.name, () => { //end activation
            if (Gamer.active && m1.isActivating) {
                saveGameState();
                endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
            }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
        })
    }else if(    otherGamer.squaddies.some(m2=>
                        hasPassiveUnused(m2,"Unpredictable Movement") && m1.isMoving 
                        && distance(m1.posX,m1.posY,m2.posX,m2.posY)<=m2.AmeleeZone*inch+m2.baseRadius+m1.baseRadius
                    )//array method
                    )//else if
    {
        unpredictableMovement(m1);
    }else{
    escapist(m1,otherGamer,m1);
    message = '';
    diceRolledForDisplay = [];
    $teamplays = [];
    m1.hasActivated = true;
    m1.isActivating = false;
    teamz.forEach(el => {
        el.drawAbilityAura=0;
        el.kickReRoll = 0;
        el.isAttacking = false;
        el.isKicking = false;
        el.isDodging = false;
        el.isPushed = false;
        movementHistory = [];
        el.hasSnapped = false;
        if (m1.bonusTime) {
            m1.bonusTime = false;
            Gamer.momentum++;
        }
    })
    if (teamz.filter(el => !el.hasActivated).length === 0) { ////////resets turn
        teamz.forEach(m1 => {
            abilitiesCleaner(m1);
            m1.inRoughGround = false;
            m1.inFastGround = false;
            m1.terrainsMovPenalised = false;
            m1.remainingRun = m1.run * inch + m1.baseRadius
            m1.remainingSprint = m1.sprint * inch + m1.baseRadius
            m1.kickReRoll = 0;
            m1.isActivating = false;
            m1.hasActivated = false;
            m1.isMoving = false;
            m1.hasMoved = false;
            m1.isCharging = false;
            m1.wasCharging = false;
            m1.isAttacking = false;
            m1.hasAttacked = false;
            m1.isKicking = false;
            m1.hasKicked = false;
            m1.heal = 0;
            m1.removedConditions = 0;
            m1.infMin = 0;
            if(m1.isSnared){
                m1.remainingRun -= 2 * inch;
                m1.remainingSprint -= 2 * inch;
            }
            m1.runPaid = false;
            m1.isCharging = false;
            m1.pressedAbutton = false;
            m1.counterForAttack = [];
            m1.isGliding = false;
            m1.oldX = m1.posX;
            m1.oldY = m1.posY;
            if (m1.isPoisoned) {
                m1.hpMin -= 2;
            }
            if (m1.isBleeding) {
                m1.hpMin -= 3;
                m1.isBleeding = false;
            }
            if (m1.isBurning) {
                m1.hpMin -= 1;
                m1.remainingRun -= 2 * inch;
                m1.remainingSprint -= 2 * inch;
            }
            if (m1.hpMin < 1) {
                if (!m1.isTakenOut) {
                    Gamer.score += 2;

                    if (m1.hasBall) {
                        m1.hasBall = false;
                        ball.isOnGround = true;
                        scatterRandomiser(m1.posX, m1.posY, false);
                    }
                    m1.hpMin = m1.icySponge;
                    m1.posX = undefined;
                    m1.posY = undefined;
                    m1.hasActivated = false;
                    m1.hasMoved = false;
                    m1.isPushed = false;
                    m1.isDodging = false;
                    m1.isTakenOut = true;
                    m1.isBurning = false;
                    m1.isBleeding = false;
                    m1.isDiseased = false;
                    m1.isKnockedDown = false;
                    m1.isPoisoned = false;
                    m1.isSnared = false;
                    m1.isActivating = false;
                    m1.isMoving = false;
                    m1.isAttacking = false;
                    m1.hasAttacked = false;
                    m1.isKicking = false;
                    m1.hasKicked = false;
                    m1.counterForAttack = [];
                }
            }
            m1.inFastGround = false;
        })
        counter++
    } //if everybody has activated
    if (counter === 5) {
        switcher(event);
    } else if (counter > 5) {
        turnTransition(event)
    }
    $('#appDisplay').slideUp();
    plajBookWraz();
    }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// collide(a, b, circle, radius[, nearest])
// Performs a collision test with the line a-b and the given circle. Returns true if collision occurred.

// a, b, and circle are expected to be 2D vectors in the form of an array.

// If nearest is passed, the nearest point found during the intersection test will be stored into that vector. This is useful if you need to find the nearest point along the line for the intersection test. If the hit returns false, you should not expect the value of nearest to have changed.


var tmp = [0, 0];

function pointCircleCollide(point, circle, r) {
    if (r===0) return false
    var dx = circle[0] - point[0]
    var dy = circle[1] - point[1]
    return dx * dx + dy * dy <= r * r
}

function lineCircleCollide(a, b, circle, radius, nearest) {
    //check to see if start or end points lie within circle 
    if (pointCircleCollide(a, circle, radius)) {
        if (nearest) {
            nearest[0] = a[0]
            nearest[1] = a[1]
        }
        return true
    } if (pointCircleCollide(b, circle, radius)) {
        if (nearest) {
            nearest[0] = b[0]
            nearest[1] = b[1]
        }
        return true
    }
    
    let x1 = a[0],
        y1 = a[1],
        x2 = b[0],
        y2 = b[1],
        cx = circle[0],
        cy = circle[1]

    //vector d
    let dx = x2 - x1
    let dy = y2 - y1
    
    //vector lc
    let lcx = cx - x1
    let lcy = cy - y1
    
    //project lc onto d, resulting in vector p
    let dLen2 = dx * dx + dy * dy //len2 of d
    let px = dx
    let py = dy
    if (dLen2 > 0) {
        let dp = (lcx * dx + lcy * dy) / dLen2
        px *= dp
        py *= dp
    }
    
    if (!nearest)
        nearest = tmp
    nearest[0] = x1 + px
    nearest[1] = y1 + py
    
    //len2 of p
    let pLen2 = px * px + py * py
    
    //check collision
    return pointCircleCollide(nearest, circle, radius)
            && pLen2 <= dLen2 && (px * dx + py * dy) >= 0
}

function drawTimeLeft (goblin) {
    if(goblin.active){
        let color = goblin.guild.color;
        let timeLeft = goblin.time;
        sctx.beginPath();
        let lineLength = 36*inch/2700;
        sctx.strokeStyle = color;
        sctx.lineWidth = .5*inch;
        sctx.moveTo(0,2+(36*inch-(timeLeft*lineLength) )   );
        sctx.lineTo(0,timeLeft*lineLength);
        sctx.stroke();
        sctx.closePath();
    }
};

function isEngaged(m1){
    let numberOfEngaging = otherGamer.squaddies.filter(el=>distance(m1.posX,m1.posY,el.posX,el.posY)<=m1.baseRadius+el.meleeRadius).length;
    return numberOfEngaging;
}