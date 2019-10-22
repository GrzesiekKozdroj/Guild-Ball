// switcher = (event) => {
//     $("#pitchfield").off();$("#players").off();
//     Gamer1.active = Gamer1.active ? false : true;
//     Gamer2.active = Gamer2.active ? false : true;
//     Gamer = Gamer2.active ? Gamer2 : Gamer1;
//     otherGamer = Gamer2.active ? Gamer1 : Gamer2;
//     if (Gamer.squaddies.filter(el => !el.hasActivated).length === 0) {
//         switcher(event);
//     }
//     $('#players').off();
//     $('#app').empty().off();
//     $('body').off();
//     $('body').find('.snapBallButton').remove();
//     let dummyState1 = cloneX(Gamer1);
//     let dummyState2 = cloneX(Gamer2);
//     let dummyBall = ballCloneX (ball);
//     if(Gamer.gp.hasBall){
//         Gamer.gp.isKicking = true;
//         ball.beingKicked = true;
//         $('#players').on(contextmenuEv, () => {
//                     if (distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) <= (2.5 * cm + 10 * inch) && Gamer.gp.hasBall) {
//                         scatterRandomiser(mouX, mouY, true, Gamer.gp); //m1.hasDropped = false;
//                         Gamer.gp.hasBall = false;
//                         Gamer.gp.isKicking = false;
//                         ball.beingKicked = false;
//                         ball.isOnGround = true;
//                     }
//                 })
//         }
//     for (let all = 0; all < Gamer.squaddies.length; all++) {
//         let teaMate = Gamer.squaddies[all];
//         let m1 = teaMate;
//         m1.oldX = m1.posX; m1.oldY = m1.posY;


//         $('#players').on(`click ${contextmenuEv}`, function (event) {
//             defaultPreventer(event);
//             //--01-S---activate a squaddie and display him
            
//         //////////////////////////////////////////////////////////////////////////////////////////////
//         /////////////////////____MOVEMENT___EVENT___LISTENERS__________///////////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////

//          if (__canMove(teaMate)) {
//          teaMate.moveAura = true;
//          if(teaMate.isDodging)teaMate.isDodging = false;
//          teamz.forEach(el=>!el.isActivating || el.wasCharging?el.moveAura=false:el.moveAura=true)
//          sendMessage(`if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`);
//         $('#players').on('click', function (e) { //drops a guy down after movement if possible
//             if (__validMoveDeclaration(teaMate)) {
//              defaultPreventer(e);
//              teaMate.dropper(teamz);
//      }; //if
//  } //if
//  ); //mouseDown
//              } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
//                 teaMate.isActivating) {
//                     sendMessage(`${teaMate.nameDisplayed} has already moved this turn.`);
//              }
//  //##########################____MOVEMENT__ENDS___##########################################//

 
//         ////////////////////////////////////////////////////////////////////////////////////////////////
//         ////////////////////////__________DISPLAY__MODEL__PROPERTIES_______________//////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////

//             if (__chooseModelToActivate(teaMate)) {
//                 Gamer.squaddies.forEach(elm=>{
//                     elm.declaringAcharge = false;
//                 });
//                 if (!teaMate.isActivating && teaMate.isKnockedDown) {
//                     teaMate.hasMoved = false;
//                 }
//                 teaMate.isActivating = true;

//                 atTheStartOfActivation(teaMate);

//                 let otherSquaddie = Gamer.squaddies.filter(el => el.isActivating === true).filter(el => el.name !== teaMate.name);
//                 otherSquaddie.forEach(el => {el.isActivating = false;el.moveAura = false;});

//                 message = `left-click on a ${Gamer.guild.name} squaddie model to activate it, or click on model to activate it and display movement zone.`;
//                 $('#appDisplay').slideDown();
//                 $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
//             } else if ( __hasLareadyActivated(teaMate)) {sendMessage(`${teaMate.nameDisplayed} has already activated this turn.`)     }
// //tips giver:
//             if ($('#app').find('.activeOptions').length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
//             !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).length > 0) {

//                 let activatingNow = Gamer.squaddies.filter(el => el.isActivating)[0];
//                 const kickTip = activatingNow.hasBall ? `Kick the ball by pressing kick button, then either choosing teamate, goal post or pitch within the kick zone.<br>` : ``;
//                 const fightTip = otherGamer.squaddies.some(el => distance(activatingNow.posX, activatingNow.posY, el.posX, el.posY) <= activatingNow.meleeRadius + el.baseRadius) ? `click opposing team player icon within melee range of ${activatingNow.nameDisplayed} to attack. <br>` : ``;
//                 const KDTip = activatingNow.isKnockedDown ? `And is knocked down, can't attack, hold the ball or move. <br>` : ``;


//                 if(activatingNow.name !== teaMate.name){sendMessage (`${teaMate.nameDisplayed} can't activate in middle of ${activatingNow.nameDisplayed} activation. ${activatingNow.nameDisplayed} 
//                 needs to end its activation.`)} else if (activatingNow.name === teaMate.name){
//                             sendMessage(`${teaMate.nameDisplayed} is activating now. 
//                         ${kickTip}
//                         ${fightTip}
//                         ${KDTip}`)
//                         }
//                 $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
//                 $(`[id^="naturesChill"]`).addClass("activatingPassiveSkillo1");
//             }


