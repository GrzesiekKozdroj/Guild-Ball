"use strict";
class Terrain {
    constructor(
        x, y, type, picture, sizeX, sizeY, bounduaries, rotation
    ) {
        this.x;
        this.y;
        this.type;
        this.picture;
        this.sizeX;
        this.sizeY;
        this.rotation;
        this.bounduaries;
    }
    //randomise picture from provided array
}

const sizeRandomiser = (objekt) => {
    const randomness = Math.random()
    return {
        img: new Image(),
        dir: objekt.dir,
        size: [(randomness * (objekt.size[1] - objekt.size[0]) + objekt.size[0]) * inch, (randomness * (objekt.size[3] - objekt.size[2]) + objekt.size[2]) * inch],
        kind: objekt.kind,
        rotation: 2.5 * Math.PI * Math.random(),
        description: objekt.description
    }
}

function terrainsDetector(teaMate) {
    if (teaMate.posX > 0 && filtered_td.length > 0) {
        Gamer.interaction(teaMate);
        otherGamer.interaction(teaMate);
        //color needs to be an array of these parameters and if any has a property, i means it is actvating duye to terrains:
        let x = teaMate.posX; let y = teaMate.posY;
        const longDist = 0.3;
        const shortDist = 0.73;
        const u = 1;
        const b = teaMate.baseRadius + 3;
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
        const farNodes = [
            [x - inch - b, y, u, u],//12
            [x - inch - longDist * b, y - inch - longDist * b, u, u],//1:30
            [x - u, y - inch - b, u, u],//3
            [x - u + inch + longDist * b, y - inch - longDist * b, u, u],//4:20
            [x - u + inch + b, y - u, u, u],//6
            [x - u + inch + longDist * b, y - u + inch + longDist * b, u, u],//8:30
            [x - u, y - u + inch + b, u, u],//9
            [(x - inch - longDist * b), (y - u + inch + longDist * b), u, u]//10:30
        ]

        let colorFar = [];
        let colorClose = [];
        let typesofTerrain = [];//types of nearby terrains

        for (let wT = 0; wT < filtered_td.length; wT++) {//builds and array of nearby terrain pieces
            if (distance(teaMate.posX, teaMate.posY, filtered_td[wT][1][0], filtered_td[wT][1][1]) < 4 * inch) {
                typesofTerrain.push(filtered_td[wT][0].kind);
            }
        }
        for (let ui = 0; ui < farNodes.length; ui++) {//builds arrays of color nodes
            colorFar.push(konvas.getImageData(...farNodes[ui]).data[3]);
            colorClose.push(konvas.getImageData(...closeNodes[ui]).data[3]);
        }
        if (teaMate.classification === "squaddie") {
            //<<----==    WALL || OBSTACLE || FOREST || GOAL POST grants cover
            if (!teaMate.terrainsMovPenalised && (colorFar.includes(255) && (typesofTerrain.includes("wall") || typesofTerrain.includes("obstacle"))) || (colorClose.includes(255) && typesofTerrain.includes("forest")) || (distance(teaMate.posX, teaMate.posY, otherGamer.gp.x, otherGamer.gp.y) <= (teaMate.baseRadius + inch + 2.5 * cm) || distance(teaMate.posX, teaMate.posY, Gamer.gp.x, Gamer.gp.y) <= (teaMate.baseRadius + inch + 2.5 * cm))) {
                teaMate.inCover = true;
            } else { teaMate.inCover = false }

            //<<----== Can't stand on wall or obstacle, and charge or run through a wall
            if (colorClose.includes(255) && typesofTerrain.includes("wall") && (teaMate.isMoving || teaMate.isCharging || teaMate.isDodging || teaMate.isPushed || (counter < 2 || counter > 5))) {
                if (teaMate.isMoving || teaMate.isCharging) teaMate.remainingRun = teaMate.remainingSprint;
                teaMate.shouldntBeHere = 1;
                if (teaMate.runPaid) { teaMate.infMin++; teaMate.runPaid = false }
            }
            else if (colorClose.includes(255) && typesofTerrain.includes("obstacle")) {
                teaMate.shouldntBeHere = 2;
                if (teaMate.runPaid) { teaMate.infMin++; teaMate.runPaid = false; }
            } else { teaMate.shouldntBeHere = 0 }

            //<<----==    ROUGH GROUND || FOREST grants movement hindrance
            if (colorClose.includes(255) && !teaMate.inRoughGround && !teaMate.isDodging && !teaMate.isPushed && (typesofTerrain.includes("forest") || typesofTerrain.includes("roughGround"))
                && !teaMate.isGliding) {
                let hasLightFooted = hasPassiveUnused(teaMate, "Light Footed");
                let hasWinterBlessing = hasPassiveUnused(teaMate, "Winters Blessing");
                teaMate.inRoughGround = true;
                teaMate.terrainsMovPenalised = true;
                if (!teaMate.isDodging && !teaMate.isPushed) {
                    teaMate.remainingRun += ((hasWinterBlessing ? 2 : hasLightFooted ? 0 : -2) * inch);
                    teaMate.remainingSprint += ((hasWinterBlessing ? 2 : hasLightFooted ? 0 : -2) * inch);
                };
                //makePassiveOpt(teaMate,"Winters Blessing");
                //makePassiveOpt(teaMate,"Light Footed");
                teaMate.inForest = typesofTerrain.includes("forest") ? true : false;
            } else if (!colorClose.includes(255)) { teaMate.inRoughGround = false }

            //<<----==    FAST GROUND grants movement bonus
            if (colorClose.includes(255) && !teaMate.inFastGround && typesofTerrain.includes("fastGround")) {
                console.log('hi from fast')
                teaMate.inFastGround = true; teaMate.remainingRun += 2 * inch; teaMate.remainingSprint += 2 * inch;
            } //else  if ( !colorClose.includes(255) ) {teaMate.inFastGround = false;}
        } else if (
            teaMate.classification === "token" && 
            teaMate.type === "Nature's Chill" && 
            !colorClose.includes(255) &&
            distance(Gamer.gp.x, Gamer.gp.y, teaMate.posX, teaMate.posY) > teaMate.baseRadius + 2.5 * cm &&
            distance(otherGamer.gp.x, otherGamer.gp.y, teaMate.posX, teaMate.posY) > teaMate.baseRadius + 2.5 * cm &&
            !otherGamer.tokens.some(el => el.type === "Nature's Chill" && 
            distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= el.baseRadius + teaMate.baseRadius)) //can place ability terrains on top of each other
        { return true } 
        else if (
            colorClose.includes(255) && 
            (typesofTerrain.includes("wall") || typesofTerrain.includes("obstacle") ) || 
            teamz.some(
                el => 
                    distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= el.baseRadius + teaMate.baseRadius) ||
                    distance(Gamer.gp.x, Gamer.gp.y, teaMate.posX, teaMate.posY) <= teaMate.baseRadius + 2.5 * cm ||
                    distance(otherGamer.gp.x, otherGamer.gp.y, teaMate.posX, teaMate.posY) <= teaMate.baseRadius + 2.5 * cm ||
                    Gamer.tokens.some(
                        el => 
                            el.type === "trap" && 
                            el.id !== teaMate.id && 
                            distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= el.baseRadius + teaMate.baseRadius) ||
                            otherGamer.tokens.some(
                                el => el.type === "trap" && 
                                distance(el.posX, el.posY, teaMate.posX, teaMate.posY) <= el.baseRadius + teaMate.baseRadius
                            ) ||
                    distance(teaMate.posX, teaMate.posY, ball.x, ball.y) <= teaMate.baseRadius + ball.ballSize
        ) 
        { return false } 
        else 
        { return true }
    }
}//end of terrians function with posX validator check



