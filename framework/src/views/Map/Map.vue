<template>
  <div>
    <button @click="startGame">Start Game</button>
    <div ref="gameContainer"></div>
  </div>
</template>

<script>
import Phaser from "phaser";

export default {
  methods: {
    startGame() {
      const config = {
        type: Phaser.AUTO,
        parent: this.$refs.gameContainer,
        audio: {
          disableWebAudio: false, // 确保启用 Web Audio
        },
        scene: {
          preload() {
            this.load.audio("bgm", "assets/audio/background.mp3");
          },
          create() {
            this.sound.play("bgm"); // 此时可以正常播放
          },
        },
      };
      new Phaser.Game(config);
    },
  },
};
</script>