//         //////////////////////////////////////////////////////////////////////////////////////////////
//         //////////////////////////////_________________WAAAAR _______________/////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////
//             for (let p = 0; p < otherGamer.squaddies.length; p++) {
//                 let m2 = otherGamer.squaddies[p];
//                 defaultPreventer(event);
//                 //<<------== counteratttacks:
//                 //<<---=== here counter attack buttons
//                 //counteratttacks <<-------==
//                 if ( m1.drawAbilityAura === 0 && m1.isActivating && __isInMelee(m1, m2) ) {
//                         if(m1.isMoving)unpredictableMovement(m1);
//                     let inMelee = (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m2.meleeRadius + m1.baseRadius) ? true : false;
//                     if ( (inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>0)
//                         || ((m1.isCharging^m1.wasCharging) && otherGamer.momentum>0)
//                          ) {
//                         if (m1.infMin > 0|| (m1.wasCharging && hasPassive(m1,"Furious"))) counterAttackDialogBox(m1, m2);
//                         $('body').on('click.counterattack', '#opt1' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             otherGamer.momentum -= 1;
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt2' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = false;
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt3' + m2.name, () => {
//                             m2.willCounter = false;
//                             m2.counterForAttack.push(m1.name);
//                             waaar(Gamer, otherGamer, m1, m2);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt4' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.bonusTime = true;
//                             otherGamer.momentum -= 2;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt5' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             otherGamer.momentum -= 1;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt6' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             otherGamer.momentum -= 2;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt7' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             m2.bonusTime = true;
//                             otherGamer.momentum -= 3;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });
//                     }else{
//                         waaar(Gamer, otherGamer, m1, m2);
//                     }; //counterattacks
//                 }//WAAR

//                     if(m1.declaringAcharge && distance(mouX,mouY,m2.posX,m2.posY)<=m1.remainingRun+m1.meleeRadius//charge
//                         &&distance(mouX,mouY,m2.posX,m2.posY)<m2.baseRadius   ){
//                         m1.isCharging = true;
//                         m1.isMoving = true;
//                         m1.isPushed = false;
//                         m1.isDodging = false;
//                         m1.declaringAcharge = false;
//                         m1.chargeTarget = m2;
//                         sendMessage(`${m1.nameDisplayed} now must land within circle around chosen charge target and withing charge range.`)
//                 $('#players').on('click.sprintCharge', () => {
//                     if (!m1.declaringAcharge && m1.isCharging && distance(m1.posX, m1.posY, mouX, mouY) <= m1.remainingRun && !m1.hasMoved
//                     && distance(mouX,mouY,m1.chargeTarget.posX,m1.chargeTarget.posY)<=m1.meleeRadius+m1.chargeTarget.baseRadius+m1.baseRadius    ) {
//                         $('#players').off('click.sprintCharge');
//                         teaMate.dropper();
//                         m1.wasCharging = true;
//                         movementHistory = [];
//                     }else{
//                         sendMessage(`place ${m1.nameDisplayed} comletely within red circle of the chosen charge target.`)
//                     }
//                 })
    
//                     }



//             }//m2 loop
            
            
//         }) //--01-E--
//         //////////////////////////////////////////////////////////////////////////////////////////
//         ///////////////////_____________CHAAAAARGEEEE_________________////////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////
//             $('#app').on('click', `#charge` + teaMate.name, () => {
//                 if ((m1.infMin > 1 || hasPassive(m1,"Furious")) && !m1.isMoving && !m1.hasMoved && !m1.isCharging && !m1.isKnockedDown && m1.isActivating && isEngaged(m1)<1) {
//                     teaMate.declaringAcharge = true;
//                     teaMate.moveAura = false;
//                     sendMessage(`${m1.nameDisplayed} can now charge in a straight line. Click one enemy in its threat range to declare a target.`);
//                 }
//             }) //CHHAARGE

//             $("#app").on('mouseenter', `#charge` + teaMate.name, function() {
//                 $(".infoAbilBox").remove();
//                 teaMate.hoverButtonAura = teaMate.remainingRun+teaMate.meleeRadius-teaMate.baseRadius;
//                 const that = {name:"Charge",type:"utility",desc:`Spend 2 influence to charge in a straight line a opposing squaddie, can't run through walls or other players`};
//                 $("#gameScreen").append(infoAbilBox(that));
//             });
//             $("#app").on('mouseleave', `#charge` + teaMate.name, function() {
//                 teaMate.hoverButtonAura = 0;
//                 $(".infoAbilBox").remove();
//             });



//         //////////////////////////////////////////////////////////////////////////////////////////
//         /////////////////////_____________HUD___EVENT___LISTENERS_______//////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////
//         $('#app').on('click', `#leaflet` + teaMate.name, () => {
//             showLeaflet = showLeaflet ? false : true
//         });

