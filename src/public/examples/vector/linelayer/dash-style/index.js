const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const lineLayer = new maptalks.LineStringLayer("linelayer");
const line = new maptalks.LineString(
  [
    map.getCenter().sub(0.1, 0),
    map.getCenter().add(0.1, 0),
    map.getCenter().add(0.1, -0.1),
  ],
  {
    symbol: {
      lineColor: "#000",
      lineWidth: 6,
      lineJoin: "round", // miter, round, bevel
      lineCap: "round", // butt, round, square
      lineDasharray: [20, 15, 15],
      lineDashColor: [0.8, 0.5, 0.2, 0],
      "lineOpacity ": 1,
    },
  }
).addTo(lineLayer);

const groupLayer = new maptalks.GroupGLLayer("group", [lineLayer]).addTo(map);
