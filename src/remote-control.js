function RemoteControl(player) {
    this._player = player;
    this._supportKeys = tizen.tvinputdevice.getSupportedKeys();

    let keysToLoad = [
        "MediaPlay",
        "MediaPause",
        "MediaPlayPause",
        "MediaStop",
        "VolumeUp",
        "VolumeDown",
        "VolumeMute",
        "Exit"
    ];
    tizen.tvinputdevice.registerKeyBatch(keysToLoad);
    document.body.addEventListener("keydown", this.keyDownHandler.bind(this));
}

RemoteControl.prototype.keyDownHandler = function (event) {
    switch (event.keyCode) {
        case tizen.tvinputdevice.getKey("MediaPlay"), 415:
            this._player.play();
            break;
        case tizen.tvinputdevice.getKey("MediaPause"), 19:
            this._player.pause();
            break;
        case tizen.tvinputdevice.getKey("MediaStop"), 413:
            this._player.stop();
            break;
        case tizen.tvinputdevice.getKey("VolumeUp"), 447:
            const vol = tizen.tvaudiocontrol.getVolume();
            tizen.tvaudiocontrol.setVolume(vol + 1);
            break;
        case tizen.tvinputdevice.getKey("VolumeDown"), 448:
            const vol = tizen.tvaudiocontrol.getVolume();
            tizen.tvaudiocontrol.setVolume(vol - 1);
            break;
        case tizen.tvinputdevice.getKey("VolumeMute"), 449:
            const isMuted = tizen.tvaudiocontrol.isMute();
            tizen.tvaudiocontrol.setMute(!isMuted);
            break;
        case tizen.tvinputdevice.getKey("Exit"), 10182:
            tizen.application.getCurrentApplication().exit();
            break;
        default:
            break;
    }
}