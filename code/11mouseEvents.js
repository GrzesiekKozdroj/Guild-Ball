"use strict";
//$((e) => {

//cheetah(true)
function turnTransition(event) {
    if (counter === 6) {
        Gamer1.influence = addInfGen(Gamer1.squaddies) + Gamer1.goals;
        Gamer2.influence = addInfGen(Gamer2.squaddies) + Gamer2.goals;
        Gamer1.active = !Boolean(Gamer1.momentum > Gamer2.momentum) ? true : Gamer1.momentum === Gamer2.momentum ? Math.random > 0.5 ? true : false : false;
        Gamer2.active = Gamer1.active ? false : true;
        Gamer1.momentum = Gamer1.active ? 1 : 0;
        Gamer2.momentum = Gamer2.active ? 1 : 0;
        Gamer = Gamer2.active ? Gamer2 : Gamer1;
        otherGamer = Gamer2.active ? Gamer1 : Gamer2;
        counter++;
        turnTransition(event);
    } else if (counter === 7 || counter === 8) {

        Gamer2.active = Gamer1.active ? true : false;
        Gamer1.active = Gamer2.active ? false : true;
        Gamer = Gamer2.active ? Gamer2 : Gamer1;
        otherGamer = Gamer2.active ? Gamer1 : Gamer2;

        $('#players').off();
        $('#app').empty().off();

        //$('#app').css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`);

        $('#players').on(`click`, function (event) {
            defaultPreventer(event);
            for (let c = 0; c < Gamer.squaddies.length; c++) {
                let m1 = Gamer.squaddies[c];
                //--01-S---activate a squaddie and display him
                if (distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius)) {
                    //$('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                    message = `Allocate influence to squaddies. Move returning squaddies with drag and drop, they have to touch edge of their team deployment zone, then click to initiate free movement, left click to confirm new position.`;
                    $('#appDisplay').slideDown();
                    $('#app').empty().off();
                    actionButtons(m1, Gamer)
                    $('#app').append(appMaker(m1, Gamer));
                    /////////////////////////////////////////////////////////////
                    $('#app').on('click', `#addInf` + m1.name, () => { //add influence
                        if (Gamer.active && Gamer.influence > 0 && m1.infMin < m1.infMax) {
                            Gamer.influence -= 1;
                            m1.infMin += 1;
                            $(".infoAbilBox").remove();
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    });

                    //////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `#minInf` + m1.name, () => { //remove influence
                        if (Gamer.active && m1.infMin > 0) {
                            Gamer.influence += 1;
                            m1.infMin -= 1;
                            $(".infoAbilBox").remove();
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    });
$("#gameScreen").on('mouseenter', `#addInf` + m1.name, function() {
    $(".infoAbilBox").remove();
    const that = {name:"Add Influence",type:"utility",desc:`Add influence to ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
    $("#gameScreen").append(infoAbilBox(that));
});
$("#gameScreen").on('mouseleave', `#addInf` + m1.name, function() {
$(".infoAbilBox").remove();
});
                    $("#gameScreen").on('mouseenter', `#minInf` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Remove Influence",type:"utility",desc:`remove Influence from ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#gameScreen").on('mouseleave', `#minInf` + m1.name, function() {
                    $(".infoAbilBox").remove();
                    });
                    ///////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `#leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });

                    $('#app').on('click', `#passActivation` + m1.name, () => { //end activation

                        if (Gamer.active && Gamer.influence === 0) {
                            counter = counter <= 7 ? 8 : 5;
                            Gamer.squaddies.filter(el => el.isActivating).forEach(m1 => {
                                m1.hasMoved = false;
                                m1.isMoving = false;
                                m1.moveAura = false;
                                m1.isActivating = false;
                                m1.remainingSprint = m1.sprint * inch + m1.baseRadius;
                                m1.remainingRun = m1.run * inch + m1.baseRadius;
                            })
                            if (counter > 6) {
                                turnTransition(event)
                            } else (switcher(event));
                        } else {
                            message = 'allocate all influence first';
                            $('#app').empty().off();
                            $('#app').append(appMaker(m1, Gamer));
                        }
                        $(".infoAbilBox").remove();
                    });
                    $("#gameScreen").on('mouseenter', `#passActivation` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"pass to opposing team",type:"utility",desc:`Allow opposing team to allocate their influence and return taken out squaddies.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#gameScreen").on('mouseleave', `#passActivation` + m1.name, function() {
                    $(".infoAbilBox").remove();
                    });
                    if (distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + inch + ball.ballSize) && //player-ball distance
                    distance(mouX, mouY, ball.x, ball.y) <= ball.ballSize                                   //klick on ball
                    && ball.isOnGround && !m1.hasSnapped && m1.isActivating && !m1.isKnockedDown) {
                    ball.isOnGround = false;
                    m1.hasBall = true;
                    movementHistory = [];
                    $('body').find('.snapBallButton').remove();
                    $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                //<<------------------==    can't pick up dropped ball
                }


                    $('#app').on('click', '#undoMove' + m1.name, () => { movementActionReverse() })
                }
            } //FOR Gamer.squaddie LOOP
        })

        Gamer.squaddies.filter(el => el.isTakenOut).forEach((el, i) => {
            el.isTakenOut = false;
            el.isActivating = false;
            el.hasActivated = false;
            el.posX = (canvas.width - 4 * inch) / 2 + (i+1) * inch;
            el.posY = Gamer.deployment[0] < canvas.height / 2 ? el.baseRadius + 5 : canvas.height - el.baseRadius - 5;
            adminToolz(event, el, Gamer, 'comeback')
            $('#players').on('click', (e) => {
                if (!el.isActivating && !el.hasMoved && distance(el.posX, el.posY, mouX, mouY) <= (el.baseRadius)) {
                    defaultPreventer(e);
                    el.moveAura = true;
                    el.isActivating = true;
                }
                $('#players').on('click', () => {
                    if (el.isActivating && distance(el.posX, el.posY, mouX, mouY) <= (el.remainingSprint) &&
                        distance(mouX, mouY, el.posX, el.posY)>el.baseRadius) {
                        defaultPreventer(e);
                        el.isMoving = true;
                        el.dropper(teamz);
                    }
                })
            })
        })
    }

} //turnTransition









