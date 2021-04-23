var isError = false;

function setup() {
    // Accesibility: Change lang attribute to the browser language.
    document.querySelector('html').setAttribute('lang', chrome.i18n.getUILanguage());

    console.log('somehow works wtf');
}

enum ActiveWebsite {"YOUTUBE", "HTML"}
