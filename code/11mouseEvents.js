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

        $('#players').on(`click ${contextmenuEv}`, function (event) {
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
                    $('#app').on('click', `.addInf` + m1.name, () => { //add influence
                        if (Gamer.active && Gamer.influence > 0 && m1.infMin < m1.infMax) {
                            Gamer.influence -= 1;
                            m1.infMin += 1;
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    })
                    //////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `.minInf` + m1.name, () => { //remove influence
                        if (Gamer.active && m1.infMin > 0) {
                            Gamer.influence += 1;
                            m1.infMin -= 1;
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    })
                    ///////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `.leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });

                    $('#app').on('click', `.passActivation` + m1.name, () => { //end activation

                        if (Gamer.active && Gamer.influence === 0) {
                            counter = counter <= 7 ? 8 : 5;
                            Gamer.squaddies.filter(el => el.isActivating).forEach(m1 => {
                                m1.hasMoved = false;
                                m1.isMoving = false;
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
            el.posX = (canvas.width - 4 * inch) / 2 + (i+1) * inch;
            el.posY = Gamer.deployment[0] < canvas.height / 2 ? el.baseRadius + 5 : canvas.height - el.baseRadius - 5;
            adminToolz(event, el, Gamer, 'comeback')
            $('#players').on(contextmenuEv, (e) => {
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
    if(Gamer.gp.hasBall){
        Gamer.gp.isKicking = true;
        ball.beingKicked = true;
        $('#players').on(contextmenuEv, () => {
                    if (distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) <= (2.5 * cm + 10 * inch) && Gamer.gp.hasBall) {
                        scatterRandomiser(mouX, mouY, true, Gamer.gp); //m1.hasDropped = false;
                        Gamer.gp.hasBall = false;
                        Gamer.gp.isKicking = false;
                        ball.beingKicked = false;
                        ball.isOnGround = true;
                    }
                })
        }
    //$('#app').css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`);
    for (let all = 0; all < Gamer.squaddies.length; all++) {
        let teaMate = Gamer.squaddies[all];
        let m1 = teaMate;
        //adminToolz(event,teaMate,Gamer,'d')
        ////////////////////////////////////////////////////////////////////////////////////////////////
        ////////////////////////__________DISPLAY__MODEL__PROPERTIES_______________//////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

        $('#players').on(`click ${contextmenuEv}`, function (event) {
            defaultPreventer(event);

            //--01-S---activate a squaddie and display him
            if (!Gamer.gp.hasBall && !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).filter(el => el.name !== teaMate.name)
                .filter(el => el.hasMoved || el.hasAttacked || el.hasDropped || el.isKicking || el.hasKicked || el.isMoving || el.pressedAbutton || el.hasSnapped).length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && $('#app').find('.plajBookCell').length < 1 //&& !teaMate.isActivating
            ) {
                if (!teaMate.isActivating && teaMate.isKnockedDown) {
                    teaMate.hasMoved = false;
                }
                teaMate.isActivating = true;
               // $('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                // //--the other guy reverting his state

    dummyState1 = cloneX(Gamer1);
    dummyState2 = cloneX(Gamer2);
    dummyBall = ballCloneX (ball);
                let otherSquaddie = Gamer.squaddies.filter(el => el.isActivating === true).filter(el => el.name !== teaMate.name);
                otherSquaddie.forEach(el => el.isActivating = false);
                message = `left-click on a ${Gamer.guild.name} squaddie model to activate it, or click on model to activate it and display movement zone.`;
                $('#appDisplay').slideDown();
                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
            } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && teaMate.hasActivated) {
                sendMessage(`${teaMate.nameDisplayed} has already activated this turn.`)
            }
            if ($('#app').find('.activeOptions').length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).length > 0) {

                let activatingNow = Gamer.squaddies.filter(el => el.isActivating)[0];
                const kickTip = activatingNow.hasBall ? `Kick the ball by pressing kick button, then either choosing teamate, goal post or pitch within the kick zone.<br>` : ``;
                const fightTip = otherGamer.squaddies.some(el => distance(activatingNow.posX, activatingNow.posY, el.posX, el.posY) <= activatingNow.meleeRadius + el.baseRadius) ? `click opposing team player icon within melee range of ${activatingNow.nameDisplayed} to attack. <br>` : ``;
                const KDTip = activatingNow.isKnockedDown ? `And is knocked down, can't attack, hold the ball or move. <br>` : ``;


                if(activatingNow.name !== teaMate.name){message = `${teaMate.nameDisplayed} can't activate in middle of ${activatingNow.nameDisplayed} activation. ${activatingNow.nameDisplayed} needs to end its activation.`} else if (activatingNow.name === teaMate.name){
                            message =  `${teaMate.nameDisplayed} is activating now. 
                        ${kickTip}
                        ${fightTip}
                        ${KDTip}`
                        }
                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
            }
        }) //--01-E--
        //------X*X*X*X###X##X*X*X*X*X*--------------- does NOT work:

        if (Gamer.isActive && distance(teaMate.posX, teaMate.posY, m2.posX, m2.posY) <= (teaMate.meleeRadius + m2.baseRadius)) {
            message = `${teaMate.nameDisplayed} can attack enemies in its melee zone with click on their icon.`;
            $('#app').empty();
            $('#app').append(appMaker(teaMate, Gamer));
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////////////////_________________WAAAAR _______________/////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////






        $('#players').on(contextmenuAtt, (event) => {
            for (let p = 0; p < otherGamer.squaddies.length; p++) {
                let m2 = otherGamer.squaddies[p];
                defaultPreventer(event);
                //<<------== counteratttacks:
                //<<---=== here counter attack buttons
                //counteratttacks <<-------==
                if (m1.drawAbilityAura === 0 && m1.isActivating && 
                    (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius) &&
                    distance(mouX, mouY, m2.posX, m2.posY) < m2.baseRadius
                )) {let inMelee = (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m2.meleeRadius + m1.baseRadius) ? true : false;
                    if ( (inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>0)
                        || ((m1.isCharging^m1.wasCharging) && otherGamer.momentum>0)
                         ) {
                        if (m1.infMin > 0) counterAttackDialogBox(m1, m2);
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
                        })

                    } else {
                        waaar(Gamer, otherGamer, m1, m2);
                    }; //counterattacks
                }
            }
        }) //WAAR
        //////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////_____________CHAAAAARGEEEE_________________////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        for(let bvcm = 0; bvcm < otherGamer.squaddies.length; bvcm++){
                let m2 = otherGamer.squaddies[bvcm];
            $('#app').on('click', `#charge` + teaMate.name, () => {
                if (m1.infMin > 1 && !m1.isMoving && !m1.hasMoved && !m1.isCharging && !m1.isKnockedDown && m1.isActivating) {
                    teaMate.declaringAcharge = true;
                    teaMate.moveAura = false;
                    sendMessage(`${m1.nameDisplayed} can now charge in a straight line. Click one enemy in its threat range to declare a target.`);
                }
            }) //CHHAARGE
            $('#players').on('click',()=>{
                if(m1.declaringAcharge && distance(mouX,mouY,m2.posX,m2.posY)<=m1.remainingRun+m1.meleeRadius
                    &&distance(mouX,mouY,m2.posX,m2.posY)<m2.baseRadius   ){
                    //drawCircle(teaMate.posX, teaMate.posY, teaMate.remainingRun, chargeColor);
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
                    //m1.isMoving = false;
                    //m1.hasMoved = true;
                    m1.wasCharging = true;
                    movementHistory = [];
                    //endsquadieactivvariable = 
                    //invalid charge declaration ends activation--------------------------------
                    // if(m1.wasCharging&&otherGamer.squaddies.filter(el=>distance(teaMate.posX,teaMate.posY,el.posX,el.posY)<=(el.baseRadius+teaMate.meleeRadius)).length<1){
                    //     endSquaddieActivation(teaMate,Gamer1,Gamer2,Gamer, switcher,teamz,turnTransition)
                    // }
                }else{
                    sendMessage(`place ${m1.nameDisplayed} comletely within red circle of the chosen charge target.`)
                }
            })

                }
            })
        }
        //////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////____MOVEMENT___EVENT___LISTENERS__________///////////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////////

        $('#players').on(contextmenuEv, (event) => {
            defaultPreventer(event);
            if (!teaMate.hasMoved && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) &&
                !teaMate.moveAura && 
                //event.button == 2 &&
                 teaMate.isActivating && !teaMate.isKnockedDown) {
                teaMate.moveAura = true;
                teamz.forEach(el=>!el.isActivating || el.wasCharging?el.moveAura=false:el.moveAura=true)
                // teaMate.isMoving = true;
                sendMessage(`if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`)
                // message = `if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`
                // $('#app').empty();
                // $('#app').append(appMaker(teaMate, Gamer));
            } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
            //event.button == 2 && 
            teaMate.isActivating) {
                message = `${teaMate.nameDisplayed} has already moved this turn.`;
                // $('#app').empty();
                // $('#app').append(appMaker(teaMate, Gamer));
            }
        })
        $('#players').on('click', function (e) { //drops a guy down after movement if possible
            //  console.log(teaMate.isMoving,teaMate.hasMoved,teaMate.moveAura)
            if (teaMate.moveAura
                && distance(teaMate.posX, teaMate.posY, mouX, mouY) <= ((teaMate.infMin > 0 ? teaMate.remainingRun : teaMate.remainingSprint) - teaMate.baseRadius
                )) {
                    defaultPreventer(e);
                teaMate.dropper(teamz);
            }; //if
        } //if
        ); //mouseDown

        //////////////////////////////////////////////////////////////////////////////////////////
        /////////////////////_____________HUD___EVENT___LISTENERS_______//////////////////////////
        //////////////////////////////////////////////////////////////////////////////////////////
        $('#app').on('click', `.leaflet` + teaMate.name, () => {
            showLeaflet = showLeaflet ? false : true
        });

        $('#app').on('click', `.passActivation` + teaMate.name, () => { //end activation
            if (Gamer.active && teaMate.isActivating) {
                saveGameState();
                endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
            }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
        })
        $('#app').on('click', `#bonusTime` + teaMate.name, () => {
            teaMate.pressedAbutton = true;
            if (Gamer.momentum > 0 && !teaMate.bonusTime) {
                Gamer.momentum -= 1;
                teaMate.bonusTime = true;
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
            }
        })

        $('#app').on('click', '#forfeitMove' + teaMate.name, () => {
            if (!teaMate.hasMoved && teaMate.isKnockedDown && !teaMate.isMoving) {
                teaMate.pressedAbutton = true;
                teaMate.hasMoved = true;
                teaMate.isKnockedDown = false;
                teaMate.meleeRadius = teaMate.baseRadius + teaMate.meleeZone * inch;
                teaMate.def += 1;
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                movementHistory = [];
            }
        })

        $('#app').on('click', '#healSelf' + teaMate.name, () => {
            if (teaMate.heal < 1 && teaMate.removedConditions !== 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
                teaMate.pressedAbutton = true;
                healFunction(teaMate, Gamer, 4, (teaMate.isDiseased ? 2 : 1), 1);
                movementHistory = [];
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
            }
        })

        $('#app').on('click', '#removeConditions' + teaMate.name, () => {
            if (teaMate.heal !== 1 && teaMate.removedConditions < 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
                teaMate.pressedAbutton = true;
                removeConditionsFuncion(teaMate, Gamer, (teaMate.isDiseased ? 2 : 1), 1);
                $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
                movementHistory = [];
            }
        })

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
                    }
                }
            })

        })

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
                    }
                })
            }
        })


        $("#app").on(`click`, '#cancel'+teaMate.name,() => {
            escapist(m1, otherGamer);
        })

        $('#app').on('click', `.glide` + m1.name, () => {
            if (Gamer.momentum > 0 && !m1.isGliding) {
                Gamer.momentum -= 1;
                m1.isGliding = true;
                if (m1.inRoughGround) {
                    m1.remainingRun += 2 * inch;
                    m1.remainingSprint += 2 * inch;
                }
            }
        })

        $('#app').on('click', `#ruler` + m1.name, () => {
            rulerDopplers = [];
            ruler = ruler ? false : true;
            //let cX = mouX, cY = mouY
            $("#players").on('click', () => {
                if (rulerDopplers.length > 0 && ruler) {
                    rulerDopplers.push([mouX, mouY, rulerDopplers[rulerDopplers.length - 1][2], rulerDopplers[rulerDopplers.length - 1][3]]);
                } else if (rulerDopplers.length < 1 && ruler) {
                    rulerDopplers.push([mouX, mouY, m1.posX, m1.posY]);
                }
            })
        })

        teamz.forEach(el => {
            $('#app').on('click', `#snapBall` + el.name, () => {
                if (!m1.isKnockedDown && m1.isActivating && distance(ball.x, ball.y, el.posX, el.posY) < ball.ballSize + el.baseRadius + 1 * inch && ball.isOnGround) {
                    if (!el.hasSnapped) {
                        $('body').find('.snapBallButton').remove();
                        teamz.forEach(el => {
                            if (el.hasBall) {
                                el.hasBall = false
                            }
                        })
                        ball.x = el.posX;
                        ball.y = el.posY;
                        ball.isOnGround = false;
                        el.hasBall = true;
                        el.hasDropped = false;
                        el.hasSnapped = true;

                        $('#actionButtons').empty().append(actionButtons(el, Gamer, color = Gamer.guild.color));
                    } else {
                        message = `can't snap the ball now`;
                        $('#app').find('.message').text(message);
                    }
                }
            })
        })
        $('#app').on('click', '#undoMove' + teaMate.name, () => { movementActionReverse() })

        $('#app').on('click', '#dropBall' + teaMate.name, () => {
            ball.isInHand = true;
            ball.drawDropAura(teaMate.baseRadius);
            $('#players').on('click', () => {
                if (distance(teaMate.posX, teaMate.posY, mouX, mouY) <= (teaMate.baseRadius + 1 * inch + ball.ballSize) && ball.isInHand && teaMate.hasBall && !teaMate.hasSnapped) {
                    movementHistory = [];
                    ball.isInHand = false;
                    teaMate.hasBall = false;
                    teaMate.hasDropped = true;
                    ball.isOnGround = true;
                    teaMate.hasSnapped = true;
                    ball.x = mouX;
                    ball.y = mouY;
                    snapBallButtonCreator('end', teaMate.name)
                }
            })
        })

        $('#app').on('click','#states'+teaMate.name,()=>{
            Gamer1 = cloneX(dummyState1); 
            Gamer2 = cloneX(dummyState2);
            Gamer.oponent = otherGamer;
            otherGamer.oponent = Gamer;
            ball = ballCloneX(dummyBall)
            teamz = [...Gamer1.squaddies, ...Gamer2.squaddies]
            $("#pitchfield").empty();
            $('#app').empty()//.append(appMaker(m1, Gamer));
            Gamer1.active = Gamer1.active ? false : true;
            Gamer2.active = Gamer2.active ? false : true;
            Gamer = Gamer2.active ? Gamer2 : Gamer1;
            otherGamer = Gamer2.active ? Gamer1 : Gamer2;
            switcher(false);
        })
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////___BAAAL____GAAME___///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //--kick--jQuery--button
        $('#app').on('click', '#kick' + teaMate.name, () => {
            if (!teaMate.hasBall) {
                message = `${teaMate.nameDisplayed} doesn't have a ball to be able to kick it.`;
                $('#app').empty().append(appMaker(teaMate, Gamer));
            } else if (!teaMate.hasBall && teaMate.infMin === 0) {
                message = `${teaMate.nameDisplayed} has ball in possession but lacks influence to kick it.`;
                $('#app').empty();
                $('#app').append(appMaker(teaMate, Gamer));
            } else if (teaMate.hasBall && teaMate.infMin > 0) {
                teaMate.moveAura = false;
                teaMate.isKicking = true;
                ball.beingKicked = true;
                message = `left-click within aura to: scatter a free ball, or pass to a friendly team mate or score a goal.`;
                $('#app').empty().append(appMaker(m1, Gamer));
            };
        })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $('#players').on('click', (e) => {//kick on the field
            defaultPreventer(e);

            
//<<-----------------===    ball pick up by clicking on canvas
if (distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + inch + ball.ballSize) && //player-ball distance
    distance(mouX, mouY, ball.x, ball.y) <= ball.ballSize                                   //klick on ball
    && ball.isOnGround && !m1.hasSnapped && m1.isActivating && !m1.isKnockedDown) {
    ball.isOnGround = false;
    m1.hasBall = true;
    movementHistory = [];
    $('body').find('.snapBallButton').remove();
    $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//<<------------------==    can't pick up dropped ball
} else if (distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + inch + ball.ballSize) && distance(mouX, mouY, ball.x, ball.y) <=                ball.ballSize && ball.isOnGround && m1.hasSnapped) {
    sendMessage(`${m1.nameDisplayed} has dropped the ball, so it can't be picked this activation.`);
}

