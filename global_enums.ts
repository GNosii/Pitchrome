/* ActiveWebsite
YOUTUBE: Tab url contains youtube.com
HTML: Tab DOM contains <video> tag
NOT_DETECTED: Doesn't have any video!
*/
export enum ActiveWebsite {YOUTUBE, HTML, NOT_DETECTED};

/* MessageType 
PITCHUP/PITCHDOWN/PITCHRESET: For pitch changing
CONNECTIONTEST: Testing connection to the background script
VALIDATE: Validate the background script can modify the video
*/
export enum MessageType {PITCHUP, PITCHDOWN, PITCHRESET, CONNECTIONTEST, VALIDATE};

/* MessageResponses
HAPPY: For MessageType.VALIDATE - Background can modify video
SAD: For MessageType.VALIDATE - Background cannot modify video, reloading should fix
RECEIVED: For MessageType.CONNECTIONTEST only - Connection was received
DONE: Any Pitch-related MessageType - Pitch was modified
FAILED: Failed to send message
*/
export enum MessageResponses {HAPPY, SAD, RECEIVED, DONE, FAILED};
