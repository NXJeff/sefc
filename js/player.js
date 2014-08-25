soundManager.setup({
  // path to directory containing SM2 SWF
  url: 'js/360player/swf/'
});

// threeSixtyPlayer.config = {
//   // playNext: false, // stop after one sound, or play through list until end
//   // autoPlay: false, // start playing the first sound right away
//   // allowMultiple: true, // let many sounds play at once (false = one at a time)
//   // loadRingColor: '#ccc',// amount of sound which has loaded
//   // playRingColor: '#000', // amount of sound which has played
//   // backgroundRingColor: '#eee', // "default" color shown underneath everything else
//   // animDuration: 500,
//   // animTransition: Animator.tx.bouncy// http://www.berniecode.com/writing/animator.html
// }

threeSixtyPlayer.config.autoPlay = true;
threeSixtyPlayer.config.playNext = true;
threeSixtyPlayer.config.debugMode = true;

threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
threeSixtyPlayer.config.showHMSTime = true;

// enable some spectrum stuffs

threeSixtyPlayer.config.useWaveformData = true;
threeSixtyPlayer.config.useEQData = true;

// enable this in SM2 as well, as needed

if (threeSixtyPlayer.config.useWaveformData) {
  soundManager.flash9Options.useWaveformData = true;
}
if (threeSixtyPlayer.config.useEQData) {
  soundManager.flash9Options.useEQData = true;
}
if (threeSixtyPlayer.config.usePeakData) {
  soundManager.flash9Options.usePeakData = true;
}

if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {
  // even if HTML5 supports MP3, prefer flash so the visualization features can be used.
  soundManager.preferFlash = true;
}

// favicon is expensive CPU-wise, but can be used.
if (window.location.href.match(/hifi/i)) {
  threeSixtyPlayer.config.useFavIcon = true;
}

if (window.location.href.match(/html5/i)) {
  // for testing IE 9, etc.
  soundManager.useHTML5Audio = true;
}

