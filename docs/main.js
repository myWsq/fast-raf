function createStopWatch() {
  const container = document.createElement("ul");
  container.className = "container";
  container.innerHTML = `
    <li>
      <span class="time-text">00:00:000</span>
      <button class="start">Start</button>
      <button class="stop">Pause</button>
    </li>
  `;
  let startTime = 0;
  let time = 0;
  let handler;

  const timeText = container.querySelector(".time-text");

  function step() {
    time = Date.now() - startTime;
    const date = new Date(time);
    timeText.innerText = `${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date
      .getSeconds()
      .toString()
      .padStart(2, "0")}:${date.getMilliseconds()}`;
    handler = requestAnimationFrame(() => {
      step();
    });
  }

  function start() {
    startTime = Date.now() - time;
    step();
  }

  container.querySelector("button.start").addEventListener("click", start);

  function stop() {
    if (handler) {
      cancelAnimationFrame(handler);
    }
  }

  container.querySelector("button.stop").addEventListener("click", stop);

  document.body.appendChild(container);
  start();
}

for (let i = 0; i < 10; i++) {
  createStopWatch();
}
