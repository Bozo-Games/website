console.log(settings);
var settings = (settings === undefined)?{}:settings;
console.log(settings);
var castSettings = {
    cast: {
        status : {
            isAvailable: false,
            isConnected: false,
        },
        namespace: 'testing dose this have to be a web address?',
        session: undefined,
        appID: undefined,
        init: function () {
            var applicationID = chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID;
            if(settings.cast.appID !== undefined) {
                applicationID = settings.cast.appID;
            }
            console.log('appID ' + settings.cast.appID);
            var sessionRequest = new chrome.cast.SessionRequest(applicationID);

            var apiConfig = new chrome.cast.ApiConfig(sessionRequest,
                settings.cast.sessionListener,
                settings.cast.receiverListener);


            chrome.cast.initialize(apiConfig, settings.cast.onInitSuccess, settings.cast.onInitError);
        },
        sessionListener: function(e) {
            settings.cast.session = e;
            console.log('New session ID:' + e.sessionId);
            settings.cast.session.addUpdateListener(settings.cast.sessionUpdateListener);
            settings.cast.session.addMessageListener(settings.cast.namespace, settings.cast.receiverMessage);
        },
        receiverListener: function(e) {
            if( e === 'available' ) {
                settings.cast.isAvailable = true;
                console.log("Chromecast was found on the network.");
            } else {
                settings.cast.isAvailable = false;
                console.log("There are no Chromecasts available.");
            }
        },
        onInitSuccess: function() {
            console.log("Initialization succeeded");
        },
        onInitError: function() {
            console.log("Initialization failed");
        },
        launchApp:function() {
            console.log("Launching the Chromecast App...");
            chrome.cast.requestSession(settings.cast.onRequestSessionSuccess, settings.cast.onLaunchError);
        },
        onRequestSessionSuccess: function(e) {
            console.log("Successfully created session: " + e.sessionId);
            settings.cast.isLoaded = true;
            settings.cast.session = e;
        },
        onLaunchError: function(e) {
            console.log(e);
            console.log("Error connecting to the Chromecast.");
        },
        sessionUpdateListener: function (isAlive) {
            var message = isAlive ? 'Session Updated' : 'Session Removed';
            message += ': ' + settings.cast.session.sessionId;
            print('message');
            //appendMessage(message);
            if (!isAlive) {
                settings.cast.session = null;
            }
        },
        receiverMessage: function (namespace, message) {
            print('receiverMessage: ' + namespace + ', ' + message);
        }
    }
};
settings =  mergeSettings(settings,castSettings);