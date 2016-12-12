function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const note = document.querySelector(`.note[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.currentTime=0;
  audio.play();
  note.classList.add('play');
}

function keydownHandler(e) {
  let keyCodeVal = e.keyCode;
  playSound(keyCodeVal);
}

function clickHandler(e) {
  let keyCodeVal =
    e.target.className.includes("note") ?
    e.target.dataset.key : e.target.parentNode.dataset.key;
  playSound(keyCodeVal);
}

function removeTransform(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('play');
}

const notes = document.querySelectorAll('.note');
for (note of notes) {
  note.addEventListener('click', clickHandler);
  note.addEventListener('transitionend', removeTransform);
};

window.addEventListener('keydown', keydownHandler);
