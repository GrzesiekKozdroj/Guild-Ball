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
    $("#beginGameButton").on('click', (e) => {
        e.preventDefault();
        if( /^[0-9A-Za-z]+$/.test($("#gamePlayerName").val()) && /^[0-9A-Za-z]+$/.test($("#gamePlaceName").val())   ){
            //socket.emit('namePlace',{nickName:$("#gamePlayerName").val(), place:$("#gamePlaceName").val() }  );
            if(online === false) alfa();//starts everythhing if offline....
        } else{
            $("#wronCharWarning").text("Your name and game name can't contain special characters and spaces.");
        }
    });

//socket.on('alfaTime',alfa);//begins everything if online






});
