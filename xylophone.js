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
  let keyCodeVal;
  if (e.target.className.includes("note")) {
    keyCodeVal = e.toElement.attributes[0].value;
  } else {
    keyCodeVal = e.path[1].dataset.key;
  }
  playSound(keyCodeVal);
}

function removeTransform(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('play');
}

const notes = document.querySelectorAll('.note');
notes.forEach((note) => {
  note.addEventListener('click', clickHandler);
  note.addEventListener('transitionend', removeTransform);
});

window.addEventListener('keydown', keydownHandler);
