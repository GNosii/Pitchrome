import { ActiveWebsite, MessageType, MessageResponses } from '../global_enums.js';

let video;

function playbackUp() {

}

function playbackDown() {

}

function playbackReset() {

}

function testVideoTag() {
    var test: HTMLMediaElement;

    try { 
        test = document.querySelector('video');
    } catch (exception) {
        console.debug(exception);
        return MessageResponses.SAD;
    }

    video = test;
    return MessageResponses.HAPPY;
}

chrome.runtime.onMessage.addListener((msg, sender, reply) => {
    console.debug("Subject of message is " + msg.subject);

    switch (msg.subject) {
        case MessageType.CONNECTIONTEST: {
            reply(MessageResponses.RECEIVED);
            break;
        }
        case MessageType.VALIDATE: {
            reply(testVideoTag());
            break;
        }
    }
});
