console.log(settings);
var settings = (settings === undefined)?{}:settings;
console.log(settings);
var receiverSettings = {
    receiver: {
        appID: undefined,
        castReceiverManager: undefined,
        init: function () {
            settings.receiver.castReceiverManager = new cast.receiver.CastReceiverManager.getInstance();
            settings.receiver.castReceiverManager.start();
        },
        onSenderDisconnected: function (event) {
            if(settings.receiver.castReceiverManager.getSenders().length == 0 &&
                event.reason == cast.receiver.system.DisconnectReason.REQUESTED_BY_SENDER) {
                window.close();
            }
            
        }

    }
};
settings =  mergeSettings(settings,receiverSettings);