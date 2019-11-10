const __snapBallClickOnButton = (m1,teaMate) =>{
    teamz.forEach(el => {
        $('#app').on('click', `#snapBall` + el.name, () => {
            if (!m1.isKnockedDown && m1.isActivating && distance(ball.x, ball.y, el.posX, el.posY) < ball.ballSize + el.baseRadius + 1 * inch && ball.isOnGround) {
                if (!el.hasSnapped) {
                    $('body').find('#snapBallButton').remove();
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
                    $('#actionButtons').empty().off().append(actionButtons(teaMate, Gamer));
                } else {
                    sendMessage(`can't snap the ball now`);
                }
            }
        })
    });
};
const __dropBall = (m1,teaMate)=>{
    $('#app').on('click', '#dropBall' + teaMate.name, () => {
        ball.isInHand = true;
        ball.drawDropAura(teaMate.baseRadius);
        teaMate.moveAura = false;
        $('#players').on('click', () => {
            console.log(distance(teaMate.posX, teaMate.posY, mouX, mouY) <= (teaMate.baseRadius + 1 * inch + ball.ballSize), ball.isInHand, teaMate.hasBall, !teaMate.hasSnapped, isEngaged(teaMate) < 1)
            if (distance(teaMate.posX, teaMate.posY, mouX, mouY) <= (teaMate.baseRadius + 1 * inch + ball.ballSize) && ball.isInHand && teaMate.hasBall /*&& !teaMate.hasSnapped*/ && isEngaged(teaMate) < 1) {
                movementHistory = [];
                ball.isInHand = false;
                teaMate.hasBall = false;
                teaMate.hasDropped = true;
                ball.isOnGround = true;
                teaMate.hasSnapped = true;
                ball.x = mouX;
                ball.y = mouY;
                snapBallButtonCreator('end', teaMate.name);
                $(".infoAbilBox").remove();
            }
        })
    });
    $("#app").on('mouseenter', `#dropBall` + teaMate.name, function () {
        teaMate.hoverButtonAura = teaMate.baseRadius + 1 * inch + smallBase;
        $(".infoAbilBox").remove();
        const that = { name: "Drop Ball", type: "utility", desc: `Allows unengaged squaddie in possession of the ball to drop it within 1 inch of its base` };
        $("#gameScreen").append(infoAbilBox(that));
    });
    $("#app").on('mouseleave', `#dropBall` + teaMate.name, function () {
        teaMate.hoverButtonAura = 0;
        $(".infoAbilBox").remove();
    });
}
const __kickButton = (m1,teaMate) => {
        $('#app').on('click', '#kick' + teaMate.name, () => {
        $(".infoAbilBox").remove();
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
            $('#app').empty().append(appMaker(teaMate, Gamer));
        };
    });

    $("#app").on('mouseenter', `#kick` + teaMate.name, function () {
        teaMate.hoverButtonAura = teaMate.baseRadius + teaMate.kickDist * inch;
        $(".infoAbilBox").remove();
        const that = { name: "Kick the Ball", type: "utility", desc: `Allows ${teaMate.nameDisplayed} to kick the ball. After activatin this ability click a taret within kick aura to choose the balls destination and see if the kick is successful. You can target open field, opposing goal post or other team members.` };
        $("#gameScreen").append(infoAbilBox(that));
    });
    $("#app").on('mouseleave', `#kick` + teaMate.name, function () {
        teaMate.hoverButtonAura = 0;
        $(".infoAbilBox").remove();
    });
    $("#app").on('mouseenter', `#kick` + teaMate.name + `not`, function () {
        teaMate.hoverButtonAura = teaMate.baseRadius + teaMate.kickDist * inch;
        $(".infoAbilBox").remove();
        const that = { name: "Kick the Ball", type: "utility", desc: `Allows ${teaMate.nameDisplayed} to kick the ball. After activatin this ability click a taret within kick aura to choose the balls destination and see if the kick is successful. You can target open field, opposing goal post or other team members.` };
        $("#gameScreen").append(infoAbilBox(that));
    });
    $("#app").on('mouseleave', `#kick` + teaMate.name + `not`, function () {
        teaMate.hoverButtonAura = 0;
        $(".infoAbilBox").remove();
    });
}
const __snapBallClickOnPitch = (m1,teaMate) => {
    if (distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + inch + ball.ballSize) && //player-ball distance
        distance(mouX, mouY, ball.x, ball.y) <= ball.ballSize                                   //klick on ball
        && ball.isOnGround && !m1.hasSnapped && m1.isActivating && !m1.isKnockedDown) {
        m1.moveAura = false;
        ball.isOnGround = false;
        m1.hasBall = true;
        movementHistory = [];
        $('body').find('.snapBallButton').remove();
        $('#actionButtons').empty().append(actionButtons(m1, Gamer));
        //<<------------------==    can't pick up dropped ball
    } else if (distance(m1.posX, m1.posY, ball.x, ball.y) <= (m1.baseRadius + inch + ball.ballSize) && distance(mouX, mouY, ball.x, ball.y) <= ball.ballSize && ball.isOnGround && m1.hasSnapped) {
        sendMessage(`${m1.nameDisplayed} has dropped the ball, so it can't be picked this activation.`);
    }
}
const __goalKick = (m1,teaMate) => {
    if (distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) < (m1.kickDist * inch + m1.baseRadius + 2.5 * cm) &&
    distance(mouX, mouY, otherGamer.gp.x, otherGamer.gp.y) < (2.5 * cm) && 
    m1.infMin > 0 && Gamer.momentum > 0)
{    //--kick--happening--against--goalpost------------------------
    if (m1.isMoving) {
        unpredictableMovement(m1);
        m1.isMoving = false;
        m1.hasMoved = true;
    }
    teaMate.hasKicked = true;
    let minRollToPass = distance(m1.posX, m1.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m1.kickDist * inch / 2 + 2.5 * cm + m1.baseRadius) ? 3 : 4;
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
            `<li class='teamPlays plajBookCell' id='scoreddodge${m1.name}' style="${btilPicStictcher(0, 60)}">dodge</li>
         <li class='teamPlays plajBookCell' id='scorebankmomentum${m1.name}' style="${btilPicStictcher(75, 100)}">bank momentum</li>`
        );
        $('#app').on('click', `#scorebankmomentum${m1.name}`, () => {
            Gamer.momentum += kickRoll.filter(el => el > 5).length > 1 ? 2 : 1;
            $teamplays = [];
            $('.playbookNodes').empty();
            $(".infoAbilBox").remove();
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
            $('#app').on('click', `#passActivation` + teaMate.name, () => { //end activation
                if (Gamer.active && teaMate.isActivating) {
                    saveGameState();
                    endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                } else if (otherGamer.gp.hasBall) { sendMessage(`click on ${otherGamer.guild.name} goal post.`) }
            })
            m1.dodgeSquaddie(4);
            otherGamer.gp.hasBall = true;
            $teamplays = [];
            $('.playbookNodes').empty();
            $(".infoAbilBox").remove();
        });
        $("#app").on('mouseenter', `#scorebankmomentum` + m1.name, function () {
            $(".infoAbilBox").remove();
            const that = { name: "Bank Momentum", type: "utility", desc: `Goal kick was succesful! Save just earned momentum and end ${m1.nameDisplayed} activation.` };
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#scorebankmomentum` + m1.name, function () {
            m1.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
        });
        $("#app").on('mouseenter', `#scoreddodge` + teaMate.name, function () {
            teaMate.hoverButtonAura = teaMate.baseRadius + 4 * inch;
            $(".infoAbilBox").remove();
            const that = { name: "Run the Length", type: "utility", desc: `Goal kick was succesful! Now for the price of just earned one momentum ${teaMate.nameDisplayed} can dodge 4 inches and end activation.` };
            $("#gameScreen").append(infoAbilBox(that));
        });
        $("#app").on('mouseleave', `#scoreddodge` + teaMate.name, function () {
            teaMate.hoverButtonAura = 0;
            $(".infoAbilBox").remove();
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
        scatterRandomiser(mouX, mouY, true, m1);console.log('11-218') //m1.hasDropped = false;
        endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
        /*failed goal kick*/
    }
}
}

