

let allTheGuildsForMenu = [alchemists, blacksmiths, brewers, butchers, cooks, engineers, falconers, farmers, fishermen, hunters, masons, miners, morticians, navigators, solthecian, ratcatchers, union];
let totalNumberOfDuds = 0;
let
    Alchemists = new Guild(...alchemists), Blacksmiths = new Guild(...blacksmiths), Brewers = new Guild(...brewers),
    Butchers = new Guild(...butchers), Cooks = new Guild(...cooks), Engineers = new Guild(...engineers), Falconers = new Guild(...falconers),
    Farmers = new Guild(...farmers), Fishermen = new Guild(...fishermen), Hunters = new Guild(...hunters), Masons = new Guild(...masons),
    Miners = new Guild(...miners), Morticians = new Guild(...morticians), Navigators = new Guild(...navigators),
    Solthecian = new Guild(...solthecian), Ratcatchers = new Guild(...ratcatchers), Union = new Guild(...union);

    function displayPlaybook(m1){//used to display playbook while making a roster
        plajBookWraz()
            for(let i = 0;i< m1.playBook.length;i++){
                playbookStitcher(m1, i, playBookWrap.noWrap, "attack")
            }
    }
let buildGuildsVar;

//$((e) => {
//below creAres actual team for each Gamer:

    function buildGamerTeam(matter){
       $("#teaMenuScreen").empty();
       if(counter === -2){
           buildGuilds();
           buildGuildsEvents();
           bookOfLife = [];
           for(let sq = 0; sq<matter.length;sq++){
                let bobsko = new Player(...allPlayersAsArray.filter(el=>el[16]===($(matter[sq]).data("name") ) ) [0] );
                bookOfLife.push(bobsko)
           }
            counter++;
            Gamer1 = new Gajmer(
                0,0,0,
                bookOfLife,
                addInfGen (bookOfLife),
                rnd > 0.5 ? true : false,//active?
                bookOfLife[0].theGuild,
                rndDeploy > 0.5 ? [18 * inch, 6 * inch - 2.5 * cm] : [18 * inch, 30 * inch + 2.5 * cm],
                rndDeploy > 0.5 ?                [0, 10 * inch]    :    [26 * inch, 1080/*canvas.height*/],
                rndDeploy > 0.5 ?                       'top'      :        'bottom' 
            );
            } else if (counter === -1){
                buildGuilds();
                buildGuildsEvents();
                bookOfLife = [];
                for(let sq = 0; sq<matter.length;sq++){
                     let bobsko = new Player(...allPlayersAsArray.filter(el=>el[16]===($(matter[sq]).data("name") ) ) [0] );
                     bookOfLife.push(bobsko)
                }
                 counter++;
                 Gamer2 = new Gajmer(
                     0,0,0,
                     bookOfLife,
                     addInfGen (bookOfLife),
                     rnd > 0.5 ? false : true,//active?
                     bookOfLife[0].theGuild,
                     rndDeploy > 0.5 ? [18 * inch, 30 * inch + 2.5 * cm] : [18 * inch, 6 * inch - 2.5 * cm],
                     rndDeploy > 0.5 ? [26 * inch, 1080 /*canvas.height*/ ] : [0, 10 * inch],
                     rndDeploy > 0.5 ? 'bottom'  : 'top'
                 );
                    $("#teaMenuScreen").remove();
                        teamz = [...Gamer1.squaddies, ...Gamer2.squaddies];
                        Gamer = rnd > 0.5 ? Gamer1 : Gamer2;
                        otherGamer = rnd > 0.5 ? Gamer2 : Gamer1;
                    bigBang();
       }
    }

    function buildGuilds(){//creates menu where I choose my guild
    $("#teaMenuScreen").css("background", `url(./icons/cursor/${Math.floor(Math.floor(Math.random() * (3 - 1 + 1)) + 1)}.jpg)`);

    allTheGuildsForMenu.forEach((el, i) => {
        let guildButton = `<div class="guildIco" id="${el[1]}Ico" data-title="${el[1]}" data-img=${el[2]} data-desc="${el[5]}" 
        data-footer="${el[6]}" style="background:url(${el[2]});    background-size:contain;    background-repeat:no-repeat;"/>`;
        $("#teaMenuScreen").append(guildButton);
    })}buildGuilds();

    function buildGuildsEvents(){
    $(".guildIco").each(
        function () {
            const title = $(this).data("title");
            $(this).on("mouseenter", () => {
                $("#app").empty().append(
                    `<div class="guildInfo">
                    <h1 class="guildHeader">
                        <img id="${title}lilPic" src="${$(this).data("img")}"/>
                        <p class="guildName">${title}'s Guild</p>
                    </h1>
                    <p class="guildInfoP">${$(this).data("desc")}</p>
                    <footer class="guildFoot">${$(this).data("footer")}</footer>
                    </div>`
                )
            })
            $(this).on("click", () => {
                squaddiesToDisplay = [...allPlayersAsArray.filter(el => el[19].name === title)]
                $(this).parent().empty();
                chooseTeam(squaddiesToDisplay,title);
            });
        })//each
    };buildGuildsEvents();

    buildGuildsVar =()=>{ $("#teaMenuScreen").empty();buildGuilds();buildGuildsEvents();}