//         $('#app').on('click', `#passActivation` + teaMate.name, () => { //end activation
//             if (Gamer.active && teaMate.isActivating) {
//                 saveGameState();
//                 endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
//                 $(".infoAbilBox").remove();
//             }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
//         });
//         $("#app").on('mouseenter', `#passActivation` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Pass Activation",type:"utility",desc:`End ${teaMate.nameDisplayed} activation and allow other team to do their turn`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#passActivation` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });
//         $('#app').on('click', `#bonusTime` + teaMate.name, () => {
//             if (Gamer.momentum > 0 && !teaMate.bonusTime) {
//             teaMate.pressedAbutton = true;
//                 Gamer.momentum -= 1;
//                 teaMate.bonusTime = true;
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#bonusTime` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Bonus Time",type:"utility",desc:`Pay 1 momentum to add one extra dice to the next roll.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#bonusTime` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#forfeitMove' + teaMate.name, () => {
//             if (!teaMate.hasMoved && teaMate.isKnockedDown && !teaMate.isMoving) {
//                 teaMate.pressedAbutton = true;
//                 teaMate.hasMoved = true;
//                 teaMate.isKnockedDown = false;
//                 teaMate.meleeRadius = teaMate.baseRadius + teaMate.meleeZone * inch;
//                 teaMate.def += 1;
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 movementHistory = [];
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#forfeitMove` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Forfeit Movement",type:"utility",desc:`Sacrifice ability to move this turn in order to stand up.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#forfeitMove` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#healSelf' + teaMate.name, () => {
//             if (teaMate.heal < 1 && teaMate.removedConditions !== 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
//                 teaMate.pressedAbutton = true;
//                 healFunction(teaMate, Gamer, 4, (teaMate.isDiseased ? 2 : 1), 1);
//                 movementHistory = [];
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#healSelf` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Heal",type:"utility",desc:`Spend one momentum to heal 4 wounds off ${teaMate.nameDisplayed}`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#healSelf` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#removeConditions' + teaMate.name, () => {
//             if (teaMate.heal !== 1 && teaMate.removedConditions < 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
//                 teaMate.pressedAbutton = true;
//                 removeConditionsFuncion(teaMate, Gamer, (teaMate.isDiseased ? 2 : 1), 1);
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 movementHistory = [];
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#removeConditions` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Remove Conditions",type:"utility",desc:`Spend one momentum to remove all conditions off ${teaMate.nameDisplayed}`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#removeConditions` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#healAFriend' + teaMate.name, () => {
//             healCursor = 1;
//             //cursor update
//             //actual canvas click
//             $('#players').on('click', () => {
//                 for (let hf = 0; hf < Gamer.squaddies.length; hf++) {
//                     teaMate.pressedAbutton = true;
//                     let m2 = Gamer.squaddies[hf]
//                     if (healCursor > 0 && m2.heal < 1 && m2.removedConditions < 2 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.hpMin < m2.hp && m2.heal < 1 && m2.removedConditions < 2) {
//                         healFunction(m2, Gamer, 4, (teaMate.isDiseased ? 3 : 2), 2);
//                         $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
//                         healCursor = 0;
//                         movementHistory = [];
//                         $(".infoAbilBox").remove();
//                     }
//                 }
//             })
//         });

//         $("#app").on('mouseenter', `#healAFriend` + teaMate.name, function() {
//             teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
//             $(".infoAbilBox").remove();
//             const that = {name:"Heal Friend",type:"utility",desc:`Spend two momentum to heal 4 wounds on team mate within 8 inches`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#healAFriend` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#takeAbreather' + teaMate.name, () => {
//             healCursor = 2
//             for (let rc = 0; rc < Gamer.squaddies.length; rc++) {
//                 let m2 = Gamer.squaddies[rc];
//                 //cursor update
//                 //actual click
//                 $('#players').on('click', () => {
//                     teaMate.pressedAbutton = true;
//                     if (healCursor > 0 && m2.heal < 2 && m2.removedConditions < 1 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.removedConditions < 1 && m2.heal < 2 && hasConditions(m2)) {
//                         removeConditionsFuncion(m2, Gamer, (m2.isDiseased ? 3 : 2), 2);
//                         movementHistory = [];
//                         $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
//                         healCursor = 0;
//                         $(".infoAbilBox").remove();
//                     }
//                 })
//             }
//         });
//         $("#app").on('mouseenter', `#takeAbreather` + teaMate.name, function() {
//             teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
//             $(".infoAbilBox").remove();
//             const that = {name:"Take A Breather",type:"utility",desc:`Spend two momentum to remove all conditions on team mate within 8 inches.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#takeAbreather` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });


//         $("#app").on(`click`, '#cancel'+teaMate.name,() => {
//             escapist(m1, otherGamer);
//             $(".infoAbilBox").remove();
//         });
//         $("#app").on('mouseenter', `#cancel` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Cancel Action",type:"utility",desc:`Stops the intent of action like kick, run, charge or using an ability.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#cancel` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', `#glide` + m1.name, () => {
//             if (Gamer.momentum > 0 && !m1.isGliding && !hasPassive(m1,"Winters Blessing") && !hasPassive(m1,"Light Footed")) {
//                 Gamer.momentum -= 1;
//                 m1.isGliding = true;
//                 if (m1.inRoughGround) {
//                     m1.remainingRun += 2 * inch;
//                     m1.remainingSprint += 2 * inch;
//                 }
//                     $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#glide` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Glide",type:"utility",desc:`Spend one momentum to remove rough ground movement penalty for ${teaMate.nameDisplayed} until next turn.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#glide` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', `#ruler` + m1.name, () => {
//             rulerDopplers = [];
//             ruler = ruler ? false : true;
//             $(".infoAbilBox").remove();
//             //let cX = mouX, cY = mouY
//             $("#players").on('click', () => {
//                 if (rulerDopplers.length > 0 && ruler) {
//                     rulerDopplers.push([mouX, mouY, rulerDopplers[rulerDopplers.length - 1][2], rulerDopplers[rulerDopplers.length - 1][3]]);
//                 } else if (rulerDopplers.length < 1 && ruler) {
//                     rulerDopplers.push([mouX, mouY, m1.posX, m1.posY]);
//                 }
//             })
//         });
//         $("#app").on('mouseenter', `#ruler` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Ruler",type:"utility",desc:`Allows you to multiple check distances for active squaddie.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#ruler` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#undoMove' + teaMate.name, () => { movementActionReverse(); 
//             $(".infoAbilBox").remove(); });

//         $("#app").on('mouseenter', `#undoMove` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Undo Movement",type:"utility",desc:`Allows you reverse movement of a squaddie, helps fend off multitude of game glitches. Although this action is glitched itself.....`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#undoMove` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });


