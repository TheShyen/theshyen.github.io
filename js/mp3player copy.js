'use strict';

/* Задача: реализовать функционал mp-3 плеера.
Что должен уметь плеер: 
1) кнопки play/pause, которые запускают и останавливают воспроизведение песни соответсвенно.
2) кнопки next/prev, которые позволяют переключать треки.
3) кнопки увеличения/уменьшения громкости
4) + добавить кнопку repeat и шкалу воспроизведения(опционально) */
const audio = document.getElementById("audio");
const line = document.querySelector(".line");
const time = document.querySelector(".time");
const buttonPlay = document.querySelector(".play");
const buttonPause = document.querySelector(".pause");
const buttonPrev = document.querySelector(".prev"); 
const buttonNext = document.querySelector(".next");
const buttonVolumeUp = document.querySelector(".volumeUp");
const buttonVolumeDown = document.querySelector(".volumeDown");
const playlist = [
    'SOAD - Lonely Day.mp3',
    'Slipknot - People=Shit.mp3',
    'Slipknot - Metabolic.mp3',
];
 
let track = 0;
let audioPlay;
let playing = false;

function switchTrack(numTrack) {
    audio.src = 'src/audio/' + playlist[numTrack];
    audio.currentTime = 0;
    audio.play();
}

buttonPlay.addEventListener("click", function() {
    if (!playing) {
        audio.play();
        audioPlay = setInterval(function() {
            buttonPlay.classList.add('play');
            let audioTime = Math.round(audio.currentTime);
            let audioLength = Math.round(audio.duration);
            line.style.width = (audioTime * 100) / audioLength + '%';
            const m = Math.floor((audioTime % 3600) / 60);
            const s = audioTime % 60;
            const m1 = Math.floor((audioLength % 3600) / 60);
            const s1 = audioLength % 60;
            time.innerHTML = m + ":" + s + " / " + m1 + ":" + s1 ;
            if (audioTime == audioLength && track < playlist.length -1) {
                track++;
                switchTrack(track);
            } else if (audioTime == audioLength && track >= playlist.length -1) {
                track = 0;
                switchTrack(track);
            }
        }, 1000);
        playing = true;
        buttonPlay.innerHTML = '<svg height = "30" width = "30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>';
    } else {
        audio.pause();
        clearInterval(audioPlay);
        playing = false;
        buttonPlay.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM176 168V344C176 352.7 180.7 360.7 188.3 364.9C195.8 369.2 205.1 369 212.5 364.5L356.5 276.5C363.6 272.1 368 264.4 368 256C368 247.6 363.6 239.9 356.5 235.5L212.5 147.5C205.1 142.1 195.8 142.8 188.3 147.1C180.7 151.3 176 159.3 176 168V168z"/></svg>';
    }
    
});

buttonPrev.addEventListener("click", function() {
    if (track > 0) {
        track--;
        switchTrack(track); 
    } else {
        track = 3;
        switchTrack(track);
    }
});


buttonNext.addEventListener("click", function() {
    if (track < playlist.length -1) {
        track++;
        switchTrack(track);
    } else { 
        track = 0;
        switchTrack(track);
    }
});

buttonVolumeUp.addEventListener("click", function() {
    audio.volume += 0.1;
});

buttonVolumeDown.addEventListener("click", function() {
    audio.volume -= 0.1;
});
