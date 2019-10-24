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
        gameMode = 'quick game';
        gamePlace.val(gameMode);
    });
    ownGamePic.on('click', (e) => {
        e.preventDefault();
        ownGamePic.addClass('modeChosen').removeClass('modeHover');
        quickGamePic.removeClass('modeChosen').addClass('modeHover');
        gameMode = '';
        gamePlace.val(gameMode);
    });
    $("#gamePlayerName").on('keyup', () => {
        if (/^[0-9A-Za-z]+$/.test($("#gamePlayerName").val())) {
            //there are only alphanumeric characters
        }
        else {
            //it contains other characters
            $("#wronCharWarning").text("Your name and game name can't contain special characters.");
            $("#gamePlayerName").val(
                function(index, value){
                    return value.substr(0, value.length - 1);
            });
        }
    });
    $("#gamePlaceName").on('keyup', () => {
        if (/^[0-9A-Za-z]+$/.test($("#gamePlaceName").val())) {
            //there are only alphanumeric characters
        }
        else {
            //it contains other characters
            $("#wronCharWarning").text("Your name and game name can't contain special characters.");
            $("#gamePlaceName").val(
                function(index, value){
                    return value.substr(0, value.length - 1);
            });
        }
    });









});