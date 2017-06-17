var settings = (settings === undefined)?{}:settings;
settings["color"] = {
    isLoaded: false,
    colorStrings: {
        head: '#00ffff',
        body: '#00ff00',
        apple: '#ff0000',
        ground: '#000000',
        text: '#ffffff'
    },
    load: function() {
        //settings.color = {};
        for (var key in settings.colorStrings) {
            settings.color[key] = color(settings.colorStrings[key]);
        }
    }
};
console.log('here');

//answer

//https://stackoverflow.com/questions/6609238/is-there-a-way-to-add-css-js-later-using-ejs-with-nodejs-express
