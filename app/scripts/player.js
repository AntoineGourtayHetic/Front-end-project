const audios = document.querySelectorAll('audio'),
      sounds = document.querySelectorAll('.sound');

sounds.forEach(sound => {
   sound.addEventListener('click', playSound);
});


const randomSound = audios[Math.floor(Math.random() * audios.length)];

randomSound.play();

function playSound(e) {

    var clickedAudio;

    audios.forEach(audio => {

        let src = audio.classList[0];

        console.log(src);
        console.log(e.target.classList[1]);

        if(src == e.target.classList[1]) {
            clickedAudio = audio;
            console.log('found');

            audio.play();
            console.log(audio);
        }
    });

}