//<<-----------------== kicking the ball activated
if (m1.isKicking && ball.beingKicked) {
//--kick--happening--against--goalpost------------------------
    if (distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) < (m1.kickDist * inch + m1.baseRadius+2.5*cm) &&//kickin distance to goal post
        distance(mouX, mouY, otherGamer.gp.x, otherGamer.gp.y) < (2.5 * cm) && //detect if mouse is over goal post
        m1.infMin > 0 && Gamer.momentum > 0)
////////////////////////////////////////////////////////////////////////////////////////////////////// 
{    //--kick--happening--against--goalpost------------------------
                    if (m1.isMoving) {
                        m1.isMoving = false;
                        m1.hasMoved = true;
                    }
        teaMate.hasKicked = true;
        let minRollToPass = distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m1.kickDist * inch / 2+2.5*cm) ? 3 : 4;
        let kickRoll = diceRoller(Gamer, otherGamer, m1, m1, 'kick');//rool dies
        let succesfulKickDice = kickRoll.filter(el => el >= minRollToPass).length;//check for succesful roll
        diceRolledForDisplay = [];
        diceRolled(kickRoll, minRollToPass, Gamer.guild.color);//display dies
        if (succesfulKickDice > 0) {
            teaMate.hasKicked = true;
            teaMate.isKicking = false;
            teaMate.hasBall = false;
            ball.beingKicked = false;
            teaMate.infMin -= 1;
            Gamer.momentum -= 1;
            Gamer.goals += 1;
            Gamer.score += 4;
            ball.x = otherGamer.gp.x;
            ball.y = otherGamer.gp.y;
            otherGamer.gp.hasBall = true;
            //not yet: diceRolledForDisplay = [];
            sendMessage(`${m1.nameDisplayed} succesfully scored goal, so either dodge or bank a momentum.`);
//<<--------=====       stitching team plays buttons
            $teamplays = [];
            $teamplays.push(
                             `<li class='teamPlays plajBookCell' id='scoreddodge${m1.name}'>dodge</li>
                             <li class='teamPlays plajBookCell' id='scorebankmomentum${m1.name}'>bank momentum</li>`
                            );
            $('#app').on('click', `#scorebankmomentum${m1.name}`, () => {
                    Gamer.momentum += kickRoll.filter(el=>el>5).length > 1 ? 2 : 1;
                    $teamplays = [];
                    $('.playbookNodes').empty();
                    endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                     });
                        $('#app').empty();
                        $('#app').append(appMaker(m1, Gamer));
            $('#app').on('click', `#scoreddodge${m1.name}`, () => {
                sendMessage(`${m1.nameDisplayed} can now do his dodges, when ready, end the activation.`)
                    m1.isDodging = true;
                    $('#app').off();
                    $('#players').off();        
                    sendMessage(`now you can only dodge with ${m1.nameDisplayed} and/or end this activation.`)
                    $('#app').on('click', `.passActivation` + teaMate.name, () => { //end activation
                        if (Gamer.active && teaMate.isActivating) {
                            saveGameState();
                            endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                        }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
                    })
                    m1.dodgeSquaddie(4);
                    otherGamer.gp.hasBall = true;
                    $teamplays = [];
                    $('.playbookNodes').empty();
                    });
                        //--resolve--goal--kick------------------------------------------
                        /*failed goal kick*/
} else {//<<-------------===    failed goal kick
                        diceRolled(kickRoll, minRollToPass, Gamer1.guild.color);
                        diceRolledForDisplay = [];
                        $('#app').empty();
                        $('#app').append(appMaker(m1, Gamer));
                        teaMate.hasKicked = true;
                        teaMate.isKicking = false;
                        teaMate.hasBall = false;
                        ball.beingKicked = false;
                        teaMate.infMin -= 1;
                        Gamer.momentum -= 1;
                        m1.hasDropped = true;
                        scatterRandomiser(mouX, mouY, true, m1); //m1.hasDropped = false;
                        endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                        /*failed goal kick*/
}
                }//--end of kick against goal post
