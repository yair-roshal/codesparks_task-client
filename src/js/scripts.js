var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

// piece object
const piece = (function () {
  let el = null;

  const init = function (el) {
    this.el = el;
  };

  const moveDelta = function (dx, dy) {
    const pos = this.el.getBoundingClientRect();

    // --------------task-3+++

    if (pos.left + dx < wWidth - 100 && pos.left + dx >= 0) {
      this.el.style.left = `${pos.left + dx}px`;
    }

    if (pos.top + dy < wHeight - 100 && pos.top + dy >= 0) {
      this.el.style.top = `${pos.top + dy}px`;
    }
  };

  return {
    init,
    moveDelta,
  };
})();

function handleClick(ev) {
  piece.moveDelta(parseInt(this.dataset.dx), parseInt(this.dataset.dy));
}

const btnsSettings = [
  {
    btnId: 'btn-up',
    dx: 0,
    dy: -100
  },
  {
    btnId: 'btn-right',
    dx: 100,
    dy: 0
  },
  {
    btnId: 'btn-down',
    dx: 0,
    dy: 100
  },
  {
    btnId: 'btn-left',
    dx: -100,
    dy: 0
  }
];

function initButton(btnId, dx, dy) {
  const btn = document.getElementById(btnId);
  btn.dataset.dx = dx;
  btn.dataset.dy = dy;
  btn.addEventListener("click", handleClick);
}

function init() {
  // --------------task-2+++
  
  btnsSettings.forEach(({btnId, dx, dy}) => {
    initButton(btnId, dx, dy)
  });

  // initButton("btn-up", 0, -100);
  // initButton("btn-right", 100, 0);
  // initButton("btn-down", 0, 100);
  // initButton("btn-left", -100, 0);
}

window.addEventListener("DOMContentLoaded", (event) => {
  piece.init(document.getElementById("piece"));
  init();
});

// --------------task-4+++
document.getElementById("btn-reset").onclick = function () {
  location.reload();
};

// --------------task-5+++
function randomInteger(min, max) {
  // get a random number from (min-0.5) up to (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function random() {
  piece.el.style.left = randomInteger(100, wWidth - 100) + "px";
  piece.el.style.top = randomInteger(100, wHeight - 100) + "px";
}

// --------------task-6+++
function fetchTemperature() {
  fetch(
    `https://weatherstack.glitch.me/current?access_key=5f58d7a0eecd822f4bd469586df5585c&query=tel%20aviv`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const temp = data.current.temperature;
      setPieceColorByTemperature(temp);
    });
}

function setPieceColorByTemperature(temp) {
  // const temp = fetchTemperature();
  let color;

  if (temp < 10) {
    color = "blue";
  } else if (temp >= 11 && temp <= 20) {
    color = "green";
  } else if (temp >= 21 && temp <= 30) {
    color = "yellow";
  } else if (temp >= 30) {
    color = "red";
  }
  
  const circle = document.getElementsByClassName("circle")[0];
  circle.style.backgroundColor = color;
    
}
