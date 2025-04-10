<template>
  <div class="text-white">
    <div class="dialog-container" id="gameDialog" style="display: none">
      <div class="dialog-header">
        <a
          style="margin-left: 5px; margin-top: 2px; color: #c9a769"
          @click="props.displayMainBox()"
        >
          ◀
        </a>
      </div>
      <div class="header-section">
        <div class="character-name">
          &nbsp;<span id="character_name"></span
          ><span id="character_detail"></span>
        </div>
        <div class="location-info">
          <i class="geo-alt-fill"></i><span>Position:&nbsp;</span
          ><span id="character_pos"></span>
        </div>
        <div
          class="user_action"
          style="display: inline-block; height: 100px; overflow-y: auto"
        >
          Action:&nbsp;<span id="character_atcion"></span>
        </div>
      </div>

      <div class="tab-container">
        <div class="tabs">
          <button
            data-tab="schedule"
            class="tab-button active"
            @click="props.switchTab('schedule')"
          >
            Daily
          </button>
          <button
            data-tab="dialogue"
            class="tab-button"
            @click="props.switchTab('dialogue')"
          >
            Chat
          </button>
          <button
            data-tab="attributes"
            class="tab-button"
            @click="props.switchTab('attributes')"
          >
            Character
          </button>
        </div>
      </div>

      <div id="schedule" class="tab-content" style="display: none">
        <div class="schedule-content" id="character_schedule">
          <p>None</p>
        </div>
      </div>

      <div id="dialogue" class="tab-content">
        <div class="chat-content">
          <div
            class="user_action"
            style="display: inline-block; color: #ebe7e7"
          >
            Chat:
          </div>
          <div class="user_action" style="overflow-y: auto; height: 255px">
            <p id="dialog_content">None</p>
          </div>
        </div>
        <div class="input-section">
          <input
            type="text"
            class="chat-input"
            placeholder="input chat content..."
          />
          <button
            style="
              background-color: #c9a769;
              color: #1a2a1a;
              padding: 8px 4px;
              border: none;
              border-radius: 4px;
              margin-left: 10px;
            "
            @click="alert('Sorry, It will be ok as soon as possible.')"
          >
            Send
          </button>
        </div>
      </div>

      <div id="attributes" class="tab-content" style="display: none">
        <div class="schedule-content" id="character_info">
          <p>None</p>
        </div>
      </div>
    </div>

    <div class="dialog-container" id="main_box">
      <div class="header-section">
        <div class="character-info" style="display: flex">
          <div v-for="keyPairs in personNames" :key="keyPairs">
            <div
              :id="'avatar_' + keyPairs['value']"
              style="
                display: inline-block;
                min-width: 100px;
                text-align: center;
                margin-left: 10px;
              "
              @click="props.displayGameDialog(keyPairs['key'])"
            >
              <div
                style="
                  text-align: center;
                  display: block;
                  height: 24px;
                  overflow: hidden;
                "
              >
                {{ keyPairs["key"] }}
              </div>
              <div style="margin: 0 auto">
                <img
                  class="media-object"
                  :src="
                    'assets/characters/town/profile/' +
                    keyPairs['value'] +
                    '.png'
                  "
                  style="width: 2em"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="story-content">
        <div style="display: inline; color: #ebe7e7">Story:</div>
        <div id="world_event" style="overflow-y: auto; max-height: 525px">
          None
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
const props = defineProps({
  personNames: {
    type: Array,
    required: true,
  },
  displayMainBox: {
    type: Function,
  },
  displayGameDialog: {
    type: Function,
  },
  switchTab: {
    type: Function,
  },
});

const personNames = computed(() => {
  let res = [];
  for (let key in props.personNames) {
    let value = key.toLowerCase();
    value = key.replace(" ", "_");

    res.push({ key, value });
  }

  return res;
});
</script>

<style lang="scss" scoped>
.dialog-container {
  width: 60%;
  height: 720px;
  background: linear-gradient(145deg, #0d1f0d 30%, #1a2a1a 100%);
  border: 2px solid #c9a769;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(201, 167, 105, 0.3);
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  margin: 20px;
}

.header-section {
  padding: 16px;
  border-bottom: 1px solid #c9a76933;
  background: linear-gradient(to right, #1a2a1a, #0d1f0d);
}
.character-name {
  color: #c9a769;
  font-size: 18px;
  margin-bottom: 8px;
}

.character-info {
  display: flex;
  overflow-x: auto;
  height: 100px;
  white-space: nowrap;
  color: #c9a769;
  font-size: 18px;
  margin-bottom: 8px;
}

.location-info,
.user_action {
  color: #8d9e8d;
  font-size: 14px;
  margin-bottom: 4px;
}

.chat-content {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
}

.story-content {
  flex: 1;
  padding: 16px;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
  height: 400px;
}
.input-section {
  padding: 16px;
  border-top: 1px solid #c9a76933;
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 12px;
  background: #0d1f0d;
  border: 1px solid #c9a769;
  border-radius: 4px;
  color: #c9a769;
  font-family: inherit;
}

.chat-input:focus {
  outline: none;
  border-color: #9c7d4a;
  box-shadow: 0 0 8px rgba(201, 167, 105, 0.3);
}

.input-section button {
  background-color: #c9a769;
  color: #1a2a1a;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-section button:hover {
  background-color: #9c7d4a;
}

.tab-container {
  height: 30px;
  background-color: #1a2a1a;
  padding: 2px;
  border-bottom: 1px solid #c9a76933;
}

.tabs {
  display: flex;
  justify-content: space-around;
}

.tab-button {
  background-color: #1a2a1a;
  color: #c9a769;
  border: none;
  padding: 1px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 2px;
}

.tab-button.active {
  background-color: #c9a769;
  color: #1a2a1a;
}

.tab-content {
  display: none;
  padding: 16px;
  background: rgba(13, 31, 13, 0.9);
  color: #8d9e8d;
}

.tab-content.active {
  display: block;
}

.schedule-content {
  overflow-y: auto;
  max-height: 390px;
}
</style>
