<template>
  <div ref="gameContainerRef"></div>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import Phaser from "phaser";
import characters from "../../api/characters";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const gameContainerRef = ref();
const config = ref();
const game = ref();
let player;
let cursors;
let isDragging = false;
let isDraggingmMap = false;
let startPointerPos = new Phaser.Math.Vector2();
let tile_width = 32;
let tile_height = 32;

let dragStartPos = null;
//Pixel threshold, exceeding which is considered dragging
const DRAG_THRESHOLD = 1;
onMounted(() => {
  config.value = {
    type: Phaser.AUTO,
    fps: {
      target: 30,
      forceSetTimeOut: true,
    },
    width: 800,
    height: 750,
    parent: gameContainerRef.value,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: {
      preload: preload,
      create: create,
      // update: update,
    },
    scale: { zoom: 0.9 },
  };
  game.value = new Phaser.Game(config.value);

  // Initializing the progress bar
  // progressBar.value = document.getElementById("progress-bar");
  // =======================
  // progress.value = document.getElementById("progress");
  // slider.value = document.getElementById("slider");
  // // event listener
  // slider.value?.addEventListener("mousedown", startDragging);
  // document?.addEventListener("mousemove", handleDragging);
  // document?.addEventListener("mouseup", stopDragging);
});
function handleDragging(e) {
  if (!isDragging) return;
  updateProgress(e.clientX);
}