//         $('#app').on('click','#states'+teaMate.name,()=>{
//             commonAfterInstruction({ m1: teaMate });
//             idear = 0;
//             ruler = false;
//             Gamer1 = cloneX(dummyState1); 
//             Gamer2 = cloneX(dummyState2);
//             Gamer.oponent = otherGamer;
//             otherGamer.oponent = Gamer;
//             ball = ballCloneX(dummyBall)
//             teamz = [...Gamer1.squaddies, ...Gamer2.squaddies]
//             $("#pitchfield").empty();
//             $('body').find('.counterbox').off().remove();
//             $('#app').empty()//.append(appMaker(m1, Gamer));
//             $teamplays = [];
//             $(`.playbookNodes`).empty();
//             Gamer1.active = Gamer1.active ? false : true;
//             Gamer2.active = Gamer2.active ? false : true;
//             Gamer = Gamer2.active ? Gamer2 : Gamer1;
//             otherGamer = Gamer2.active ? Gamer1 : Gamer2;
//             switcher(false);
//             $(".infoAbilBox").remove();
//         });
//         $("#app").on('mouseenter', `#states` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Undo whole activation",type:"utility",desc:`Allows you to completely undo current activation. Helps unscrew broken game state, altough its buggy itself.....`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#states` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });
// ////////////////////////////////////////BALLS PLUG//////////////////////////////////////////////


//         theBallsGame(m1,teaMate);


// ////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


//         abilitiesEvents(m1,Gamer,otherGamer);


// ////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


//         $("body").on(`keydown`, (e) => {
//             defaultPreventer(e);
//             if (e.key === 'Escape') {
//                 if(m1.abilities.activeOwned.some(el=>el[0]==="Back to the Shadows" && el[1] === true)){
//                     endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
//                 }else{
//                     escapist(m1, otherGamer);
//                 }
//             }
//         })
//     } //for all Gagmer squaddies length

//     if ($('#app').empty() && !Gamer.gp.hasBall) {
//         $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">left click to activate player, click to display move aura, then left click to move player, active players can attack opposing team by clicking enemies within its melee zone, use escape button if you want to cancel i.e. kick or charge. also for the sake and liberty of testing there are only two pre-set teams out of 17 different guilds.</div>`)
//     } else if(Gamer.gp.hasBall){
//         $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">${Gamer.guild.name} Guild must now resolve goal kick with left-click. Then proceed with normal activation.</div>`);
//     }

// } //switcher ends


// switcher = (event) => {
//     $("#pitchfield").off();$("#players").off();
//     Gamer1.active = Gamer1.active ? false : true;
//     Gamer2.active = Gamer2.active ? false : true;
//     Gamer = Gamer2.active ? Gamer2 : Gamer1;
//     otherGamer = Gamer2.active ? Gamer1 : Gamer2;
//     if (Gamer.squaddies.filter(el => !el.hasActivated).length === 0) {
//         switcher(event);
//     }
//     $('#players').off();
//     $('#app').empty().off();
//     $('body').off();
//     $('body').find('.snapBallButton').remove();
//     let dummyState1 = cloneX(Gamer1);
//     let dummyState2 = cloneX(Gamer2);
//     let dummyBall = ballCloneX (ball);
//     if(Gamer.gp.hasBall){
//         Gamer.gp.isKicking = true;
//         ball.beingKicked = true;
//         $('#players').on(contextmenuEv, () => {
//                     if (distance(mouX, mouY, Gamer.gp.x, Gamer.gp.y) <= (2.5 * cm + 10 * inch) && Gamer.gp.hasBall) {
//                         scatterRandomiser(mouX, mouY, true, Gamer.gp); //m1.hasDropped = false;
//                         Gamer.gp.hasBall = false;
//                         Gamer.gp.isKicking = false;
//                         ball.beingKicked = false;
//                         ball.isOnGround = true;
//                     }
//                 })
//         }
//     //$('#app').css('background', `url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat, url(./icons/cursor/wood.jpg) 0 0 / 390px`);
//     for (let all = 0; all < Gamer.squaddies.length; all++) {
//         let teaMate = Gamer.squaddies[all];
//         let m1 = teaMate;
//         m1.oldX = m1.posX; m1.oldY = m1.posY;
//         //adminToolz(event,teaMate,Gamer,'d')
//                 //////////////////////////////////////////////////////////////////////////////////////////////
//         /////////////////////____MOVEMENT___EVENT___LISTENERS__________///////////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////

//         $('#players').on(contextmenuEv, (event) => {
//             defaultPreventer(event);
//          if (__canMove(teaMate)) {
//                 teaMate.moveAura = true;
//                 if(teaMate.isDodging)teaMate.isDodging = false;
//                 teamz.forEach(el=>!el.isActivating || el.wasCharging?el.moveAura=false:el.moveAura=true)
//                 // teaMate.isMoving = true;
//                 sendMessage(`if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`)
//                 // message = `if ${teaMate.nameDisplayed} has influence, ${teaMate.nameDisplayed} could sprint, left-click to move. You can cancel by pressing escape, hovering beyond movement zone or on other player.`
//                 // $('#app').empty();
//                 // $('#app').append(appMaker(teaMate, Gamer));
//         $('#players').on('click', function (e) { //drops a guy down after movement if possible
//             if (teaMate.moveAura && distance (mouX,mouY,teaMate.posX,teaMate.posY)>teaMate.baseRadius*.42 &&
//                 distance(teaMate.posX, teaMate.posY, mouX, mouY) <= ((teaMate.infMin > 0 ? teaMate.remainingRun : teaMate.remainingSprint) - teaMate.baseRadius
//                 )) {
//                     defaultPreventer(e);
//                     teaMate.dropper(teamz);
//             }; //if
//         } //if
//         ); //mouseDown
//             } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && 
//             //event.button == 2 && 
//             teaMate.isActivating) {
//                 sendMessage(`${teaMate.nameDisplayed} has already moved this turn.`);
//                 // $('#app').empty();
//                 // $('#app').append(appMaker(teaMate, Gamer));
//             }
//         })
//         //##########################____MOVEMENT__ENDS___##########################################//