//})//dom
let squaddiesToDisplay = [];
//bigBang();

function chooseTeam(sTD,guild) {//builds and displays an array of players for each team

    $("#teaMenuScreen").append(`<div id="thePlayers"></div>`);

    sTD.forEach(el => {//below builds icon on roster for each player
        $("#thePlayers").append(`
        <div id="roster${el[16]}"class="rosterIco ${el[20][4]}" style="border-color:${el[19].color}; 
            background:url(${el[14]}) ${el[15][0]}px ${el[15][1]}px; width:${el[15][2]}px; height:${el[15][3]}px; 
            margin:${130 - el[15][2] / 1.7}px ${100 - el[15][3] / 1.6}px  ${-el[15][3]}px  ${100 - el[15][3] / 1.6}px;
            transform:scale(calc(100/${el[15][2]}), calc(100/${el[15][3]}) );" data-name=${el[16]} data-identity=${el[20][4]}
            data-attachment=${el[20][5]} data-dname="${el[21]}">
        </div>
        `)
    })
    //below builds page composition for roster
    const normalGuildsRoster = `
        <div class="rosterChosen">
            <div class="captainRoster" id="Captain" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Captain</p></div>
            <div class="mascotRoster" id="Mascot" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Mascot</p></div>
            <div class="squaddiesRoster" id="Squaddie" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Squaddies</p></div>
        </div>`;
    const blacksmithsRoster = `
        <div class="rosterChosen">
            <div class="captainRoster" id="Captain" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Captain</p></div>
            <div class="mastersRoster" id="Master" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Masters</p></div>
            <div class="apprenticesRoster" id="Apprentice" style="border-color:${sTD[0][19].color};color:${sTD[0][19].color};"><p>Apprentices</p></div>
        </div>`;

    $("#teaMenuScreen").append(`
        ${guild==="Blacksmiths"?blacksmithsRoster:normalGuildsRoster}
        <div class="guildRosterReverse" onClick="buildGuildsVar()"><--=</div>
    `)

    $("#thePlayers").find(".rosterIco").each(//generates actual player object on hover, and assigns events to its icon
        function () {
            let squaddieName = $(this).data("name");
            let chosenSquaddie = new Player(...allPlayersAsArray.filter(el => el[16] === squaddieName)[0] );
            $(this).on("mouseenter", () => {
                displayPlaybook(chosenSquaddie)
                $("#app").empty().append(appMaker(chosenSquaddie));
                sendMessage(`${chosenSquaddie.identity.status}`)
            })
            $(this).on("click", ()=>{
                let type = $(this).data("identity");
                let displayName = $(this).data("dname");
                if( $("#"+type).children("."+type).length <
                    (type==="Captain" || type ==="Mascot"? 1 : type==="Master" ? 2 : type==="Apprentice" ? 3 : 4 )  
                    && //    BUGGED
                    $(".rosterChosen").find(`[data-dname="${displayName}"]`).length < 1 
                     ){
                    $(guild==="Blacksmiths" && $("#Captain").children(".rosterIco").length < 1 && type==="Master" ? "#Captain" : "#"+chosenSquaddie.identity.status)
                        .append(this)
                        .on("click",()=>{
                            $("#thePlayers").append(this);
                            if(  $(this).data("attachment")==="Attachment"  ){
                                let attached = $("#teaMenuScreen").find(".Attachment")
                                $(this).parent().append(attached);
                            }
                        });
                    if(  $(this).data("attachment")==="Attachment"  ){
                        let attached = $("#teaMenuScreen").find(".Attachment")
                        $(this).parent().append(attached);
                    }
                }//if

                if( $(".rosterChosen").find(".rosterIco").length === 7 || 
                    ($(".rosterChosen").find(".rosterIco").length === 6 && $(".rosterChosen").find(".Attachment").length < 1 ) ){
                    
                    $("#teaMenuScreen")
                                    .append(`<div class="guildRosterForward" 
                                        style="background-color:${chosenSquaddie.theGuild.color};">=--></div>`)
                                    .on("click", ".guildRosterForward",()=>{
                                        buildGamerTeam($(".rosterChosen").find(".rosterIco"))
                                        console.log(counter);
                                    })
                }
            })//this on click
        }//function
    )//each
        $(".rosterChosen").on("click",()=>{
            $(".guildRosterForward").off().remove();});

        
}//chooseTeam()
//    })//DOM
