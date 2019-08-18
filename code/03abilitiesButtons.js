"use strict";
//used to smoothily identify and jump between unique abilities without triggering others, dirty workout
//["Winter's Blessing", "Lunar Eclipse"], [], ["Skewered","Last Light"]


function abilityButtons(teaMate, Gamer, color) {
    let m1 = teaMate;
    let abilities = [];


    if (teaMate.abilities.activeOwned) {


        let bigGameTraps = teaMate.abilities.activeOwned.some((el, i) => el.includes("Big Game Traps") && el[1] < 1) &&
            teaMate.isActivating ? `<div id="BigGameTraps${m1.name}" class="activeSkill traitPlaysButtonsChild" style="border-color:${m1.theGuild.color};">Big Game Traps</div>` : '';
        let chainBolas = hasActiveUnused(teaMate,"Chain Bolas") ? makeActiveButton("chainBolas"+teaMate.name,"Chain Bolas"):'';
        let flurry = teaMate.abilities.activeOwned.some(el => el.includes("Flurry") && el[1] < 1) ?
            `<div id="flurry${teaMate.name}" class="activeSkill traitPlaysButtonsChild" style="border-color:${m1.theGuild.color}">Flurry</div>` : '';
        let gutAndString = teaMate.abilities.activeOwned.some(el => el.includes("Gut and String") && el[1] === 0) ?
            `<div id="gutAndString" class="activeSkill traitPlaysButtonsChild" style="border-color:${m1.theGuild.color};">Gut and String</div>` : '';
        let lastLight = hasActiveUnused(teaMate,"Last Light") ? makeActiveButton("lastLight"+teaMate.name,"Last Light"):'';
        let linked = teaMate.abilities.activeOwned[0]&&teaMate.abilities.activeOwned[0][0].linked ?
                     makeActiveButton("linked"+teaMate.name,`Linked[${teaMate.abilities.activeOwned[0][0].linked}]`):'';
        let nimble = hasActiveUnused(teaMate,"Nimble")?makeActiveButton("nimble"+teaMate.name,"Nimble"):'';
        let powerOfVooDoo = hasActive(teaMate,"The Power of Voodoo")?makeActiveButton("powerOfVooDoo"+teaMate.name,"The Power of Voodoo"):'';
        let skewered = hasActiveUnused(teaMate,"Skewered")?makeActiveButton("skewered"+teaMate.name,"Skewered"):'';
        let snapFire = teaMate.abilities.activeOwned.some(el => el.includes("Snap Fire")) ?
            `<div id="snapFire${m1.name}" class="activeSkill traitPlaysButtonsChild" style="border-color:${m1.theGuild.color};">Snap Fire</div>` : '';

        abilities.push(bigGameTraps, chainBolas, flurry, gutAndString, lastLight, linked, nimble, powerOfVooDoo, skewered, snapFire );
    }

    if (teaMate.abilities.passiveOwned) {
        let anatomicalPrecision = teaMate.abilities.passiveOwned.some(el => el.includes("Anatomical Precision")) ?
            `<div id="anatomicalPrecision" class="passiveSkill traitPlaysButtonsChild">Anatomical Precision</div>` : '';

        let backToShadows = hasActive(teaMate,"Back to the Shadows") ? makePassiveButton("backToShadows","Back to the Shadows") : '';
        let closeControl = hasPassiveUnused(teaMate, "Close Control") ? makePassiveButton(`closeControl`,"Close Control"):'';
        let furious = hasPassive(m1,"Furious") ? makePassiveButton(`furious`,"Furious") : '';
        let lightFooted = teaMate.abilities.passiveOwned.some(el => el.includes("Light Footed")) ?
            `<div id="lightFooted" class="passiveSkill">Light Footed</div>` : '';
        let lunarEclipse = hasPassive(teaMate,"Lunar Eclipse") ? makePassiveButton(`lunarEclipse`,"Lunar Eclipse"):'';
        let swiftStrikes = hasPassive(teaMate,"Swift Strikes") ? makePassiveButton(`swiftStrikes`,"Swift Strikes"):'';
        let unpredictableMovement = hasPassiveUnused(teaMate,"Unpredictable Movement")?
                                    makePassiveButton('unpredictableMovement',"Unpredictable Movement"):'';
        let wintersBlessing = hasPassive(teaMate,"Winters Blessing") ? `<div id="winterBlessing" class="passiveSkill">Winter's Blessing</div>`:'';
        let venomousStrike = hasPassive(teaMate,"Venomous Strike") ? makePassiveButton(`venomousStrike`,"Venomous Strike"):'';
        
        abilities.push(anatomicalPrecision, backToShadows, closeControl, furious, lightFooted, lunarEclipse, swiftStrikes, unpredictableMovement, 
                       wintersBlessing, venomousStrike);
    }
    return abilities.join('');
}

