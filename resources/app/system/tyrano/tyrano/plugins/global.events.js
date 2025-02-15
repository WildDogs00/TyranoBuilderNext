$(document).ready(function() {
    // Обработчик клика buttonHover
    $(document).on('click', '.buttonHover', function() {
        let pm = JSON.parse($(this).attr('data-pm').replace(/&quot;/g, "\""));

        if (pm.storageSe !== "") {
            let clickSound = new Audio(`./data/sound/${pm.storageSe}`);
            clickSound.volume = pm.soundVolume || 1;
            clickSound.play();
        }

        if (pm.target || pm.storage) {
            TYRANO.kag.ftag.startTag("jump", {storage: pm.storage, target: pm.target});
        }
    });

    // Обработчик наведения мыши buttonHover
    $(document).on('mouseenter mouseleave', '.buttonHover', function(event) {
        const pm = JSON.parse($(this).attr('data-pm').replace(/&quot;/g, '"'));
        let imageUrl = '';

        if (event.type === 'mouseenter' && pm.graphicH) {
            imageUrl = './data/image/' + pm.graphicH;
        } else if (event.type === 'mouseleave' && pm.graphic) {
            imageUrl = './data/image/' + pm.graphic;
        }

        if (imageUrl) {
            $(this).css('background-image', `url(${imageUrl})`);
        }
    });
});