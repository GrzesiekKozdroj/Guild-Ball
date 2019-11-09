"use strict";
let diceRoller = (Gamer, otherGamer, m1, m2 = m1, mode, abilityCost) => {
    let unfrendlies = otherGamer.squaddies.filter(el => distance(m1.posX, m1.posY, el.posX, el.posY) <= (el.meleeRadius + m1.baseRadius) 
        && el.name!==m2.name).length;
    let unfrendliClose = otherGamer.squaddies.filter(el => distance(m2.posX, m2.posY, el.posX, el.posY) <= (el.meleeRadius + m2.baseRadius)).length;
    let bonusedTime = m1.bonusTime || m2.bonusTime ? 1 : 0;
    let bonusDice = 0;
    let neededToHit = m2.def + m2.defensiveStance - ( m2.abilities.activeGiven.some(el=>el==="Gut and String")?1:0 ) +
                        (hasPassiveGiven(m2,"Nimble")?1:0);
    if (neededToHit < 2) {
        bonusDice = 2-neededToHit
        neededToHit = 0;
    } else if (neededToHit > 6){
        bonusDice = 6 - neededToHit;
        neededToHit = 6;
    }
    let actualTac = 
        mode === 'kick' ? 
            m1.kick + bonusedTime - unfrendlies - unfrendliClose - (m1.name !== m2.name && m2.inForest ? 1 : 0) - (m1.name !== m2.name && m1.inForest ? 1 : m1.inForest ? 1: 0):
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
                diceRolledForDisplay.push(`<div class="die dice-1" style="background-color:${el>=minimum?color:'white'};
                animation: showDice ${i*.2}s forwards">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 2:
                diceRolledForDisplay.push(`<div class="die dice-2" style="background-color:${el>=minimum?color:'white'};
                animation: showDice ${i*.2}s forwards">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        </div>`)
                break;
            case 3:
                diceRolledForDisplay.push(`<div class="die dice-3" style="background-color:${el>=minimum?color:'white'};
                animation: showDice ${i*.2}s forwards">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 4:
                diceRolledForDisplay.push(`<div class="die dice-4" style="background-color:${el>=minimum?color:'white'};
                animation: showDice ${i*.2}s forwards">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-4 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 5:
                diceRolledForDisplay.push(`<div class="die dice-5" style="background-color:${el>=minimum?color:'white'};
                animation: showDice ${i*.2}s forwards">
                        <div class="die-1 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-2 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-3 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-4 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                        <div class="die-5 die-eye" style="background-color:${el>=minimum?'white':'rgb(114, 107, 107)'}"></div>
                    </div>`)
                break;
            case 6:
                diceRolledForDisplay.push(`<div class="die dice-6" style="background-color:${i < armour ? "rgb(143, 159, 168)":color};
                animation: showDice ${i*.2}s forwards">
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
    let neededToHit = m2.def + (hasPassiveGiven(m2,"Nimble")?1:0);
    neededToHit = neededToHit > 6 ? 6 : neededToHit < 1 ? 2 : neededToHit;
    let all = diceRoller (Gamer, otherGamer, m1, m2, 'ability', abilityCost);
    diceRolled(all, neededToHit, m1.theGuild.color, 0);
    $('#app').empty().append(appMaker(m1, Gamer));
    let success = all.filter(el=>el>=neededToHit)
    return success.length;
}
let utilityPicScale = 100;
let utilPicStictcher = (a,b) =>`background:url(\".\/icons\/utilities.png\") ${a}% ${b}%; background-size:485%;`;
let btilPicStictcher = (a,b) =>`background:url(\'.\/icons\/utilities.png\') ${a}% ${b}%; `;
function makeActiveActionButton(m1,id,claz,color,text,x,y){
    return `<div id='${id+m1.name}' class="a-${claz}" style='border-color:${color}; ${utilPicStictcher(x,y)}'>${text}</div>`;
}
function makeInactiveActionButton(m1,id,claz,color,text,x,y){
    return `<div id='${id+m1.name}not' class="a-${claz} inactiveActionButton" style='border-color:${color}; ${utilPicStictcher(x,y)}'>${text}</div>`
}
function actionButtons(teaMate, Gamer, color = Gamer.guild.color) {
    //drop ball
    let guildName = "background-"+teaMate.theGuild.name;
    let $terrainsGenerator = counter<2?`<div id='generateTerrains' class="a-${guildName}" style='border-color:${color}'>re-roll terrains</div>`:``;
    let $assignBallButton = counter === 0 || Boolean(counter === 3 && Boolean(
        Boolean(Gamer.deployment[0] < canvas.height / 2 && ball.y > canvas.height / 2 - ball.ballSize) ||
        Boolean(Gamer.deployment[0] > canvas.height / 2 && ball.y < canvas.height / 2 + ball.ballSize))) ? 
        makeActiveActionButton(teaMate,'giveBallTo',"a"+guildName  ,color,"Give Ball",100,40) 
    :
        (distance(ball.x, ball.y, teaMate.posX, teaMate.posY) < ball.ballSize + teaMate.baseRadius + 1 * inch &&
        ball.isOnGround) ?makeActiveActionButton(teaMate,'snapBall', "a"+guildName ,color,"Snap Ball",50,20) 
    : 
        teaMate.hasBall && counter > 4 ? makeActiveActionButton(teaMate,"dropBall","a"+guildName,color,"drop ball",50,20) : makeInactiveActionButton(teaMate,"snapBall","a"+guildName,color,"Snap Ball",50,20);
    //kick
    let $kickButton = (teaMate.hasBall && teaMate.infMin > 0 && counter === 5 || counter === 2) ? makeActiveActionButton(teaMate,'kick',"a"+guildName ,color,"Kick",100,40) : makeInactiveActionButton(teaMate,'kick',"a"+guildName ,color,"Kick",100,40);
    //charge
    let $chargeButton = ((teaMate.infMin > 1 || hasPassive(teaMate,"Furious"))&& !teaMate.isMoving && !teaMate.hasMoved && !teaMate.isEngaged && counter > 4) ? makeActiveActionButton(teaMate,'charge',"a"+guildName ,color,"Charge",100,0) : makeInactiveActionButton(teaMate,'charge',"a"+guildName ,color,"Charge",100,0);
    //bonus time
    let $bonusTimeButton = (Gamer.momentum > 0 && !teaMate.bonusTime) ? makeActiveActionButton(teaMate,'bonusTime',"a"+guildName  ,color,"Bonus Time",50,0) : makeInactiveActionButton(teaMate,'bonusTime',"a"+guildName ,color,"Bonus Time",50,0);
    //heal self
    let $healSelfButton = (Gamer.momentum > (!teaMate.isDiseased ? 0 : 1) && teaMate.hpMin < teaMate.hp && teaMate.heal < 1 && teaMate.removedConditions !== 1) ? makeActiveActionButton(teaMate,'healSelf',"a"+guildName,color,"Heal",50,40) : makeInactiveActionButton(teaMate,'healSelf',"a"+guildName ,color,"Heal",50,40);
    //forfeit move
    let $forfeitMove = (teaMate.isKnockedDown) ? makeActiveActionButton(teaMate,'forfeitMove',"a"+guildName,color,"Forfeit Move",75,80) : makeInactiveActionButton(teaMate,'forfeitMove',"a"+guildName,color,"Forfeit Move",75,80);
    //remove conditions self
    let $removeConditionsButton = (teaMate.removedConditions < 1 && teaMate.heal !== 1 && Gamer.momentum > (!teaMate.isDiseased ? 0 : 1) &&
        (teaMate.isPoisoned || teaMate.isBleeding || teaMate.isKnockedDown || teaMate.isSnared || teaMate.isBurning || teaMate.isDiseased)) ? 
        makeActiveActionButton(teaMate,'removeConditions',"a"+guildName,color,"Remove Conditions",100,80) : makeInactiveActionButton(teaMate,'removeConditions',"a"+guildName,color,"Remove Conditions",100,80);
    //heal friend
    let $healAFriend = (Gamer.momentum > 1 && Gamer.squaddies
            .filter(el => el.hpMin < el.hp)
            .filter(el => el.name !== teaMate.name)
            .filter(el => distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= (teaMate.baseRadius + el.baseRadius + 8 * inch))
            .filter(el => el.heal < 1).length > 0) ? makeActiveActionButton(teaMate,'healAFriend',"a"+guildName,color,"Heal a Friend",50,100) : makeInactiveActionButton(teaMate,'healAFriend',"a"+guildName  ,color,"Heal a Friend",50,100);
    //remove conditions friend
    let $takeAbreather = (Gamer.momentum > 1 && Gamer.squaddies
            .filter(el => el.isBleeding || el.isBurning || el.isDiseased || el.isKnockedDown || el.isPoisoned || el.isSnared)
            .filter(el => el.name !== teaMate.name)
            .filter(el => distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= (teaMate.baseRadius + el.baseRadius + 8 * inch))
            .filter(el => el.removedConditions < 1)
            .filter(el => el.heal < 1).length > 0) ? makeActiveActionButton(teaMate,'takeAbreather',"a"+guildName,color,"Take a Breather",25,100)
         :  makeInactiveActionButton(teaMate,'takeAbreather',"a"+guildName,color,"Take a Breather",25,100);
    let $glidingButton = Gamer.momentum > 0 && !hasPassive(teaMate,"Light Footed")?  makeActiveActionButton(teaMate,'glide',"a"+guildName,color,"Glide",25,40) : makeInactiveActionButton(teaMate,'glide',"a"+guildName,color,"Glide",25,40);

    let $influenceButtons = counter > 6 || counter > 2 && counter < 5 ? [makeActiveActionButton(teaMate,'addInf',"a"+guildName,color,"+inf+",0,0),
    makeActiveActionButton(teaMate,'minInf',"a"+guildName,color,"-inf-",100,60)] : [makeInactiveActionButton(teaMate,'addInf',"a"+guildName,color,"+inf+",0,0),
    makeInactiveActionButton(teaMate,'minInf',"a"+guildName,color,"-inf-",100,60)];
    

    let $kickReRoll = teaMate.kickReRoll===1? makeActiveActionButton(teaMate,'kickReRoll',"a"+guildName,color,"Re-roll Kick",50,60):makeInactiveActionButton(teaMate,'kickReRoll',"a"+guildName,color,"Re-roll Kick",50,60);
    let $rulerButton = makeActiveActionButton(teaMate,'ruler',"a"+guildName,color,"Ruler",0,80);
    let $passActivationButton = counter < 2 ? makeActiveActionButton(teaMate,'passActivation',"a"+guildName,color,"End Deployment",100,20) :
        counter < 3 ? makeActiveActionButton(teaMate,'passActivation',"a"+guildName,color,"End Kick Off!",75,20) :
        counter >= 3 && counter < 5 || counter > 6 ? makeActiveActionButton(teaMate,'passActivation',"a"+guildName,color,"End Allocation",75,20) :
        makeActiveActionButton(teaMate,'passActivation',"a"+guildName,color,"End Activation",75,20);
    let bod = [
        $bonusTimeButton,
        $chargeButton,
        $forfeitMove,
        $glidingButton,

        $kickButton,
        $assignBallButton,
        $kickReRoll,
        $rulerButton,

        $healSelfButton,
        $removeConditionsButton,
        $healAFriend,
        $takeAbreather,
        
        ...$influenceButtons
        ];
    return (`
    ${$passActivationButton}
    <div id='cancel${teaMate.name}' class="a${guildName}" style='border-color:${color}; ${utilPicStictcher(0,40)}'>end/stop action</div>
    <div id='undoMove${teaMate.name}'  class="a${guildName}" style='border-color:${color};${utilPicStictcher(0,100)}'>undo movement</div>
    <div id="states${teaMate.name}"  class="a${guildName}" style='border-color:red; ${utilPicStictcher(75,0)};'>reset activation</div>
    ${bod.join('')}
    `)
}
//<div class='leaflet${teaMate.name} a${guildName}' style='border-color:${color};${utilPicStictcher(25,60)}'>show card</div>

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
        $hpPool.push(`<li class='hpli hp}' style='border-color:${color}; animation: showDice ${hpiCount*.05}s forwards'>${hpiCount}</li>`);
    }
    for (let hejp = 0; hejp < teaMate.hp - teaMate.hpMin; hejp++) {
        hpiCount++;
        $hpPool.push(`<li class='hpliMin hp' style='border-color:${color}; animation: showDice ${hpiCount*.05}s forwards'>${hpiCount}</li>`)
    }
    
    return $(`
    <div id=appDisplay class="${guildName}">            
    <section id="statistics">
        <h1 id='squaddieName' style='border-color:${color}'>${teaMate.nameDisplayed} - 
        ${teaMate.identity.status}</h1>
        <table id='squaddieStats'>
            <tr>
                <th class='stat-top-${guildName}' colspan="2" style='border-color:${color}'>MOV</th>
                <th class='stat-top-${guildName}' style='border-color:${color}'>TAC</th>
                <th class='stat-top-${guildName}' colspan="2" style='border-color:${color}'>KICK</th>
                <th class='stat-top-${guildName}' style='border-color:${color}'>DEF</th>
                <th class='stat-top-${guildName}' style='border-color:${color}'>ARM</th>
                <th class='stat-top-${guildName}' colspan="2" style='border-color:${color}'>INF</th>
            </tr>
            <tr>
                <td  class="stat--bottom-${guildName} bgn" id='squaddieJog'style='border-color:${color}'>${teaMate.sprint}ˮ</td>
                <td  class="stat--bottom-${guildName}" id='squaddieSprint'style='border-color:${color}'>${teaMate.run}ˮ</td>
                <td  class="stat--bottom-${guildName} dbl" id='squaddieTac'style='border-color:${color}'>${teaMate.tac}</td>
                <td  class="stat--bottom-${guildName}" id='squaddieKickDice'style='border-color:${color}'>${teaMate.kick}</td>
                <td  class="stat--bottom-${guildName}" id='squaddieKickDistance'style='border-color:${color}'>${teaMate.kickDist}ˮ</td>
                <td  class="stat--bottom-${guildName} dbl" id='squaddieDeff'style='border-color:${color}'>${teaMate.def}</td>
                <td  class="stat--bottom-${guildName} dbl" id='squaddieArm'style='border-color:${color}'>${teaMate.arm}</td>
                <td  class="stat--bottom-${guildName}" id='squaddieInfGen'style='border-color:${color}'>${teaMate.infGen}</td>
                <td  class="stat--bottom-${guildName} tnd" id='squaddieInfMax'style='border-color:${color}'>${teaMate.infMax}</td>
            </tr>
        </table>
        <section class="bubbles">
        <ul class="hp pool">
            ${$hpPool.join('')}
        </ul>
        <div class="momentumShow">${Gamer?Gamer.momentum:''}</div>
        </section>
        <div id='images'>
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
    </section> 
    <section id="dynamicMessages">
    <p class='message'>${message}</p>
    <ul class='hp plajbooks teaMenu dice'>${diceRolledForDisplay.join('')}</ul>

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
    </section>
    <div class='domesticButtons'>
        <div id='actionButtons'>
            ${counter>=0?actionButtons(teaMate,Gamer,color):``}
        </div>
        <div id='traitPlaysButtons'>
            ${abilityButtons(teaMate,Gamer,color)}
        </div>
    </div>
    <footer>&copy; 2017 Steamforged Games Ltd. All Rights Reserved.</footer>
</div>`
)
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

//    const unpredi = hasPassiveUnused(m2,"Unpredictable Movement") ? 
//                     `<button id='opt8${m2.name}' class='opt8' style = "border:2px solid 
//                     ${m2.theGuild.color};">  dodge<br>away!</button>`:'';

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
        top:${m2.posY+50 + (offsetX ? offsetX : 0)}px;
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
};

let infoAbilBox = (lspal)=>{
    let coins = [];
    for(let ajcost = 0; ajcost < Number(lspal.icost);ajcost++){
        coins.push(`<p class="coinGold"></p>`);
    }
    for(let ajBook = 0; ajBook <Number(lspal.pcost);ajBook++){
        coins.push(`<p class="coinSilver"></p>`);
    }
    if(lspal.type==="heroic")coins.push(`<article class="coinBlue"></article>`);
    let cost = lspal.type!=="legendary" && (Number(lspal.icost) > 0 || Number(lspal.pcost) > 0 ) ?
        `
                <p class="abilAttribName">$</p>
                <p class="abilAttripVal"><section id="ashTray">${coins.join('')}</section></p>
        `:`$`;
    
        let typos = lspal.type!=="legendary" && lspal.type!=="utility"? `
                <p class="abilAttribName">@</p>
                <p class="abilAttripVal">${lspal.type}</p>`: '@';
        let range = Number(lspal.range)>0?`
                        <p class="abilAttribName"> <---></p>
                        <p class="abilAttripVal">${lspal.range}"</p>` : 
                    Number(lspal.aura)>0?`
                        <p class="abilAttribName"> aura </p>
                        <p class="abilAttripVal">${lspal.aura}"</p>` : 
                '<-->';
        let sused = lspal.type !== "legendary" && lspal.type !== "heroic" && lspal.type !== "trait" && lspal.type !=="utility"? `
            <p class="abilAttribName">sus</p>
            <p class="abilAttripVal">${lspal.sus>0?lspal.sus:false}</p>`:'sus';
        let opted = lspal.type !== "legendary" && lspal.type !== "heroic" && lspal.type !== "trait" && lspal.type !=="utility"? `
            <p class="abilAttribName">opt</p>
            <p class="abilAttripVal">${lspal.opt>0?lspal.opt:false}</p>`:'opt';
    return `
    <div class="infoAbilBox">
        <div class="abilHeader">
            <div class="leftDecour">
                <div class="leftDecourMiddleBit">
                    <div class="leftDecourEndBit"></div>
                </div>
            </div>
            <div class="abilTitle">
                <div class="abilName">${lspal.name}</div>
                <div class="abilType">${lspal.type}</div>
            </div>
            <div class="rightDecour">
                <div class="rightDecourMiddleBit">
                    <div class="rightDecourEndBit"></div>
                </div>
            </div>
        </div>

            <div class="statsAbilInfo">
            <div>
                ${cost}
            </div>
            <div>
                ${typos}
            </div>
            <div>
                ${range}
            </div>
                <div>
                ${sused}
                </div>
                <div>
                ${opted}
                </div>
            </div>

        <div class="abilDescription">
            ${lspal.desc}
        </div>
    </div>`};


$("#gameScreen").on('mouseenter', '.skill', function() {
        const that = this;
        $("#gameScreen").append(infoAbilBox($(that).data()));
});
$("#gameScreen").on('mouseleave', '.skill', function() {
    $(".infoAbilBox").remove();
});
