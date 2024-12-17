const map = new maptalks.Map("map", {
  center: [-74.01252272617671, 40.70709931736744],
  zoom: 14,
  pitch: 74,
  bearing: 2.4,
  lights: {
    ambient: {
      resource: {
        url: {
          front: "{res}/hdr/gradient/front.png",
          back: "{res}/hdr/gradient/back.png",
          left: "{res}/hdr/gradient/left.png",
          right: "{res}/hdr/gradient/right.png",
          top: "{res}/hdr/gradient/top.png",
          bottom: "{res}/hdr/gradient/bottom.png",
        },
        prefilterCubeSize: 32
      },
      exposure: 1,
      hsv: [0, 1, -0.042],
      orientation: 0,
    },
    directional: {
      direction: [-0.1, 1, -1],
      color: [1, 1, 1],
    },
  },
});

/**start**/
const symbol = {
  url: "{res}/gltf/alien/alien.gltf",
  modelHeight: 480,
  rotationZ: 180,
};
const position = map.getCenter();
const data = [];
for (let i = -2; i < 3; i++) {
  for (let j = -2; j < 3; j++) {
    data.push({
      coordinates: position.add(i * 0.01, j * 0.01),
    });
  }
}
const gltfLayer = new maptalks.GLTFLayer("gltf");
const multiGLTFMarker = new maptalks.MultiGLTFMarker(data, {
  symbol,
}).addTo(gltfLayer);

multiGLTFMarker.on("click", (e) => {
  document.getElementById("info").innerHTML = "点击模型的id:" + e.pickingId;
});

multiGLTFMarker.on("mousemove", (e) => {
  const index = e.target.getIndexByPickingId(e.pickingId);
  multiGLTFMarker.updateData(index, "color", [0.0, 0.2, 0.8, 1.0]);
});

multiGLTFMarker.on("mouseleave", (e) => {
  const index = e.target.getIndexByPickingId(e.pickingId);
  multiGLTFMarker.updateData(index, "color", [1.0, 1.0, 1.0, 1.0]);
});

/**end**/

document.getElementById("info").innerHTML = "请用鼠标悬停和点击模型。";

const groupLayer = new maptalks.GroupGLLayer("group", [gltfLayer], {
  sceneConfig: {
    environment: {
      enable: true,
      mode: 1,
      level: 0,
      brightness: 0,
    },
    ground: {
      enable: true,
      renderPlugin: {
        type: "lit",
      },
      symbol: {
        polygonFill: [0.54, 0.54, 0.54, 1],
        ssr: true,
        material: {
          baseColorTexture: "{res}/textures/rubber_roughness.png",
          baseColorFactor: [0.3450981, 0.3372549, 0.2117647, 1],
          hsv: [-0.468, 0, -0.128],
          baseColorIntensity: 1.372,
          contrast: 1.372,
          roughnessFactor: 1,
          metallicFactor: 0,
          normalTexture: "{res}/textures/rubber_roughness.png",
          uvScale: [0.09, 0.09],
          normalMapFactor: 0.68,
          emitColorFactor: 1.11,
          noiseTexture: "{res}/textures/noise.png",
        },
      },
    },
  },
}).addTo(map);
