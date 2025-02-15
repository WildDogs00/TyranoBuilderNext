function showSettings() {
    let settingsDiv;
    fetch('tyrano/html/settings.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            const tyranoBase = document.getElementById('tyrano_base');
            tyranoBase.insertAdjacentHTML('beforeend', html);

            updateTexts();

            // Инициализация ползунка громкости
            initializeVolumeControl();
            initializeSeVolumeControl();
            initializeVoVolumeControl();

            settingsDiv = document.getElementById('settings');
            const closeButton = document.querySelector('.close_settings_page');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    if (settingsDiv) {
                        $('#settings').fadeOut(function() {
                            $(this).remove();
                            isSettingsOpen = false;
                        });
                    }
                });
            }


            document.getElementById('volumeControl').addEventListener('input', function(e) {
                var globalVolume = e.target.value / 100;
                setAllBgmVolume(globalVolume);
            });

            document.getElementById('volumeControlSe').addEventListener('input', function(e) {
                var globalVolume = e.target.value / 100;
                setAllSeVolume(globalVolume);
            });

            document.getElementById('volumeControlVo').addEventListener('input', function(e) {
                var globalVolume = e.target.value / 100;
                setAllVoVolume(globalVolume)
            });

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation: ', error);
        });
}

function setAllBgmVolume(globalVolume) {
    for (var buf in TYRANO.kag.tmp.map_bgm) {
        if (TYRANO.kag.tmp.map_bgm.hasOwnProperty(buf)) {
            var bgm = TYRANO.kag.tmp.map_bgm[buf];
            if (bgm) {
                var baseVolume = TYRANO.kag.stat.map_bgm_volume[buf] || 1;
                var finalVolume = baseVolume * globalVolume;
                finalVolume = Math.max(0, Math.min(1, finalVolume));
                bgm.volume(finalVolume);
            }
        }
    }

    let nameBgmVolumeGame = TYRANO.kag.kag.stat.title;
    localStorage.setItem(nameBgmVolumeGame, (globalVolume * 100).toString());
}

function initializeVolumeControl() {
    let nameBgmVolumeGame = TYRANO.kag.kag.stat.title;
    var savedVolume = localStorage.getItem(nameBgmVolumeGame);
    var volumeControl = document.getElementById('volumeControl');

    if (savedVolume !== null && volumeControl) {
        var volume = parseFloat(savedVolume) / 100;
        volumeControl.value = savedVolume;
        setAllBgmVolume(volume);
    }
}

function setAllSeVolume(globalVolume) {
    for (var buf in TYRANO.kag.tmp.map_se) {
        if (TYRANO.kag.tmp.map_se.hasOwnProperty(buf)) {
            var se = TYRANO.kag.tmp.map_se[buf];
            if (se) {
                var baseVolume = TYRANO.kag.stat.customSeVolume[buf] || 1;
                var finalVolume = baseVolume * globalVolume;
                finalVolume = Math.max(0, Math.min(1, finalVolume));
                se.volume(finalVolume);
            }
        }
    }

    let nameSeVolumeGame = TYRANO.kag.kag.stat.title + "_se";
    localStorage.setItem(nameSeVolumeGame, (globalVolume * 100).toString());
}

function initializeSeVolumeControl() {
    let nameSeVolumeGame = TYRANO.kag.kag.stat.title + "_se";
    console.warn(nameSeVolumeGame)
    var savedVolume = localStorage.getItem(nameSeVolumeGame);
    var volumeControlSe = document.getElementById('volumeControlSe');

    if (savedVolume !== null && volumeControlSe) {
        var volume = parseFloat(savedVolume) / 100;
        volumeControlSe.value = savedVolume;
        setAllSeVolume(volume);
    }
}

function initializeVoVolumeControl() {
    let nameVeVolumeGame = TYRANO.kag.kag.stat.title + "_vo";
    const savedVolume = localStorage.getItem(nameVeVolumeGame);
    const volumeControlVo = document.getElementById('volumeControlVo');

    if (savedVolume !== null && volumeControlVo) {
        const volume = parseFloat(savedVolume) / 100;
        volumeControlVo.value = savedVolume;
        setAllVoVolume(volume);
    }
}


function setAllVoVolume(allVoVolume) {
    let nameVeVolumeGame = TYRANO.kag.kag.stat.title + "_vo";
    localStorage.setItem(nameVeVolumeGame, (allVoVolume * 100).toString());

    if (charVoice && charVoice.currentSound) {
        charVoice.setVolume(allVoVolume);
    }
}



function updateTexts() {
    document.getElementById('titleSettingPage').append(window.tyrano_lang.word.title_setting);
    document.getElementById('settings_vc').append(window.tyrano_lang.word.settings_vc);
    document.getElementById('settingsSe').append(window.tyrano_lang.word.settingsSe);
    document.getElementById('settings_Vo').append(window.tyrano_lang.word.settings_Vo);
}


let isSettingsOpen;

document.addEventListener('keydown', function(event) {
    if (event.code === 'KeyS') {
        if (!isSettingsOpen) {
            isSettingsOpen = true;
            showSettings();
        } else {
            const settingsDiv = document.getElementById('settings');
            if (settingsDiv) {
                settingsDiv.remove();
                isSettingsOpen = false;
            }
        }
    }
});