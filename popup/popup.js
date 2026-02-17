


const ext = (typeof browser !== "undefined") ? browser : chrome;
// const storageArea = (ext.storage && ext.storage.sync) ? ext.storage.sync : ext.storage.local;
const storageArea = ext.storage.local; // Use local storage for better compatibility

// default values for storage
const DEFAULTS = {
    extensionEnabled: true, // extension enabled by default
    rightSoundUrl: "https://www.myinstants.com/media/sounds/duolingo-correct.mp3",
    wrongSoundUrl: "https://www.myinstants.com/media/sounds/duolingo-wrong.mp3"
};


// get storage values
function getStorage(keys) {
    const result = storageArea.get(keys);
    if (result instanceof Promise) {
        return result;
    }
    return new Promise((resolve) => storageArea.get(keys, resolve));
}



// set storage values
function setStorage(values) {
    const result = storageArea.set(values);
    if (result instanceof Promise) {
        return result;
    }
    return new Promise((resolve) => storageArea.set(values, resolve));
}

function updateToggleButtonText(isEnabled) {
    const toggleExtensionBtn = document.getElementById("toggle-extension-btn");
    if (toggleExtensionBtn) {
        toggleExtensionBtn.textContent = isEnabled ? "✓ BetterStudyGo: ON" : "✗ BetterStudyGo: OFF";
        toggleExtensionBtn.style.backgroundColor = isEnabled ? "#008000" : "#8a1a1a";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleExtensionBtn = document.getElementById("toggle-extension-btn");
    const rightSoundInput = document.getElementById("rightsoundurl");
    const wrongSoundInput = document.getElementById("wrongsoundurl");

    // Load and display current state
    getStorage("extensionEnabled").then((items) => {
        updateToggleButtonText(items.extensionEnabled);
    });

    if (toggleExtensionBtn) {
        toggleExtensionBtn.addEventListener("click", () => {
            getStorage("extensionEnabled").then((items) => {
                const newValue = !items.extensionEnabled;
                setStorage({ extensionEnabled: newValue });
                updateToggleButtonText(newValue);
            });
        });
    }

    if (!rightSoundInput || !wrongSoundInput) {
        return;
    }

    getStorage(DEFAULTS).then((items) => {
        rightSoundInput.value = items.rightSoundUrl || "";
        wrongSoundInput.value = items.wrongSoundUrl || "";
    });

    const save = () => {
        setStorage({
            rightSoundUrl: rightSoundInput.value.trim(),
            wrongSoundUrl: wrongSoundInput.value.trim()
        });
    };

    rightSoundInput.addEventListener("input", save);
    wrongSoundInput.addEventListener("input", save);

}

);