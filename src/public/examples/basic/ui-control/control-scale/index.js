const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  scaleControl: {
    position: "top-left",
    maxWidth: 100,
    metric: true,
    imperial: true,
  },
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const metric = new maptalks.control.Scale({
  position: "top-right",
  maxWidth: 150,
  metric: true,
  imperial: false,
});
map.addControl(metric);

const imperial = new maptalks.control.Scale({
  position: "bottom-right",
  maxWidth: 200,
  metric: false,
  imperial: true,
});
map.addControl(imperial);
