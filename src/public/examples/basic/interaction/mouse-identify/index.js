const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  attribution: true,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const layer = new maptalks.VectorLayer("v").addTo(map);

map.on("click", function (e) {
  // reset colors
  layer.forEach(function (g) {
    g.updateSymbol({
      markerFill: "#0e595e",
    });
  });
  // identify
  map.identify(
    {
      coordinate: e.coordinate,
      layers: [layer],
    },
    function (geos) {
      if (geos.length === 0) {
        return;
      }
      geos.forEach(function (g) {
        g.updateSymbol({
          markerFill: "#f00",
        });
      });
    }
  );
});

// prepare data
const center = map.getCenter(),
  width = 0.055,
  height = 0.03,
  markers = [];
for (let i = 65; i <= 90; i++) {
  const x = center.x + (Math.random() - 0.5) * width;
  const y = center.y + (Math.random() - 0.5) * height;
  markers.push(
    new maptalks.Marker([x, y], {
      symbol: {
        textName: String.fromCharCode(i),
        textSize: 30,
        textFill: "White",
        markerType: "ellipse",
        markerFill: "#0e595e",
        markerFillOpacity: 0.4,
        markerLineWidth: 2,
        markerLineColor: "white",
        markerWidth: 70,
        markerHeight: 70,
      },
    })
  );
}
layer.addGeometry(markers);