//         ////////////////////////////////////////////////////////////////////////////////////////////////
//         ////////////////////////__________DISPLAY__MODEL__PROPERTIES_______________//////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////

//         $('#players').on(`click ${contextmenuEv}`, function (event) {
//             defaultPreventer(event);
//             //--01-S---activate a squaddie and display him
//             if (!Gamer.gp.hasBall && !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).filter(el => el.name !== teaMate.name)
//                 .filter(el => el.hasMoved || el.hasAttacked || el.hasDropped || el.isKicking || el.hasKicked || el.isMoving || el.pressedAbutton || el.hasSnapped).length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && $('#app').find('.plajBookCell').length < 1 //&& !teaMate.isActivating
//             ) {
//                 Gamer.squaddies.forEach(elm=>{
//                     elm.declaringAcharge = false;
//                 });
//                 if (!teaMate.isActivating && teaMate.isKnockedDown) {
//                     teaMate.hasMoved = false;
//                 }
//                 teaMate.isActivating = true;
//                // $('#app').css('background', 'url(./icons/cursor/wood.jpg) 0 0 / 390px');
//                 // //--the other guy reverting his state;


//             if(hasActiveUnused(teaMate,"Natures Chill") )
//             {
//                 teaMate.moveAura = false;
//                 idear = "Nature's Chill";
//                 commonPreInstruction({ m1: teaMate });
//                 const snaret = new Token(mouX, mouY, 1.5 * inch, "Nature's Chill", Gamer.guild.color);
//                 snaret.isInHand = true;
//                 Gamer.tokens.push(snaret);
//                 m1.drawAbilityAura = m1.baseRadius + 9.5 * inch;
//                 $("#players").on('click.usingAbility',  () => {
//                     if (distance(m1.posX, m1.posY, mouX, mouY) <= m1.baseRadius + 9.5 * inch && snaret.isPlacable) {
//                         commonAfterInstruction({ m1: m1 });
//                         teaMate.moveAura = true;
//                     snaret.isInHand = false;
//                     Gamer.tokens.forEach(el=>el.isInHand=false);
//                     makeActiveOpt(teaMate,"Natures Chill");
//                     $('#players').on('click', function (e) { //drops a guy down after movement if possible
//                         if (teaMate.moveAura && distance (mouX,mouY,teaMate.posX,teaMate.posY)>teaMate.baseRadius*.42 &&
//                             distance(teaMate.posX, teaMate.posY, mouX, mouY) <= ((teaMate.infMin > 0 ? teaMate.remainingRun : teaMate.remainingSprint) - teaMate.baseRadius
//                             )) {
//                                 defaultPreventer(e);
//                                 teaMate.dropper(teamz);
//                         }; //if
//                     } //if
//                     ); //mouseDown
//                     }
//                 });
//             }

//                 let otherSquaddie = Gamer.squaddies.filter(el => el.isActivating === true).filter(el => el.name !== teaMate.name);
//                 otherSquaddie.forEach(el => {el.isActivating = false;el.moveAura = false;});
//                 message = `left-click on a ${Gamer.guild.name} squaddie model to activate it, or click on model to activate it and display movement zone.`;
//                 $('#appDisplay').slideDown();
//                 $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
//             } else if (Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && teaMate.hasActivated) {
//                 sendMessage(`${teaMate.nameDisplayed} has already activated this turn.`)
//             }
//             if ($('#app').find('.activeOptions').length < 1 && Gamer.active && distance(teaMate.posX, teaMate.posY, mouX, mouY) < (teaMate.baseRadius) && !teaMate.hasActivated && Gamer.squaddies.filter(el => el.isActivating).length > 0) {

//                 let activatingNow = Gamer.squaddies.filter(el => el.isActivating)[0];
//                 const kickTip = activatingNow.hasBall ? `Kick the ball by pressing kick button, then either choosing teamate, goal post or pitch within the kick zone.<br>` : ``;
//                 const fightTip = otherGamer.squaddies.some(el => distance(activatingNow.posX, activatingNow.posY, el.posX, el.posY) <= activatingNow.meleeRadius + el.baseRadius) ? `click opposing team player icon within melee range of ${activatingNow.nameDisplayed} to attack. <br>` : ``;
//                 const KDTip = activatingNow.isKnockedDown ? `And is knocked down, can't attack, hold the ball or move. <br>` : ``;


//                 if(activatingNow.name !== teaMate.name){sendMessage (`${teaMate.nameDisplayed} can't activate in middle of ${activatingNow.nameDisplayed} activation. ${activatingNow.nameDisplayed} needs to end its activation.`)} else if (activatingNow.name === teaMate.name){
//                             sendMessage(`${teaMate.nameDisplayed} is activating now. 
//                         ${kickTip}
//                         ${fightTip}
//                         ${KDTip}`)
//                         }
//                 $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
//                 $(`[id^="naturesChill"]`).addClass("activatingPassiveSkillo1");
//             }
//         }) //--01-E--
//         //------X*X*X*X###X##X*X*X*X*X*--------------- does NOT work:

