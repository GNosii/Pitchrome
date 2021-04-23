// Todo: custom exceptions
// Todo: some type of api dunno

setup();

async function setup() {
    let tab = await chrome.tabs.query({ active: true, currentWindow: true });
    let webType = detectWebsite(tab[0].url);

    // TEMPORAL: Support limited to YouTube
    if (webType != ActiveWebsite.YOUTUBE) {
        throw new TypeError("Website not supported.");
    }

    // Accesibility: Change lang attribute to the browser language
    document.querySelector('html').setAttribute('lang', chrome.i18n.getUILanguage());

    // Returns ActiveWebsite
    function detectWebsite(url : string) {
        if (contains(url, "youtube.com")) return ActiveWebsite.YOUTUBE;
        else return ActiveWebsite.NOT_DETECTED;
    }
}

function contains(string : string, check : string) {
    if (string.indexOf(check) != -1) return true; else false;    
}

enum ActiveWebsite {"YOUTUBE", "NOT_DETECTED"};
