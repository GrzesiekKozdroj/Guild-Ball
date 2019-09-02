"use strict";
class Ball_marker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.posX = this.x;
        this.posY = this.y;
        this.baseRadius = smallBase;
        this.newX = 540;
        this.newY = 340;
        this.degree = Math.PI / 180;
        this.direction = [30, 50, 70, 110, 130, 150];
        // this.angluar = Math.atan2(this.x - mouX, mouY - this.y);
        this.ballPic = new Image();
        this.ballPic.src = "./icons/cursor/32853911-0-GB-logo-Ball-white.png";
        this.ballSize = 1.2 * 1080 / 81.2;
        this.isOnGround = true;
        this.beingKicked = false;
        this.isInHand = false;
        this.teaMate = 0;
    }
    draw_ball() {
        //ball snap aura
        if (this.isOnGround) {
            ctx.beginPath();
            aurora(this.x, this.y, this.ballSize, this.x, this.y, 1.2 * cm + 1 * inch, 'rgba(187, 223, 130, 0.3)', 'rgba(187, 223, 130, 0.7)')
            //ctx.arc(this.x - 2 / this.ballSize, this.y - 2 / this.ballSize, 1.2 * cm + 1 * inch, 0, Math.PI * 2);
            //ctx.fillStyle = 'rgba(187, 223, 130, 0.3)';
            //ctx.fill();
            ctx.strokeStyle = 'rgba(237, 240, 57, 0.5)';
            ctx.lineWidth = 1;
            ctx.stroke();
            //ball background and image
            ctx.beginPath();
            ctx.arc(this.x - 2 / this.ballSize, this.y - 2 / this.ballSize, this.ballSize, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(31, 30, 22, 0.5)';
            ctx.fill();
            pcl.drawImage(this.ballPic, this.x - 0.9 * cm, this.y - 0.9 * cm, 1.8 * cm, 1.8 * cm)
            ctx.save();
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        }
        if (distance(mouX, mouY, this.x, this.y) < this.ballSize) {
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.globalAlpha = 0.7;
            ctx.font = "900 18px IM Fell English ";
            ctx.fillText('Ooohh ball!', mouX, mouY);
            ctx.restore();
        }
    }

    doppler() { //draw a proxy model for positioning
        if (this.beingKicked || this.isInHand) {
            ctx.beginPath();
            ctx.arc(mouX - 2 / this.ballSize, mouY - 2 / this.ballSize, 1.2 * cm + 1 * inch, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(187, 223, 130, 0.1)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(237, 240, 57, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
            //ball background and image
            ctx.beginPath();
            ctx.arc(mouX - 2 / this.ballSize, mouY - 2 / this.ballSize, this.ballSize, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(31, 30, 22, 0.5)';
            ctx.fill();
            pcl.drawImage(this.ballPic, mouX - 0.9 * cm, mouY - 0.9 * cm, 1.8 * cm, 1.8 * cm)
            ctx.save();
            ctx.clip();
            ctx.closePath();
            ctx.restore();
            //---defines--angle---------------------
            //---draw--template---------------------
            if (this.beingKicked) {
                let begin = Math.atan2(this.x - mouX, mouY - this.y);
                let end = Math.atan2(this.x - mouX, mouY - this.y) + Math.PI;
                ctx.beginPath();
                ctx.strokeStyle = "#FFFFFF";
                ctx.fillStyle = "#00FF00";
                ctx.lineWidth = 3;
                let angledX = k => { return (Math.cos(this.direction[k] * this.degree + Math.atan2(this.x - mouX, mouY - this.y)) * 7 * inch + mouX); }
                // x =          ( Math.cos(direction) * degree + Math.atan2( xOfOrigin - xOfTargetPoint, yOfTargetPoint - yOfOrigin ) + xOfTargetPoint)
                let angledY = k => { return (Math.sin(this.direction[k] * this.degree + Math.atan2(this.x - mouX, mouY - this.y)) * 7 * inch + mouY); }
                // y =          ( Math.cos(direction) * degree + Math.atan2( xOfOrigin - xOfTargetPoint, yOfTargetPoint - yOfOrigin ) + yOfTargetPoint)
                ctx.arc(mouX, mouY, 50, begin, end);
                for (let k = 0; k <= this.direction.length; k++) {
                    ctx.moveTo(mouX, mouY);
                    ctx.lineTo(angledX(k), angledY(k));
                };
                ctx.stroke();
                ctx.restore();
            }
            ctx.stroke();
        }
    } //end of player doppler function

    drawDropAura(teaMate = this.teaMate) {
        this.teaMate = teaMate;
        if (ball.isInHand) { drawCircle(ball.x, ball.y, this.teaMate + 1 * inch + ball.ballSize * 2, kickColor); }
    }
}
let ball = new Ball_marker(18 * inch, 18 * inch);

function scatterRandomiser(x = mouX, y = mouY, mode, m1) {
    if(m1)m1.hasBall = false; ball.isOnGround = true;
    neSpotx = x, neSpoty = y;
    let degree = Math.PI / 180;
    let direction = mode ? [30, 50, 70, 110, 130, 150] : [60, 120, 180, 240, 300, 360];
    let randomDirection = Math.floor(Math.random() * 5);
    let randomLength = Math.floor(Math.random() * (6 - 1 + 1)) + 2;
    diceRolled([randomDirection + 1, randomLength - 1], 0, 'black');
    let duration = 800;
    let ox = ball.x, oy = ball.y;
    let saveX, saveY;
    let startTime;
    let endX = (Math.cos(direction[randomDirection] * degree + Math.atan2(ball.x - x, y - ball.y)) * randomLength * inch + x);
    let endY = (Math.sin(direction[randomDirection] * degree + Math.atan2(ball.x - x, y - ball.y)) * randomLength * inch + y);


    let animball = (time) => {
        if (!startTime) {
            startTime = time;
        }
        let shouldntbehere;
        let xS = ball.x, yS = ball.y;

        //terrains detection nodes size abd position
        const shortDist = 0.73;
        const u = 1;
        const b = ball.ballSize + 3;
        let closeNodes;
        closeNodes = ball.x > 0 ? [
            [xS - b, yS, u, u],//12
            [xS - shortDist * b, yS - shortDist * b, u, u],//1:30
            [xS - u, yS - b, u, u],//3
            [xS - u + shortDist * b, yS - shortDist * b, u, u],//4:20
            [xS - u + b, yS - u, u, u],//6
            [xS - u + shortDist * b, yS - u + shortDist * b, u, u],//8:30
            [xS - u, yS - u + b, u, u],//9
            [xS - shortDist * b, yS - u + shortDist * b, u, u], //10:30
        ] : [];
        let colorClose = [];
        let typesofTerrain = [];//types of nearby terrains
        if ( xS && yS ) {
            for (let wT = 0; wT < filtered_td.length; wT++) {//builds and array of nearby terrain pieces
                if (distance(xS, yS, filtered_td[wT][1][0], filtered_td[wT][1][1]) < 6 * inch) {
                    typesofTerrain.push(filtered_td[wT][0].kind);
                }
            }
            for (let ui = 0; ui < closeNodes.length; ui++) {//builds arrays of color nodes
                colorClose.push(konvas.getImageData(...closeNodes[ui]).data[3]);
            }
        }

        shouldntbehere = (colorClose.includes(255) && (typesofTerrain.includes("wall") || typesofTerrain.includes("obstacle") && m1) ) ? true : false;

        let deltaTime = (time - startTime) / duration;
        if (deltaTime >= 1 || (shouldntbehere && mode) ) {
            //ox = endX; // reset x variable
            //oy = endY; // reset y variable
            if (teamz.some(el => distance(el.posX, el.posY, ball.x, ball.y) <= el.baseRadius + ball.ballSize) ) { ball.x = saveX; ball.y = saveY; };
            startTime = null; // reset startTime
            m1.hasDropped = false;
            if(isNaN(ball.x) && deltaTime >= 1){ball.isOnGround=true;ball.x=canvas.width/2;ball.y=canvas.height/2;scatterRandomiser(canvas.width/2,canvas.height/2,false,m1)}
            snapBallButtonCreator('end');
        } else {
            //<<-----------==  create button to snap the ball for all the interested
            const notMe = m1?m1.name:''; snapBallButtonCreator('', notMe);
            ball.x = ox + ((endX - ox) * deltaTime);
            ball.y = oy + ((endY - oy) * deltaTime);
            if (!teamz.some(el => distance(el.posX, el.posY, ball.x, ball.y) <= el.baseRadius + ball.ballSize) && !shouldntbehere) { saveX = ball.x; saveY = ball.y }
            requestAnimationFrame(animball);
        }
    }//animball endz
    animball();
}


class GoalPost {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.posX = x;
        this.posY = y;
        this.name = 'Goal Post'
        this.kickDist = 10 * inch + 2.5 * cm;
        this.hasBall = false;
        this.isKicking = false;
        this.color = color;
        this.ballPic = new Image();
        this.ballPic.src = "./icons/cursor/32853911-0-GB-logo-Ball-white.png";
    }
    drawGoalPost(mom, score, influence) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.5 * cm, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.drawImage(this.ballPic, this.x - 2 * cm, this.y - 2 * cm, 4 * cm, 4 * cm)
        ctx.closePath();
                //----------------ball--marker--on--goal--post-----------
                for (let v = 0; v < 7; v++) {
                    if (v % 2 === 0) {
                        pcl.beginPath(); //circle around image
                        pcl.lineWidth = 3;
                        pcl.strokeStyle = this.hasBall ? 'black' : "rgba(0,0,0,0)";
                        pcl.arc(this.x, this.y, 2.5*cm, v, v + 1, false);
                        pcl.stroke();
                    } else {
                        pcl.beginPath(); //circle around image
                        pcl.arc(this.x, this.y, 2.5*cm, v, v + 1, false);
                        pcl.lineWidth = 3;
                        pcl.strokeStyle = this.hasBall ? 'white' : "rgba(0,0,0,0)";
                        pcl.stroke();
                    }
                }

        //goal kick aura
        if (this.hasBall && this.isKicking) {
            ball.beingKicked = true;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2.5 * cm + 10 * inch, 0, Math.PI * 2, false);
            ctx.fillStyle = kickColor;
            ctx.fill();
            ctx.closePath();
        }

        ctx.beginPath(); //score displayed
        ctx.lineWidth = 3;
        ctx.font = "900 38px IM Fell English";
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'rgba(8, 21, 37,0.55)';
        ctx.textAlign = "center";
        ctx.strokeText(score, this.x, this.y + 14);
        ctx.fillText(score, this.x, this.y + 14);
        ctx.closePath();

        //--------momentum-------displayed---------

        for (let momCircle = 0; momCircle < mom; momCircle++) {
            let degree = Math.PI / 180;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(((1 + momCircle) * 18 * degree) + (45 * degree));
            ctx.beginPath();
            ctx.fillStyle = "blue";
            ctx.lineWidth = 1.6;
            ctx.arc(0, 1.9 * cm, 6, 2 * Math.PI, 0);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath(); //score displayed
            ctx.lineWidth = 1;
            ctx.font = "900 12px IM Fell English";
            ctx.fillStyle = 'white';
            ctx.textAlign = "center";
            ctx.fillText(momCircle + 1, 0, 1.9 * cm + 3);
            ctx.closePath();
            ctx.restore();
        }

        //-----------influence--pool----------displayed-----------------

        for (let infCircle = 0; infCircle < influence; infCircle++) {
            let degree = Math.PI / 180;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(((1 + infCircle) * 15 * degree) + (45 * degree));
            ctx.beginPath();
            ctx.fillStyle = "yellow";
            ctx.lineWidth = 1;
            ctx.arc(0, 1.6 * cm, 5, 2 * Math.PI, 0);
            ctx.fill();
            ctx.stroke();
            ctx.beginPath(); //score displayed
            ctx.lineWidth = 1;
            ctx.font = "900 12px IM Fell English";
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            ctx.fillText(infCircle + 1, 0, 1.6 * cm + 2);
            ctx.closePath();
            ctx.restore();
            ctx.restore();
        }

        if (distance(this.x, this.y, mouX, mouY) < 2.5 * cm) {
            ctx.save();
            ctx.beginPath();
            ctx.globalAlpha = 0.7;
            ctx.fillRect(mouX - 140, mouY - 20, 280, 27)
            ctx.beginPath();
            ctx.fillStyle = 'black';
            ctx.font = "900 24px IM Fell English ";
            ctx.fillText(`momentum: ` + mom + `      score: ` + score, mouX, mouY);
            ctx.restore();
        }
    }
}