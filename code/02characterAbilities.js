
let trapsArray = [];
class CharacterAbilities {
    constructor (...abil){
        //hunter specific
        this.placingTrap = false;
    }
    bigGameTraps(m1, Gamer){
        if(distance(m1.posX,m1.posY,mouX,mouY)<=2*inch+m1.baseRadius+smallBase){
            
        }
    }
}

class Token {
    constructor(xo,yo,size,type){
        this.classification = "token";
        this.id = Math.floor(Math.random()*10000);
        this.posX = xo;
        this.posY = yo;
        this.baseRadius = size;
        this.type = type;
        this.icon = new Image();
        this.icon.src = this.type === "trap" ? "./icons/snared.png" : "";
        this.isInHand = false;
        this.isPlacable;
    }
    drawToken(x = this.posX, y = this.posY){
        //letx =  ; 
        //let y = ;
        if (this.type = "trap"){
            pcl.lineWidth = 1;
            ctx.lineWidth = 1;
            ctx.beginPath() 
            ctx.globalAlpha = 1;
            aurora(x, y, 0, x, y, this.baseRadius+1*inch, redColor, greenColor);
            ctx.closePath();
            ctx.stroke();
            pcl.beginPath();
            pcl.arc(x, y, this.baseRadius, 0, Math.PI * 2, true);
            pcl.fillStyle = "rgba(164, 192, 120, 0.74)";
            pcl.strokeStyle= "rgba(209, 59, 49, 0.932)";
            pcl.fill();
            pcl.stroke();
            pcl.closePath();
            pcl.save();
            pcl.clip();
            pcl.beginPath();
            //draw icons
            pcl.drawImage(this.icon, x - this.baseRadius, y - this.baseRadius, this.baseRadius*2, this.baseRadius*2);
            pcl.lineWidth = 1;
            pcl.closePath();
            pcl.restore();
        }
    }
    drawDoppler(){
        if(this.isInHand){
            this.posX = mouX;
            this.posY = mouY;
            this.isPlacable = terrainsDetector(this);
        }
    }
}

function GutAndString (m1,m2){
    if(m1.abilities.activeOwned.some(el=>el.includes("Gut and String") && el[1] === 0 ) 
    && !m2.abilities.activeGiven.some(el=>el==="Gut and String")){
        m2.abilities.activeGiven.push("Gut and String");
        m2.remainingSprint-=2*inch;
        m2.remainingRun-=2*inch;
        m1.abilities.activeOwned.forEach(el=>{if(el[0]==="Gut and String"){el[1]+=1}});
    }
}








function abilitiesCleaner(m1){//activates at the end of the turn and cleanses all effects.....
    m1.abilities.passiveGiven = [];
    m1.abilities.activeGiven = [];
    m1.abilities.activeOwned.forEach(el=>el[1]=0);
    m1.abilities.passiveOwned.forEach(el=>el[1]=0);
}


