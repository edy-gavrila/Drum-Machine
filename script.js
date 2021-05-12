const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];
const keys = document.querySelectorAll(".key");
const centerBtn = document.getElementById("center-btn");
const powerSwitch = document.getElementById("power-check");
const bankSwitch = document.getElementById("bank-check");
const volumeSl = document.getElementById("volume");
const display = document.getElementById("display");
var volume = 20;
var bank = bankOne;

volumeSl.value = 20;

keys.forEach((key, idx) => {
  const source = bank[idx].url;
  const type = "audio/mpeg";
  const btnText = key.innerText;
  const audio = new Audio();

  audio.setAttribute("src", source);
  audio.setAttribute("type", type);
  audio.classList.add("clip");
  audio.setAttribute("id", btnText);
  audio.volume = volume / 100;
  key.appendChild(audio);

  key.addEventListener("click", () => {
    const audio = document.getElementById(btnText);
    audio.currentTime = 0;
    if (key.classList.contains("enabled")) {
      audio.play();
      updateDisplay(bank[idx].id);
    }
  });
});

powerSwitch.addEventListener("click", () => {
  if (powerSwitch.checked) {
    keys.forEach((key, idx) => {
      key.classList.add("enabled");
      key.classList.add(`btn${idx + 1}`);
    });
    updateDisplay("ON");
  } else {
    keys.forEach((key, idx) => {
      key.classList.remove("enabled");
      key.classList.remove(`btn${idx + 1}`);
    });
    updateDisplay("OFF");
  }
});

bankSwitch.addEventListener("click", () => {
  if (bankSwitch.checked) {
    bank = bankTwo;
    updateDisplay("Bank 2");
  } else {
    bank = bankOne;
    updateDisplay("Bank 1");
  }

  keys.forEach((key, idx) => {
    const audio = document.getElementById(key.innerText);
    audio.setAttribute("src", bank[idx].url);
  });
});

centerBtn.addEventListener("click", () => {
  keys.forEach((key, idx) => {
    key.classList.toggle(`btn${idx + 1}`);
  });
});

volumeSl.addEventListener("input", () => {
  updateDisplay(`Volume: ${volumeSl.value}`);
  volume = volumeSl.value;
  keys.forEach((key) => {
    const audio = document.getElementById(key.innerText);
    audio.volume = volume / 100;
  });
});

document.onkeydown = function (e) {
  const bankSlot = bank.filter((item) => {
    if (item.keyTrigger === e.key.toUpperCase()) {
      return item;
    }
  });

  if (bankSlot.length > 0) {
    const audio = document.getElementById(bankSlot[0].keyTrigger);
    if (audio.parentElement.classList.contains("enabled")) {
      audio.currentTime = 0;
      audio.play();
      audio.parentElement.classList.add("key-pressed");
      setTimeout(() => {
        audio.parentElement.classList.remove("key-pressed");
      }, 300);
    }
  }
};

function updateDisplay(msg) {
  display.innerHTML = msg;
  setTimeout(() => {
    display.innerHTML = "";
  }, 1000);
}

//this function calculates the coordinates for the buttons
//wich we hardwired into css for speed
// function calcRotation(r, offsetX, offsetY) {
//   var points = [];
//   const stepAngle = (2 * Math.PI) / 9;

//   for (let i = 0; i < 9; i++) {
//     let x = Math.round(Math.cos(stepAngle * i) * r) + offsetX;
//     let y = Math.round(Math.sin(stepAngle * i) * r) + offsetY;

//     points[i] = [x, y];
//   }

//   console.log(points);
// }

// calcRotation(200, 280, 280);
