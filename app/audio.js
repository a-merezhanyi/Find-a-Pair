/**
 * Find a Pair - a simple CSS + JS game
 * coded by Anatol Merezhanyi @e1r0nd_crg
 * https://www.youtube.com/c/AnatolMerezhanyi
 */
const audio = {
  musicMenu: null,
  musicGame: null,
  cotext: null,
  bufferLoader: null
}
window.onload = init;

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audio.context = new AudioContext();

  audio.bufferLoader = new BufferLoader(
    audio.context,
    [
      'agp-ambient-reality-pad-4.ogg',
      'planetjazzbass-the-death-of-gagarin.ogg'
    ],
    finishedLoading
    );

  audio.bufferLoader.load();
}

function finishedLoading(bufferList) {
  audio.bufferList = bufferList;
  createAudio();
  audio.musicMenu.start();
}

function createAudio() {
  audio.musicMenu = audio.context.createBufferSource();
  audio.gainNodeMenu = audio.context.createGain();
  audio.musicMenu.buffer = audio.bufferList[0];
  audio.musicMenu.loop = true;
  audio.gainNodeMenu.gain.setValueAtTime(0.01, audio.context.currentTime);
  audio.musicMenu.connect(audio.gainNodeMenu);
  audio.gainNodeMenu.connect(audio.context.destination);
  audio.gainNodeMenu.gain.exponentialRampToValueAtTime(1.0, audio.context.currentTime + 3.0);
  
  audio.musicGame = audio.context.createBufferSource();
  audio.gainNodeGame = audio.context.createGain();
  audio.musicGame.buffer = audio.bufferList[1];
  audio.musicGame.connect(audio.gainNodeGame);
  audio.gainNodeGame.connect(audio.context.destination);
  audio.gainNodeGame.gain.exponentialRampToValueAtTime(1.0, audio.context.currentTime + 3.0);
}