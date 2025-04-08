<template>
  <div>
    <div class="bar-ontainer">
      <div id="progress-bar">
        <div id="progress"></div>
        <div id="slider"></div>
      </div>
      <div class="frame-info">
        <span>start: <span id="start-frame">1200</span></span>
        <span>cur: <span id="current-frame">5200</span></span>
        <span>end: <span id="end-frame">5200</span></span>
      </div>
    </div>
    <div style="width: 100%; margin-top: 4.5em">
      <div class="row">
        <div
          class="col-md-8"
          id="game-time"
          style="margin: 0 auto; width: 100%"
        >
          <h2 style="text-align: center">
            <span id="game-time-content" style="color: white"></span>
          </h2>
        </div>
        <div class="col-md-4">
          <h2
            style="text-align: right; {% if mode == 'simulate' %} display: none {% endif %}"
          >
            <button id="play_button" type="button" class="btn btn-default">
              <strong style="font-size: 1.2em"
                ><i class="glyphicon glyphicon-play"></i> &nbsp;Play</strong
              >
            </button>

            <button id="pause_button" type="button" class="btn btn-default">
              <strong style="font-size: 1.2em"
                ><i class="glyphicon glyphicon-pause"></i> &nbsp;Pause</strong
              >
            </button>
          </h2>
        </div>
      </div>

      <br />
      <hr style="border-color: #999999" />
      <br />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
</script>

<style lang="scss" scoped>
.fixed-bottom-link {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #242425;
  text-align: center;
  padding: 10px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  text-decoration: none;
  color: #1a1a1a;
}

.bar-ontainer {
  width: 80%;
  margin: 20px auto;
  position: relative;
  height: 30px;
}

#progress-bar {
  background: rgba(88, 83, 83, 0.5);
  height: 4px;
  border-radius: 2px;
  position: relative;
  top: 13px;
  width: 100%;
}

#progress {
  background: rgba(88, 83, 83, 0.9);
  height: 100%;
  width: 100%;
  transition: width 0.1s;
}

/* Updated slider style to float over the progress bar */
#slider {
  position: absolute;
  z-index: 10;
  width: 16px;
  height: 16px;
  background: #fdfbfb;
  border-radius: 2px;
  top: 50%; /* vertically center the slider inside its parent */
  transform: translateY(-50%);
  left: calc(100% - 8px);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.frame-info {
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  padding: 0 5%;
}
</style>