//         if (Gamer.isActive && distance(teaMate.posX, teaMate.posY, m2.posX, m2.posY) <= (teaMate.meleeRadius + m2.baseRadius)) {
//             message = `${teaMate.nameDisplayed} can attack enemies in its melee zone with click on their icon.`;
//             $('#app').empty();
//             $('#app').append(appMaker(teaMate, Gamer));
//         }
//         //////////////////////////////////////////////////////////////////////////////////////////////
//         //////////////////////////////_________________WAAAAR _______________/////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////////






//         $('#players').on(contextmenuAtt, (event) => {
//             for (let p = 0; p < otherGamer.squaddies.length; p++) {
//                 let m2 = otherGamer.squaddies[p];
//                 defaultPreventer(event);
//                 //<<------== counteratttacks:
//                 //<<---=== here counter attack buttons
//                 //counteratttacks <<-------==
//                 if ( m1.drawAbilityAura === 0 && m1.isActivating && 
//                     (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= (m1.meleeRadius + m2.baseRadius) &&
//                     distance(mouX, mouY, m2.posX, m2.posY) < m2.baseRadius
//                 )) {
//                         if(m1.isMoving)unpredictableMovement(m1);
//                     let inMelee = (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m2.meleeRadius + m1.baseRadius) ? true : false;
//                     if ( (inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>0)
//                         || ((m1.isCharging^m1.wasCharging) && otherGamer.momentum>0)
//                          ) {
//                         if (m1.infMin > 0|| (m1.wasCharging && hasPassive(m1,"Furious"))) counterAttackDialogBox(m1, m2);
//                         $('body').on('click.counterattack', '#opt1' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             otherGamer.momentum -= 1;
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt2' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = false;
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt3' + m2.name, () => {
//                             m2.willCounter = false;
//                             m2.counterForAttack.push(m1.name);
//                             waaar(Gamer, otherGamer, m1, m2);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt4' + m2.name, () => {
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.bonusTime = true;
//                             otherGamer.momentum -= 2;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt5' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             otherGamer.momentum -= 1;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt6' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             otherGamer.momentum -= 2;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });

//                         $('body').on('click.counterattack', '#opt7' + m2.name, () => {
//                             m2.defensiveStance += 1;
//                             m2.bonusTime = true;
//                             otherGamer.momentum -= 3;
//                             waaar(Gamer, otherGamer, m1, m2);
//                             m2.willCounter = true;
//                             m2.counterForAttack.push(m1.name);
//                             $('body').find('#counterbox' + m2.name).off().remove();
//                             $('body').off('click.counterattack')
//                         });
//                     }else{
//                         waaar(Gamer, otherGamer, m1, m2);
//                     }; //counterattacks
//                 }
//             }
//         }) //WAAR
//         //////////////////////////////////////////////////////////////////////////////////////////
//         ///////////////////_____________CHAAAAARGEEEE_________________////////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////
//         for(let bvcm = 0; bvcm < otherGamer.squaddies.length; bvcm++){
//                 let m2 = otherGamer.squaddies[bvcm];
//             $('#app').on('click', `#charge` + teaMate.name, () => {
//                 if ((m1.infMin > 1 || hasPassive(m1,"Furious")) && !m1.isMoving && !m1.hasMoved && !m1.isCharging && !m1.isKnockedDown && m1.isActivating && isEngaged(m1)<1) {
//                     teaMate.declaringAcharge = true;
//                     teaMate.moveAura = false;
//                     sendMessage(`${m1.nameDisplayed} can now charge in a straight line. Click one enemy in its threat range to declare a target.`);
//                 }
//             }) //CHHAARGE

//             $("#app").on('mouseenter', `#charge` + teaMate.name, function() {
//                 $(".infoAbilBox").remove();
//                 teaMate.hoverButtonAura = teaMate.remainingRun+teaMate.meleeRadius-teaMate.baseRadius;
//                 const that = {name:"Charge",type:"utility",desc:`Spend 2 influence to charge in a straight line a opposing squaddie, can't run through walls or other players`};
//                 $("#gameScreen").append(infoAbilBox(that));
//             });
//             $("#app").on('mouseleave', `#charge` + teaMate.name, function() {
//                 teaMate.hoverButtonAura = 0;
//                 $(".infoAbilBox").remove();
//             });

//             $('#players').on('click',()=>{
//                 if(m1.declaringAcharge && distance(mouX,mouY,m2.posX,m2.posY)<=m1.remainingRun+m1.meleeRadius
//                     &&distance(mouX,mouY,m2.posX,m2.posY)<m2.baseRadius   ){
//                     //drawCircle(teaMate.posX, teaMate.posY, teaMate.remainingRun, chargeColor);
//                     m1.isCharging = true;
//                     m1.isMoving = true;
//                     m1.isPushed = false;
//                     m1.isDodging = false;
//                     m1.declaringAcharge = false;
//                     m1.chargeTarget = m2;
//                     sendMessage(`${m1.nameDisplayed} now must land within circle around chosen charge target and withing charge range.`)
//             $('#players').on('click.sprintCharge', () => {
//                 if (!m1.declaringAcharge && m1.isCharging && distance(m1.posX, m1.posY, mouX, mouY) <= m1.remainingRun && !m1.hasMoved
//                 && distance(mouX,mouY,m1.chargeTarget.posX,m1.chargeTarget.posY)<=m1.meleeRadius+m1.chargeTarget.baseRadius+m1.baseRadius    ) {
//                     $('#players').off('click.sprintCharge');
//                     teaMate.dropper();
//                     //m1.isMoving = false;
//                     //m1.hasMoved = true;
//                     m1.wasCharging = true;
//                     movementHistory = [];
//                     //endsquadieactivvariable = 
//                     //invalid charge declaration ends activation--------------------------------
//                     // if(m1.wasCharging&&otherGamer.squaddies.filter(el=>distance(teaMate.posX,teaMate.posY,el.posX,el.posY)<=(el.baseRadius+teaMate.meleeRadius)).length<1){
//                     //     endSquaddieActivation(teaMate,Gamer1,Gamer2,Gamer, switcher,teamz,turnTransition)
//                     // }
//                 }else{
//                     sendMessage(`place ${m1.nameDisplayed} comletely within red circle of the chosen charge target.`)
//                 }
//             })

