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
      linePatternFile: "{res}/patterns/line-pattern.png",
      lineWidth: 20,
    },
  }
).addTo(layer);
