// Script por ElNosii
// Script manager de la interfaz gráfica de la extensión

var ytThumbnailBaseUrl = "https://img.youtube.com/vi/$u/mqdefault.jpg";
var ytTitleReplaceRegex = /\(\d[\d]?[+]?\)/;

var isYoutube = true;
var isError = false;
var isFirefox = false;

var isBrowserIdentified = false;

var isShowingDebug = false;

setupUI();
checkYoutube();
listenToMouseClick();

function setupUI(exception) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        var videoId = (tab[0].url).replace("https://www.youtube.com/watch?v=", "").split("&")[0];
        var videoTitle = (tab[0].title).replace(ytTitleReplaceRegex, "").replace(" - YouTube", "");

    
        if (!isError) {
            document.getElementById("btn-up").textContent = chrome.i18n.getMessage("buttonup");
            document.getElementById("btn-down").textContent = chrome.i18n.getMessage("buttondown");
            document.getElementById("btn-reset").textContent = chrome.i18n.getMessage("buttonreset");
            
            if (isYoutube) {
                document.getElementById("bkg-container").style.backgroundImage = "url('" + ytThumbnailBaseUrl.replace("$u", videoId); + "')";
                document.getElementById("yt-title").textContent = videoTitle;
            }
        } else {
            document.getElementById("main-container").style = "display: none;";
            document.getElementById("bkg-container").style = "display: none;";
            document.getElementById("error-container").style = "";
        
            document.getElementById("error-title").textContent = chrome.i18n.getMessage("errortitle");
            document.getElementById("error-desc").textContent = chrome.i18n.getMessage("errordesc");
            document.getElementById("error-subtitle").textContent = chrome.i18n.getMessage("errorsubtitle");
            document.getElementById("error-msg").textContent = exception.name + ": " + exception.message;
        }

        // Añadir texto a la pantalla de depuración
        document.getElementById("debug-title").textContent = "Información de depuración";
        document.getElementById("debug-isfirefox").textContent = "Modo Firefox: " + isFirefox;
        document.getElementById("debug-iserror").textContent = "Modo manejo de error: " + isError;
        document.getElementById("debug-useragent").textContent = "Agente de Usuario: " + navigator.userAgent;
        document.getElementById("debug-version").textContent = "Versión: " + chrome.runtime.getManifest().version;

        // Añadirle texto al botón para evitar el problema de que si no se ha
        // seleccionado una opción no se ve el texto
        document.getElementById("btn-debug").textContent = chrome.i18n.getMessage("buttondebugshow");

        console.log("Locale and images ready!");
    });
}

function listenToMouseClick() {
    console.log("Attempting event register for " + navigator.userAgent);

    if (navigator.userAgent.indexOf("Firefox")) {
        document.addEventListener("mouseup", (event) => { handleClickEvent(event); });
        console.log("Registered mouseup event listener");
        isBrowserIdentified = true;
        isFirefox = true;
    }

    if (navigator.userAgent.indexOf("Chrome") && !isBrowserIdentified) {
        document.addEventListener("pointerdown", (event) => { handleClickEvent(event); });
        console.log("Registered pointerdown event listener");
        isBrowserIdentified = true;
    }

    console.log("IsFirefox " + isFirefox);

    function handleClickEvent(event) {
        var clickedId = event.target.id 

        if (clickedId == "btn-up" || clickedId == "btn-down" || clickedId == "btn-reset") {
            console.log("Clicked on " + clickedId);

            chrome.tabs.query({ active: true, currentWindow: true }, sendMessage);
        }

        if (clickedId == "btn-debug") {
            console.log("Clicked on debug button");

            if (!isShowingDebug) {
                document.getElementById("main-container").style = "display: none;";
                document.getElementById("debug-container").style = "";

                document.getElementById("btn-debug").textContent = chrome.i18n.getMessage("buttondebughide");

                isShowingDebug = true;
            } else {
                document.getElementById("main-container").style = "";
                document.getElementById("debug-container").style = "display: none;";

                document.getElementById("btn-debug").textContent = chrome.i18n.getMessage("buttondebugshow");

                isShowingDebug = false;
            }
        }

        function sendMessage(tab) {
            var filtered = (event.target.id).replace("btn-", "");
            chrome.tabs.sendMessage(tab[0].id, {action: filtered});

            console.log("Sent message to background script: " + filtered);
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

    setupUI(exception);
}