//                 }
//             })
//         }


//         //////////////////////////////////////////////////////////////////////////////////////////
//         /////////////////////_____________HUD___EVENT___LISTENERS_______//////////////////////////
//         //////////////////////////////////////////////////////////////////////////////////////////
//         $('#app').on('click', `#leaflet` + teaMate.name, () => {
//             showLeaflet = showLeaflet ? false : true
//         });

//         $('#app').on('click', `#passActivation` + teaMate.name, () => { //end activation
//             if (Gamer.active && teaMate.isActivating) {
//                 saveGameState();
//                 endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
//                 $(".infoAbilBox").remove();
//             }else if(otherGamer.gp.hasBall){sendMessage(`click on ${otherGamer.guild.name} goal post.`)}
//         });
//         $("#app").on('mouseenter', `#passActivation` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Pass Activation",type:"utility",desc:`End ${teaMate.nameDisplayed} activation and allow other team to do their turn`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#passActivation` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });
//         $('#app').on('click', `#bonusTime` + teaMate.name, () => {
//             if (Gamer.momentum > 0 && !teaMate.bonusTime) {
//             teaMate.pressedAbutton = true;
//                 Gamer.momentum -= 1;
//                 teaMate.bonusTime = true;
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#bonusTime` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Bonus Time",type:"utility",desc:`Pay 1 momentum to add one extra dice to the next roll.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#bonusTime` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#forfeitMove' + teaMate.name, () => {
//             if (!teaMate.hasMoved && teaMate.isKnockedDown && !teaMate.isMoving) {
//                 teaMate.pressedAbutton = true;
//                 teaMate.hasMoved = true;
//                 teaMate.isKnockedDown = false;
//                 teaMate.meleeRadius = teaMate.baseRadius + teaMate.meleeZone * inch;
//                 teaMate.def += 1;
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 movementHistory = [];
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#forfeitMove` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Forfeit Movement",type:"utility",desc:`Sacrifice ability to move this turn in order to stand up.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#forfeitMove` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#healSelf' + teaMate.name, () => {
//             if (teaMate.heal < 1 && teaMate.removedConditions !== 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
//                 teaMate.pressedAbutton = true;
//                 healFunction(teaMate, Gamer, 4, (teaMate.isDiseased ? 2 : 1), 1);
//                 movementHistory = [];
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#healSelf` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Heal",type:"utility",desc:`Spend one momentum to heal 4 wounds off ${teaMate.nameDisplayed}`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#healSelf` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#removeConditions' + teaMate.name, () => {
//             if (teaMate.heal !== 1 && teaMate.removedConditions < 1 && Gamer.momentum > teaMate.isDiseased ? 1 : 0) {
//                 teaMate.pressedAbutton = true;
//                 removeConditionsFuncion(teaMate, Gamer, (teaMate.isDiseased ? 2 : 1), 1);
//                 $('#actionButtons').empty().append(actionButtons(teaMate, Gamer));
//                 movementHistory = [];
//                 $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#removeConditions` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Remove Conditions",type:"utility",desc:`Spend one momentum to remove all conditions off ${teaMate.nameDisplayed}`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#removeConditions` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#healAFriend' + teaMate.name, () => {
//             healCursor = 1;
//             //cursor update
//             //actual canvas click
//             $('#players').on('click', () => {
//                 for (let hf = 0; hf < Gamer.squaddies.length; hf++) {
//                     teaMate.pressedAbutton = true;
//                     let m2 = Gamer.squaddies[hf]
//                     if (healCursor > 0 && m2.heal < 1 && m2.removedConditions < 2 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.hpMin < m2.hp && m2.heal < 1 && m2.removedConditions < 2) {
//                         healFunction(m2, Gamer, 4, (teaMate.isDiseased ? 3 : 2), 2);
//                         $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
//                         healCursor = 0;
//                         movementHistory = [];
//                         $(".infoAbilBox").remove();
//                     }
//                 }
//             })
//         });

//         $("#app").on('mouseenter', `#healAFriend` + teaMate.name, function() {
//             teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
//             $(".infoAbilBox").remove();
//             const that = {name:"Heal Friend",type:"utility",desc:`Spend two momentum to heal 4 wounds on team mate within 8 inches`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#healAFriend` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#takeAbreather' + teaMate.name, () => {
//             healCursor = 2
//             for (let rc = 0; rc < Gamer.squaddies.length; rc++) {
//                 let m2 = Gamer.squaddies[rc];
//                 //cursor update
//                 //actual click
//                 $('#players').on('click', () => {
//                     teaMate.pressedAbutton = true;
//                     if (healCursor > 0 && m2.heal < 2 && m2.removedConditions < 1 && teaMate.name !== m2.name && Gamer.momentum > (!m2.isDiseased ? 1 : 2) && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && m2.removedConditions < 1 && m2.heal < 2 && hasConditions(m2)) {
//                         removeConditionsFuncion(m2, Gamer, (m2.isDiseased ? 3 : 2), 2);
//                         movementHistory = [];
//                         $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
//                         healCursor = 0;
//                         $(".infoAbilBox").remove();
//                     }
//                 })
//             }
//         });
//         $("#app").on('mouseenter', `#takeAbreather` + teaMate.name, function() {
//             teaMate.hoverButtonAura = teaMate.baseRadius+8*inch;
//             $(".infoAbilBox").remove();
//             const that = {name:"Take A Breather",type:"utility",desc:`Spend two momentum to remove all conditions on team mate within 8 inches.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#takeAbreather` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });


