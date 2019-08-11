let diceRoller = (Gamer, otherGamer, m1, m2 = m1, mode, abilityCost) => {
    let unfrendlies = otherGamer.squaddies.filter(el => distance(m1.posX, m1.posY, el.posX, el.posY) <= (el.meleeRadius + m1.baseRadius) &&
        m2.name!==el.name).length
    let bonusedTime = m1.bonusTime || m2.bonusTime ? 1 : 0;
    let bonusDice = 0;
    let neededToHit = m2.def + m2.defensiveStance - ( m2.abilities.activeGiven.some(el=>el==="Gut and String")?1:0 );
    if (neededToHit < 2) {
        bonusDice = 2-neededToHit
        neededToHit = 0;
    } else if (neededToHit > 6){
        bonusDice = 6 - neededToHit;
        neededToHit = 6;
    }
    let actualTac = 
        mode === 'kick' ? 
            m1.kick + bonusedTime - unfrendlies - (m1.name !== m2.name && m2.inForest ? 1 : 0) - (m1.name !== m2.name && m1.inForest ? 1 : m1.inForest ? 1: 0):
        mode === 'parting blow' ? m1.tac + 2 :
        mode === 'ability' ? abilityCost -unfrendlies + bonusedTime < 1 ? 1 : abilityCost -unfrendlies + bonusedTime + bonusDice:
        //normal attack:
        m1.tac + bonusDice + (m2.inCover ? -1 : 0) + (m1.wasCharging ? 4 : 0) + (m1.bonusTime ? 1 : 0) + Gamer.squaddies.filter(el => el.name !== m1.name).filter(el => distance(el.posX, el.posY, m2.posX, m2.posY) <= (el.meleeRadius + m2.baseRadius)).length - otherGamer.squaddies.filter(el => el.name !== m2.name).filter(el => distance(m1.posX, m1.posY, el.posX, el.posY) <= (el.meleeRadius + m1.baseRadius)).length;
    let fistFullOfDice = [];
    let die = 0;
    do {
        fistFullOfDice.push(Math.ceil(Math.random() * 6));
        die++
    } while (die < actualTac);
    m1.bonusTime = false;
    return fistFullOfDice;
}