function theBallsGame(m1, teaMate) {
    __snapBallClickOnButton(m1,teaMate);
    __dropBall(m1,teaMate);
    __kickButton(m1,teaMate);
    __kickButton(m1,teaMate);
    $('#players').on('click', (e) => {//kick on the field
        defaultPreventer(e);
        __snapBallClickOnPitch(m1,teaMate);
        //<<-----------------== kicking the ball activated
        if (m1.isKicking && ball.beingKicked) {
            __goalKick(m1,teaMate);
            //////////////////////////////////////////////////////////////////////////////////////////////////////
            Gamer.squaddies.forEach(m2 => {
                //--player is attempting to pass the ball--------------------------------------------------------
                if (m1.hasBall && distance(m1.posX, m1.posY, mouX, mouY) <= (m1.kickDist * inch + m2.baseRadius + m1.baseRadius) && distance(m2.posX, m2.posY, mouX, mouY) < (m2.baseRadius) && m1.name !== m2.name) {

                    if (m1.isMoving) {
                        unpredictableMovement(m1);
                        m1.isMoving = false;
                        m1.hasMoved = true;
                    }
                    m1.hasBall = false;
                    m1.hasKicked = true;
                    m1.isKicking = false;
                    ball.beingKicked = false;
                    m1.infMin -= 1;
                    $teamplays = [];
                    let minRollToPass = distance(m1.posX, m1.posY, m2.posX, m2.posY) <= ((m1.kickDist * inch / 2) + m1.baseRadius + m2.baseRadius) ? 3 : 4;
                    let kickRoll = diceRoller(Gamer, otherGamer, m1, m2, 'kick');
                    let succesfulKickDice = kickRoll.filter(el => el >= minRollToPass).length;
                    diceRolledForDisplay = [];
                    diceRolled(kickRoll, minRollToPass, Gamer.guild.color);
                    //--player is sucessfully passing the ball-------------------------------------------------------
                    if (succesfulKickDice > 0) {
                        Gamer.momentum += 1;
                        m2.hasBall = true;
                        $teamplays.push(`<li class='teamPlays plajBookCell ' id='recdo1${m1.name}' style="${btilPicStictcher(0, 60)};
                    background-size:500%;width:4vw;height:4vw;">kicker<br>dodges</li>
                        <li class='teamPlays plajBookCell' id='recdo2${m1.name}' style="${btilPicStictcher(25, 0)};background-size:500%;width:4vw;height:4vw;">bank<br>momentum</li>
                        <li class='teamPlays plajBookCell' id='recdo3${m1.name}' style="${btilPicStictcher(75, 60)};background-size:500%;width:4vw;height:4vw;">receiver<br>dodges</li>`);
                        if (distance(m2.posX, m2.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m2.kickDist * inch + m2.baseRadius + 2.5 * cm) && Gamer.momentum > 1) {
                            $teamplays.push(`<li class='teamPlays plajBookCell' id='recdo4${m1.name}' style="${btilPicStictcher(50, 80)};background-size:500%;width:4vw;height:4vw;" 
                        >snap<br>shot</li>`)
                        } //kicker dodges
                        $('#app').on('click', `#recdo1${m1.name}`, () => {
                            m1.isDodging = true;
                            m1.dodgeSquaddie(4);
                            Gamer.momentum -= 1;
                            $teamplays = [];
                            $('#app').empty();
                            $('#app').append(appMaker(m1, Gamer));
                            $(`.playbookNodes`).empty();
                            m1.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        }); //bank momentum
                        $('#app').on('click', `#recdo2${m1.name}`, () => {
                            $teamplays = [];
                            $('#app').empty();
                            $('#app').append(appMaker(m1, Gamer))
                            $('#app').find(`.playbookNodes`).empty();
                            $(".infoAbilBox").remove();
                            m1.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        }); //receiver dodges

                        $("#app").on('mouseenter', `#recdo1` + m1.name, function () {
                            m1.hoverButtonAura = m1.baseRadius + 4 * inch;
                            $(".infoAbilBox").remove();
                            const that = { name: "Dodge the Kicker", type: "utility", desc: `Pass was succesful! Now for the price of just earned one momentum ${m1.nameDisplayed} can dodge 4 inches.` };
                            $("#gameScreen").append(infoAbilBox(that));
                        });
                        $("#app").on('mouseleave', `#recdo1` + m1.name, function () {
                            m1.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        });
                        $("#app").on('mouseenter', `#recdo2` + m1.name, function () {
                            m1.hoverButtonAura = m1.baseRadius + 4 * inch;
                            $(".infoAbilBox").remove();
                            const that = { name: "Bank Momentum", type: "utility", desc: `Pass was succesful! Save the momentum.` };
                            $("#gameScreen").append(infoAbilBox(that));
                        });
                        $("#app").on('mouseleave', `#recdo2` + m1.name, function () {
                            m1.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        });
                        $('#app').on('click', `#recdo3${m1.name}`, () => {
                            m2.isDodging = true;
                            m2.dodgeSquaddie(4);
                            Gamer.momentum -= 1;
                            m2.hoverButtonAura = 0;
                            $teamplays = [];
                            $('#app').append(appMaker(m1, Gamer))
                            $(`.playbookNodes`).empty()
                            $(".infoAbilBox").remove();
                        });
                        $("#app").on('mouseenter', `#recdo3` + m1.name, function () {
                            m2.hoverButtonAura = m2.baseRadius + 4 * inch;
                            $(".infoAbilBox").remove();
                            const that = { name: "Dodge the Receiver", type: "utility", desc: `Pass was succesful! Now for the price of just earned one momentum ${m2.nameDisplayed} can dodge 4 inches.` };
                            $("#gameScreen").append(infoAbilBox(that));
                        });
                        $("#app").on('mouseleave', `#recdo3` + m1.name, function () {
                            m2.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        });
                        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
                        //<<--------===                 SNAP SHOT
                        $('#app').on('click', `#recdo4${m1.name}`, () => {
                            let snapRoll = diceRoller(Gamer, otherGamer, m2, m1, 'kick');
                            let minpass = distance(m2.posX, m2.posY, otherGamer.gp.x, otherGamer.gp.y) <= (m2.kickDist * inch + m2.baseRadius + 2.5 * cm) / 2 ? 3 : 4;
                            let snapMinRoll = snapRoll.filter(el => el >= minpass);
                            //<<---== SUCCESFOUL SNAP SHOT
                            if (Gamer.momentum > 1 && snapMinRoll.length > 1) {
                                Gamer.momentum -= 1;
                                m1.hasKicked = true;
                                m1.isKicking = false;
                                m2.hasBall = false;
                                ball.beingKicked = false;
                                Gamer.momentum += snapRoll.filter(el => el > 5).length > 1 ? 2 : 1;
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
                                $teamplays.push(`<li class='teamPlays plajBookCell' id='scoreddodge${m2.name}'  style="${btilPicStictcher(0, 60)};
                            background-size:480%;width:4vw;height:4vw;">dodge</li>
                                    <li class='teamPlays plajBookCell' id='scorebankmomentum${m1.name}'  style="${btilPicStictcher(25, 0)};
                                    background-size:480%;width:4vw;height:4vw;">bank momentum</li>`);
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
                                    m2.hoverButtonAura = 0;
                                    $('#app').off();
                                    $('#players').off();
                                    sendMessage(`now you can only dodge with ${m1.nameDisplayed} and/or end this activation.`)
                                    $('#app').on('click', `#passActivation` + teaMate.name, () => { //end activation
                                        if (Gamer.active && teaMate.isActivating) {
                                            saveGameState();
                                            endSquaddieActivation(teaMate, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                                        } else if (otherGamer.gp.hasBall) { sendMessage(`click on ${otherGamer.guild.name} goal post.`) }
                                    })
                                    m2.dodgeSquaddie(4);
                                    Gamer.momentum -= 1;
                                    $teamplays = [];
                                    $(".infoAbilBox").remove();
                                });
                                $('#app').empty();
                                $('#app').append(appMaker(m1, Gamer));
                                $("#app").on('mouseenter', `#scorebankmomentum` + m1.name, function () {
                                    $(".infoAbilBox").remove();
                                    const that = { name: "Bank Momentum", type: "utility", desc: `Goal kick was succesful! Save just earned momentum and end ${m1.nameDisplayed} activation.` };
                                    $("#gameScreen").append(infoAbilBox(that));
                                });
                                $("#app").on('mouseleave', `#scorebankmomentum` + m1.name, function () {
                                    m1.hoverButtonAura = 0;
                                    $(".infoAbilBox").remove();
                                });
                                $("#app").on('mouseenter', `#scoreddodge` + m2.name, function () {
                                    m2.hoverButtonAura = m2.baseRadius + 4 * inch;
                                    $(".infoAbilBox").remove();
                                    const that = { name: "Run the Length!", type: "utility", desc: `Goal kick was succesful! Now for the price of just earned one momentum ${m2.nameDisplayed} can dodge 4 inches and end activation of ${m1.nameDisplayed}` };
                                    $("#gameScreen").append(infoAbilBox(that));
                                });
                                $("#app").on('mouseleave', `#scoreddodge` + m2.name, function () {
                                    m2.hoverButtonAura = 0;
                                    $(".infoAbilBox").remove();
                                });
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
                                scatterRandomiser(otherGamer.gp.x, otherGamer.gp.y, true, m2, true);console.log('11-405') //m1.hasDropped = false;
                                $('#app').empty();
                                $('#app').append(appMaker(m1, Gamer));
                                endSquaddieActivation(m1, Gamer1, Gamer2, Gamer, switcher, teamz, turnTransition);
                                /*failed snap kick*/
                            }
                            $(".infoAbilBox").remove();
                        }) //end of snapshot options and instructions
                        movementHistory = [];

                        $("#app").on('mouseenter', `#recdo4` + m1.name, function () {
                            $(".infoAbilBox").remove();
                            const that = { name: "Snap Shot!", type: "utility", desc: `${m2.nameDisplayed} could attempt shooting goal for the price of two momentum, this shot needs to be sucessful on at least two dies.` };
                            $("#gameScreen").append(infoAbilBox(that));
                        });
                        $("#app").on('mouseleave', `#recdo4` + m1.name, function () {
                            m2.hoverButtonAura = 0;
                            $(".infoAbilBox").remove();
                        });
                        sendMessage(`${m1.nameDisplayed} succesfully passed to ${m2.nameDisplayed}, now you can choose to either dodge or bank a momentum.`);
                        $('#app').empty();
                        $('#app').append(appMaker(m1, Gamer));
                        //--pass is unsuccesfull--------------------------------------------------------------------------
                    } else {

                        if (m1.isMoving) {
                            unpredictableMovement(m1);
                            m1.isMoving = false;
                            m1.hasMoved = true;
                        }
                        ball.beingKicked = false;
                        m1.hasBall = false;
                        //ball.isOnGround = true;
                        m1.hasKicked = true;
                        m1.isKicking = false;
                        //m1.infMin -= 1;console.log(hi)
                        movementHistory = [];
                        m1.hasDropped = true;
                        diceRolledForDisplay = [];
                        scatterRandomiser(mouX, mouY, true, m1); console.log('11-444')//m1.hasDropped = false;
                        diceRolled(kickRoll, minRollToPass, Gamer1.guild.color);
                        $('#app').empty();
                        $('#app').append(appMaker(m1, Gamer));
                    }
                } //teamplays between players IF 
/*kick into open ground*/else if
                    (m1.hasBall && distance(m1.posX, m1.posY, mouX, mouY) <= (m1.kickDist * inch + m1.baseRadius - ball.ballSize) && m1.infMin > 0 && Gamer.squaddies.filter(el => el.name !== m1.name).filter(el => distance(mouX, mouY, el.posX, el.posY) < el.baseRadius).length < 1) {
                    let kickRoll = diceRoller(Gamer, otherGamer, m1, m1, 'kick');
                    if (m1.isMoving) {
                        unpredictableMovement(m1);
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
                    scatterRandomiser(mouX, mouY, true, m1);
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
                            scatterRandomiser(neSpotx, neSpoty, true, m1);console.log('11-481')
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

}