function commonPreInstruction(options) {
    //$("#app").on("click",".traitPlaysButtonsChild",()=>{$("#players").off('click.usingAbility',"#players");})
    unpredictableMovement(options.m1);
    options.m1.moveAura = false;
    options.m1.isDodging = false;
    options.m1.remainingDodge = 0;
    options.m1.drawAbilityAura = 0;
    options.m1.drawAbilityTargetAura = 0;
    //$("#players").off('click.usingAbility');
}

function commonAfterInstruction(options) {
    options.m1.moveAura = false;
    options.m1.drawAbilityAura = 0;
    options.m1.drawAbilityTargetAura = 0;
    if(options.m1.isMoving){options.m1.isMoving = false; options.m1.hasMoved = true;};
    options.m1.pressedAbutton = true;
    if(options.customTriger) {$("#players").off('click.usingAbility'+options.m1.name);} else {$("#players").off('click.usingAbility');}
    idear = 0;
}

function trigerOnDamageEffects(m1,m2) {
    if (m1.abilities.passiveOwned.some(el => el.includes("Swift Strikes"))) { m1.isDodging = true; m1.dodgeSquaddie(2) };
    if (m1.abilities.activeOwned.some(el => el.includes("Back to the Shadows")))
        m1.abilities.activeOwned.filter(el => el.includes("Back to the Shadows")).forEach(el => el[1]++);
    if(m2){
        if (m1.abilities.passiveOwned.some(el => el.includes("Venomous Strike"))) poisoned(m2);
    }
}

function payPrice (n,m1){
    let isFree = m1.abilities.passiveGiven.some(el => el.includes("Blessing of the Sun Father")) ? true : false;
    let lastLight = m1.abilities.passiveGiven.some(el=>el.includes("Last Light"))? true:false;
    if (m1.drawAbilityAura > 0 && (isFree || m1.infMin > n-1 || (lastLight&&Gamer.momentum>=n) )) {
    if(m1.infMin>=n && !lastLight){
        m1.infMin -= isFree ? 0 : n;
        if (isFree) m1.abilities.passiveGiven.forEach((el, i) => {
            if (el === "Blessing of the Sun Father") m1.abilities.passiveGiven.splice(i, 1);
        });
        return true;
    } else if(lastLight && Gamer.momentum>=n){
        Gamer.momentum-=n;
        if (lastLight) m1.abilities.passiveGiven.forEach((el,i)=>{
            if(el.includes("Last Light") ) m1.abilities.passiveGiven.splice(i,1);
        })
        return true;
    }else{
        return false
    }
}

}

