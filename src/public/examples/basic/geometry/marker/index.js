const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const point = new maptalks.Marker([-0.113049, 51.498568], {
  visible: true,
  editable: true,
  cursor: "pointer",
  shadowBlur: 0,
  shadowColor: "black",
  draggable: false,
  dragShadow: false, // display a shadow during dragging
  drawOnAxis: null, // force dragging stick on a axis, can be: x, y
  symbol: {
    textFaceName: "sans-serif",
    textName: "MapTalks",
    textFill: "#34495e",
    textHorizontalAlignment: "right",
    textSize: 40,
  },
});

new maptalks.VectorLayer("vector", point).addTo(map);