//         $("#app").on(`click`, '#cancel'+teaMate.name,() => {
//             escapist(m1, otherGamer);
//             $(".infoAbilBox").remove();
//         });
//         $("#app").on('mouseenter', `#cancel` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Cancel Action",type:"utility",desc:`Stops the intent of action like kick, run, charge or using an ability.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#cancel` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', `#glide` + m1.name, () => {
//             if (Gamer.momentum > 0 && !m1.isGliding && !hasPassive(m1,"Winters Blessing") && !hasPassive(m1,"Light Footed")) {
//                 Gamer.momentum -= 1;
//                 m1.isGliding = true;
//                 if (m1.inRoughGround) {
//                     m1.remainingRun += 2 * inch;
//                     m1.remainingSprint += 2 * inch;
//                 }
//                     $(".infoAbilBox").remove();
//             }
//         });
//         $("#app").on('mouseenter', `#glide` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Glide",type:"utility",desc:`Spend one momentum to remove rough ground movement penalty for ${teaMate.nameDisplayed} until next turn.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#glide` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', `#ruler` + m1.name, () => {
//             rulerDopplers = [];
//             ruler = ruler ? false : true;
//             $(".infoAbilBox").remove();
//             //let cX = mouX, cY = mouY
//             $("#players").on('click', () => {
//                 if (rulerDopplers.length > 0 && ruler) {
//                     rulerDopplers.push([mouX, mouY, rulerDopplers[rulerDopplers.length - 1][2], rulerDopplers[rulerDopplers.length - 1][3]]);
//                 } else if (rulerDopplers.length < 1 && ruler) {
//                     rulerDopplers.push([mouX, mouY, m1.posX, m1.posY]);
//                 }
//             })
//         });
//         $("#app").on('mouseenter', `#ruler` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Ruler",type:"utility",desc:`Allows you to multiple check distances for active squaddie.`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#ruler` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });

//         $('#app').on('click', '#undoMove' + teaMate.name, () => { movementActionReverse(); 
//             $(".infoAbilBox").remove(); });

//         $("#app").on('mouseenter', `#undoMove` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Undo Movement",type:"utility",desc:`Allows you reverse movement of a squaddie, helps fend off multitude of game glitches. Although this action is glitched itself.....`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#undoMove` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });


//         $('#app').on('click','#states'+teaMate.name,()=>{
//             commonAfterInstruction({ m1: teaMate });
//             idear = 0;
//             ruler = false;
//             Gamer1 = cloneX(dummyState1); 
//             Gamer2 = cloneX(dummyState2);
//             Gamer.oponent = otherGamer;
//             otherGamer.oponent = Gamer;
//             ball = ballCloneX(dummyBall)
//             teamz = [...Gamer1.squaddies, ...Gamer2.squaddies]
//             $("#pitchfield").empty();
//             $('body').find('.counterbox').off().remove();
//             $('#app').empty()//.append(appMaker(m1, Gamer));
//             $teamplays = [];
//             $(`.playbookNodes`).empty();
//             Gamer1.active = Gamer1.active ? false : true;
//             Gamer2.active = Gamer2.active ? false : true;
//             Gamer = Gamer2.active ? Gamer2 : Gamer1;
//             otherGamer = Gamer2.active ? Gamer1 : Gamer2;
//             switcher(false);
//             $(".infoAbilBox").remove();
//         });
//         $("#app").on('mouseenter', `#states` + teaMate.name, function() {
//             $(".infoAbilBox").remove();
//             const that = {name:"Undo whole activation",type:"utility",desc:`Allows you to completely undo current activation. Helps unscrew broken game state, altough its buggy itself.....`};
//             $("#gameScreen").append(infoAbilBox(that));
//         });
//         $("#app").on('mouseleave', `#states` + teaMate.name, function() {
//             teaMate.hoverButtonAura = 0;
//             $(".infoAbilBox").remove();
//         });
// ////////////////////////////////////////BALLS PLUG//////////////////////////////////////////////


//         theBallsGame(m1,teaMate);


// ////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


//         abilitiesEvents(m1,Gamer,otherGamer);


// ////////////////////////////////////////////ABILITIES PLUG///////////////////////////////////////////////////////////


//         $("body").on(`keydown`, (e) => {
//             defaultPreventer(e);
//             if (e.key === 'Escape') {
//                 if(m1.abilities.activeOwned.some(el=>el[0]==="Back to the Shadows" && el[1] === true)){
//                     endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
//                 }else{
//                     escapist(m1, otherGamer);
//                 }
//             }
//         })
//     } //for all Gagmer squaddies length

//     if ($('#app').empty() && !Gamer.gp.hasBall) {
//         $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">left click to activate player, click to display move aura, then left click to move player, active players can attack opposing team by clicking enemies within its melee zone, use escape button if you want to cancel i.e. kick or charge. also for the sake and liberty of testing there are only two pre-set teams out of 17 different guilds.</div>`)
//     } else if(Gamer.gp.hasBall){
//         $('#app').append(`<div class="guildSymbol" style="width:100%;height:27vw;background:url(${Gamer.guild.icon}) 0 -1px / ${26.8 * wlem}px no-repeat;"></div><div class='the-first-info' style="margin-top:${1 * hlem}px">${Gamer.guild.name} Guild must now resolve goal kick with left-click. Then proceed with normal activation.</div>`);
//     }

// } //----------------Main events teaMate m1 loop
// //switcher ends