const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const line = new maptalks.LineString(
  [
    [-0.131049, 51.498568],
    [-0.107049, 51.498568],
  ],
  {
    arrowStyle: null, // arrow-style : now we only have classic
    arrowPlacement: "vertex-last", // arrow's placement: vertex-first, vertex-last, vertex-firstlast, point
    visible: true,
    editable: true,
    cursor: null,
    shadowBlur: 0,
    shadowColor: "black",
    draggable: false,
    dragShadow: false, // display a shadow during dragging
    drawOnAxis: null, // force dragging stick on a axis, can be: x, y
    symbol: {
      lineColor: "#1bbc9b",
      lineWidth: 3,
    },
  }
);

new maptalks.VectorLayer("vector", line).addTo(map);

startEdit();

function startEdit() {
  line.startEdit();
}

function endEdit() {
  line.endEdit();
}