function stopDragging() {
  isDragging = false;
}
function preload() {
  this.load.image(
    "blocks_1",
    "assets/the_ville/visuals/map_assets/blocks/blocks_1.png"
  );
  this.load.image(
    "walls",
    "assets/the_ville/visuals/map_assets/v1/Room_Builder_32x32.png"
  );
  this.load.image(
    "interiors_pt1",
    "assets/the_ville/visuals/map_assets/v1/interiors_pt1.png"
  );
  this.load.image(
    "interiors_pt2",
    "assets/the_ville/visuals/map_assets/v1/interiors_pt2.png"
  );
  this.load.image(
    "interiors_pt3",
    "assets/the_ville/visuals/map_assets/v1/interiors_pt3.png"
  );
  this.load.image(
    "interiors_pt4",
    "assets/the_ville/visuals/map_assets/v1/interiors_pt4.png"
  );
  this.load.image(
    "interiors_pt5",
    "assets/the_ville/visuals/map_assets/v1/interiors_pt5.png"
  );
  this.load.image(
    "CuteRPG_Field_B",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Field_B.png"
  );
  this.load.image(
    "CuteRPG_Field_C",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Field_C.png"
  );
  this.load.image(
    "CuteRPG_Harbor_C",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Harbor_C.png"
  );
  this.load.image(
    "CuteRPG_Village_B",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Village_B.png"
  );
  this.load.image(
    "CuteRPG_Forest_B",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Forest_B.png"
  );
  this.load.image(
    "CuteRPG_Desert_C",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Desert_C.png"
  );
  this.load.image(
    "CuteRPG_Mountains_B",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Mountains_B.png"
  );
  this.load.image(
    "CuteRPG_Desert_B",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Desert_B.png"
  );
  this.load.image(
    "CuteRPG_Forest_C",
    "assets/the_ville/visuals/map_assets/cute_rpg_word_VXAce/tilesets/CuteRPG_Forest_C.png"
  );
  this.load.image(
    "CityRoad",
    "assets/the_ville/visuals/map_assets/Road_test1024.png"
  );
  this.load.image(
    "BasketballPlace",
    "assets/the_ville/visuals/map_assets/basketball_place.png"
  );
  this.load.image(
    "CityObject",
    "assets/the_ville/visuals/map_assets/city_extension_prev.png"
  );
  this.load.image(
    "Waters",
    "assets/the_ville/visuals/map_assets/CuteRPG_Mountains_A1.png"
  );
  this.load.image(
    "Trees",
    "assets/the_ville/visuals/map_assets/height96_trees_mega_pack_cc_by_3_0.png"
  );

  // Joon: This is the export json file you get from Tiled.
  this.load.tilemapTiledJSON(
    "map",
    "assets/the_ville/visuals/the_ville_jan7-2.json"
  );
  this.load.atlas(
    "atlas",
    "img/atlas.png",
    "assets/characters/town/atlas.json"
  );
}
function create() {
  const map = this.make.tilemap({ key: "map" });
  characters.getAllRoles().then((res) => {
    let data = res.data?.data;
    if (data) {
      data.forEach((item) => {
        const position = item.house.split(",");
        if (position.length === 2) {
          let conText = this.add.graphics();
          let setMapX = position[0];
          let setMapY = position[1];
          conText.fillStyle(0xff0000, 0.5);
          conText.fillRect(
            setMapX * tile_width,
            setMapY * tile_height,
            tile_width,
            tile_height
          );
        }
      });
    }
  });
  // console.log(map, "addTilesetImage");
  // Joon: Logging map is really helpful for debugging here:
  //       console.log(map);

  // The first parameter is the name you gave to the tileset in Tiled and then
  // the key of the tileset image in Phaser's cache (i.e. the name you used in
  // preload)
  // Joon: for the first parameter here, really take a look at the
  //       console.log(map) output. You need to make sure that the name
  //       matches.
  const collisions = map.addTilesetImage("blocks", "blocks_1");
  const walls = map.addTilesetImage("Room_Builder_32x32", "walls");
  const interiors_pt1 = map.addTilesetImage("interiors_pt1", "interiors_pt1");
  const interiors_pt2 = map.addTilesetImage("interiors_pt2", "interiors_pt2");
  const interiors_pt3 = map.addTilesetImage("interiors_pt3", "interiors_pt3");
  const interiors_pt4 = map.addTilesetImage("interiors_pt4", "interiors_pt4");
  const interiors_pt5 = map.addTilesetImage("interiors_pt5", "interiors_pt5");
  const CuteRPG_Field_B = map.addTilesetImage(
    "CuteRPG_Field_B",
    "CuteRPG_Field_B"
  );
  const CuteRPG_Field_C = map.addTilesetImage(
    "CuteRPG_Field_C",
    "CuteRPG_Field_C"
  );
  const CuteRPG_Harbor_C = map.addTilesetImage(
    "CuteRPG_Harbor_C",
    "CuteRPG_Harbor_C"
  );
  const CuteRPG_Village_B = map.addTilesetImage(
    "CuteRPG_Village_B",
    "CuteRPG_Village_B"
  );
  const CuteRPG_Forest_B = map.addTilesetImage(
    "CuteRPG_Forest_B",
    "CuteRPG_Forest_B"
  );
  const CuteRPG_Desert_C = map.addTilesetImage(
    "CuteRPG_Desert_C",
    "CuteRPG_Desert_C"
  );
  const CuteRPG_Mountains_B = map.addTilesetImage(
    "CuteRPG_Mountains_B",
    "CuteRPG_Mountains_B"
  );
  const CuteRPG_Desert_B = map.addTilesetImage(
    "CuteRPG_Desert_B",
    "CuteRPG_Desert_B"
  );
  const CuteRPG_Forest_C = map.addTilesetImage(
    "CuteRPG_Forest_C",
    "CuteRPG_Forest_C"
  );
  const CityRoad = map.addTilesetImage("CityRoad", "CityRoad");
  const Trees = map.addTilesetImage("Trees", "Trees");
  const BasketballPlace = map.addTilesetImage(
    "BasketballPlace",
    "BasketballPlace"
  );
  const CityObject = map.addTilesetImage("CityObject", "CityObject");
  const Waters = map.addTilesetImage("Waters", "Waters");

  // The first parameter is the layer name (or index) taken from Tiled, the
  // second parameter is the tileset you set above, and the final two
  // parameters are the x, y coordinate.
  // Joon: The "layer name" that comes as the first parameter value
  //       literally is taken from our Tiled layer name. So to find out what
  //       they are; you actually need to open up tiled and see how you
  //       named things there.
  let tileset_group_1 = [
    CuteRPG_Field_B,
    CuteRPG_Field_C,
    CuteRPG_Harbor_C,
    CuteRPG_Village_B,
    CuteRPG_Forest_B,
    CuteRPG_Desert_C,
    CuteRPG_Mountains_B,
    CuteRPG_Desert_B,
    CuteRPG_Forest_C,
    interiors_pt1,
    interiors_pt2,
    interiors_pt3,
    interiors_pt4,
    interiors_pt5,
    walls,
    CityRoad,
    Trees,
    BasketballPlace,
    CityObject,
    Waters,
  ];
  const bottomGroundLayer = map.createLayer(
    "Bottom Ground",
    tileset_group_1,
    0,
    0
  );
  const exteriorGroundLayer = map.createLayer(
    "Exterior Ground",
    tileset_group_1,
    0,
    0
  );
  const cityRoadLayer = map.createLayer("City Road", tileset_group_1, 0, 0);
  const exteriorDecorationL1Layer = map.createLayer(
    "Exterior Decoration L1",
    tileset_group_1,
    0,
    0
  );
  const exteriorDecorationL2Layer = map.createLayer(
    "Exterior Decoration L2",
    tileset_group_1,
    0,
    0
  );
  const exteriorDecorationL3Layer = map.createLayer(
    "Exterior Decoration L3",
    tileset_group_1,
    0,
    0
  );
  const interiorGroundLayer = map.createLayer(
    "Interior Ground",
    tileset_group_1,
    0,
    0
  );
  const wallLayer = map.createLayer("Wall", [CuteRPG_Field_C, walls], 0, 0);
  const interiorFurnitureL1Layer = map.createLayer(
    "Interior Furniture L1",
    tileset_group_1,
    0,
    0
  );
  const interiorFurnitureL2Layer = map.createLayer(
    "Interior Furniture L2",
    tileset_group_1,
    0,
    0
  );
  const interiorFurnitureL3Layer = map.createLayer(
    "Interior Furniture L3",
    tileset_group_1,
    0,
    0
  );
  const interiorFurnitureL4Layer = map.createLayer(
    "Interior Furniture L4",
    tileset_group_1,
    0,
    0
  );
  const foregroundL1Layer = map.createLayer(
    "Foreground L1",
    tileset_group_1,
    0,
    0
  );
  const foregroundL2Layer = map.createLayer(
    "Foreground L2",
    tileset_group_1,
    0,
    0
  );
  foregroundL1Layer && foregroundL1Layer.setDepth(2);
  foregroundL2Layer && foregroundL2Layer.setDepth(2);

  const collisionsLayer = map.createLayer("Collisions", collisions, 0, 0);
  // const groundLayer = map.createLayer("Ground", walls, 0, 0);
  // const indoorGroundLayer = map.createLayer("Indoor Ground", walls, 0, 0);
  // const wallsLayer = map.createLayer("Walls", walls, 0, 0);
  // const interiorsLayer = map.createLayer("Furnitures", interiors, 0, 0);
  // const builtInLayer = map.createLayer("Built-ins", interiors, 0, 0);
  // const appliancesLayer = map.createLayer("Appliances", interiors, 0, 0);
  // const foregroundLayer = map.createLayer("Foreground", interiors, 0, 0);

  // Joon : This is where you want to create a custom field for the tileset
  //        in Tiled. Take a look at this guy's tutorial:
  //        https://www.youtube.com/watch?v=MR2CvWxOEsw&ab_channel=MattWilber
  collisionsLayer && collisionsLayer.setCollisionByProperty({ collide: true });
  // By default, everything gets depth sorted on the screen in the order we
  // created things. Here, we want the "Above Player" layer to sit on top of
  // the player, so we explicitly give it a depth. Higher depths will sit on
  // top of lower depth objects.
  // Collisions layer should get a negative depth since we do not want to see
  // it.
  collisionsLayer && collisionsLayer.setDepth(-1);
  // foregroundL1Layer.setDepth(2);
  // foregroundL1Layer.setDepth(2);

  // *** SET UP CAMERA ***
  // "player" is to be set as the center of mass for our "camera." We
  // basically create a game character sprite as we would for our personas
  // but we move it to depth -1 and let it pass through the collision map;
  // that is, do not have the following line:
  // this.physics.add.collider(player, collisionsLayer);
  // OLD NOTE: Create a sprite with physics enabled via the physics system.
  // The image  used for the sprite has a bit of whitespace, so I'm using
  // setSize & setOffset to control the size of the player's body.
  player = this.physics.add
    .sprite(1000, 400, "player")
    .setVelocity(0, 0)
    .setSize(30, 40)
    .setOffset(0, 0);
  player.setDepth(-1);
  this.physics.world.enable(player);
  player.body.setDrag(1, 1);

  // Setting up the camera.
  const camera = this.cameras.main;
  camera.setZoom(0.5);
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  cursors = this.input.keyboard.createCursorKeys();

  // *** SET UP PERSONAS ***
  // We start by creating the game sprite objects.

  // Create the player's walking animations from the texture atlas. These are
  // stored in the global animation manager so any sprite can access them.

  // set the view zoom
  const minZoom = 0.3; // minimal scaling
  const maxZoom = 3; // maximum scale
  // Play audio normally

  this.input.keyboard.on("keydown-Z", () => {
    const newZoom = this.cameras.main.zoom * 1.1;
    this.cameras.main.setZoom(Phaser.Math.Clamp(newZoom, minZoom, maxZoom));
  });

  this.input.keyboard.on("keydown-X", () => {
    const newZoom = this.cameras.main.zoom * 0.9;
    this.cameras.main.setZoom(Phaser.Math.Clamp(newZoom, minZoom, maxZoom));
  });

  const conText = this.add.graphics();
  function updateSelection(x, y, selectionMarker) {
    const MapX = x - tile_width / 2;
    const MapY = y - tile_height / 2;
    // Clear old graphics
    selectionMarker.clear();

    // Draw a red solid rectangle
    let setMapX = Math.floor(x / tile_width);
    let setMapY = Math.floor(y / tile_height);
    selectionMarker.fillStyle(0xff0000, 0.5);
    selectionMarker.fillRect(
      setMapX * tile_width,
      setMapY * tile_height,
      tile_width,
      tile_height
    );
    emit("update:modelValue", [setMapX, setMapY]);
  }
  // Input event binding
  this.input.on("pointerdown", (pointer) => {
    dragStartPos = { x: pointer.worldX, y: pointer.worldY };

    if (pointer.leftButtonDown()) {
      isDraggingmMap = true;
      startPointerPos.set(pointer.x, pointer.y);
    }
  });

  this.input.on("pointermove", (pointer) => {
    // if (isDraggingmMap && pointer.leftButtonDown()) {
    //   // Calculate camera offset
    //   let deltaX = startPointerPos.x - pointer.x;
    //   let deltaY = startPointerPos.y - pointer.y;
    //   player.body.setVelocity(deltaX * 5, deltaY * 5);
    // }
    if (pointer.isDown && dragStartPos) {
      // console.log(1);
      const distance = Phaser.Math.Distance.Between(
        dragStartPos.x,
        dragStartPos.y,
        pointer.worldX,
        pointer.worldY
      );
      if (distance >= DRAG_THRESHOLD) {
        // this.cameras.main.scrollX -= pointer.x - pointer.prevPosition.x;
        // this.cameras.main.scrollY -= pointer.y - pointer.prevPosition.y;
        let deltaX = startPointerPos.x - pointer.x;
        let deltaY = startPointerPos.y - pointer.y;
        // console.log(2, { deltaX, deltaY });
        player.body.setVelocity(deltaX * 2, deltaY * 2);
      }
    }
  });

  this.input.on("pointerup", (pointer) => {
    // isDraggingmMap = false;
    if (!dragStartPos) return;

    // Calculate pointer movement distance
    const distance = Phaser.Math.Distance.Between(
      dragStartPos.x,
      dragStartPos.y,
      pointer.worldX,
      pointer.worldY
    );
    // If the movement distance is less than the threshold,
    // it is considered as a click to select
    if (distance < DRAG_THRESHOLD) {
      const worldX = pointer.worldX + this.cameras.main.scrollX;
      const worldY = pointer.worldY + this.cameras.main.scrollY;
      updateSelection(pointer.worldX, pointer.worldY, conText);
    }

    dragStartPos = null;
  });
  this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => {
    // Get the mouse world coordinates before zooming in and out
    // Calculate the new zoom level (deltaY>0, scroll down)
    const newZoom = Phaser.Math.Clamp(
      this.cameras.main.zoom - deltaY * 0.001,
      0.5, // minimum-scale
      3 // Maximum Zoom
    );
    // Set a new zoom level
    this.cameras.main.setZoom(newZoom);
  });
}
</script>


<style lang='scss' scoped>
</style>