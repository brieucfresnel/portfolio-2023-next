import {
  getCamera,
  getComposer,
  getControls,
  getRenderer,
  getScene,
  getStats,
} from "./init.js";

// animation params
const localData = {
  timestamp: 0,
  timeDiff: 0,
  frame: null,
};
const localFrameOpts = {
  data: localData,
};

const frameEvent = new MessageEvent("tick", localFrameOpts);

class TickManager extends EventTarget {
  constructor({ timestamp, timeDiff, frame } = localData) {
    super();

    this.timestamp = timestamp;
    this.timeDiff = timeDiff;
    this.frame = frame;
  }
  startLoop() {
    const composer = getComposer();
    const renderer = getRenderer();
    const scene = getScene();
    const camera = getCamera();
    const controls = getControls();
    const stats = getStats();

    if (!renderer) {
      throw new Error("Updating Frame Failed : Uninitialized Renderer");
    }

    let lastTimestamp = performance.now();

    const animate = (timestamp, frame) => {
      this.timestamp = timestamp ?? performance.now();
      this.timeDiff = timestamp - lastTimestamp;

      const timeDiffCapped = Math.min(Math.max(this.timeDiff, 0), 100);

      // performance tracker start

      if (controls) {
        controls.update();
      }

      composer.render();

      this.tick(timestamp, timeDiffCapped, frame);

      if (stats) {
        stats.update();
      }

      // performance tracker end
    };

    renderer.setAnimationLoop(animate);
  }
  tick(timestamp, timeDiff, frame) {
    localData.timestamp = timestamp;
    localData.frame = frame;
    localData.timeDiff = timeDiff;
    this.dispatchEvent(frameEvent);
  }
}

export default TickManager;
