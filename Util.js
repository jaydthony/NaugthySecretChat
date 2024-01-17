let allLanguege = [
  { languageName: "English", languageCode: "en" },
  { languageName: "Afrikaans", languageCode: "af" },
  { languageName: "Albanian", languageCode: "sq" },
  { languageName: "Amharic", languageCode: "am" },
  { languageName: "Arabic", languageCode: "ar" },
  { languageName: "Armenian", languageCode: "hy" },
  { languageName: "Assamese", languageCode: "as" },
  { languageName: "Azerbaijani", languageCode: "az" },
  { languageName: "Bashkir", languageCode: "ba" },
  { languageName: "Basque", languageCode: "eu" },
  { languageName: "Bengali", languageCode: "bn" },
  { languageName: "Bosnian", languageCode: "bs" },
  { languageName: "Bulgarian", languageCode: "bg" },
  { languageName: "Burmese", languageCode: "my" },
  { languageName: "Catalan, Valencian", languageCode: "ca" },
  { languageName: "Chinese", languageCode: "zh" },
  { languageName: "Croatian", languageCode: "hr" },
  { languageName: "Czech", languageCode: "cs" },
  { languageName: "Danish", languageCode: "da" },
  { languageName: "Divehi, Dhivehi, Maldivian", languageCode: "dv" },
  { languageName: "Dutch, Flemish", languageCode: "nl" },
  { languageName: "Estonian", languageCode: "et" },
  { languageName: "Fijian", languageCode: "fj" },
  { languageName: "Finnish", languageCode: "fi" },
  { languageName: "French", languageCode: "fr" },
  { languageName: "Galician", languageCode: "gl" },
  { languageName: "Georgian", languageCode: "ka" },
  { languageName: "German", languageCode: "de" },
  { languageName: "Greek, Modern (1453–)", languageCode: "el" },
  { languageName: "Gujarati", languageCode: "gu" },
  { languageName: "Haitian, Haitian Creole", languageCode: "ht" },
  { languageName: "Hausa", languageCode: "ha" },
  { languageName: "Hebrew", languageCode: "he" },
  { languageName: "Hindi", languageCode: "hi" },
  { languageName: "Hungarian", languageCode: "hu" },
  { languageName: "Icelandic", languageCode: "is" },
  { languageName: "Igbo", languageCode: "ig" },
  { languageName: "Indonesian", languageCode: "id" },
  { languageName: "Irish", languageCode: "ga" },
  { languageName: "Italian", languageCode: "it" },
  { languageName: "Japanese", languageCode: "ja" },
  { languageName: "Kannada", languageCode: "kn" },
  { languageName: "Kashmiri", languageCode: "ks" },
  { languageName: "Kazakh", languageCode: "kk" },
  { languageName: "Central Khmer", languageCode: "km" },
  { languageName: "Kinyarwanda", languageCode: "rw" },
  { languageName: "Kirghiz, Kyrgyz", languageCode: "ky" },
  { languageName: "Korean", languageCode: "ko" },
  { languageName: "Kurdish", languageCode: "ku" },
  { languageName: "Lao", languageCode: "lo" },
  { languageName: "Latvian", languageCode: "lv" },
  { languageName: "Lingala", languageCode: "ln" },
  { languageName: "Lithuanian", languageCode: "lt" },
  { languageName: "Luba-Katanga", languageCode: "lu" },
  { languageName: "Macedonian", languageCode: "mk" },
  { languageName: "Malagasy", languageCode: "mg" },
  { languageName: "Malay", languageCode: "ms" },
  { languageName: "Malayalam", languageCode: "ml" },
  { languageName: "Maltese", languageCode: "mt" },
  { languageName: "Maori", languageCode: "mi" },
  { languageName: "Marathi", languageCode: "mr" },
  { languageName: "Mongolian", languageCode: "mn" },
  { languageName: "Ndonga", languageCode: "ng" },
  { languageName: "Nepali", languageCode: "ne" },
  { languageName: "Norwegian", languageCode: "no" },
  { languageName: "Norwegian Bokmål", languageCode: "nb" },
  { languageName: "Oriya", languageCode: "or" },
  { languageName: "Pashto, Pushto", languageCode: "ps" },
  { languageName: "Persian", languageCode: "fa" },
  { languageName: "Polish", languageCode: "pl" },
  { languageName: "Portuguese", languageCode: "pt" },
  { languageName: "Punjabi, Panjabi", languageCode: "pa" },
  { languageName: "Romanian, Moldavian, Moldovan", languageCode: "ro" },
  { languageName: "Russian", languageCode: "ru" },
  { languageName: "Samoan", languageCode: "sm" },
  { languageName: "Serbian", languageCode: "sr" },
  { languageName: "Shona", languageCode: "sn" },
  { languageName: "Sindhi", languageCode: "sd" },
  { languageName: "Sinhala, Sinhalese", languageCode: "si" },
  { languageName: "Slovak", languageCode: "sk" },
  { languageName: "Slovenian", languageCode: "sl" },
  { languageName: "Somali", languageCode: "so" },
  { languageName: "Southern Sotho", languageCode: "st" },
  { languageName: "Spanish, Castilian", languageCode: "es" },
  { languageName: "Swahili", languageCode: "sw" },
  { languageName: "Swedish", languageCode: "sv" },
  { languageName: "Tahitian", languageCode: "ty" },
  { languageName: "Tamil", languageCode: "ta" },
  { languageName: "Tatar", languageCode: "tt" },
  { languageName: "Telugu", languageCode: "te" },
  { languageName: "Thai", languageCode: "th" },
  { languageName: "Tibetan", languageCode: "bo" },
  { languageName: "Tigrinya", languageCode: "ti" },
  { languageName: "Tonga (Tonga Islands)", languageCode: "to" },
  { languageName: "Tswana", languageCode: "tn" },
  { languageName: "Turkish", languageCode: "tr" },
  { languageName: "Turkmen", languageCode: "tk" },
  { languageName: "Uighur, Uyghur", languageCode: "ug" },
  { languageName: "Ukrainian", languageCode: "uk" },
  { languageName: "Urdu", languageCode: "ur" },
  { languageName: "Uzbek", languageCode: "uz" },
  { languageName: "Vietnamese", languageCode: "vi" },
  { languageName: "Welsh", languageCode: "cy" },
  { languageName: "Xhosa", languageCode: "xh" },
  { languageName: "Yoruba", languageCode: "yo" },
  { languageName: "Zulu", languageCode: "zu" },
];
function displayMessage(message, originalMessage) {
  const chatBox = document.getElementById("chat-box");

  // Create a div to group newMessage and realMessage
  const messageContainer = document.createElement("div");
  messageContainer.style.display = "flex";
  messageContainer.style.flexDirection = "column";
  messageContainer.style.gap = "6px";
  messageContainer.style.marginBottom = "1rem";

  // Create newMessage with black color
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  newMessage.style.color = "black"; // Set color to black
  newMessage.style.fontSize = "1rem";
  newMessage.style.marginBottom = "0px";

  // Create realMessage with smaller fontsize and grey color
  const realMessage = document.createElement("p");
  realMessage.textContent = originalMessage;
  realMessage.style.fontSize = "0.7rem";
  realMessage.style.color = "grey";
  realMessage.style.marginBottom = "0px";
  realMessage.style.alignSelf = "flex-end";

  // Append newMessage and realMessage to the messageContainer
  messageContainer.appendChild(newMessage);
  messageContainer.appendChild(realMessage);

  // Append the messageContainer to the chatBox
  chatBox.appendChild(messageContainer);

  // Auto-scroll to the bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

const sendApiToTranslateChat = async (text, language) => {
  try {
    translateTo = language.toLowerCase();
    const key = "b8177855aa7f49ae8d9abc704023a68e";
    const endpoint = "https://api.cognitive.microsofttranslator.com/";
    const location = "global";

    const response = axios.post(
      `${endpoint}translate`,
      [
        {
          text: text,
        },
      ],
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
          "Ocp-Apim-Subscription-Region": location,
          "Content-type": "application/json",
          "X-ClientTraceId": uuidv4().toString(),
        },
        params: {
          "api-version": "3.0",
          to: translateTo,
          //from: "en", // Uncomment and specify the source language if needed.
        },
        responseType: "json",
      }
    );
    var result = response;
    return result;
  } catch (error) {
    console.error("Error translating text:", error.message);
    throw error;
  }
};
