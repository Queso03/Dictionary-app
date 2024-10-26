const input = document.querySelector('input');
const button = document.querySelector('#input-text > button');
const word = document.querySelector('#word > h2');
const soundIcon = document.querySelector('i');
const audio = document.querySelector('audio');
const type = document.querySelector('#partOfSpeech');
const phonetics = document.querySelector('#phonetics');
const def = document.querySelector('#word-def > p');
const example = document.querySelector('#word-def > h4');


function searchAPI() {
    const apiURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

    const fullURL = apiURL + input.value;

    fetch(fullURL)
        .then(response => {
            if (!response.ok) {
                throw new Error();
                
            }
            return response.json();
            })
            .then(data => {
                word.innerText = data[0].word;
                
                try {
                    audio.src = data[0].phonetics.findLast(phonetic => phonetic.audio).audio;
                    soundIcon.style.visibility = 'visible';
                } catch (error) {
                    soundIcon.style.visibility = 'hidden';
                }

                try {
                    phonetics.innerText = data[0].phonetics.findLast(phonetic => phonetic.text).text;
                } catch (error) {
                    phonetics.innerText = '';
                }

                type.innerText = data[0].meanings[0].partOfSpeech;
                def.innerText = data[0].meanings[0].definitions[0].definition;
                
                if (data[0].meanings[0].definitions[0].example) {
                    example.innerText = data[0].meanings[0].definitions[0].example;
                } else {
                    example.innerText = '';
                }
            })
            .catch(() => {
                console.log('Error');
                word.innerText = 'Word not found';
                soundIcon.style.visibility = 'hidden';
                phonetics.innerText = '';
                type.innerText = '';
                def.innerText = '';
                example.innerText = '';
            });

}


button.addEventListener('click', searchAPI);
input.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        searchAPI();
    }
});
    
soundIcon.addEventListener('click', function() {
    if (audio.src) {
        audio.play();
    } 

});