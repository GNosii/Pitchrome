// Todo: custom exceptions
// Todo: some type of api dunno

import { ActiveWebsite, MessageType, MessageResponses } from '../global_enums.js';

let errorModeActive = false;

let ytTitle = null;

setup();

async function setup() {
    let tab = await chrome.tabs.query({ active: true, currentWindow: true });
    let webType = detectWebsite(tab[0].url);

    chrome.tabs.query({active: true, currentWindow: true}, (tab) => {
        const connection = talk(tab, MessageType.CONNECTIONTEST);

        if (connection == MessageResponses.RECEIVED) {
            
        } else {

        }
    });
    // TEMPORAL: Support limited to YouTube
    if (webType != ActiveWebsite.YOUTUBE) throw new TypeError("Website not supported."); else setupYt();

    lang(webType);

    // Returns ActiveWebsite
    function detectWebsite(url: string) {
        if (contains(url, "youtube.com")) return ActiveWebsite.YOUTUBE;
        else return ActiveWebsite.NOT_DETECTED;
    }
}

function contains(string: string, check: string) {
    if (string.indexOf(check) != -1) return true; else false;    
}

function lang(active: ActiveWebsite) {
    document.querySelector('html').setAttribute('lang', chrome.i18n.getUILanguage());

    if (!isError) {
        translate('btn-up', "buttonup");
        translate('btn-down', "buttondown");
        translate('btn-reset', "buttonreset");

        if (active == ActiveWebsite.YOUTUBE) {
            document.getElementById('bkg-container').setAttribute('alt', chrome.i18n.getMessage('altthumbnail').replace('%s', ytTitle));
        }
    }

    function translate(selector: string, i18nKey: string, info ?: string) {
        if (!info) document.querySelector(selector).textContent = chrome.i18n.getMessage(i18nKey);
        else document.querySelector(selector).textContent = (chrome.i18n.getMessage(i18nKey).replace('%s', info));
    }
}

function talk(tab: chrome.tabs.Tab[], about: MessageType) {
    var reply: MessageResponses;

    try {
        chrome.tabs.sendMessage(tab[0].id, {subject: about} , (response) => { reply = response }); 
    } catch (exception) {
        reply = MessageResponses.FAILED;
    };

    console.debug(reply);
    return reply;
}

function error(what: string) {
    // todo
    console.error(what);
}

function setupYt() {

}
