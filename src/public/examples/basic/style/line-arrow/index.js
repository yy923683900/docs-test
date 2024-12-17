const map = new maptalks.Map("map", {
  center: [-0.113049, 51.49856],
  zoom: 10,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const layer = new maptalks.VectorLayer("vector").addTo(map);

const line = new maptalks.LineString(
  [
    map.getCenter().sub(0.1, 0),
    map.getCenter().add(0.1, 0),
    map.getCenter().add(0.1, -0.1),
  ],
  {
    arrowStyle: "classic", // we only have one arrow style now
    arrowPlacement: "vertex-firstlast", // vertex-first, vertex-last, vertex-firstlast, point
    symbol: {
      lineColor: "#1bbc9b",
      lineWidth: 8,
    },
  }
).addTo(layer);
