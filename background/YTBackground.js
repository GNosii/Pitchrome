// Script por ElNosii
// Script de fondo para YouTube y paginas que usen el elemento video de HTML

var video = document.querySelector("video");
var speedManager;

video.preservesPitch = false;
video.mozPreservesPitch = video.preservesPitch;

console.log("Injected background script!");

speedManager = {
    playbackRate: 1,

    init: function() {
        new MutationObserver(() => {
            speedManager.update();
        }).observe(video, {
            attributes: !0,
            childList: !0,
            characterData: !0,
            subtree: !0
        }),
        speedManager.update();
    },

    change: function(action) {
        console.log("Received change message: " + action);

        switch (action) {
            case "up": {
                this.playbackRate *= 1.05946309436;
                break;
            }

            case "down": {
                this.playbackRate /= 1.05946309436;
                break;
            }

            case "reset": {
                this.playbackRate = 1;
                break;
            }
        }

        speedManager.update();
    },

    update: function() {
        for (var a = document.getElementsByTagName("video"), b = 0; b < a.length; ++b) {
            var c = a[b];
            c.playbackRate = this.playbackRate, c.mozPreservesPitch = this.preservesPitch && 1 != this.playbackRate;
        }

        console.debug("Executing update!")
    }
}

speedManager.init();

chrome.runtime.onMessage.addListener((message) => {speedManager.change(message.action)});
