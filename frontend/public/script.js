
const voiceSelect = document.querySelector("#voiceSelect");
const languageSelect1 = document.querySelector("#languageSelect-1");
const languageSelect2 = document.querySelector("#languageSelect-2");
const playButton = document.querySelector(".translate-button")
const textInput = document.querySelector("#inputText");
const outText = document.querySelector("#outputText")

textInput.addEventListener("focus", function handler(){
  textInput.value ="";
  textInput.removeEventListener("focus", handler);
})


const languages = [
  { code: 'hi', name: 'Hindi'},
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' }
];

const googleVoices = [
  { name: " हिन्दी", lang: "hi-IN" },
  { name: " Deutsch", lang: "de-DE" },
  { name: " US English", lang: "en-US" },
  { name: " UK English Female", lang: "en-GB" },
  { name: " UK English Male", lang: "en-GB" },
  { name: " español", lang: "es-ES" },
  { name: " français", lang: "fr-FR" },
  { name: " italiano", lang: "it-IT" },
]


  languageSelect1.innerHTML = languages.map((language) => {
    return `<option value=${language.code}>${language.name}</option>`
  }).join("")

   languageSelect2.innerHTML = languages.map((language) => {
    return `<option value=${language.code}>${language.name}</option>`
  }).join("")


let voices = [];

function loadVoices(){
  voices = speechSynthesis.getVoices();

  voiceSelect.innerHTML = googleVoices.map((voice, index) => {
    return `<option value=${index}>${voice.name} </option>`
  }).join("");

 
}

loadVoices();

speechSynthesis.onvoiceschanged = loadVoices;



playButton.addEventListener('click', async () => {

  const text = textInput.value;
  const sourceLang = languageSelect1.value;
  const targetLang = languageSelect2.value;

  outText.value = "translating...."

  try{
    const response = await fetch(`http://localhost:5000/translate?sl=${sourceLang}&dl=${targetLang}&text=${encodeURIComponent(text)}`);
    const data = await response.json();
    console.log(data);

  
   

    const translatedText = data["destination-text"];
    outText.value = translatedText;

    

    const utterance = new SpeechSynthesisUtterance(translatedText);

    const googleVoice = googleVoices[voiceSelect.value];
    const realVoice = voices.find(v => v.name.includes(googleVoice.name));

    if (realVoice) {
      utterance.voice = realVoice;
    }


     speechSynthesis.speak(utterance);
   
  } catch(err){
    console.log("Translation error: ", err);
    alert("Failed to translate text");
  }

})