//////////////////////////////////////////////////////////////////////////////////////////////////////
                Gamer.squaddies.forEach(m2 => {
                    //--player is attempting to pass the ball--------------------------------------------------------
                    if (m1.hasBall && distance(m1.posX, m1.posY, mouX, mouY) <= (m1.kickDist * inch + m2.baseRadius + m1.baseRadius) && distance(m2.posX, m2.posY, mouX, mouY) < (m2.baseRadius) && m1.name !== m2.name) {

                        if (m1.isMoving) {
                            m1.isMoving = false;
                            m1.hasMoved = true;
                        }
                            m1.hasBall = false;
                            m1.hasKicked = true;
                            m1.isKicking = false;
                            ball.beingKicked = false;
                            m1.infMin -= 1;
                            $teamplays = [];
                        let minRollToPass = distance(m1.posX, m1.posY, m2.posX, m2.posY) <= ((m1.kickDist * inch + m1.baseRadius / 2)) ? 3 : 4;
                        let kickRoll = diceRoller(Gamer, otherGamer, m1, m2, 'kick');
                        let succesfulKickDice = kickRoll.filter(el => el >= minRollToPass).length;
                        diceRolledForDisplay = [];
                        diceRolled(kickRoll, minRollToPass, Gamer.guild.color);
                        //--player is sucessfully passing the ball-------------------------------------------------------
                        if (succesfulKickDice > 0) {
                                Gamer.momentum += 1;
                            m2.hasBall = true;
                            $teamplays.push(`<li class='teamPlays plajBookCell' id='recdo1${m1.name}'>kicker<br>dodges</li>
                                <li class='teamPlays plajBookCell' id='recdo2${m1.name}'>bank<br>momentum</li>
                                <li class='teamPlays plajBookCell' id='recdo3${m1.name}'>receiver<br>dodges</li>`);
                            if (distance(m2.posX, m2.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m2.kickDist * inch + m2.baseRadius + 2.5 * cm) && Gamer.momentum > 1) {
                                $teamplays.push(`<li class='teamPlays plajBookCell' id='recdo4${m1.name}'>snap<br>shot</li>`)
                            } //kicker dodges
                            $('#app').on('click', `#recdo1${m1.name}`, () => {
                                m1.isDodging = true;
                                m1.dodgeSquaddie(4);
                                Gamer.momentum -= 1;
                                $teamplays = [];
                                $('#app').empty();
                                $('#app').append(appMaker(m1, Gamer));
                                $(`.playbookNodes`).empty()
                            }); //bank momentum
                            $('#app').on('click', `#recdo2${m1.name}`, () => {
                                $teamplays = [];
                                $('#app').empty();
                                $('#app').append(appMaker(m1, Gamer))
                                $('#app').find(`.playbookNodes`).empty();
                            }); //receiver dodges
                            $('#app').on('click', `#recdo3${m1.name}`, () => {
                                m2.isDodging = true;
                                m2.dodgeSquaddie(4);
                                Gamer.momentum -= 1;
                                $teamplays = [];
                                $('#app').append(appMaker(m1, Gamer))
                                $(`.playbookNodes`).empty()
                            }); 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//<<--------===                 SNAP SHOT
                            $('#app').on('click', `#recdo4${m1.name}`, () => {
                                let snapRoll = diceRoller(Gamer, otherGamer, m2, m1, 'kick');
                                let minpass = distance(m2.posX, m2.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m2.kickDist * inch + m2.baseRadius + 2.5 * cm) / 2 ? 3 : 4;
                                let snapMinRoll = snapRoll.filter(el => el >= minpass);
//<<---== SUCCESFOUL SNAP SHOT
                                if (Gamer.momentum > 1 && snapMinRoll.length > 1) {
                                    Gamer.momentum-=1;
                                    m1.hasKicked = true;
                                    m1.isKicking = false;
                                    m2.hasBall = false;
                                    ball.beingKicked = false;
                                    Gamer.momentum += snapRoll.filter(el=>el>5).length>1?2:1;
                                    Gamer.score += 4;
                                    Gamer.goals += 1;
                                    diceRolledForDisplay = [];
                                        ball.x = otherGamer.gp.x;
                                        ball.y = otherGamer.gp.y;
                                        otherGamer.gp.hasBall = true;
                                    diceRolled(snapMinRoll, minpass, Gamer1.guild.color);
                                    message = `${m2.nameDisplayed} succesfully scored goal, so either dodge or bank a momentum.`;
                                    $teamplays = [];
//<<---== OPTIONS ASSOCIATED WITH SUCCESFOUL SNPA SHOT
                                    $teamplays.push(`<li class='teamPlays plajBookCell' id='scoreddodge${m2.name}'>dodge</li>
                                            <li class='teamPlays plajBookCell' id='scorebankmomentum${m1.name}'>bank momentum</li>`);
//<<--==    BANK momentum
                                    $('#app').on('click.bankmomentum', `#scorebankmomentum${m1.name}`, () => {
                                        $teamplays = [];
                                        $('#app').empty();
                                        $('#app').append(appMaker(m1, Gamer));
                                        $('#app').off('click.bankmomentum');
                                        endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                                    })
//<<--== dodge after succesfoul snpa shot
                                    $('#app').on('click', `#scoreddodge${m2.name}`, () => {
                                        m2.isDodging = true;
                                        $('#app').off();
                                        $('#players').off();        
                                        sendMessage(`now you can only dodge with ${m1.nameDisplayed} and/or end this activation.`)
                                        $('#app').on('click', `.passActivation` + teaMate.name, () => { //end activation
                                            if (Gamer.active && teaMate.isActivating) {
                                                saveGameState();
                                                endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                                            }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
                                        })
                                        m2.dodgeSquaddie(4);
                                        Gamer.momentum-=1;
                                        $teamplays = [];
                                    });
                                    $('#app').empty();
                                    $('#app').append(appMaker(m1, Gamer));
                                    //--resolve--goal--kick------------------------------------------
                                    //--end of kick against goal post
                                    /*failed snap kick*/
} else if (snapMinRoll < 2) { //failure
                                    saveGameState();
                                    Gamer.momentum -= 2;
                                    ball.beingKicked = false;
                                    m2.hasBall = false;
                                    //ball.isOnGround = true;
                                    m1.hasKicked = true;
                                    m1.isKicking = false;
                                    movementHistory = [];
                                    m2.hasDropped = true;
                                    scatterRandomiser(otherGamer.gp.x, otherGamer.gp.y, true, m2); //m1.hasDropped = false;
                                    $('#app').empty();
                                    $('#app').append(appMaker(m1, Gamer));
                                    endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                                    /*failed snap kick*/
}
                            }) //end of snapshot options and instructions
                            movementHistory = [];
                            message = `${m1.nameDisplayed} succesfully passed to ${m2.nameDisplayed}, now you can choose to either dodge or bank a momentum.`;
                            $('#app').empty();
                            $('#app').append(appMaker(m1, Gamer));
                            //--pass is unsuccesfull--------------------------------------------------------------------------
                        } else {

                            if (m1.isMoving) {
                                m1.isMoving = false;
                                m1.hasMoved = true;
                            }
                            ball.beingKicked = false;
                            m1.hasBall = false;
                            //ball.isOnGround = true;
                            m1.hasKicked = true;
                            m1.isKicking = false;
                            m1.infMin -= 1;
                            movementHistory = [];
                            m1.hasDropped = true;
                            diceRolledForDisplay = [];
                            scatterRandomiser(mouX, mouY, true, m1); //m1.hasDropped = false;
                            diceRolled(kickRoll, minRollToPass, Gamer1.guild.color);
                            $('#app').empty();
                            $('#app').append(appMaker(m1, Gamer));
                        }
                    } //teamplays between players IF 
  /*kick into open ground*/else if
                        (m1.hasBall && distance(m1.posX, m1.posY, mouX, mouY) <= (m1.kickDist * inch + m1.baseRadius - ball.ballSize) && m1.infMin > 0 && Gamer.squaddies.filter(el => el.name !== m1.name).filter(el => distance(mouX, mouY, el.posX, el.posY) < el.baseRadius).length < 1) {
                        let kickRoll = diceRoller(Gamer, otherGamer, m1, m1, 'kick');
                        if (m1.isMoving) {
                            m1.isMoving = false;
                            m1.hasMoved = true;
                        }
                        m1.infMin -= 1;
                        m1.hasBall = false;
                        m1.isKicking = false;
                        m1.hasKicked = true;
                        ball.beingKicked = false;
                        m1.hasDropped = true;
                        diceRolledForDisplay = [];
                        scatterRandomiser(mouX, mouY, true, m1); //m1.hasDropped = false;
                        diceRolled(kickRoll, 4, Gamer1.guild.color);
                        movementHistory = [];
                        if (kickRoll.filter(el => el >= 4).length > 0 && m1.kickReRoll < 1) {
                            message = `${m1.nameDisplayed} scattered the ball into open field, ready for taking. However if the kick roll was succesfull you can re-roll it once.`;
                            //let neSpotx = mouX, neSpoty = mouY;
                            m1.kickReRoll++;
                            $('#app').on('click', '#kickReRoll' + m1.name, () => {
                                $('body').find('.snapBallButton').remove();
                                diceRolledForDisplay = []
                                teamz.forEach(el => { el.hasBall = false; el.canSnap = false });
                                ball.isOnGround = false;
                                m1.hasBall = true;
                                ball.x = m1.posX; ball.y = m1.posY;
                                m1.kickReRoll++;
                                diceRolled(kickRoll, 4, Gamer1.guild.color);
                                scatterRandomiser(neSpotx, neSpoty, true, m1);
                                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
                            })

                        }
                        $('#app').empty();
                        $('#app').append(appMaker(m1, Gamer));
                    }
                }) //for each m2 loop END
            } //the kick activator button IF
        })//kick on the field