switcher = (event) => {
    $("#pitchfield").off();$("#players").off();
    Gamer1.active = Gamer1.active ? false : true;
    Gamer2.active = Gamer2.active ? false : true;
    Gamer = Gamer2.active ? Gamer2 : Gamer1;
    otherGamer = Gamer2.active ? Gamer1 : Gamer2;
    if (Gamer.squaddies.filter(el => !el.hasActivated).length === 0) {
        switcher(event);
    }
    $('#players').off();
    $('#app').empty().off();
    $('body').off();
    $('body').find('.snapBallButton').remove();
    let dummyState1 = cloneX(Gamer1);
    let dummyState2 = cloneX(Gamer2);
    let dummyBall = ballCloneX (ball);
    if(Gamer.gp.hasBall){
        Gamer.gp.isKicking = true;
        ball.beingKicked = true;
        $('#players').on('click', () => {
                    if (distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) <= (2.5 * cm + 10 * inch) && Gamer.gp.hasBall) {
                        scatterRandomiser(mouX, mouY, true, Gamer.gp); //m1.hasDropped = false;
                        Gamer.gp.hasBall = false;
                        Gamer.gp.isKicking = false;
                        ball.beingKicked = false;
                        ball.isOnGround = true;
                    }
                })
        }
    for (let all = 0; all < Gamer.squaddies.length; all++) {
        let teaMate = Gamer.squaddies[all];
        let m1 = teaMate;
        m1.oldX = m1.posX; m1.oldY = m1.posY;


        $('#players').on('click', function (event) {
            defaultPreventer(event);
            //--01-S---activate a squaddie and display him
            
        //////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////____MOVEMENT___EVENT___LISTENERS__________///////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

         if (__canMove(teaMate)) {
         teaMate.moveAura = true;
         if(teaMate.isDodging)teaMate.isDodging = false;
         teamz.forEach(el=>!el.isActivating || el.wasCharging?el.moveAura=false:el.moveAura=true)
         sendMessage(`if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`);
        $('#players').on('click', function (e) { //drops a guy down after movement if possible
            if (__validMoveDeclaration(teaMate)) {
             defaultPreventer(e);
             teaMate.dropper(teamz);
     }; //if
 } //if
 ); //mouseDown
             } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
                teaMate.isActivating) {
                    sendMessage(`${teaMate.nameDisplayed} has already moved this turn.`);
             }
 //##########################____MOVEMENT__ENDS___##########################################//

 
        ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////__________DISPLAY__MODEL__PROPERTIES_______________//////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

            if (__chooseModelToActivate(teaMate)) {
                Gamer.squaddies.forEach(elm=>{
                    elm.declaringAcharge = false;
                });
                if (!teaMate.isActivating && teaMate.isKnockedDown) {
                    teaMate.hasMoved = false;
                }
                teaMate.isActivating = true;
                atTheStartOfActivation(teaMate);
                terrainsDetector(m1)
                let otherSquaddie = Gamer.squaddies.filter(el => el.isActivating === true).filter(el => el.name !== teaMate.name);
                otherSquaddie.forEach(el => {el.isActivating = false;el.moveAura = false;});

                message = `left-click on a ${Gamer.guild.name} squaddie model to activate it, or click on model to activate it and display movement zone.`;
                $('#appDisplay').slideDown();
                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
            } else if ( __hasLareadyActivated(teaMate)) {sendMessage(`${teaMate.nameDisplayed} has already activated this turn.`)     }
//tips giver:
            if ($('#app').find('.activeOptions').length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
            !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).length > 0) {

                let activatingNow = Gamer.squaddies.filter(el => el.isActivating)[0];
                const kickTip = activatingNow.hasBall ? `Kick the ball by pressing kick button, then either choosing teamate, goal post or pitch within the kick zone.<br>` : ``;
                const fightTip = otherGamer.squaddies.some(el => distance(activatingNow.posX, activatingNow.posY, el.posX, el.posY) <= activatingNow.meleeRadius + el.baseRadius) ? `click opposing team player icon within melee range of ${activatingNow.nameDisplayed} to attack. <br>` : ``;
                const KDTip = activatingNow.isKnockedDown ? `And is knocked down, can't attack, hold the ball or move. <br>` : ``;


                if(activatingNow.name !== teaMate.name){sendMessage (`${teaMate.nameDisplayed} can't activate in middle of ${activatingNow.nameDisplayed} activation. ${activatingNow.nameDisplayed} 
                needs to end its activation.`)} else if (activatingNow.name === teaMate.name){
                            sendMessage(`${teaMate.nameDisplayed} is activating now. 
                        ${kickTip}
                        ${fightTip}
                        ${KDTip}`)
                        }
                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
                $(`[id^="naturesChill"]`).addClass("activatingPassiveSkillo1");
            }


        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////_________________WAAAAR _______________/////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////
            for (let p = 0; p < otherGamer.squaddies.length; p++) {
                let m2 = otherGamer.squaddies[p];
                defaultPreventer(event);
                //<<------== counteratttacks:
                //<<---=== here counter attack buttons
                //counteratttacks <<-------==
                if ( m1.drawAbilityAura === 0 && m1.isActivating && __isInMelee(m1, m2) ) {
                        if(m1.isMoving)unpredictableMovement(m1);
                    let inMelee = (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m2.meleeRadius + m1.baseRadius) ? true : false;
                    if ( (inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>0)
                        || ((m1.isCharging^m1.wasCharging) && otherGamer.momentum>0)
                         ) {
                        if (m1.infMin > 0|| (m1.wasCharging && hasPassive(m1,"Furious"))) counterAttackDialogBox(m1, m2);
                        $('body').on('click.counterattack', '#opt1' + m2.name, () => {
                            waaar(Gamer, otherGamer, m1, m2);
                            m2.willCounter = true;
                            m2.counterForAttack.push(m1.name);
                            otherGamer.momentum -= 1;
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt2' + m2.name, () => {
                            waaar(Gamer, otherGamer, m1, m2);
                            m2.willCounter = false;
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt3' + m2.name, () => {
                            m2.willCounter = false;
                            m2.counterForAttack.push(m1.name);
                            waaar(Gamer, otherGamer, m1, m2);
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt4' + m2.name, () => {
                            waaar(Gamer, otherGamer, m1, m2);
                            m2.willCounter = true;
                            m2.bonusTime = true;
                            otherGamer.momentum -= 2;
                            m2.counterForAttack.push(m1.name);
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt5' + m2.name, () => {
                            m2.defensiveStance += 1;
                            otherGamer.momentum -= 1;
                            waaar(Gamer, otherGamer, m1, m2);
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt6' + m2.name, () => {
                            m2.defensiveStance += 1;
                            otherGamer.momentum -= 2;
                            waaar(Gamer, otherGamer, m1, m2);
                            m2.willCounter = true;
                            m2.counterForAttack.push(m1.name);
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });

                        $('body').on('click.counterattack', '#opt7' + m2.name, () => {
                            m2.defensiveStance += 1;
                            m2.bonusTime = true;
                            otherGamer.momentum -= 3;
                            waaar(Gamer, otherGamer, m1, m2);
                            m2.willCounter = true;
                            m2.counterForAttack.push(m1.name);
                            $('body').find('#counterbox' + m2.name).off().remove();
                            $('body').off('click.counterattack')
                        });
                    }else{
                        waaar(Gamer, otherGamer, m1, m2);
                    }; //counterattacks
                }//WAAR

                    if(m1.declaringAcharge && distance(mouX,mouY,m2.posX,m2.posY)<=m1.remainingRun+m1.meleeRadius//charge
                        &&distance(mouX,mouY,m2.posX,m2.posY)<m2.baseRadius   ){
                        m1.isCharging = true;
                        m1.isMoving = true;
                        m1.isPushed = false;
                        m1.isDodging = false;
                        m1.declaringAcharge = false;
                        m1.chargeTarget = m2;
                        sendMessage(`${m1.nameDisplayed} now must land within circle around chosen charge target and withing charge range.`)
                $('#players').on('click.sprintCharge', () => {
                    if (!m1.declaringAcharge && m1.isCharging && distance(m1.posX, m1.posY, mouX, mouY) <= m1.remainingRun && !m1.hasMoved
                    && distance(mouX,mouY,m1.chargeTarget.posX,m1.chargeTarget.posY)<=m1.meleeRadius+m1.chargeTarget.baseRadius+m1.baseRadius    ) {
                        $('#players').off('click.sprintCharge');
                        teaMate.dropper();
                        m1.wasCharging = true;
                        movementHistory = [];
                    }else{
                        sendMessage(`place ${m1.nameDisplayed} comletely within red circle of the chosen charge target.`)
                    }
                })
    
                    }



            }//m2 loop
            
            
        }) //--01-E--
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////_____________CHAAAAARGEEEE_________________////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
            $('#app').on('click', `#charge` + teaMate.name, () => {
                if ((m1.infMin > 1 || hasPassive(m1,"Furious")) && !m1.isMoving && !m1.hasMoved && !m1.isCharging && !m1.isKnockedDown && m1.isActivating && isEngaged(m1)<1) {
                    teaMate.declaringAcharge = true;
                    teaMate.moveAura = false;
                    sendMessage(`${m1.nameDisplayed} can now charge in a straight line. Click one enemy in its threat range to declare a target.`);
                }
            }) //CHHAARGE

            $("#app").on('mouseenter', `#charge` + teaMate.name, function() {
                $(".infoAbilBox").remove();
                teaMate.hoverButtonAura = teaMate.remainingRun+teaMate.meleeRadius-teaMate.baseRadius;
                const that = {name:"Charge",type:"utility",desc:`Spend 2 influence to charge in a straight line a opposing squaddie, can't run through walls or other players`};
                $("#gameScreen").append(infoAbilBox(that));
            });
            $("#app").on('mouseleave', `#charge` + teaMate.name, function() {
                teaMate.hoverButtonAura = 0;
                $(".infoAbilBox").remove();
            });



        //////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////_____________HUD___EVENT___LISTENERS_______//////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        $('#app').on('click', `#leaflet` + teaMate.name, () => {
            showLeaflet = showLeaflet ? false : true
        });

        $('#app').on('click', `#passActivation` + teaMate.name, () => { //end activation
            if (Gamer.active && teaMate.isActivating) {
                saveGameState();
                endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                $(".infoAbilBox").remove();
            }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
        });
        $("#app").on('mouseenter', `#passActivation` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Pass Activation",type:"utility",desc:`End ${teaMate.nameDisplayed} activation and allow other team to do their turn`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#passActivation` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });
        $('#app').on('click', `#bonusTime` + teaMate.name, () => {
            if (Gamer.momentum > 0 && !teaMate.bonusTime) {
            teaMate.pressedAbutton = true;
                Gamer.momentum -= 1;
                teaMate.bonusTime = true;
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                $(".infoAbilBox").remove();
            }
        });
        $("#app").on('mouseenter', `#bonusTime` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Bonus Time",type:"utility",desc:`Pay 1 momentum to add one extra dice to the next roll.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#bonusTime` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', '#forfeitMove' + teaMate.name, () => {
            if (!teaMate.hasMoved && teaMate.isKnockedDown && !teaMate.isMoving) {
                teaMate.pressedAbutton = true;
                teaMate.hasMoved = true;
                teaMate.isKnockedDown = false;
                teaMate.meleeRadius = teaMate.baseRadius + teaMate.meleeZone * inch;
                teaMate.def += 1;
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                movementHistory = [];
                $(".infoAbilBox").remove();
            }
        });
        $("#app").on('mouseenter', `#forfeitMove` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Forfeit Movement",type:"utility",desc:`Sacrifice ability to move this turn in order to stand up.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#forfeitMove` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', '#healSelf' + teaMate.name, () => {
            if (teaMate.heal < 1 && teaMate.removedConditions !== 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
                teaMate.pressedAbutton = true;
                healFunction(teaMate, Gamer, 4, (teaMate.isDiseased ? 2 : 1), 1);
                movementHistory = [];
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                $(".infoAbilBox").remove();
            }
        });
        $("#app").on('mouseenter', `#healSelf` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Heal",type:"utility",desc:`Spend one momentum to heal 4 wounds off ${teaMate.nameDisplayed}`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#healSelf` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });
        $('#app').on('click', '#removeConditions' + teaMate.name, () => {
            if (teaMate.heal !== 1 && teaMate.removedConditions < 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
                teaMate.pressedAbutton = true;
                removeConditionsFuncion(teaMate, Gamer, (teaMate.isDiseased ? 2 : 1), 1);
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                movementHistory = [];
                $(".infoAbilBox").remove();
            }
        });
        $("#app").on('mouseenter', `#removeConditions` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Remove Conditions",type:"utility",desc:`Spend one momentum to remove all conditions off ${teaMate.nameDisplayed}`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#removeConditions` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });
        $('#app').on('click', '#healAFriend' + teaMate.name, () => {
            healCursor = 1;
            //cursor update
            //actual canvas click
            $('#players').on('click', () => {
                for (let hf = 0; hf < Gamer.squaddies.length; hf++) {
                    teaMate.pressedAbutton = true;
                    let m2 = Gamer.squaddies[hf]
                    if (healCursor > 0 && m2.heal < 1 && m2.removedConditions < 2 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.hpMin < m2.hp && m2.heal < 1 && m2.removedConditions < 2) {
                        healFunction(m2, Gamer, 4, (teaMate.isDiseased ? 3 : 2), 2);
                        $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
                        healCursor = 0;
                        movementHistory = [];
                        $(".infoAbilBox").remove();
                    }
                }
            })
        });
        $("#app").on('mouseenter', `#healAFriend` + teaMate.name, function() {
            teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
            $(".infoAbilBox").remove();
            const that = {name:"Heal Friend",type:"utility",desc:`Spend two momentum to heal 4 wounds on team mate within 8 inches`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#healAFriend` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', '#takeAbreather' + teaMate.name, () => {
            healCursor = 2
            for (let rc = 0; rc < Gamer.squaddies.length; rc++) {
                let m2 = Gamer.squaddies[rc];
                //cursor update
                //actual click
                $('#players').on('click', () => {
                    teaMate.pressedAbutton = true;
                    if (healCursor > 0 && m2.heal < 2 && m2.removedConditions < 1 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.removedConditions < 1 && m2.heal < 2 && hasConditions(m2)) {
                        removeConditionsFuncion(m2, Gamer, (m2.isDiseased ? 3 : 2), 2);
                        movementHistory = [];
                        $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
                        healCursor = 0;
                        $(".infoAbilBox").remove();
                    }
                })
            }
        });
        $("#app").on('mouseenter', `#takeAbreather` + teaMate.name, function() {
            teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
            $(".infoAbilBox").remove();
            const that = {name:"Take A Breather",type:"utility",desc:`Spend two momentum to remove all conditions on team mate within 8 inches.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#takeAbreather` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });


        $("#app").on(`click`, '#cancel'+teaMate.name,() => {
            escapist(m1, otherGamer);
            $(".infoAbilBox").remove();
        });
        $("#app").on('mouseenter', `#cancel` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Cancel Action",type:"utility",desc:`Stops the intent of action like kick, run, charge or using an ability.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#cancel` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', `#glide` + m1.name, () => {
            if (Gamer.momentum > 0 && !m1.isGliding && !hasPassive(m1,"Winters Blessing") && !hasPassive(m1,"Light Footed")) {
                Gamer.momentum -= 1;
                m1.isGliding = true;
                if (m1.inRoughGround) {
                    m1.remainingRun += 2 * inch;
                    m1.remainingSprint += 2 * inch;
                }
                    $(".infoAbilBox").remove();
            }
        });
        $("#app").on('mouseenter', `#glide` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Glide",type:"utility",desc:`Spend one momentum to remove rough ground movement penalty for ${teaMate.nameDisplayed} until next turn.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#glide` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', `#ruler` + m1.name, () => {
            rulerDopplers = [];
            ruler = ruler ? false : true;
            $(".infoAbilBox").remove();
            //let cX = mouX, cY = mouY
            $("#players").on('click', () => {
                if (rulerDopplers.length > 0 && ruler) {
                    rulerDopplers.push([mouX, mouY, rulerDopplers[rulerDopplers.length - 1][2], rulerDopplers[rulerDopplers.length - 1][3]]);
                } else if (rulerDopplers.length < 1 && ruler) {
                    rulerDopplers.push([mouX, mouY, m1.posX, m1.posY]);
                }
            })
        });
        $("#app").on('mouseenter', `#ruler` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Ruler",type:"utility",desc:`Allows you to multiple check distances for active squaddie.`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#ruler` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });

        $('#app').on('click', '#undoMove' + teaMate.name, () => { movementActionReverse(); 
            $(".infoAbilBox").remove(); });

        $("#app").on('mouseenter', `#undoMove` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Undo Movement",type:"utility",desc:`Allows you reverse movement of a squaddie, helps fend off multitude of game glitches. Although this action is glitched itself.....`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#undoMove` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });


        $('#app').on('click','#states'+teaMate.name,()=>{
            commonAfterInstruction({ m1: teaMate });
            idear = 0;
            ruler = false;
            Gamer1 = cloneX(dummyState1); 
            Gamer2 = cloneX(dummyState2);
            Gamer.oponent = otherGamer;
            otherGamer.oponent = Gamer;
            ball = ballCloneX(dummyBall)
            teamz = [...Gamer1.squaddies, ...Gamer2.squaddies]
            $("#pitchfield").empty();
            $('body').find('.counterbox').off().remove();
            $('#app').empty()//.append(appMaker(m1, Gamer));
            $teamplays = [];
            $(`.playbookNodes`).empty();
            Gamer1.active = Gamer1.active ? false : true;
            Gamer2.active = Gamer2.active ? false : true;
            Gamer = Gamer2.active ? Gamer2 : Gamer1;
            otherGamer = Gamer2.active ? Gamer1 : Gamer2;
            switcher(false);
            $(".infoAbilBox").remove();
        });
        $("#app").on('mouseenter', `#states` + teaMate.name, function() {
            $(".infoAbilBox").remove();
            const that = {name:"Undo whole activation",type:"utility",desc:`Allows you to completely undo current activation. Helps unscrew broken game state, altough its buggy itself.....`};
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#states` + teaMate.name, function() {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });
////////////////////////////////////////BALLS PLUG//////////////////////////////////////////////


        theBallsGame(m1,teaMate);


////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


        abilitiesEvents(m1,Gamer,otherGamer);


////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


        $("body").on(`keydown`, (e) => {
            defaultPreventer(e);
            if (e.key === 'Escape') {
                if(m1.abilities.activeOwned.some(el=>el[0]==="Back to the Shadows" && el[1] === true)){
                    endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                }else{
                    escapist(m1, otherGamer);
                }
            }
        })
    } //for all Gagmer squaddies length

    if ($('#app').empty() && !Gamer.gp.hasBall) {
        $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">left click to activate player, click to display move aura, then left click to move player, active players can attack opposing team by clicking enemies within its melee zone, use escape button if you want to cancel i.e. kick or charge. also for the sake and liberty of testing there are only two pre-set teams out of 17 different guilds.</div>`)
    } else if(Gamer.gp.hasBall){
        $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">${Gamer.guild.name} Guild must now resolve goal kick with left-click. Then proceed with normal activation.</div>`);
    }

} //switcher ends
























function deploymentPhase(event) {
    if (counter < 5) {
        Gamer1.active = Gamer1.active ? false : true;
        Gamer2.active = Gamer2.active ? false : true;
        Gamer = Gamer2.active ? Gamer2 : Gamer1;
        otherGamer = Gamer2.active ? Gamer1 : Gamer2;
    }
    let couriere = () =>
        counter === 0 ? $('#app')
                //.css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`)
                .append(`<div class='the-first-info' style="margin-top:${1 * hlem}px;">this is going to be a as close as possible automated replica of a tabletop game called Guild Ball. <br> It'll be no fun for ya if yer know no rulez:<br>
             <a style="color:rgb(11, 31, 4);font-size:43px;font-weight:900"
             href = "https://static1.squarespace.com/static/56728f72a128e6b1e548ec55/t/5c755dc3f4e1fc3d9a733219/1551195617029/GB-S4-Rulebook-4-1.pdf" 
             target="_blank">guild ball rules.pdf</a> <br>You're still here? Good.<br>Double left-click, and hold that left click 
             to pick up a player, then drop him as you please. This is deployment phase, there are two teams you control 
             simultaneously, each team can move as they please within their deployment limits, ${Gamer.guild.name} first, then 
             when they're done, assign ball to the kicker and press end deployment.</div>`) :
            counter === 1 ? $('#app')
                //.css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`)
                .append(`<div class='the-first-info' style="margin-top:${1 * hlem}px;">Double left-click, and hold that left click to pick up a player, then drop him as you please. This is deployment phase, for ${Gamer.guild.name}. Now they can be deployed within their deployment zone limits.</div>`) :
            counter === 2 ? $('#app')
                //.css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`)
                .append(`<div class='the-first-info' style="margin-top:${1 * hlem}px;"> Double click to initiate movement aura for free jog. ${Gamer.guild.name} player ${Gamer.squaddies.filter(el => el.hasBall)[0].nameDisplayed} in posession of the ball, has free jog and free kick to opposing team.</div>`) :
            counter === 3 ? $('#app')
                //.css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`)
                .append(`<div class='the-first-info' style="margin-top:${1 * hlem}px;">Left click on a model to see its panel. Then this is time to assign the influence for ${Gamer.guild.name} which now know where the ball is and will begin the game turn.</div>`) :
            counter === 4 ? $('#app')
                //.css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`)
                .append(`<div class='the-first-info' style="margin-top:${1 * hlem}px;">Left click on a model to see its panel. Then this is time to assign the influence for ${Gamer.guild.name} which now know where the ball is, where starting's team influence is invested and will ending turn activation, which can be a powerful tool.</div>`) : ``;
    couriere();
    $('#pitchfield').empty().off();
    $('#app').empty().off();
    if (counter < 2) {
        $('#players').on(`click`, function (event) {
            defaultPreventer(event);
            for (let c = 0; c < Gamer.squaddies.length; c++) {
                let m1 = Gamer.squaddies[c];
                //--01-S---activate a squaddie and display him
                if (distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius)) {
                    //$('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                    message = counter < 1 ? `double left-click to drag and drop ${Gamer.guild.name} squaddie model within deployment zone. Don't forget to allocate the Ball.` : `left-click to drag and drop ${Gamer.guild.name} squaddie model within deployment zone.`;
                    $('#appDisplay').slideDown();
                    $('#app').empty().off();
                    $('#app').append(appMaker(m1, Gamer));
                    adminToolz(event, m1, Gamer, 'deployment');
                    $('#app').on('click', `#leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });
                    $("#app").on("click", "#generateTerrains", () => {
                        filtered_td = [];
                        td = [];
                        pitchConstructor();
                        terrainsGenerator();
                    });

                    $('#app').on('click', `#passActivation` + m1.name, () => { //end activation
                        if (Gamer.active && teamz.filter(m1 => m1.hasBall).length > 0) {
                            counter++;
                            deploymentPhase(event);
                            $(".infoAbilBox").remove();
                        } else {
                            sendMessage('you have to allocate ball to the initial kicker first');
                        }
                    });

                    $("#app").on('mouseenter', `#passActivation` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Finish Allocation",type:"utility",desc:`Finish deployment phase, and let other team to activate.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#passActivation` + m1.name, function() {
                        $(".infoAbilBox").remove();
                    });

                    $('#app').on('click', `#giveBallTo` + m1.name, () => {
                        teamz.forEach(el => {
                            if (el.hasBall) {
                                el.hasBall = false
                            }
                        });
                        $(".infoAbilBox").remove();
                        ball.x = undefined;
                        ball.y = undefined;
                        ball.isOnGround = false;
                        m1.hasBall = true;
                    })
                    $("#app").on('mouseenter', `#giveBallTo` + m1.name, function() {
                        m1.hoverButtonAura = m1.remainingSprint+m1.kickDist*inch;
                        m1.drawAbilityAura = m1.remainingSprint+m1.kickDist*inch+6*inch;
                        $(".infoAbilBox").remove();
                        const that = {name:"Assign Kicker",type:"utility",desc:`Give ball to initial kicker to initiate the game, this movement and kick are for free.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#giveBallTo` + m1.name, function() {
                        m1.hoverButtonAura = 0;m1.drawAbilityAura = 0;
                        $(".infoAbilBox").remove();
                    });
                }

            }
        })

        couriere();
        //deploymentPhase(event)       
    } else if (counter === 2) {
        //kick off here!

        $('#players').on(`click`, function (event) {
            defaultPreventer(event);
            for (let c = 0; c < Gamer.squaddies.length; c++) {
                let m1 = Gamer.squaddies[c];
                if (distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius) && m1.hasBall) {
                    //$('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                    message = `click to walk ${m1.nameDisplayed} and left-click to confirm where to move, then left-click on kick button to kick off!`;
                    $('#appDisplay').slideDown();
                    $('#app').empty().off();
                    $('#app').append(appMaker(m1, Gamer));
                    $('#app').on('click', `#leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });
                    $('#app').on('click', `#passActivation` + m1.name, () => { //end activation

                        if (Gamer.active && m1.hasBall) {
                            sendMessage('gotta kick off first');
                        } else if (!m1.hasBall) {
                            $('#app').empty().off();
                            counter++;
                            deploymentPhase(event);
                        }
                        $(".infoAbilBox").remove();
                    })
                    $("body").on(`keydown`, (e) => {
                        defaultPreventer(e);
                        if (e.key === 'Escape') {
                            escapist(m1, otherGamer);
                        }
                    })

                    $('#players').on('click', (e) => {
                        defaultPreventer(e);
                        if (distance(m1.posX, m1.posY, mouX, mouY) <= (m1.baseRadius) && m1.hasBall && !m1.isKicking) {
                            m1.isActivating = true;
                            m1.moveAura = true;
                        }
                    })

                    $("#players").on("click", (e) => {
                        defaultPreventer(e);
                        m1.remainingRun = m1.remainingSprint
                        if (/*distance(m1.posX, m1.posY, mouX, mouY) <= (m1.remainingSprint) && */
                            m1.hasBall && !m1.isKicking && m1.isActivating) {
                            m1.dropper();
                        }
                    })

                    $('#app').on('click', '#kick' + m1.name, () => {
                        if (m1.hasBall) {
                            m1.isMoving = false;
                            m1.moveAura = false;
                            m1.isActivating = false;
                            m1.isKicking = true;
                            ball.beingKicked = true;
                            message = `the ball has to completely pass your half of the pitch, otherwise opponent will be allowed to assign ball to a squaddie of their choosing.`;
                            $('#app').empty().append(appMaker(m1, Gamer));
                            $(".infoAbilBox").remove();
                            m1.hoverButtonAura = 0;
                        };
                    });
                    $("#app").on('mouseenter', `#kick` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        m1.hoverButtonAura = m1.baseRadius + m1.kickDist * inch;
                        const that = {name:"Kick Off!",type:"utility",desc:`Perform initial kick off, remember that ball has to be completeley over the middle line.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#kick` + m1.name, function() {
                        m1.hoverButtonAura = 0;
                        $(".infoAbilBox").remove();
                    });
                    $('#app').on('click', '#undoMove' + m1.name, () => { movementActionReverse();$(".infoAbilBox").remove(); });


                    $('#app').on('click', '#undoMove' + m1.name, () => { movementActionReverse();$(".infoAbilBox").remove(); });
                    $("#app").on('mouseenter', `#undoMove` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Undo Movement",type:"utility",desc:`Allows you reverse movement of a squaddie, helps fend off multitude of game glitches. Although this action is glitched itself.....`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#undoMove` + m1.name, function() {
                        m1.hoverButtonAura = 0;
                        $(".infoAbilBox").remove();
                    });

                    $('#players').on('click', (e) => {
                        defaultPreventer(e);
                        if (m1.isKicking && ball.beingKicked && distance(m1.posX, m1.posY, mouX, mouY) <= (m1.kickDist * inch + m1.baseRadius)) {
                            m1.hasMoved = false;
                            m1.isMoving = false;
                            m1.remainingSprint = m1.sprint * inch + m1.baseRadius;
                            m1.remainingRun = m1.run * inch + m1.baseRadius;
                            m1.hasBall = false;
                            m1.isKicking = false;
                            ball.beingKicked = false;
                            //ball.isOnGround = true;
                            let kickRoll = diceRoller(Gamer, otherGamer, m1, m1, 'kick');
                            Gamer.momentum += 1;
                            movementHistory = [];
                            m1.hasDropped = true;
                            scatterRandomiser(mouX, mouY, true, m1); //m1.hasDropped = false;
                            diceRolled(kickRoll, 4, Gamer1.guild.color);
                            //m1.remainingSprint = m1.sprint*inch+m1.baseRadius;

                            if (kickRoll.filter(el => el >= 4).length > 0 && m1.kickReRoll < 2) {
                                message = `${m1.nameDisplayed} scattered the ball into open field, ready for taking. However if the kick roll was succesfull you can re-roll it once.`;
                                let neSpotx = mouX, neSpoty = mouY;
                                m1.kickReRoll++;
                                $('#app').empty().off();
                                $('#app').on('click', '#kickReRoll' + m1.name, () => {
                                    $('body').find('.snapBallButton').remove();
                                    $(".infoAbilBox").remove();
                                    diceRolledForDisplay = []
                                    teamz.forEach(el => { el.hasBall = false; el.canSnap = false });
                                    ball.isOnGround = false;
                                    m1.hasBall = true;
                                    ball.x = m1.posX; ball.y = m1.posY;
                                    m1.kickReRoll++;
                                    scatterRandomiser(neSpotx, neSpoty, true, m1);
                                    $('#app').empty();
                                    counter++;
                                    m1.isActivating = false;
                                    deploymentPhase(event);
                                });

                    $("#app").on('mouseenter', `#kickReRoll` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Re-roll ball scatter",type:"utility",desc:`The kick was successful so it is possible to re-roll unfavourable ball position. Second result stays.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#kickReRoll` + m1.name, function() {
                        m1.hoverButtonAura = 0;
                        $(".infoAbilBox").remove();
                    });
                                $('#app').on('click', `#passActivation` + m1.name, () => { //end activation
                                    $('#app').empty().off();
                                    counter++;
                                    deploymentPhase(event);
                                    $(".infoAbilBox").remove();
                                });
                                $("#app").on('mouseenter', `#passActivation` + m1.name, function() {
                                    $(".infoAbilBox").remove();
                                    const that = {name:"Pass activation",type:"utility",desc:`The other team will now assign its influence.`};
                                    $("#gameScreen").append(infoAbilBox(that));
                                });
                                $("#app").on('mouseleave', `#passActivation` + m1.name, function() {
                                    m1.hoverButtonAura = 0;
                                    $(".infoAbilBox").remove();
                                });
                                $('#app').append(appMaker(m1, Gamer));
                            } else {
                                m1.isActivating = false;
                                diceRolledForDisplay = []
                                m1.kickReRoll++;
                                counter++;
                                $('#app').empty();
                                deploymentPhase(event);
                            }
                        }
                    });
                } else if (!ball.isOnGround && distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius) && !m1.hasBall) {
                    let kicker = teamz.filter(el => el.hasBall)[0]
                    message = `you must perform kick off with ${kicker.nameDisplayed}.`
                    $('#app').empty().off();
                    $('#app').append(appMaker(kicker, Gamer));
                }

            }
        })

        couriere();
        //////////////////////////////////
    } else if (counter === 3 || counter === 4) {
        //assign inf
        $('#players').on(`click`, function (event) {
            defaultPreventer(event);
            for (let c = 0; c < Gamer.squaddies.length; c++) {
                let m1 = Gamer.squaddies[c];
                //--01-S---activate a squaddie and display him
                if (distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius)) {
                   // $('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                    message = `time to allocate influence to each player.`;
                    $('#appDisplay').slideDown();
                    $('#app').empty().off();
                    actionButtons(m1, Gamer)
                    $('#app').append(appMaker(m1, Gamer));
                    /////////////////////////////////////////////////////////////
                    $('#app').on('click', `#addInf` + m1.name, () => { //add influence
                        if (Gamer.active && Gamer.influence > 0 && m1.infMin < m1.infMax) {
                            Gamer.influence -= 1;
                            m1.infMin += 1;
                            $(".infoAbilBox").remove();
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    })
                    //////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `#minInf` + m1.name, () => { //remove influence
                        if (Gamer.active && m1.infMin > 0) {
                            Gamer.influence += 1;
                            m1.infMin -= 1;
                            $(".infoAbilBox").remove();
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    });
                    $("#gameScreen").on('mouseenter', `#addInf` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Add Influence",type:"utility",desc:`Add influence to ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#gameScreen").on('mouseleave', `#addInf` + m1.name, function() {
                    $(".infoAbilBox").remove();
                    });
                                        $("#gameScreen").on('mouseenter', `#minInf` + m1.name, function() {
                                            $(".infoAbilBox").remove();
                                            const that = {name:"Remove Influence",type:"utility",desc:`remove Influence from ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
                                            $("#gameScreen").append(infoAbilBox(that));
                                        });
                                        $("#gameScreen").on('mouseleave', `#minInf` + m1.name, function() {
                                        $(".infoAbilBox").remove();
                                        });
                    ///////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `#leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });

                    $('#app').on('click', `#passActivation` + m1.name, () => { //end activation
                        if (Gamer.active && Gamer.influence === 0) {
                            counter++;
                        $(".infoAbilBox").remove();
                            deploymentPhase(event);
                        } else {
                            message = 'allocate all influence first';
                            $('#app').empty().off();
                            $('#app').append(appMaker(m1, Gamer));
                        }
                    });
                    $("#app").on('mouseenter', `#passActivation` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Pass activation",type:"utility",desc:`The other team will now assign its influence.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#passActivation` + m1.name, function() {
                        m1.hoverButtonAura = 0;
                        $(".infoAbilBox").remove();
                    });
                    $('#app').on('click', `#giveBallTo` + m1.name, () => {
                        teamz.forEach(el => {
                            if (el.hasBall) {
                                el.hasBall = false
                            }
                        })
                        ball.x = undefined;
                        ball.y = undefined;
                        ball.isOnGround = false;
                        m1.hasBall = true;
                        $(".infoAbilBox").remove();
                    });
                    $("#app").on('mouseenter', `#giveBallTo` + m1.name, function() {
                        $(".infoAbilBox").remove();
                        const that = {name:"Give Ball",type:"utility",desc:`Kick Off wasn't succesful, you can assing ball to any of your squaddies.`};
                        $("#gameScreen").append(infoAbilBox(that));
                    });
                    $("#app").on('mouseleave', `#giveBallTo` + m1.name, function() {
                        m1.hoverButtonAura = 0;
                        $(".infoAbilBox").remove();
                    });

                    // $("#gameScreen").on('mouseenter', `#minInf` + m1.name, function() {
                    //     const that = {name:"Remove Influence",type:"utility",desc:`remove Influence from ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
                    //     $("#gameScreen").append(infoAbilBox($(that).data()));
                    // });
                    // $("#gameScreen").on('mouseleave', `#minInf` + m1.name, function() {
                    // $(".infoAbilBox").remove();
                    // });


                }
            }
        })
// $("#gameScreen").on('mouseenter', `#addInf` + m1.name, function() {
//     const that = {name:"Add Influence",type:"utility",desc:`Add influence to ${m1.nameDisplayed}, influence is used to fuel actions like attacking, chargin, kickin the ball or usin character plays`};
//     $("#gameScreen").append(infoAbilBox($(that).data()));
// });
// $("#gameScreen").on('mouseleave', `#addInf` + m1.name, function() {
// $(".infoAbilBox").remove();
// });
        couriere();
    } else if (counter > 4) {
        switcher(event)
    }

} //deploymentPhase-------------------------------


//}) /////////////////////////////_______DOM________________/////////////////////////////////////////