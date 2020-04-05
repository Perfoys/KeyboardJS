var ruLang = false;
var capslock = false;
var shift = false;
var alt = false;

document.addEventListener("DOMContentLoaded", function(event) {
    var textArea = document.createElement('textarea');
    var keyBoard = document.createElement('div');
    textArea.className = 'TextArea';
    keyBoard.className = 'KeyBoard';
    document.body.appendChild(textArea);
    document.body.appendChild(keyBoard);
    CreateKeyBoard(keyBoard, keyboardmap, ruLang);
    window.onkeydown = keydown;
    window.onkeyup = keyup;
    document.addEventListener("mousedown", (e)=>{
        if (e.target.className.includes('n')) {
            keyName = e.target.className.split(" ");
            keyCode = keyName[1].slice(1,4);
            KeyProcessing(parseInt(keyCode), keyName[1]);
        }
    });
    document.addEventListener("mouseup", (e)=>{
        if (e.target.className.includes('n')) {
            keyName = e.target.className.split(" ");
            keyCode = keyName[1].slice(1,4);
            let key = document.querySelector(`.n${keyCode}`);
            key.style.color = "#1e1e1e";
            if(capslock && parseInt(keyCode) === 20) key.style.backgroundColor = "#0ff";
            else key.style.backgroundColor = 'white';
        }
    })
});

function CreateKeyBoard(div, keysmap, lang) {
    keysmap.forEach(function (item, i, keysmap) {
        let key = document.createElement('button');
        key.className = 'Key' + ` n${item}`;
        EnLowKeys(key, item, lang);
        div.appendChild(key);
    });
}

function ChangeKeyBoard(keysmap, lang, caps) {
    keysmap.forEach(function (item, i, keysmap) {
        let key = document.querySelector(`.n${item}`)
        if (lang) { ruLang = false;
            caps ? EnUpKeys(key,item,ruLang) : EnLowKeys(key,item,ruLang);}
        else { ruLang = true;
            caps ? RuUpKeys(key,item,ruLang) : RuLowKeys(key,item,ruLang);}
    });
}

function SymSup(key, item, lang) {
    let sup = document.createElement('sup');
    if (enSupSymbols[item] && !lang) sup.textContent = enSupSymbols[item]
    else if (ruSupSymbols[item]) sup.textContent = ruSupSymbols[item];
    key.appendChild(sup);
}

function keydown(event) {
    let keyCode = (event.which) ? event.which : event.keyCode;
    let keyName = `n${keyCode}`;
    KeyProcessing(keyCode, keyName);
}

function KeyProcessing(keyCode, keyCName) {
    textArea = document.querySelector('.TextArea');
    let key = document.querySelector(`.${keyCName}`);
    key.style.color = "#0ff";
    if (!speckeys[keyCode]){
        if (shift && enSymbols[keyCode] && !ruLang) textArea.value += key.textContent[1];
        else if (shift && numbersmap[keyCode]) textArea.value += key.textContent[1];
        else if (shift && ruSupSymbols[keyCode]) textArea.value += key.textContent[1];
        else if (shift) textArea.value += key.textContent[0].toLocaleUpperCase();
        else textArea.value += key.textContent[0];
    }
    else {
        switch (keyCode) {
                case 8: textArea.value = textArea.value.substring(0, textArea.value.length - 1); break;
                case 9: textArea.value += "    "; break;
                case 13: textArea.value += "\n"; break;
                case 16: textArea.value += ""; shift = true; break;
                case 17: textArea.value += ""; break;
                case 18: textArea.value += ""; alt = true; break;
                case 20: textArea.value += ""; break;
                case 32: textArea.value += " "; break;
                default: {
                    if(shift)
                    textArea.value += `${speckeys[keyCode]}`;
                }
            } 
    }
    if(shift && alt) ChangeKeyBoard(keyboardmap, ruLang, capslock);
    if(keyCode === 20) {
        if (capslock) { capslock = false;
            CapsLock(keyboardmap, capslock, ruLang);}
        else {capslock = true;
            CapsLock(keyboardmap, capslock, ruLang);}
    }
}

function keyup(event) {
    textArea = document.querySelector('.TextArea');
    let keyCode = (event.which) ? event.which : event.keyCode;
    let key = document.querySelector(`.n${keyCode}`);
    key.style.color = "#1e1e1e";
    if (keyCode === 16) shift = false;
    else if (keyCode === 18) alt = false;
    if(capslock && keyCode === 20) key.style.backgroundColor = "#0ff";
    else key.style.backgroundColor = 'white';
}

