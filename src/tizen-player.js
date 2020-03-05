const listeners = {
    onbufferingstart: function () {
        console.log("buffering");
    },
    onbufferingprogress: function (percent) {
        console.log("buffering: " + percent);
    },
    onbufferingcomplete: function () {
        console.log("buffering complete");
    },
    oncurrentplaytime: function (currentTime) {
        console.log("current time: " + currentTime);
    },
    onevent: function (eventType, eventData) {
        console.log("eventType: " + eventType + " eventData: " + eventData);
    },
    ondrmevent: function (drmEvent, drmData) {
        console.log("drmEvent: " + drmEvent + " drmData: " + drmData);
    },
    onstreamcompleted: function () {
        console.log("stream complete");
    },
    onerror: function (eventType) {
        console.log("eventType: " + eventType);
    }
};

function loadPlayer(source, drmParam) {
    // the order of the following calls is important we recommend not changing it 
    webapis.avplay.open(source);
    webapis.avplay.setDisplayRect(0, 0, 1920, 1080);
    webapis.avplay.setListener(listeners);
    if (drmParam) {
        webapis.avplay.setDrm("PLAYREADY", "SetProperties", JSON.stringify(drmParam));
        webapis.avplay.prepareAsync(function () {
            return;
        });
    } else {
        webapis.avplay.prepare();
    }

    return webapis.avplay;
};