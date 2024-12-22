const pianoKeys = document.querySelectorAll(".piano-keys .key");
const passwordInput = document.querySelector(".passwort-section input");
const pianoContainer = document.querySelector(".piano-container");
const button = document.querySelector(".button");


let allKeys = [],
audio = new Audio("Tunes/a.wav");  // a.wav als default audio src

let passwortNotes = "";

const spielSound = function(key){
    audio.src = `Tunes/${key}.wav`;  // Audio src wird angepasst je nach datakey
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");  // fügt "active" klasse hinzu
    setTimeout(() => {  // entfernt "active" klasse nach 150ms
        clickedKey.classList.remove("active");
    }, 150);

    passwortNotes += key;
    passwordInput.value = passwortNotes;
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", function(){
        return spielSound(key.dataset.key)});   // Hier wird bei jedem klick der jeweilige datakey zurückgegeben
}); 

const pressedKey = function(e){
    if(allKeys.includes(e.key)){
    spielSound(e.key);
}};

passwordInput.addEventListener("click", function(){  // Keyboard wird angezeigt wenn man auf passwortInput klickt
    pianoContainer.classList.add("show");
    passwordInput.setAttribute("readonly", true);  // readonly -> man hier nicht mehr drauf schreiben
    // document.addEventListener("keydown", pressedKey);  -> Pianokeyboard auch mit tasten spielbar)
});

document.addEventListener("click", function(e){   // Keyboard wird wenn man woanders hinklickt entfernt
    if(!pianoContainer.contains(e.target) && e.target !== passwordInput && e.target !== button){
        pianoContainer.classList.remove("show");
        document.removeEventListener("keydown", pressedKey);

        passwordInput.removeAttribute("readonly");  // enternt readonly bei klick woanders
    }
});

button.addEventListener("click", function(e){
    e.preventDefault(); 

    const username = document.querySelector(".benutzer-section input")
    const passwort = passwordInput.value;

    if(username && passwort){
        alert("Sie haben sich erfolgreich Registriert!");
    }
    else{
        alert("Bitte füllen Sie alle Felder korrekt aus.");
    }
});
