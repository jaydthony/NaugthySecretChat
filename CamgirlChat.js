let querystringing = window.location.search;
let urlParamsin = new URLSearchParams(querystringing);
let alluserinformation = urlParamsin.get("room");

var CamUserNaming = alluserinformation;
var ChatContainer = document.getElementById("chat-containner");
document.getElementById("chat-btn").addEventListener("click", () => {
  if (ChatContainer.style.display == "none") {
    ChatContainer.style.display = "block";
  } else {
    ChatContainer.style.display = "none";
  }
});
const APP_I = "715256365a604115b1b83dcf237079a3";
const TOKENw = null; // You may need to generate a token on your server

const USER_ID = CamUserNaming; // Replace with the actual user ID
let querystrings = window.location.search;
let urlParamin = new URLSearchParams(querystrings);
let CHANNEoL = urlParamin.get("room") + "chat";
// const CHANNEoL = "chat_channel";
//const USER_ID = "user_1237"; // Replace with the actual user ID
const rtmClients = AgoraRTM.createInstance(APP_I);
let rtmChannels;

let SelectedCountry = "en";
document.addEventListener("DOMContentLoaded", function () {
  const selectCountry = document.getElementById("selectCountry");

  let Languagedata = allLanguege;
  Languagedata.forEach((country) => {
    const option = document.createElement("option");
    option.value = country.languageCode;
    option.textContent = country.languageName;
    selectCountry.appendChild(option);
  });

  selectCountry.addEventListener("change", function () {
    SelectedCountry = this.value;
    console.log("Selected Country:", SelectedCountry);
  });
});

async function initChat() {
  await rtmClients.login({ token: TOKENw, uid: USER_ID });
  rtmChannels = await rtmClients.createChannel(CHANNEoL);
  await rtmChannels.join();

  rtmChannels.on("ChannelMessage", ({ text }, senderId) => {
    (async () => {
      try {
        const translatedText = await sendApiToTranslateChat(
          text,
          SelectedCountry
        );
        var textfortranslations = translatedText.data[0].translations[0].text;
        displayMessage(`${senderId}: ${textfortranslations}`, text);
      } catch (error) {
        console.error("Error translating message:", error.message);
      }
    })();
  });
}

function sendMessage() {
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message !== "") {
    rtmChannels.sendMessage({ text: message });
    displayMessage(`You: ${message}`);
    messageInput.value = "";
  }
}

document.getElementById("send-button").addEventListener("click", sendMessage);

initChat();
