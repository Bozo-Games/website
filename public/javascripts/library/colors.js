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
var defaultColorStrings = {
    colorStrings: {
        black: '#000000',
        red:'#ff0000',
        green: '#00ff00',
        blue: '#0000ff',
        yellow: '#ffff00',
        cyan: '#00ffff',
        purple: '#ff00ff',
        white: '#ffffff',
        lightGray: '#ababab',
        gray: '#777777',
        darkGray: '#333333'
    }
}

settings = mergeSettings(settings,defaultColorStrings);
var settings = (settings === undefined)?{}:settings;
