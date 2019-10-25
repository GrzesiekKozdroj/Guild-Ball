$((e) => {
    const quickGamePic = $("#quickGamePic");
    const ownGamePic = $("#ownGamePic");
    const introductionInfo = $(".introductionInfo");
    const gamePlace = $("#gamePlaceName");
    let gameMode = 'quickGame';

    quickGamePic.on('click', (e) => {
        e.preventDefault();
        quickGamePic.addClass('modeChosen').removeClass('modeHover');
        ownGamePic.removeClass('modeChosen').addClass('modeHover');
        gameMode = 'quickGame';
        gamePlace.val(gameMode);
    });
    ownGamePic.on('click', (e) => {
        e.preventDefault();
        ownGamePic.addClass('modeChosen').removeClass('modeHover');
        quickGamePic.removeClass('modeChosen').addClass('modeHover');
        gameMode = '';
        gamePlace.val(gameMode);
    });
    function validatore(objectos, callbackos) {
        let goo = 0;
        //for(let ocb; ocb < objectos.length; ocb++)
        objectos.forEach(objet=>{
        if
            (/^[0-9A-Za-z]+$/.test(objet.val())) {
                goo++
        } else {
            //it contains other characters
            $("#wronCharWarning").text("Your name and game name can't contain special characters and spaces.");
            // objet.val(
            //     function (index, value) {
            //         return value.substr(0, value.length - 1);
            //     });
            };
        }
        )//foreach
        if(goo>1 && callbackos) callbackos();
    }
    $("#gamePlayerName").keyup( validatore( [$("#gamePlayerName")], alfa )    );
    $("#gamePlaceName").keyup(validatore( [$("#gamePlaceName")], alfa ) );
    $("#beginGameButton").on('click', (e) => {
        e.preventDefault();
        validatore([$("#gamePlayerName"), $("#gamePlaceName")], alfa)
    })









});
