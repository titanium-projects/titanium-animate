## Titanium Animate

**Titanium Animate** is a lightweight, zero-dependency JavaScript animation framework designed to simplify the Web Animations API with an intuitive API, flexible easing, directional control, and lifecycle callbacks.

---

## ✨ Usage

### Import
```js
import { Animate, Easing, Direction, Fill } from "titanium-animate";
```

### Basic Animation
```js
const animation = Animate(document.querySelector(".box"), {
  duration: 1000,
  easing: Easing.EaseInOut,
  direction: Direction.Normal,
  fill: Fill.Forwards
})
  .from({ left: "0px" })
  .to({ left: "300px" })
  .onCompleted(() => console.log("Animation Done"))
  .start();
```

### Cancel Anytime
```js
const handle = animation.start();
handle.cancel(); // Cancel mid-animation
```

### Status Updates
```js
Animate(element, { duration: 1500 })
  .from({ top: "0px" })
  .to({ top: "300px" })
  .onStatus((status) => {
    console.log(status.currentTime, status.statusType);
  }, 100)
  .start();
```

---

## 🧩 API

### `Animate(element, options)`

| Option     | Type     | Default     | Description                          |
|------------|----------|-------------|--------------------------------------|
| `duration` | Number   | `1000`      | Duration in ms                       |
| `easing`   | String   | `linear`    | Use from `Easing` constants          |
| `direction`| String   | `normal`    | Use from `Direction` constants       |
| `fill`     | String   | `none`      | Use from `Fill` constants            |
| `delay`    | Number   | `0`         | Optional delay in ms                 |

---

## 🧪 Built-in Mappers

| Property   | Behavior               |
|------------|------------------------|
| `left`     | Translates in X axis   |
| `top`      | Translates in Y axis   |
| `grayscale`| CSS Filter             |

You can also animate standard properties like `opacity`, `backgroundColor`, `transform`, etc.


## License

This framework is released under the [MIT License](LICENSE).