const pitchConstructor = () => {//generates an array of terrains to display
    for (let i = 0; i < coords.length; i++) {
        let roll;
        let cleard = td.filter(el => typeof el !== "undefined").filter(el => el !== undefined).filter(el => el).filter(el => el !== 0).filter(el => el !== false).filter(el => el !== "").filter(el => el !== NaN).filter(el => el !== null).filter(el => el[0].kind);
        if (cleard
            .filter(el => el)
            .some(el => el[0].kind === "obstacle") && td
                .filter(el => el)
                .some(el => el[0].kind === "forest")) {
            roll = () => Math.floor(Math.random() * (tp.length - 1)) + 1;
        } else if (cleard
            .filter(el => el)
            .some(el => el[0].kind === "forest")) {
            roll = () => Math.floor(Math.random() * (tp.length)) + 1;
        } else if (cleard
            .filter(el => el)
            .some(el => el[0].kind === "obstacle")) {
            roll = () => Math.floor(Math.random() * (tp.length - 1));
        } else {
            roll = () => Math.floor(Math.random() * (tp.length));
        }
        let rolled = roll();//below deterines here to place fast ground, where not to place obstacle & forest
        let edges = i === 0 || i === 4 || i === 5 || i === 9 || i === 10 || i === 14;
        let inFaceOfGoalPost = i === 2 || i === 12;
        while ((!edges && rolled === 1) || (inFaceOfGoalPost && (rolled === 0 || rolled === tp.length - 1))) rolled = roll()
        let chance = td[i - 1] !== undefined || Boolean(i > 4 && td[i - 5] !== undefined) ? -1 : 0.42;//<<---==Here alter spawn chance for terrains
        Math.random() <= chance ? td.push(
            [td.filter(el => el !== undefined).filter(el => el[0].kind === "wall").length > td.filter(el => el !== undefined).filter(el => el[0].kind !== "wall").length ? sizeRandomiser(tp[rolled]) : sizeRandomiser(tp[3]), coords[i]]
        ) : td.push(undefined);
    };

};

const terrainsGenerator = () => {//draws images of said terrains
    let kanwa = konvas;

    if (filtered_td.length < 1) {
        filtered_td = td
            //.filter((el,i)=>{el=(i===7&&(el[0].kind==="wall"||el[0].kind==="obstacle") )?undefined:el})//stops impassables from being in middle
            .filter(el => typeof el !== "undefined")
            .filter(el => el !== undefined)
            .filter(el => el)
            .filter(el => el !== 0)
            .filter(el => el !== false)
            .filter(el => el !== "")
            .filter(el => el !== NaN)
            .filter(el => el !== null)
            .filter(el => el[0].kind);

        filtered_td.forEach((el, i) => {
            el[0].img.crossOrigin = "anonymous";
            el[0].img.src = el[0].dir[i % 3];
        })
    }
    filtered_td.forEach((el) => {
        kanwa.save();
        kanwa.translate(el[1][0], el[1][1]);
        kanwa.rotate(2 * el[0].rotation);
        if (el) kanwa.drawImage(el[0].img, 0 - el[0].size[0] / 2, 0 - el[0].size[1] / 2, el[0].size[0], el[0].size[1]);
        kanwa.rect(el[1][0], el[1][1], el[0].size[0], el[0].size[1]);
        kanwa.restore();
        //kanwa.addHitRegion({id:img.src.toString()});
    })
}