////////////////////////////////////////___BALL__GAME__ENDS__////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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

} //----------------Main events teaMate m1 loop
//switcher ends















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
        $('#players').on(`click ${contextmenuEv}`, function (event) {
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
                    $('#app').on('click', `.leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });
                    $("#app").on("click", "#generateTerrains", () => {
                        filtered_td = [];
                        td = [];
                        pitchConstructor();
                        terrainsGenerator();
                    });

                    $('#app').on('click', `.passActivation` + m1.name, () => { //end activation
                        if (Gamer.active && teamz.filter(m1 => m1.hasBall).length > 0) {
                            counter++;
                            deploymentPhase(event);
                        } else {
                            message = 'you have to allocate ball to the initial kicker first';

                            $('#app').find('.message').text(message);
                        }
                    })

                    $('#app').on('click', `.giveBallTo` + m1.name, () => {
                        teamz.forEach(el => {
                            if (el.hasBall) {
                                el.hasBall = false
                            }
                        })
                        ball.x = undefined;
                        ball.y = undefined;
                        ball.isOnGround = false;
                        m1.hasBall = true;
                    })
                }

            }
        })

        couriere();
        //deploymentPhase(event)       
    } else if (counter === 2) {
        //kick off here!

        $('#players').on(`click ${contextmenuEv}`, function (event) {
            defaultPreventer(event);
            for (let c = 0; c < Gamer.squaddies.length; c++) {
                let m1 = Gamer.squaddies[c];
                if (distance(m1.posX, m1.posY, mouX, mouY) < (m1.baseRadius) && m1.hasBall) {
                    //$('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
                    message = `click to walk ${m1.nameDisplayed} and left-click to confirm where to move, then left-click on kick button to kick off!`;
                    $('#appDisplay').slideDown();
                    $('#app').empty().off();
                    $('#app').append(appMaker(m1, Gamer));
                    $('#app').on('click', `.leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });
                    $('#app').on('click', `.passActivation` + m1.name, () => { //end activation

                        if (Gamer.active && m1.hasBall) {
                            sendMessage('gotta kick off first');
                        } else if (!m1.hasBall) {
                            $('#app').empty().off();
                            counter++;
                            deploymentPhase(event);
                        }
                    })
                    $("body").on(`keydown`, (e) => {
                        defaultPreventer(e);
                        if (e.key === 'Escape') {
                            escapist(m1, otherGamer);
                        }
                    })

                    $('#players').on(contextmenuEv, (e) => {
                        defaultPreventer(e);
                        if (distance(m1.posX, m1.posY, mouX, mouY) <= (m1.baseRadius) && m1.hasBall && !m1.isKicking) {
                            m1.isActivating = true;
                            m1.moveAura = true;
                        }
                    })

                    $("#players").on("click", (e) => {
                        defaultPreventer(e);
                        if (distance(m1.posX, m1.posY, mouX, mouY) <= (m1.remainingSprint) && m1.hasBall && !m1.isKicking && m1.isActivating) {
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
                        };
                    });

                    $('#app').on('click', '#undoMove' + m1.name, () => { movementActionReverse() })

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
                                })
                                $('#app').on('click', `.passActivation` + m1.name, () => { //end activation
                                    $('#app').empty().off();
                                    counter++;
                                    deploymentPhase(event);
                                })
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
        $('#players').on(`click ${contextmenuEv}`, function (event) {
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
                    $('#app').on('click', `.addInf` + m1.name, () => { //add influence
                        if (Gamer.active && Gamer.influence > 0 && m1.infMin < m1.infMax) {
                            Gamer.influence -= 1;
                            m1.infMin += 1;
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    })
                    //////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `.minInf` + m1.name, () => { //remove influence
                        if (Gamer.active && m1.infMin > 0) {
                            Gamer.influence += 1;
                            m1.infMin -= 1;
                            $('#actionButtons').empty().off().append(actionButtons(m1, Gamer));
                        }
                    })
                    ///////////////////////////////////////////////////////////////////////////////
                    $('#app').on('click', `.leaflet` + m1.name, () => {
                        showLeaflet = showLeaflet ? false : true
                    });

                    $('#app').on('click', `.passActivation` + m1.name, () => { //end activation
                        if (Gamer.active && Gamer.influence === 0) {
                            counter++;
                            deploymentPhase(event);
                        } else {
                            message = 'allocate all influence first';
                            $('#app').empty().off();
                            $('#app').append(appMaker(m1, Gamer));
                        }
                    })
                    $('#app').on('click', `.giveBallTo` + m1.name, () => {
                        teamz.forEach(el => {
                            if (el.hasBall) {
                                el.hasBall = false
                            }
                        })
                        ball.x = undefined;
                        ball.y = undefined;
                        ball.isOnGround = false;
                        m1.hasBall = true;
                    })


                }
            }
        })
        couriere();
    } else if (counter > 4) {
        switcher(event)
    }

} //deploymentPhase-------------------------------


//}) /////////////////////////////_______DOM________________/////////////////////////////////////////