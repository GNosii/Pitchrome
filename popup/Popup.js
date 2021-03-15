// Script por ElNosii
// Script manager de la interfaz gráfica de la extensión

var ytThumbnailBaseUrl = "https://img.youtube.com/vi/$u/mqdefault.jpg";
var ytTitleReplaceRegex = /\(\d[\d]?[+]?\)/;

var isYoutube = true;
var isError = false;

setupUI();
listenToMouseClick();
checkYoutube();

function setupUI() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        var videoId = (tab[0].url).replace("https://www.youtube.com/watch?v=", "").split("&")[0];
        var videoTitle = (tab[0].title).replace(ytTitleReplaceRegex, "").replace(" - YouTube", "");

        if (!isError) {
            // TODO: En algún momento hacer que esto funcione con locale
            document.getElementById("btn-up").textContent = "SUBIR";
            document.getElementById("btn-down").textContent = "BAJAR";
            document.getElementById("btn-reset").textContent = "RESETEAR";
            
            if (isYoutube) {
                document.getElementById("yt-thumbnail").src = ytThumbnailBaseUrl.replace("$u", videoId);
                document.getElementById("yt-title").textContent = videoTitle;
            }
        }

        console.log("Locale and images ready!");
    });
}

function listenToMouseClick() {
    console.log("Attempting event register for " + navigator.userAgent);

    if (navigator.userAgent.indexOf("Chrome")) {
        document.addEventListener("pointerdown", (event) => { handleClickEvent(event); });
        console.log("Registered pointerdown event listener");
    }

    if (navigator.userAgent.indexOf("Firefox")) {
        document.addEventListener("mouseup", (event) => { handleClickEvent(event); });
        console.log("Registered mouseup event listener");
    }

    function handleClickEvent(event) {
        var clickedId = event.target.id 

        if (clickedId == "btn-up" || clickedId == "btn-down" || clickedId == "btn-reset") {
            chrome.tabs.query({ active: true, currentWindow: true }).then(sendMessage).catch(reportException);
        }

        function sendMessage(tab) {
            var filtered = (event.target.id).replace("btn-", "");
            chrome.tabs.sendMessage(tab[0].id, {action: filtered});

            console.log("Sent message: " + filtered);
        }

        console.debug("Received click event from " + event.type);
    }
}

function checkYoutube() {
    // TODO: Chequear de alguna manera si es youtube (url o titulo de pestaña)
    isYoutube = true;
}

function reportException(exception) {
    isError = true;
    console.log(exception);
}