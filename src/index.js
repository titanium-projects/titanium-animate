export const Easing = {
  Linear: "linear",
  Ease: "ease",
  EaseIn: "ease-in",
  EaseOut: "ease-out",
  EaseInOut: "ease-in-out",
  CubicBezier(x1, y1, x2, y2) {
    return `cubic-bezier(${x1}, ${y1}, ${x2}, ${y2})`;
  },
};

export const Fill = {
  None: "none",
  Forwards: "forwards",
  Backwards: "backwards",
  Both: "both",
};

export const Direction = {
  Normal: "normal",
  Reverse: "reverse",
  Alternate: "alternate",
  AlternateReverse: "alternate-reverse",
};

export const Animate = function (element, options) {
  if (!element) {
    return;
  }

  let using = {
    currentAnimate: null,
    currentTimer: null,
    fromObject: null,
    toObject: null,
    onCompleted: { callback: null },
    onStatus: { callback: null, duration: 0 },
    isStartAnimation: false,
  };

  const onCancelAction = () => {
    if (using.currentAnimate) {
      using.currentAnimate.cancel(); // Cancel
      element.style.transform = ""; // Reset
    }
    abortTimerAction();
  };

  const onStatusAction = () => {
    if (using.onStatus.callback) {
      abortTimerAction();
      using.currentTimer = setInterval(() => {
        const { currentTime, playState, pending, startTime } =
          using.currentAnimate;

        using.onStatus.callback({
          currentTime,
          status: playState === "running" ? true : false,
          statusType: playState, // Running, paused, finished
          pending,
          startTime,
        });
      }, using.onStatus.duration);
    }
  };

  const onCompletedAction = () => {
    if (using.onCompleted.callback) {
      using.currentAnimate.addEventListener("finish", () => {
        abortTimerAction();
        using.onCompleted.callback();
      });
    }
  };

  const abortTimerAction = () => {
    clearInterval(using.currentTimer);
    using.isStartAnimation = false;
  };

  const typeMapper = {
    left: { type: "transform", action: (value) => `translateX(${value})` },
    top: { type: "transform", action: (value) => `translateY(${value})` },
    scale: { type: "transform", action: (value) => `scale(${value})` },
    scaleX: { type: "transform", action: (value) => `scaleX(${value})` },
    scaleY: { type: "transform", action: (value) => `scaleY(${value})` },
    rotate: { type: "transform", action: (value) => `rotate(${value})` },
    rotateX: { type: "transform", action: (value) => `rotateX(${value})` },
    rotateY: { type: "transform", action: (value) => `rotateY(${value})` },
    skewX: { type: "transform", action: (value) => `skewX(${value})` },
    skewY: { type: "transform", action: (value) => `skewY(${value})` },
    perspective: {
      type: "transform",
      action: (value) => `perspective(${value})`,
    },
    translateZ: {
      type: "transform",
      action: (value) => `translateZ(${value})`,
    },
    scaleZ: { type: "transform", action: (value) => `scaleZ(${value})` },
    rotateZ: { type: "transform", action: (value) => `rotateZ(${value})` },
    // Filter
    grayscale: { type: "filter", action: (value) => `grayscale(${value})` },
    blur: { type: "filter", action: (value) => `blur(${value})` },
    brightness: { type: "filter", action: (value) => `brightness(${value})` },
    contrast: { type: "filter", action: (value) => `contrast(${value})` },
    hueRotate: { type: "filter", action: (value) => `hue-rotate(${value})` },
    invert: { type: "filter", action: (value) => `invert(${value})` },
    opacity: { type: "filter", action: (value) => `opacity(${value})` },
    saturate: { type: "filter", action: (value) => `saturate(${value})` },
    sepia: { type: "filter", action: (value) => `sepia(${value})` },
  };

  const typeParser = function (whereObject, key) {
    const typeName = typeMapper[key]?.type;

    if (typeName && !(typeName in whereObject)) {
      whereObject[typeName] = [];
    }

    if (typeName in whereObject) {
      return whereObject[typeName];
    }

    return null;
  };

  const render = function (x, y) {
    Object.entries(x).forEach(([key, value]) => {
      const context = typeParser(y, key);

      if (context && key in typeMapper) {
        context.push(typeMapper[key].action(value));
      } else if (!context) {
        y[key] = value;
      }
    });

    return Object.entries(y).reduce((all, [key, value]) => {
      all[key] = Array.isArray(value) ? value.join(" ") : value;
      return all;
    }, {});
  };

  const animate = function () {
    if (!using.isStartAnimation) {
      const fromObject = render(using.fromObject, {});
      const toObject = render(using.toObject, {});

      const { duration, easing, fill, direction, delay, iterations } = options;

      using.currentAnimate = element.animate([fromObject, toObject], {
        duration,
        easing,
        fill,
        direction,
        delay,
        iterations, // 0,1,2 or Infinite
      });

      onCompletedAction();
      onStatusAction();
      using.isStartAnimation = true;
    }
  };

  const returnObject = Object.freeze({
    from: function (options) {
      using.fromObject = options;
      return returnObject;
    },
    to: function (options) {
      using.toObject = options;
      return returnObject;
    },
    start: function () {
      animate();
      return { cancel: onCancelAction };
    },
    cancel: function () {
      onCancelAction();
      return returnObject;
    },
    onCompleted: function (callback) {
      if (callback && typeof callback !== "function") {
        console.warn("`onCompleted` callback should be a function.");
        return returnObject;
      }

      if (!using.onCompleted.callback) {
        using.onCompleted = {
          callback: callback || null,
        };
      }

      return returnObject;
    },
    onStatus: function (callback, duration) {
      if (!callback || typeof callback !== "function") {
        console.warn("`onStatus` callback should be a function.");
        return returnObject;
      }

      if (typeof duration !== "number" || duration <= 0) {
        duration = 100; // Default to 100ms if invalid or no duration provided
      }

      if (!using.onStatus.callback) {
        using.onStatus = {
          callback,
          duration,
        };
      }

      return returnObject;
    },
  });

  return returnObject;
};
