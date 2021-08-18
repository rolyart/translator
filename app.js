var pageLanguage = 'ro';
function googleTranslateElementInit(){
   new google.translate.TranslateElement({pageLanguage}, 'google_translate_element');
}

var sourceText = document.getElementById('source-text');

var targetText = document.getElementById('target-text');


var sourceLang = document.getElementById('source-lang');

var targetLang = document.getElementById('target-lang');


sourceText.addEventListener('input',(event)=>{
    console.log(event.target.value);
    var sourceLang = document.getElementById('source-lang');

    var targetLang = document.getElementById('target-lang');

    console.log(sourceLang.value)
    translate(event.target.value, sourceLang.value, targetLang.value);
 
})

initSourceSelect();


function initSourceSelect(){
    var http = new XMLHttpRequest();
    var url = "http://apps.rolyart.ro/translator/languages.json";
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let languages= JSON.parse(this.responseText);

            for(const lang in languages){
                let sourceOption  = document.createElement('option');
                sourceOption.setAttribute('value', lang);
                sourceOption.innerHTML= languages[lang];

                sourceOption.addEventListener('select', ()=>{
                    sourceLang = lang;
                })

                let targetOption  = document.createElement('option');
                
                targetOption.setAttribute('value', lang);
                targetOption.innerHTML= languages[lang];

                targetOption.addEventListener('select', ()=>{
                    targetLang= lang;
                })


                sourceLang.appendChild(sourceOption);
                targetLang.appendChild(targetOption);
            }
           
        }
    };
    http.open("GET", url, true);
    http.send();
}


function translate(sourceText, sourceLang, targetLang){

    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="+ sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);

    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);

            console.log(data[0][0][0])
        }
    }
    http.open("GET", url, true);
    http.send();
    
}






