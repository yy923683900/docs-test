const map = new maptalks.Map("map", {
  center: [-0.113049, 51.49856],
  zoom: 12,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const layer = new maptalks.VectorLayer("vector").addTo(map);

const line = new maptalks.LineString(
  [map.getCenter().sub(0.1, 0), map.getCenter().add(0.1, 0)],
  {
    symbol: {
      linePatternFile: "{res}/patterns/pattern.png",
      linePatternDx: 0,
      lineWidth: 10,
    },
  }
).addTo(layer);

line.animate(
  {
    symbol: {
      // 20 is the width of pattern.png to ensure seamless animation
      linePatternDx: 20,
    },
  },
  {
    repeat: true,
  }
);
