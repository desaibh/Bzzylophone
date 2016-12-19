// Xylophone

function playSound(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const note = document.querySelector(`.note[data-key="${keyCode}"]`);
  if (!audio) return;
  audio.currentTime=0;
  audio.play();
  note.classList.add('play');
}

function keydownHandler(e) {
  let keyCodeVal = e.which || e.keyCode;
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
for (note of notes) {
  note.addEventListener('click', clickHandler);
  note.addEventListener('transitionend', removeTransform);
};


// Sheet Music

const sheetMusic = [
  {
    song: 'Mary Had A Little Lamb',
    sheet: 'EDCDEEE DDDEEE EDCDEEE EDDEDC',
    speed: '44',
    type: '0qqqqqqh qqhqqh qqqqqqq qqqqqw',
    lyrics: [
      'Mary Had a Little Lamb,',
      'Little Lamb, Little Lamb',
      'Mary Had a Little Lamb',
      'Whose Fleece Was as White as Snow!'
    ]
  },
  {
    song: 'Itsy Bitsy Spider',
    sheet: 'DCCCDEE EDCDEC PEEFG GFEFGE PCDEE DCDEC PDCCCDEE EDCDEC',
    speed: '24',
    type:  '0qhqhqhh qhqhqh phhqh hhqhqh phqhh hqhqh pqhqhqqh qhqhqhqh',
    lyrics: [
      'The Itsy-Bitsy Spider',
      'Climbed Up the Water Spout.',
      'Out Came the Rain',
      'And Washed the Spider Out.',
      'Out Came the Sun',
      'And Dried Up All the Rain.',
      'The Itsy-Bitsy Spider',
      'Climbed Up the Spout Again. '
    ]
  },
  {
    song: 'Jingle Bells',
    sheet: 'EEEEEE EGCDE PFFFFFEEE GGFDC',
    speed: '44',
    type: '0eeqeeq eeesq eeeeseeee eeee',
    lyrics: [
      'Jingle Bells, Jingle Bells,',
      'Jingle All the Way!',
      'Oh What Fun It Is To Ride In A ',
      'One-Horse Open Sleigh!'
    ]
  },
  {
    song: 'Happy Birthday',
    sheet: 'CCDCFE CCDCGF CCSAFED SSAFGF',
    speed: '44',
    type: '0eeqqqh eeqqqh eeqqqqh eeqqqh',
    lyrics: [
      'Happy Birthday to you.',
      'Happy Birthday to you.',
      'Happy Birthday dear {name},',
      'Happy Birthday to you!'
    ]
  },
  {
    song: 'Twinkle Twinkle Little Star',
    sheet: 'CCGGAAG FFEEDDC GGFFEED GGFFEED CCGGAAG FFEEDDC',
    speed: '44',
    type: '0qqqqqqh qqqqqqh qqqqqqh qqqqqqh qqqqqqh qqqqqqh',
    lyrics: [
      'Twinkle, twinkle, little star.',
      'How I wonder what you are.',
      'Up above the world so high,',
      'Like a diamond in the sky,',
      'Twinkle, twinkle little star.',
      'How I wonder what you are.'
    ]
  }
]
let i = 0;
let j = 0;

function drawNoteLoop(sheet, sheetType, lyrics, len, counter, lyr) {
  let nnotehead = '';
  let stopped = '';
  let ngrid = document.querySelector('#grid');

  let nscale = document.createElement("div");
  nscale.classList.add('scale');
  nscale.innerHTML='<div class="clef">&#119070;</div>';
  ngrid.appendChild(nscale);

  for (let k=len; k<sheet.length; k++) {
    if ((counter < 1) && (sheet[k] !== 'P')) {
      nnotehead = document.createElement('div')
      nnotehead.classList.add(`notehead`);
      (sheet[k] !== ' ') ? nnotehead.classList.add(`${sheet[k]}nh`) : counter++;
      nnotehead.innerHTML=`${sheet[k]}`;
      (sheet[k] !== ' ') ? nscale.appendChild(nnotehead) : false;
      stopped = k;
    }
  };

  let nlyric = document.createElement('div');
  nlyric.classList.add('lyrics');
  nlyric.classList.add('clearfix');
  nlyric.innerHTML=`<p>${lyrics[lyr]}</p>`;
  ngrid.appendChild(nlyric);
  stopped++;
  if (sheet.length > stopped) {
    lyr++;
    drawNoteLoop(sheet, sheetType, lyrics, stopped, 0, lyr)
  }

}

function playNoteLoop (sheet, sheetType, speed, len) {
  let mils;
  (sheetType[j]=='s') ? mils = 125*speed : false;
  (sheetType[j]=='e') ? mils = 250*speed : false;
  (sheetType[j]=='q') ? mils = 500*speed : false;
  (sheetType[j]=='h') ? mils = 1000*speed : false;
  (sheetType[j]=='w' || sheetType[j]=='p') ? mils = 2000*speed : false;

  j++;
  setTimeout(function() {
    playSound(sheet[i].charCodeAt(0));
    i++;
    if (i < len) {
       playNoteLoop(sheet, sheetType, speed, len);
    }
  }, mils)
}

function playSheetMusic(e) {
  selection = e.target.value;
  let sheet = (sheetMusic[selection].sheet);
  let sheetType = (sheetMusic[selection].type);
  let speed = (sheetMusic[selection].speed[0]/sheetMusic[selection].speed[1]);
  let lyrics = (sheetMusic[selection].lyrics);
  let len = sheet.length;
  i=0;
  j=0;
  var gridNode = document.querySelector("#grid");
  while (gridNode.firstChild) {
      gridNode.removeChild(gridNode.firstChild);
  }
  drawNoteLoop(sheet, sheetType, lyrics, 0, 0, 0);
  playNoteLoop(sheet, sheetType, speed, len);
}

const jingles = document.querySelector('#jingle');
jingles.addEventListener('change', playSheetMusic)

window.addEventListener('keydown', keydownHandler);
