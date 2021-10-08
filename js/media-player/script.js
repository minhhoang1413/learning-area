const player = document.querySelector(".player");
const video = document.querySelector('video');
video.controls = false;

const play = document.querySelector('.play');
const playIcon = document.querySelector("#play-icon");
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
const timeRange = document.querySelector("#time-range");
const volumnBtn = document.querySelector(".volumn-btn");
const volumnIcon = document.querySelector(".volumn-icon");
const volumnRange = document.querySelector("#volumn-range");
const speedSelect = document.querySelector("#speed-select");
const fullscreenBtn = document.querySelector('.fullscreen-btn');
const fullscreenIcon = document.querySelector('.fullscreen-icon');
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");
let intervalFwd;
let intervalRwd;
video.addEventListener("loadedmetadata", setTimeDuration);
play.addEventListener("click", playPauseVideo);
stop.addEventListener("click", stopVideo);
video.addEventListener("ended", stopVideo);
rwd.addEventListener("click", videoBackward);
fwd.addEventListener("click", videoForward);
function playPauseVideo() {
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if (video.paused) {
        playIcon.src = "images/pause-fill.svg";
        video.play();
    } else {
        playIcon.src = "images/play-fill.svg";
        video.pause();
    }
    
}
function stopVideo() {
    video.pause();
    video.currentTime = 0;
    playIcon.src = "images/play-fill.svg";
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
}
function videoBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove("active");
    if (rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        video.play();

    } else {
        rwd.classList.add("active");
        video.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}
function videoForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove("active");
    if (fwd.classList.contains("active")) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        video.play();

    } else {
        fwd.classList.add("active");
        video.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}
function windBackward() {
    if (video.currentTime <= 3) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        stopVideo();
    } else {
        video.currentTime -= 3;
    }
}
function windForward() {
    if (video.currentTime >= video.duration - 3) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        stopVideo();
    } else {
        video.currentTime += 3;
    }
}
video.addEventListener("timeupdate", setTime);
function setTime() {
    let min = Math.floor(video.currentTime / 60);
    let sec = Math.floor(video.currentTime % 60);

    let timeText = (min > 10 ? min : "0" + min) + ":" + (sec > 10 ? sec : "0" + sec);
    timeElapsed.textContent = timeText;
    timeRange.value = video.currentTime / video.duration * 100;
}
function setTimeDuration() {
    let min = Math.floor(video.duration / 60);
    let sec = Math.floor(video.duration % 60);
    let timeText = (min > 10 ? min : "0" + min) + ":" + (sec > 10 ? sec : "0" + sec);
    //console.log(video.duration);
    timeDuration.textContent = timeText;
}

timeRange.addEventListener("input", e => {
    playPauseVideo();
    video.currentTime = timeRange.value * video.duration / 100;
    let playPromise = video.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
            // We can now safely pause video...
            playPauseVideo();
        })
            .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
            });
    }

});
// timeRange.addEventListener("input", e => {
//     console.log("input");
// })
fullscreenBtn.addEventListener("click", e => {
    if (player.classList.contains("fullscreen")) {
        player.classList.remove("fullscreen");
        fullscreenIcon.src = "images/fullscreen.svg";
        document.exitFullscreen();
    } else {
        player.classList.add("fullscreen");
        fullscreenIcon.src = "images/fullscreen-exit.svg";
        player.requestFullscreen();
    }
    
});
volumnRange.addEventListener("input", () => {
    video.muted = false;
    changeVolumnIcon(volumnRange.value);
    video.volume = volumnRange.value;
});
volumnBtn.addEventListener("click", () => {
    
    if ( video.muted) {
        
        changeVolumnIcon(volumnRange.value);
        video.muted = false;
    }else {
        changeVolumnIcon(0);
        video.muted = true;
    }
});
function changeVolumnIcon(value){
    if (value == 0) {
        volumnIcon.src = "images/volume-mute-fill.svg";
    } else if (value > 0.7) {
        volumnIcon.src = "images/volume-up-fill.svg";
    } else {
        volumnIcon.src = "images/volume-down-fill.svg";
    }
    
}
speedSelect.addEventListener("input", () => {

    video.playbackRate = speedSelect.value;
    console.log(speedSelect.value,video.playbackRate);
});