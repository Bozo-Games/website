var settings = (settings === undefined)?{}:settings;
settings["color"] = {
    isLoaded: false,
    load: function() {
        //settings.color = {};
        for (var key in settings.colorStrings) {
            settings.color[key] = color(settings.colorStrings[key]);
        }
    }
};

//answer

//https://stackoverflow.com/questions/6609238/is-there-a-way-to-add-css-js-later-using-ejs-with-nodejs-express
