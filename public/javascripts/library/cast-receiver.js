console.log(settings);
var settings = (settings === undefined)?{}:settings;
console.log(settings);
var receiverSettings = {
    receiver: {
        appID: undefined,
        namespace: "testing bozo",
        castReceiverManager: undefined,
        messageBus: undefined,
        init: function () {
            settings.receiver.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();

            // handler for the 'ready' event
            settings.receiver.castReceiverManager.onReady = function(event) {
                console.log('Received Ready event: ' + JSON.stringify(event.data));
                settings.receiver.castReceiverManager.setApplicationState('Application status is ready...');
            };

            // handler for 'senderconnected' event
            settings.receiver.castReceiverManager.onSenderConnected = function(event) {
                console.log('Received Sender Connected event: ' + event.data);
                console.log(settings.receiver.castReceiverManager.getSender(event.data).userAgent);
            };

            // handler for 'senderdisconnected' event
            settings.receiver.castReceiverManager.onSenderDisconnected = function(event) {
                console.log('Received Sender Disconnected event: ' + event.data);
                if (settings.receiver.castReceiverManager.getSenders().length == 0) {
                    background(settings.color.black);
                    //window.close();
                }
            };

            // handler for 'systemvolumechanged' event
            settings.receiver.castReceiverManager.onSystemVolumeChanged = function(event) {
                console.log('Received System Volume Changed event: ' + event.data['level'] + ' ' +
                    event.data['muted']);
            };
            //Now set up msg bus
            settings.receiver.messageBus = settings.receiver.castReceiverManager.getCastMessageBus(settings.receiver.namespace);
            // handler for the CastMessageBus message event
            settings.receiver.messageBus.onMessage = function(event) {
                console.log('Message [' + event.senderId + ']: ' + event.data);
                // display the message from the sender
                //displayText(event.data);
                // inform all senders on the CastMessageBus of the incoming message event
                // sender message listener will be invoked
                settings.receiver.messageBus.send(event.senderId, event.data);
            };
            //finally start the reciver
            settings.receiver.castReceiverManager.start({statusText: 'Get Ready To BOZO'});
        }

    }
};
settings =  mergeSettings(settings,receiverSettings);