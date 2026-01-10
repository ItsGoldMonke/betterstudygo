// /html/body/div/main/div/div/div[2] = the element to check


function getElementByXPath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


console.log( getElementByXPath("//html/body/div/main/div/div/div[2]") );
// returns the element at the specified XPath (<div class="bottom-bar">)

// store the previous class name to prevent the sound from happening the entire time
var previousClassName = null;

// Play sound if class name matches "bottom-bar error"
function checkClassNameAndPlaySound() {
    var element = getElementByXPath("//html/body/div/main/div/div/div[2]");
    var currentClassName = element ? element.className : null;

    if (currentClassName !== previousClassName) {
        if (currentClassName === "bottom-bar error") {
            var audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-wrong.mp3');
            audio.play();
            console.log("Played error sound");
    }
        else if (currentClassName === "bottom-bar success") {
            var audio = new Audio('https://www.myinstants.com/media/sounds/duolingo-correct.mp3');
            audio.play();
            console.log("Played success sound");
    }
    previousClassName = currentClassName;
    }

}
document.addEventListener('keydown', function(event) {
    pressedKey = event.key;
    // If the pressed key is Enter (key code 13), check the class name and play sound
    if (pressedKey === "Enter") {
        checkClassNameAndPlaySound();
    }
})


// Check every 0.01 seconds
setInterval(checkClassNameAndPlaySound, 10);