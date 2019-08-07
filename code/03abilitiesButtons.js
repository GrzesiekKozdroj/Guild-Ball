console.log('hello skillz buttonz');



function abilityButtons(teaMate, Gamer, color) {
    let m1 = teaMate;
    let abilities = [];

    if(teaMate.abilities.passiveOwned){
        let anatomicalPrecision = teaMate.abilities.passiveOwned.some(el=>el.includes("Anatomical Precision")  ) ?
            `<div id="anatomicalPrecision" class="passiveSkill">Anatomical Precision</div>`:'';
            abilities.push(anatomicalPrecision);
            
        let lightFooted = teaMate.abilities.passiveOwned.some(el=>el.includes("Light Footed")  ) ?
            `<div id="lightFooted" class="passiveSkill">Light Footed</div>`:'';
            abilities.push(lightFooted);
    }

    if (teaMate.abilities.activeOwned) {

        let gutAndString = teaMate.abilities.activeOwned.some(el=>el.includes("Gut and String") && el[1] === 0  ) ?
            `<div id="gutAndString" class="activeSkill" style="border-color:${m1.theGuild.color};">Gut and String</div>`:'';
            abilities.push(gutAndString);
    
        let bigGameTraps = teaMate.abilities.activeOwned.some( (el,i)=>el.includes("Big Game Traps") && el[1]<1) &&
            
            teaMate.isActivating? `<div id="BigGameTraps${m1.name}" class="activeSkill" style="border-color:${m1.theGuild.color};">Big Game Traps</div>` : '';
        abilities.push(bigGameTraps);
    }

    return abilities.join('');
}


function abilitiesEvents(m1,Gamer,otherGamer) {
///////////////////////////_____HUNTERS_____///////////////////////////////////////////////////
    $('#app').on('click','#BigGameTraps'+m1.name,()=>{
        if(Gamer.tokens.length<5 && counter === 5 && !m1.wasCharging && !m1.isDodging && $(".pW0").find(".plajBookCell").length === 0){
            const snaret = new Token(mouX, mouY, smallBase, "trap");
            snaret.isInHand = true;
            Gamer.tokens.push(snaret);
            m1.moveAura = false;
            m1.drawAbilityAura = m1.baseRadius+2*inch+2*smallBase;
            $("#players").on('click.bigGameTraps', () => {
                if(distance(m1.posX,m1.posY,mouX,mouY)<=m1.baseRadius+2*inch+smallBase && snaret.isPlacable){
                    m1.drawAbilityAura = 0;
                    if(m1.isMoving)m1.hasMoved = true;
                    snaret.isInHand = false;
                    m1.pressedAbutton = true;
                    m1.abilities.activeOwned.forEach((el,i)=>{
                        if(el.includes("Big Game Traps")){
                            m1.abilities.activeOwned[i][1]++
                        }
                    })
                    $("#players").off('click.bigGameTraps');
                    $('#BigGameTraps'+m1.name).remove();
                }
            })
        }
    })

}