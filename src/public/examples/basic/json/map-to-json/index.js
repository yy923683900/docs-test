const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
  layers: [
    new maptalks.VectorLayer("v", [
      new maptalks.Marker([-0.113049, 51.498568]),
    ]),
  ],
});

const mapJSON = map.toJSON();

document.getElementById("json").innerHTML = JSON.stringify(mapJSON);