function abilitiesEvents(m1, Gamer, otherGamer) {
    ///////////////////////////_____HUNTERS_____///////////////////////////////////////////////////
    $('#app').on('click', '#BigGameTraps' + m1.name, () => {
        commonPreInstruction({ m1: m1 });
        if (Gamer.tokens.length < 5 && counter === 5 && !m1.wasCharging && !m1.isDodging && $(".pW0").find(".plajBookCell").length === 0) {
            const snaret = new Token(mouX, mouY, smallBase, "trap", Gamer.guild.color);
            snaret.isInHand = true;
            Gamer.tokens.push(snaret);
            //m1.moveAura = false;
            m1.drawAbilityAura = m1.baseRadius + 2 * inch + 2 * smallBase;
            $("#players").on('click.usingAbility',  () => {
                if (distance(m1.posX, m1.posY, mouX, mouY) <= m1.baseRadius + 2 * inch + smallBase && snaret.isPlacable) {
                    commonAfterInstruction({ m1: m1 })
                    //m1.drawAbilityAura = 0;
                    //if(m1.isMoving)m1.hasMoved = true;
                    snaret.isInHand = false;
                    //m1.pressedAbutton = true;
                    m1.abilities.activeOwned.forEach((el, i) => {
                        if (el.includes("Big Game Traps")) {
                            m1.abilities.activeOwned[i][1]++
                        }
                    })
                    //$("#players").off('click.bigGameTraps');
                    $('#BigGameTraps' + m1.name).remove();
                }
            })
        }
    });
    $('#app').on("click","#nimble"+m1.name,()=>{
        commonPreInstruction({ m1: m1 });
        m1.drawAbilityAura = 1;
        if(hasActiveUnused(m1,"Nimble") && payPrice(1,m1)){
        makeActiveOpt(m1,"Nimble");
        m1.abilities.passiveGiven.push(["Nimble",0]);
        commonAfterInstruction({ m1: m1 });
    }else{
        sendMessage(`${m1.nameDisplayed} can't use this ability now.`)
        commonAfterInstruction({ m1: m1 });
    }})
///////////////////////////______________M2_______________________//////////////////////////////////
    for (let hy = 0; hy < otherGamer.squaddies.length; hy++) {
        let m2 = otherGamer.squaddies[hy];

        $("#app").on('click', '#chainBolas'+m1.name, ()=>{
            if(hasActiveUnused(m1,"Chain Bolas")){
            idear = "chainBolas";
            commonPreInstruction({ m1: m1 });
            m1.drawAbilityAura = m1.baseRadius+8*inch;
            $("#players").on('click.usingAbility',()=>{
                if(idear==="chainBolas" && 
                    distance(m1.posX,m1.posY,m2.posX,m2.posY)<=m1.baseRadius+8*inch+m2.baseRadius &&
                    distance(mouX,mouY,m2.posX,m2.posY)<=m2.baseRadius && payPrice(2,m1)){
                        if(abilitiesRoll(m1,m2,2)>0)
                        {
                            chainBolas(m1,m2);
                            commonAfterInstruction({ m1: m1 });
                        }else{
                            makeActiveOpt(m1,"Chain Bolas");;
                        }
                    }else{
                        sendMessage(`${m1.nameDisplayed} can't use this ability because there is not enough influence`);
                        commonAfterInstruction({ m1: m1 });
                    }
            })
        }else{sendMessage(`${m1.nameDisplayed} can't use this ability second time`)}})
        $("#app").on('click', '#flurry' + m1.name, () => {
                commonPreInstruction({ m1: m1 });
                idear = 1;
            if (m1.abilities.activeOwned.some(el => el.includes("Flurry") && el[1] < 1)) {
                m1.drawAbilityAura = m1.baseRadius + 8 * inch;
                m1.drawAbilityTargetAura = 2;

                $("#players").on('click.usingAbility',() => {
                    if (idear === 1 && distance(m2.posX, m2.posY, m1.posX, m1.posY) <= m1.baseRadius + 8 * inch + m2.baseRadius && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && payPrice(2,m1) ) {
                        //
                        m1.abilities.activeOwned.forEach(el => {
                            if (el.includes("Flurry")) el[1]++;
                        });
                        commonAfterInstruction({ m1: m1 });

                            if (abilitiesRoll(m1, m2, 2) > 0) {
                                otherGamer.squaddies.forEach(el => {
                                    if (distance(el.posX, el.posY, m2.posX, m2.posY) <= m2.baseRadius + 2 * inch + el.baseRadius) {
                                        el.hpMin -= 2;
                                        if (m1.abilities.passiveOwned.some(el => el.includes("Venomous Strike"))) poisoned(el);
                                    }
                                });
                                Gamer.squaddies.forEach(el => {
                                    if (distance(m2.posX, m2.posY, el.posX, el.posY) <= m2.baseRadius + 2 * inch + el.baseRadius) {
                                        el.hpMin -= 2;
                                    }
                                })
                                trigerOnDamageEffects(m1, m2);
                            } //if abilities

                        }
                        //$("#players").off('click.flurry');
                })//click.flurry
            }//if has flurry
        })//flury
        $("#app").on("click","#skewered"+m1.name,()=>{
            idear="Skewered";
            commonPreInstruction({ m1: m1 });
            m1.drawAbilityAura = m1.baseRadius+6*inch;
            $("#players").on("click.usingAbility",()=>{
                if(idear==="Skewered" && hasActiveUnused(m1,"Skewered") && distance(m1.posX,m1.posY,m2.posX,m2.posY)<=m1.baseRadius+m2.baseRadius+6*inch &&
                    distance(mouX,mouY,m2.posX,m2.posY)<=m2.baseRadius && payPrice(2,m1) ){
                        if(abilitiesRoll(m1,m2,2)>0)
                        {
                            trigerOnDamageEffects(m1,m2);Skewered (m1,m2)
                        } else 
                        {
                            makeActiveOpt(m1,"Skewered");
                            commonAfterInstruction({ m1: m1 });
                        };
                }
            })
        })
        $("#app").on("click", "#snapFire" + m1.name, () => {
            idear = 2;
            commonPreInstruction({ m1: m1 });
            m1.drawAbilityAura = m1.baseRadius + 6 * inch;
            $("#players").on("click.usingAbility", () => {
                if (idear===2 && distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m1.baseRadius + m2.baseRadius + 6 * inch &&
                    distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && payPrice(1,m1)) {
                    if (abilitiesRoll(m1, m2, 1) > 0) {
                        trigerOnDamageEffects(m1,m2);
                        m2.hpMin-=1;
                    }
                    commonAfterInstruction({ m1: m1 });
                    //$("#players").off("click.snapFire");
                }
            })
        })//snap fire

    }//for m2
    //////////////////////////////////////_____M2______///////////////////////////////////////////////////////
    for(let gh = 0; gh<Gamer.squaddies.length;gh++){
        let m3 = Gamer.squaddies[gh];

        $("#app").on("click","#lastLight"+m1.name,()=>{
            if(hasActiveUnused(m1,"Last Light")){
                idear = "lastLight";
                commonPreInstruction({ m1: m1 });
                m1.drawAbilityAura = m1.baseRadius+6*inch;
                m1.pressedAbutton = true;
                $("#players").on("click.usingAbility", ()=>{// + m1.name
                    if(idear === "lastLight" && 
                        distance(m3.posX,m3.posY,m1.posX,m1.posY)<=6*inch+m1.baseRadius+m3.baseRadius &&
                        distance(mouX,mouY,m3.posX,m3.posY)<=m3.baseRadius)
                    {
                        makeActiveOpt(m1,"Last Light");
                        if(true)m3.abilities.passiveGiven.push(["Last Light",0]);
                        commonAfterInstruction({ m1: m1 });//, customTriger: true
                    }
                })
            }
        });

        $("#app").on("click","#linked"+m1.name,()=>{
            let name = m1.abilities.activeOwned[0][0].linked;
            if(Gamer.squaddies.some(el=>!el.hasActivated && el.nameDisplayed === name)){
                m1.isActivating = false;
                m1.hasActivated = true;
                m1.moveAura = false;
                m1.isMoving = false;
                m1.isDodging = false;
                m1.isKicking = false;
                m1.drawAbilityAura = 0;
                let m2 = Gamer.squaddies.filter(el=>el.nameDisplayed===name)[0];
                m2.isActivating = true;
                m2.pressedAbutton = true;
                $('#app').empty().append(appMaker(Gamer.squaddies.filter(el => el.isActivating)[0], Gamer));
            }
        });
        $("#app").on('click',"#powerOfVooDoo"+m1.name,()=>{
            idear="powerOfVooDoo";
            commonPreInstruction({ m1: m1 });
            m1.drawAbilityAura = m1.baseRadius+6*inch;
            m1.pressedAbutton = true;
            $("#players").on("click.usingAbility",()=>{
                if(idear==="powerOfVooDoo" && hasActive(m1,"The Power of Voodoo") &&
                    distance(m3.posX,m3.posY,mouX,mouY)<=m3.baseRadius &&
                    distance(m1.posX,m1.posY,m3.posX,m3.posY)<=m1.baseRadius+6*inch+m3.baseRadius){
                    m3.moveAura = true;
                    m3.isPushed = false;
                    m3.isDodging = false;
                    let savedMoved = m3.hasMoved;
                    m3.remainingRun =    m3.sprint*inch+m3.baseRadius-movementHindrances(m3);
                    m3.remainingSprint = m3.sprint*inch+m3.baseRadius-movementHindrances(m3);
                    m1.abilities.activeOwned.forEach((el,i)=>{if(el.includes("The Power of Voodoo"))m1.abilities.activeOwned.splice(i,1)  } ) 
                    m3.abilities.activeGiven.push(["The Power of Voodoo", 0]);
                    commonAfterInstruction({ m1: m1 });
                    $('#app').empty().append(appMaker(m1, Gamer));
                    $('#players').on("click.abilitiesMove",()=>{
                        m3.isMoving = true;
                        m3.hasMoved = false;
                        $('#app').empty().append(appMaker(m1, Gamer));
                        if(distance(mouX,mouY,m3.posX,m3.posY)<=m3.remainingSprint+5)anime(m3, teamz, otherGamer, {mode: 'abilities' });
                        if(m3.remainingSprint < 30+m3.baseRadius){
                            m3.isMoving = false;
                            m3.hasMoved = savedMoved;
                            m3.moveAura = false;
                            m3.remainingRun =    m3.run*inch+m3.baseRadius-movementHindrances(m3);
                            m3.remainingSprint = m3.sprint*inch+m3.baseRadius-movementHindrances(m3);
                            m3.abilities.activeOwned.forEach((el,i)=>{if(el.includes("The Power of Voodoo"))m1.abilities.activeGiven.splice(i,1)  } ) 
                            $('#players').off("click.abilitiesMove");
                        }
                    })
                }
            })
        });
        
    }
}