function diceRolled(all, minimum, color, armour = 0) {
    all.forEach( (el,i) => {
        switch (el) {
            case 1:
                diceRolledForDisplay.push(`<div class="die dice-1" style="background-color:${el>=minimum?color:'white'}">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 2:
                diceRolledForDisplay.push(`<div class="die dice-2" style="background-color:${el>=minimum?color:'white'}">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        </div>`)
                break;
            case 3:
                diceRolledForDisplay.push(`<div class="die dice-3" style="background-color:${el>=minimum?color:'white'}">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 4:
                diceRolledForDisplay.push(`<div class="die dice-4" style="background-color:${el>=minimum?color:'white'}">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-4 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 5:
                diceRolledForDisplay.push(`<div class="die dice-5" style="background-color:${el>=minimum?color:'white'}">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-4 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-5 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 6:
                diceRolledForDisplay.push(`<div class="die dice-6" style="background-color:${i < armour ? "rgb(143, 159, 168)":color}">
                        <div class="die-1 die-eye" style=" background-color:white "></div>
                        <div class="die-2 die-eye" style=" background-color:white "></div>
                        <div class="die-3 die-eye" style=" background-color:white "></div>
                        <div class="die-4 die-eye" style=" background-color:white "></div>
                        <div class="die-5 die-eye" style=" background-color:white "></div>
                        <div class="die-6 die-eye" style=" background-color:white "></div>
                    </div>`)
                break;
        }
    })
};
function abilitiesRoll (m1, m2, abilityCost){
    diceRolledForDisplay = [];
    let all = diceRoller (Gamer, otherGamer, m1, m2, 'ability', abilityCost);
    diceRolled(all, m2.def, m1.theGuild.color, 0);
    $('#app').empty().append(appMaker(m1, Gamer));
    let success = all.filter(el=>el>=m2.def)
    return success.length;
}

function actionButtons(teaMate, Gamer, color = Gamer.guild.color) {
    //drop ball
    let guildName = "background-"+teaMate.theGuild.name;
    let $terrainsGenerator = counter<2?`<div id='generateTerrains' class="a-${guildName}" style='border-color:${color}'>re-roll terrains</div>`:``;
    let $dropBallButton = teaMate.hasBall && counter > 4 ? `<div id='dropBall${teaMate.name}' class="a-${guildName}"  style='border-color:${color}'>drop ball</div>` : ``;
    //kick
    let $kickButton = (teaMate.hasBall && teaMate.infMin > 0 && counter === 5 || counter === 2) ? `<div id='kick${teaMate.name}'  class="a-${guildName}"  style='border-color:${color}'>Kick</div>` : ``;
    //charge
    let $chargeButton = (teaMate.infMin > 1 && !teaMate.isMoving && !teaMate.hasMoved && !teaMate.isEngaged && counter > 4) ? `<div id='charge${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>Charge</div>` : ``;
    //bonus time
    let $bonusTimeButton = (Gamer.momentum > 0 && !teaMate.bonusTime) ? `<div id='bonusTime${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>Bonus time</div>` : ``;
    //heal self
    let $healSelfButton = (Gamer.momentum > (!teaMate.isDiseased ? 0 : 1) && teaMate.hpMin < teaMate.hp && teaMate.heal < 1 && teaMate.removedConditions !== 1) ? `<div id='healSelf${teaMate.name}' class="a-${guildName}"  style='border-color:${color}'>heal self</div>` : ``;
    //forfeit move
    let $forfeitMove = (teaMate.isKnockedDown) ? `<div id='forfeitMove${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>forfeit move</div>` : ``;
    //remove conditions self
    let $removeConditionsButton = (teaMate.removedConditions < 1 && teaMate.heal !== 1 && Gamer.momentum > (!teaMate.isDiseased ? 0 : 1) &&
        (teaMate.isPoisoned || teaMate.isBleeding || teaMate.isKnockedDown || teaMate.isSnared || teaMate.isBurning || teaMate.isDiseased)) ? `<div id='removeConditions${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>remove conditions</div>` : ``;
    //heal friend
    let $healAFriend = (Gamer.momentum > 1 && Gamer.squaddies
            .filter(el => el.hpMin < el.hp)
            .filter(el => el.name !== teaMate.name)
            .filter(el => distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= (teaMate.baseRadius + el.baseRadius + 8 * inch))
            .filter(el => el.heal < 1).length > 0) ?
        `<div id='healAFriend${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>heal a friend</div>` : ``;
    //remove conditions friend
    let $takeAbreather = (Gamer.momentum > 1 && Gamer.squaddies
            .filter(el => el.isBleeding || el.isBurning || el.isDiseased || el.isKnockedDown || el.isPoisoned || el.isSnared)
            .filter(el => el.name !== teaMate.name)
            .filter(el => distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= (teaMate.baseRadius + el.baseRadius + 8 * inch))
            .filter(el => el.removedConditions < 1)
            .filter(el => el.heal < 1).length > 0) ?
        `<div id='takeAbreather${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>take a breather</div>` : ``;
    let $glidingButton = Gamer.momentum > 0 ? `<div class='glide${teaMate.name} a-${guildName}' style='border-color:${color}'>Glide</div>` : ``;
    let $assignBallButton = counter === 0 || Boolean(counter === 3 && Boolean(
            Boolean(Gamer.deployment[0] < canvas.height / 2 && ball.y > canvas.height / 2 - ball.ballSize) ||
            Boolean(Gamer.deployment[0] > canvas.height / 2 && ball.y < canvas.height / 2 + ball.ballSize))) ?
        `<div class='giveBallTo${teaMate.name} a-${guildName}' style='border-color:${color};'>give ball</div>` : ``;
    let $influenceButtons = counter > 6 || counter > 2 && counter < 5 ? `
    <div class='addInf${teaMate.name}  a-${guildName}' style='border-color:${color}'>+inf+</div>
    <div class='minInf${teaMate.name}  a-${guildName}' style='border-color:${color}'>-inf-</div>` : ``;
    let $snapBallButton = (distance(ball.x, ball.y, teaMate.posX, teaMate.posY) < ball.ballSize + teaMate.baseRadius + 1 * inch &&
            ball.isOnGround) ?
        `<div id='snapBall${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>snap ball</div>` : ``;

    let $kickReRoll = teaMate.kickReRoll===1? `<div id='kickReRoll${teaMate.name}' class="a-${guildName}" style='border-color:${color}'>re-roll kick</div>`:``;
    let $rulerButton = `<div id='ruler${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>ruler toggle</div>`;
    let $passActivationButton = counter < 2 ?
        `<div class='passActivation${teaMate.name} a-${guildName}' style='border-color:${color}; color:red'>end deployment</div>` :
        counter < 3 ?
        `<div class='passActivation${teaMate.name} a-${guildName}' style='border-color:${color}; color:red'>end kickoff</div>` :
        counter < 5 || counter > 6 ?
        `<div class='passActivation${teaMate.name} a-${guildName}' style='border-color:${color}; color:red'>end allocation</div>` :
        `<div class='passActivation${teaMate.name} a-${guildName}' style='border-color:${color}; color:red'>end activation</div>`;
    let bod = counter === 5 ? [
        $dropBallButton,
        $chargeButton,
        $bonusTimeButton,
        $healSelfButton,
        $removeConditionsButton,
        $forfeitMove,
        $healAFriend,
        $takeAbreather,
        $snapBallButton,
        $glidingButton,
        $rulerButton
    ] : [/*$terrainsGenerator BUGGED*/];
    let afterStart = counter >=0? [
            $passActivationButton,
            $assignBallButton,
            $influenceButtons,
            $kickButton,
            $kickReRoll
        ]:[];
    return (`
    ${afterStart.join('')}
    <div class='leaflet${teaMate.name} a-${guildName}' style='border-color:${color}'>show card</div>
    <div id='undoMove${teaMate.name}'  class="a-${guildName}" style='border-color:${color}'>undo movement</div>
    <div id="states${teaMate.name}"  class="a-${guildName}" style='border-color:red; color:red;'>reset activation</div>
    <div id='cancel${teaMate.name}' class="a-${guildName}" style='border-color:${color}; color:red'>end/stop action</div>
    ${bod.join('')}
    `)
}


////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////______HUD__TEMPLATE__/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
let appMaker = (teaMate, Gamer) => {
    let color = Gamer?Gamer.guild.color:teaMate.theGuild.color;
    let $hpPool = [];
    let hpiCount = 0;
    const guildName = "background-"+teaMate.theGuild.name;

    for (let hpi = 0; hpi < teaMate.hp - (teaMate.hp - teaMate.hpMin); hpi++) {
        hpiCount++;
        $hpPool.push(`<li class='hpli ${guildName}' style='border-color:${color}'>${hpiCount}</li>`);
    }
    for (let hejp = 0; hejp < teaMate.hp - teaMate.hpMin; hejp++) {
        hpiCount++;
        $hpPool.push(`<li class='hpliMin ${guildName}' style='border-color:${color}'>${hpiCount}</li>`)
    }
    
    return $(`<div id=appDisplay class="${guildName}">            
    <h1 id='squaddieName'  class="${guildName}" style='border-color:${color}'>${teaMate.nameDisplayed}</h1>
    <div id='images'>
    <ul class='hp plajbooks teaMenu dice'>${diceRolledForDisplay.join('')}</ul>
        <div id='squaddieFace'>
            <div id='squaddieFace${teaMate.nameDisplayed}'
                 style='
                       background:url(${teaMate.pictureSource}) ${teaMate.picRatio[0]}% ${teaMate.picRatio[1]}%;  
                       background-size:${teaMate.picRatio[2]}%;
                       border-color:${color};
                       width: 100%;
                       height:100%;'
            >
            </div>
        </div>

    </div>
    <section id="statistics">
    <table id='squaddieStats'>
        <tr>
            <th class='stat-${guildName}' colspan="2" style='border-color:${color}'>MOV</th>
            <th class='stat-${guildName}' style='border-color:${color}'>TAC</th>
            <th class='stat-${guildName}' colspan="2" style='border-color:${color}'>KICK</th>
            <th class='stat-${guildName}' style='border-color:${color}'>DEF</th>
            <th class='stat-${guildName}' style='border-color:${color}'>ARM</th>
            <th class='stat-${guildName}' colspan="2" style='border-color:${color}'>INF</th>
        </tr>
        <tr>
            <td  class="stat-${guildName}" id='squaddieJog'style='border-color:${color}'>${teaMate.sprint}</td>
            <td  class="stat-${guildName}" id='squaddieSprint'style='border-color:${color}'>${teaMate.run}</td>
            <td  class="stat-${guildName}" id='squaddieTac'style='border-color:${color}'>${teaMate.tac}</td>
            <td  class="stat-${guildName}" id='squaddieKickDice'style='border-color:${color}'>${teaMate.kick}</td>
            <td  class="stat-${guildName}" id='squaddieKickDistance'style='border-color:${color}'>${teaMate.kickDist}</td>
            <td  class="stat-${guildName}" id='squaddieDeff'style='border-color:${color}'>${teaMate.def}</td>
            <td  class="stat-${guildName}" id='squaddieArm'style='border-color:${color}'>${teaMate.arm}</td>
            <td  class="stat-${guildName}" id='squaddieInfGen'style='border-color:${color}'>${teaMate.infGen}</td>
            <td  class="stat-${guildName}" id='squaddieInfMax'style='border-color:${color}'>${teaMate.infMax}</td>
        </tr>
    </table>
    <ul class="hp pool">
    ${$hpPool.join('')}
    </ul>
    </section> 

<ul class='hp plajbooks teaMenu playbookNodes'>
<ul class='playbookWrap pW0' >
    <ul>${playBookWrap.noWrap[0].join('')}</ul>
    <ul>${playBookWrap.noWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW1'>
    <ul>${playBookWrap.firstWrap[0].join('')}</ul>
    <ul>${playBookWrap.firstWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW2'>
    <ul>${playBookWrap.secondWrap[0].join('')}</ul>
    <ul>${playBookWrap.secondWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW3'>
    <ul>${playBookWrap.thirdWrap[0].join('')}</ul>
    <ul>${playBookWrap.thirdWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW4'>
    <ul>${playBookWrap.fourthWrap[0].join('')}</ul>
    <ul>${playBookWrap.fourthWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW5'>
    <ul>${playBookWrap.fifthWrap[0].join('')}</ul>
    <ul>${playBookWrap.fifthWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW6'>
    <ul>${playBookWrap.sixthWrap[0].join('')}</ul>
    <ul>${playBookWrap.sixthWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW7'>
    <ul>${playBookWrap.seventhWrap[0].join('')}</ul>
    <ul>${playBookWrap.seventhWrap[1].join('')}</ul>
</ul>
<ul class='playbookWrap pW8'>
    <ul>${$teamplays.join('')}</ul>
</ul>
</ul>

<div class='domesticButtons'>
    <div id='actionButtons'>
        ${counter>=0?actionButtons(teaMate,Gamer,color):``}
    </div>
    <div id='traitPlaysButtons'>
        ${counter>3 ? abilityButtons(teaMate,Gamer,color):``}
    </div>
</div>
    
    <p class='message'>${message}</p>
    </div>`)
    // <div id='charge' style='border-color:${color}'>Charge</div>
    // <div id='bonusTime'>Bonus Time</div>
    // <div id='glide'>Glide</div>
    // <div id='healSelf'>Heal Self</div>
    // <div id='healMate'>Heal Friend</div>
    // <div id='selfConditons'>Remove Conditions</div>
    // <div id='friendsConditions'>Take Breather</div>

    // <div id='conditions'>
    //     <ul id='condition-list'>
    //         <li style='border-color:${color}'>KD</li>
    //         <li style='border-color:${color}'>snared</li>
    //         <li style='border-color:${color}'>bleed</li>
    //         <li style='border-color:${color}'>burn</li>
    //         <li style='border-color:${color}'>poison</li>
    //         <li style='border-color:${color}'>disea</li>
    //     </ul>
    // </div>
}
function counterAttackDialogBox(m1, m2){
    let inMelee = (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m2.meleeRadius + m1.baseRadius) ? true : false;
    const counter =inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>0?`            <button 
             id='opt1${m2.name}' 
             class='opt1'
             style = "
                border:2px solid ${m2.theGuild.color};
                ">  counter<br>attack!
            </button>`:``;


    const bonusCounter =inMelee && !m2.counterForAttack.includes(m1.name) && !m2.knockedDown && otherGamer.momentum>1?`            <button
            id='opt4${m2.name}'
            class='opt4'
            style= "
                border:2px solid ${m2.theGuild.color};
            ">bonus<br>counter</button>`:``;

    const defStance =Boolean(m1.isCharging^m1.wasCharging) && otherGamer.momentum>0?`            <button
            id='opt5${m2.name}'
            class='opt5'
            style= "
                border:2px solid ${m2.theGuild.color};
            ">defensive<br>stance</button>`:``;

    const defCounter =inMelee && !m2.counterForAttack.includes(m1.name) && Boolean(m1.isCharging||m1.wasCharging) && !m2.isKnockedDown && otherGamer.momentum>1?`            <button
            id='opt6${m2.name}'
            class='opt6'
            style= "
                border:2px solid ${m2.theGuild.color};
            ">defensive<br>counter</button>`:``;

    const bonusDefCounter =inMelee && !m2.counterForAttack.includes(m1.name) && Boolean(m1.isCharging||m1.wasCharging) && !m2.isKnocekdDown && otherGamer.momentum>2?`            <button
            id='opt7${m2.name}'
            class='opt7'
            style= "
                border:2px solid ${m2.theGuild.color};
            ">bonus<br>defensive<br>counter</button>`:``;
    const notYet = (Boolean(m1.isCharging*m1.wasCharging) && otherGamer.momentum>0) || !m2.counterForAttack.includes(m1.name) && !m2.isKnockedDown && otherGamer.momentum>0?`            <button 
    id='opt2${m2.name}' 
    class='opt2'
    style = "
       border:2px solid ${m2.theGuild.color};
   ">not <br> yet</button>`:``;

const dont = (Boolean(m1.isCharging^m1.wasCharging) && otherGamer.momentum>0) || !m2.counterForAttack.includes(m1.name) && !m2.isKnockedDown && otherGamer.momentum>0 ? `            <button 
    id='opt3${m2.name}' 
    class='opt3'
    style = "
       border:2px solid ${m2.theGuild.color};
   ">don't<br>bother</button>` : ``;
    $('body').append(`
    <div 
        id='counterbox${m2.name}' 
        class='counterbox background-${m2.theGuild.name}' 
        style=" 
        top:${m2.posY-75 + (offsetX ? offsetX : 0)}px;
        left:${m2.posX-75 + (offsetY ? offsetY : 0)}px;
        border:3px solid ${m2.theGuild.color};
        ">
        ${counter}
        ${notYet}
        ${dont}
        ${bonusCounter}
        ${defStance}
        ${defCounter}
        ${bonusDefCounter}
    </div>`);
}

