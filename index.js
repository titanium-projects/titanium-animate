import { Easing, Direction, Fill, Animate } from "./src/index.js";
const square = document.querySelector("#square");

Animate(square, {
  duration: 1000,
  delay: 5000,
  easing: Easing.Linear,
  direction: Direction.Alternate,
  fill: Fill.Forwards,
})
  .from({ opacity: 0, backgroundColor: "red" })
  .to({ opacity: 1, backgroundColor: "blue" })
  .onStatus(function (options) {
    if (options.currentTime > 300 && options.currentTime < 400) {
    }
  }, 100)
  .onCompleted(function (options) {
    console.log("Completed", options);
  })
  .start();
