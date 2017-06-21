var areaSettings = {
    area: {
        types: {
            river: 'river',
            plain: 'plain',
            marsh: 'marsh',
            desert: 'desert',
            mountain: 'mountain'
        }
    },
    colorStrings: {
        river: '#1045de',
        plain: '#976522',
        marsh: '#368866',
        desert: '#888855',
        forest: '#36dd55',
        mountain: '#abba88'
    }
};
var settings = (settings === undefined)?{}:settings;
settings = mergeSettings(settings,areaSettings);
