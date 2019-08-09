console.log('hello skillz buttonz');



function abilityButtons(teaMate, Gamer, color) {
    let m1 = teaMate;
    let abilities = [];

    if (teaMate.abilities.passiveOwned) {
        let anatomicalPrecision = teaMate.abilities.passiveOwned.some(el => el.includes("Anatomical Precision")) ?
            `<div id="anatomicalPrecision" class="passiveSkill">Anatomical Precision</div>` : '';
        abilities.push(anatomicalPrecision);

        let lightFooted = teaMate.abilities.passiveOwned.some(el => el.includes("Light Footed")) ?
            `<div id="lightFooted" class="passiveSkill">Light Footed</div>` : '';
        abilities.push(lightFooted);
    }

    if (teaMate.abilities.activeOwned) {

        let flurry = teaMate.abilities.activeOwned.some(el => el.includes("Flurry") && el[1] < 1) ?
            `<div id="flurry${teaMate.name}" class="activeSkill" style="border-color:${m1.theGuild.color}">Flurry</div>` : '';

        let bigGameTraps = teaMate.abilities.activeOwned.some((el, i) => el.includes("Big Game Traps") && el[1] < 1) &&

            teaMate.isActivating ? `<div id="BigGameTraps${m1.name}" class="activeSkill" style="border-color:${m1.theGuild.color};">Big Game Traps</div>` : '';

        let gutAndString = teaMate.abilities.activeOwned.some(el => el.includes("Gut and String") && el[1] === 0) ?
            `<div id="gutAndString" class="activeSkill" style="border-color:${m1.theGuild.color};">Gut and String</div>` : '';

        let snapFire = teaMate.abilities.activeOwned.some(el => el.includes("Snap Fire")) ?
            `<div id="snapFire${m1.name}" class="activeSkill" style="border-color:${m1.theGuild.color};">Snap Fire</div>` : '';

        abilities.push(flurry, snapFire, gutAndString, bigGameTraps);
    }

    return abilities.join('');
}

function commonPreInstruction(options) {
    options.m1.moveAura = false;
    options.m1.isDodging = false;
    options.m1.remainingDodge = 0;
}

function commonAfterInstruction(options) {
    options.m1.moveAura = false;
    options.m1.drawAbilityAura = 0;
    if (options.m1.isMoving) options.m1.hasMoved = true;
    options.m1.pressedAbutton = true;
    options.m1.drawAbilityTargetAura = 0;
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
    if (m1.drawAbilityAura > 0 && (isFree || m1.infMin > n-1)) {
        if (isFree) m1.abilities.passiveGiven.forEach((el, i) => {
            if (el === "Blessing of the Sun Father") m1.abilities.passiveGiven.splice(i, 1);
        });
    if(m1.infMin>=n){
        m1.infMin -= isFree ? 0 : n;
        return true;
    }else{
        return false
    }
}}

function abilitiesEvents(m1, Gamer, otherGamer) {
    ///////////////////////////_____HUNTERS_____///////////////////////////////////////////////////
    $('#app').on('click', '#BigGameTraps' + m1.name, () => {
        if (Gamer.tokens.length < 5 && counter === 5 && !m1.wasCharging && !m1.isDodging && $(".pW0").find(".plajBookCell").length === 0) {
            const snaret = new Token(mouX, mouY, smallBase, "trap");
            snaret.isInHand = true;
            Gamer.tokens.push(snaret);
            commonPreInstruction({ m1: m1 })
            //m1.moveAura = false;
            m1.drawAbilityAura = m1.baseRadius + 2 * inch + 2 * smallBase;
            $("#players").on('click.bigGameTraps', () => {
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
                    $("#players").off('click.bigGameTraps');
                    $('#BigGameTraps' + m1.name).remove();
                }
            })
        }
    });

    for (let hy = 0; hy < otherGamer.squaddies.length; hy++) {
        let m2 = otherGamer.squaddies[hy];

        $("#app").on('click', '#flurry' + m1.name, () => {
            if (m1.abilities.activeOwned.some(el => el.includes("Flurry") && el[1] < 1)) {
                commonPreInstruction({ m1: m1 });
                m1.drawAbilityAura = m1.baseRadius + 8 * inch;
                m1.drawAbilityTargetAura = 2;

                $("#players").on('click.flurry', () => {
                    if (distance(m2.posX, m2.posY, m1.posX, m1.posY) <= m1.baseRadius + 8 * inch + m2.baseRadius && distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && payPrice(2,m1) ) {
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
                        $("#players").off('click.flurry');
                })//click.flurry
            }//if has flurry
        })//flury

        $("#app").on("click", "#snapFire" + m1.name, () => {
            commonPreInstruction({ m1: m1 });
            m1.drawAbilityAura = m1.baseRadius + 6 * inch;
            $("#players").on("click.snapFire", () => {
                if (distance(m1.posX, m1.posY, m2.posX, m2.posY) <= m1.baseRadius + m2.baseRadius + 6 * inch &&
                    distance(mouX, mouY, m2.posX, m2.posY) <= m2.baseRadius && payPrice(1,m1)) {
                    if (abilitiesRoll(m1, m2, 1) > 0) {
                        trigerOnDamageEffects(m1,m2);
                        m2.hpMin-=1;
                    }
                    commonAfterInstruction({ m1: m1 });
                    $("#players").off("click.snapFire");
                }
            })
        })//snap fire
        
    }//for m2

}