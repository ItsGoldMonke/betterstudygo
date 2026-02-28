



const ext = (typeof browser !== "undefined") ? browser : chrome;
const storageArea = ext.storage.local;

const DEFAULTS = {
    extensionEnabled: true,
    rightSoundUrl: "https://www.myinstants.com/media/sounds/duolingo-correct.mp3",
    wrongSoundUrl: "https://www.myinstants.com/media/sounds/duolingo-wrong.mp3"
};

let settings = { ...DEFAULTS };

function getStorage(keys) {
    const result = storageArea.get(keys);
    if (result instanceof Promise) {
        return result;
    }
    return new Promise((resolve) => storageArea.get(keys, resolve));
}

function loadSettings() {
    return getStorage(DEFAULTS).then((items) => {
        settings = { ...DEFAULTS, ...items };
    });
}

// Returns true if the value of the given var is not false (or "false"), and returns true if both are not and false if it is.
function isEnabled(value) {
    return value !== false && value !== "false";
}

loadSettings();

if (ext.storage && ext.storage.onChanged) {
    ext.storage.onChanged.addListener((changes, area) => {
        if (area !== "local") {
            return;
        }
        if (changes.rightSoundUrl) {
            settings.rightSoundUrl = changes.rightSoundUrl.newValue || "";
        }
        if (changes.wrongSoundUrl) {
            settings.wrongSoundUrl = changes.wrongSoundUrl.newValue || "";
        }
        if (changes.extensionEnabled) {
            settings.extensionEnabled = changes.extensionEnabled.newValue;
            checkIfEnabled();
        }
    });
}



// /html/body/div/main/div/div/div[2] = the element to check
function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


// console.log( getElementByXPath("//html/body/div/main/div/div/div[2]") );
// returns the element at the specified XPath (<div class="bottom-bar">)

// store the previous class name to prevent the sound from happening the entire time
var previousClassName = null;
var checkInterval = null;
var didNotDo = true;



// Play sound if class name matches "bottom-bar error"
function checkClassNameAndPlaySound() {

    
    
    var element = getElementByXPath("//html/body/div/main/div/div/div[2]"); // and .correct  (css selector)
    var currentClassName = element ? element.className : null;
    
    
    
    if (document.querySelector(".correct") && !document.querySelector(".incorrect") && didNotDo == true) {
        //console.log("Found .correct element, playing success sound");
        var audio = new Audio(settings.rightSoundUrl);
        audio.play();
        didNotDo = false;
    }
    
    if (document.querySelector(".incorrect") && didNotDo == true) {
        //console.log("Found .incorrect element, playing failure sound");
        var audio = new Audio(settings.wrongSoundUrl);
        audio.play();
        didNotDo = false;
    }
    
    if (!document.querySelector(".correct") && !document.querySelector(".incorrect") && didNotDo == false) {
        didNotDo = true;
    }


    if (currentClassName !== previousClassName) {
        if (currentClassName === "bottom-bar error") {
            if (!settings.wrongSoundUrl) {
                console.log("No wrong sound URL set, not playing sound");
                return;
            }
            var audio = new Audio(settings.wrongSoundUrl);
            audio.play();
//          console.log("Played error sound");
    }
        else if (currentClassName === "bottom-bar success") {
            if (!settings.rightSoundUrl) {
                console.log("No right sound URL set, not playing sound");
                return;
            }
            var audio = new Audio(settings.rightSoundUrl);
            audio.play();
//          console.log("Played success sound");
    }
    previousClassName = currentClassName;
    }

}

// Get if extension is enabled from storage and log it
function checkIfEnabled() {
    getStorage("extensionEnabled").then((items) => {
        if (!isEnabled(items.extensionEnabled)) {
            console.log("Extension not enabled")
            clearInterval(checkInterval);
//          console.log("Stopped checking for class name changes");
        }
        else {
            console.log("Ext is on")
            checkInterval = setInterval(checkClassNameAndPlaySound, 10);
/*             document.addEventListener('keydown', function(event) {
                pressedKey = event.key;
                // If the pressed key is Enter (key code 13), check the class name and play sound
                if (pressedKey === "Enter") {
                    checkClassNameAndPlaySound();
                }}) */
        }
    })};

// Check every 0.01 seconds

//    getStorage("extensionEnabled").then((items) => {
//        if (!isEnabled(items.extensionEnabled)) {
//            console.log("Extension is disabled, not playing sound");
//            return;
//        }
//    });

checkIfEnabled()
