A firefox extension that adds functionality to [studygo](https://studygo.com), such as sounds when you have an answer right / wrong.

# Features:
As of right now, these features are implemented:
- A popup-menu to edit your preferences for this extension.
  - In here you can for example toggle whether the extension is enabled and set custom sounds.
- Playing sounds when you answer questions
  - Because by default, studygo is very quiet this extension adds custom sounds to studygo when you answer your question either right or wrong.
  - There are sounds applied by default but you can set a custom sound (.mp4, other formats might work as well) from the popup using a link.
- More features wil be added later

# Instruction for using .crx:
For some chromium based browsers you can just drop the .crx into it (open it with the browser), but for others like google chrome because of security measures that is not possible.

So, in order to install the extension on google chrome you'll need to download the source code instead, and then extract the .zip file. Then you need to go to about:extensions and turn on "developer mode", which will make new buttons appear. Then press "load unpacked" and navigate to the extracted folder, and then the folder inside if it exists. Select the folder with the manifest.json file inside it. Now the extension should load.

For firefox users: once reviewed, the firefox extension will be available [here](https://addons.mozilla.org/nl/firefox/addon/better-studygo/).

# How to use:
In order to use this extension you should login/create an account on https://studygo.com and start a word list. Make sure you have the extension enabled from the popup and a sound selected (one should be added by default). Now you're using the extension!