function CapsLock(keysmap, caps, lang) {
    keysmap.forEach(function (item, i, keysmap) {
        let key = document.querySelector(`.n${item}`)
        if (caps) lang ? RuUpKeys(key,item,lang) : EnUpKeys(key,item,lang);
        else lang ? RuLowKeys(key,item,lang) : EnLowKeys(key,item,lang);
    });
}

function RuLowKeys(key, item, lang) {
    if (speckeys[item]) key.textContent = speckeys[item];
    else if (ruLangKeysmap[item]) key.textContent = ruLangKeysmap[item]; 
    else key.textContent = String.fromCharCode(item);
    SymSup(key, item, lang);
}

function EnLowKeys(key, item, lang) {
    if (speckeys[item]) key.textContent = speckeys[item];
    else if (enLangKeysmap[item]) key.textContent = enLangKeysmap[item]; 
    else key.textContent = String.fromCharCode(item);
    if (enSymbols[item]) key.textContent = enSymbols[item];
    SymSup(key, item, lang); 
}

function EnUpKeys(key, item, lang) {
    if (speckeys[item]) key.textContent = speckeys[item]; 
    else key.textContent = String.fromCharCode(item);
    if (enSymbols[item]) key.textContent = enSymbols[item];
    SymSup(key, item, lang);
}

function RuUpKeys(key, item, lang) {
    if (speckeys[item]) key.textContent = speckeys[item];
    else if (RULangKeysmap[item]) key.textContent = RULangKeysmap[item]; 
    else key.textContent = String.fromCharCode(item);
    SymSup(key, item, lang);
}

const keyboardmap = [192, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 189, 187, 8,
    9, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219, 221, 220, 
    20, 65, 83, 68, 70, 71, 72, 74, 75, 76, 186, 222, 13, 
    16, 90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 16,
    17, 91, 18, 32, 18, 17];

const enLangKeysmap = {81: "q", 87: "w", 69: "e", 82: "r", 84: "t", 89: "y", 85: "u", 73: "i",
 79: "o", 80: "p", 65: "a", 83: "s", 68: "d", 70: "f", 71: "g", 72: "h",
 74: "j", 75: "k", 76: "l", 90: "z", 88: "x", 67: "c", 86: "v", 66: "b", 78: "n",
 77: "m"};

const RULangKeysmap = {192: "Ё", 81: "Й", 87: "Ц", 69: "У", 82: "К", 84: "Е", 89: "Н", 85: "Г", 73: "Ш",
79: "Щ", 80: "З", 219: "Х", 221: "Ъ", 65: "Ф", 83: "Ы", 68: "В", 70: "А", 71: "П", 72: "Р",
74: "О", 75: "Л", 76: "Д", 186: "Ж", 222: "Э", 90: "Я", 88: "Ч", 67: "С", 86: "М", 66: "И", 78: "Т",
77: "Ь", 188: "Б", 190: "Ю", 191: ".", 189: '-', 187: '=', 220: '\\'};

const ruLangKeysmap = {192: "ё", 81: "й", 87: "ц", 69: "у", 82: "к", 84: "е", 89: "н", 85: "г", 73: "ш",
79: "щ", 80: "з", 219: "х", 221: "ъ", 65: "ф", 83: "ы", 68: "в", 70: "а", 71: "п", 72: "р",
74: "о", 75: "л", 76: "д", 186: "ж", 222: "э", 90: "я", 88: "ч", 67: "с", 86: "м", 66: "и", 78: "т",
77: "ь", 188: "б", 190: "ю", 191: ".", 189: '-', 187: '=', 220: '\\'};

const speckeys = {8: "BACKSPACE", 9: 'TAB',20: 'CAPS LOCK', 16: 'SHIFT', 13: 'ENTER', 17: 'CTRL', 18: 'ALT',
32: 'SPACE', 91: 'WIN'};

const enSymbols = {192: "`",  219:'[', 221: ']', 186: ';', 222: '\'', 
188: ',', 190: '.', 191: '/', 189: '-', 187: '=', 220: '\\'};

const enSupSymbols = {49: "!", 50: "@", 51: "#", 52: "$", 53: "%", 54: "^", 55: "&", 56: "*", 57: "(", 48: ")",
189: "_", 187: "+", 192: "~", 219: "{", 221: "}", 220: "|", 188: "<", 190: ">", 191: "?", 186: ":", 222: "\""};

const ruSupSymbols = {49: "!", 50: "\"", 51: "№", 52: ";", 53: "%", 54: ":", 55: "?", 56: "*", 57: "(", 48: ")",
220: "|", 189: "_", 187: "+", 219: "", 221: "", 186: "", 222: "", 188: "", 190: "", 191: ","};

const numbersmap = {49: '1', 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 48: "0"};