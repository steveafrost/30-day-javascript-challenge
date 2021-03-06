const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.expand');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function isFullScreen() {
  return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

function handleFullScreen(e) {
   if (isFullScreen()) {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
      else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
      setFullscreenData(false);
   }
   else {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.mozRequestFullScreen) video.mozRequestFullScreen();
      else if (video.webkitRequestFullScreen) video.webkitRequestFullScreen();
      else if (video.msRequestFullscreen) video.msRequestFullscreen();
      setFullscreenData(true);
   }
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', handleFullScreen);

// (function () {
//   const videoModule = {
//     init: function () {
//       this.cacheDOM()
//       this.bindEvents()
//     },

//     cacheDOM: function () {
//       this.player = document.querySelector('.player')
//       this.video = this.player.querySelector('.viewer')
//       this.progress = this.player.querySelector('.progress')
//       this.progressBar = this.player.querySelector('.progress__filled')
//       this.toggle = this.player.querySelector('.toggle')
//       this.playButton = this.player.querySelector('.player__button')
//       this.skipButtons = this.player.querySelector('[data-skip]')
//       this.ranges = this.player.querySelector('.player__slider')
//     },

//     bindEvents: function () {
//       this.video.addEventListener('click', this.togglePlay)
//       this.playButton.addEventListener('click', this.togglePlay)
//     },

//     togglePlay: function () {
//       const videoPlayer = this.video
//       debugger
//       if (videoPlayer.paused) {
//         videoPlayer.play()
//       } else {
//         videoPlayer.pause()
//       }
//     }
//   }

//   videoModule.init()
// }())
