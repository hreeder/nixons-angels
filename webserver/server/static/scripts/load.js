/**
 * Created by szczocik on 20/01/17.
 */
function getTemplate(templateName, callback) {
    $.ajax({
        url: "/static/templates/" + templateName + ".hbs",
        cache: false,
        success: callback
    });
}

$(function(){
    startWebsocket();

    addWebsocketCallback('waiting-game', function(data) {
        $('#system-message').text("Waiting for the game to connect");
    });

    addWebsocketCallback('ready', function(data) {
        $('#system-message').text("Waiting for the VR player to start the game");
    });

    addWebsocketCallback('load-level', function(data) {
        var level = data.level;
        getTemplate(level, function(tpl_source) {
            var tpl = Handlebars.compile(tpl_source);
            $('#main-area').html(tpl());
            if (level === "entry") {
                loadEntryPuzzle();
            }
        });
    });
});


