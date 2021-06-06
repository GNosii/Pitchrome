![Not Maintained](https://img.shields.io/badge/Maintenance%20Level-Abandoned-orange.svg)<br>
# Pitchrome 

![](https://img.shields.io/github/languages/code-size/gnosii/pitchrome?label=code%20size&style=flat-square)
![](https://img.shields.io/github/languages/top/gnosii/pitchrome?style=flat-square)

This is not going to be maintained anymore, most (if not all functionality of Pitchrome can be obtained by:
- Opening the developer console and writing  `document.querySelector("video").preservesPitch = false`, then changing the speed through the YouTube player.
- Or changing the speed using `document.querySelector("video").playbackRate =  1 (change to speed you want)`.
 
## 💻 How to Install 

Get the latest release from [here](https://github.com/GNosii/Pitchrome/releases/latest/)

> ⚠️ If you're using Firefox or an browsed based on it. You're going to need `Pitchrome-Firefox.zip` instead of the normal release, this release includes an different manifest that allows the extension to run on Firefox. The codebase and localization are the same between both releases.

## ⚠️ Notes
- This is not going to work on YouTube Premieres or Livestreams.
- The extension works by modifying the video tag and setting its `preservesPitch` and `playbackRate` values depending on the user's actions, which may allow for usage in another websites that also use the HTML5 `<video>` tag.
- Setting the pitch way too high or too low may cause issues like the video losing all audio or the video not buffering.
- **THE EXTENSION DOES NOT USE ANY "KEY-LOCKED" API!** The video's title is obtained by getting the YouTube tab's title, and running an RegExp replace on it, which removes the '- YouTube' and the notification counter '(COUNT)'. Example: "(6) Me at the zoo - YouTube" is changed to "Me at the zoo" in Pitchrome's popup. The video id is obtained by extracting the Id from the tab's url (using an RegExp) and using that Id to get an image directly from `img.youtube.com`.

## 🌎 Compatibility guide

|Developer|Browser|Compatibility|💬|
|-|-|-|-|
|Google|Chrome|✔️Tested|Completely compatible|
|Google|Chromium|❓Untested|Compatibility hasn't been tested but might be possible|
|Microsoft|Edge|✔️Tested|Completely compatible|
|Mozilla|Firefox|✔️Tested|Compatible if using `Pitchrome-Firefox`|
|Opera Software|Opera|❓Untested|Compatibility hasn't been tested|
|Brave Software|Brave|❓Untested|Compatibility hasn't been tested|
|Apple|Safari|❌Unsupported|Not supported currently|
