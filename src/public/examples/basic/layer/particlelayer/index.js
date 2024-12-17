const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
  layers: [new maptalks.VectorLayer("v")],
});

// An animated particle circle
const particles = new maptalks.ParticleLayer("c", {
  forceRenderOnMoving: true,
});

const center = map.getCenter();
// circle's radius in meters
const radius = 1000;

particles.getParticles = function (t) {
  const point = map.coordinateToContainerPoint(center);
  // particle's angle at current time
  const angle = (((t / 16) % 360) * Math.PI) / 180;
  // convert distance in meter to pixel length
  const pxLen = map.distanceToPixel(radius, radius);
  const r = pxLen.width;
  // caculate pixel offset from circle's center
  const x = r * Math.cos(angle),
    y = r * Math.sin(angle);
  return [
    {
      point: point.add(x, y),
      r: 4,
      color: "rgb(135,196,240)",
    },
  ];
};

map.addLayer(particles);

new maptalks.Marker(center, {
  symbol: {
    markerType: "cross",
    markerWidth: 10,
    markerHeight: 10,
    markerLineWidth: 2,
  },
}).addTo(map.getLayer("v"));

new maptalks.Circle(center, 1000, {
  symbol: {
    lineColor: "#fff",
    lineWidth: 6,
    lineOpacity: 0.2,
    polygonOpacity: 0,
  },
}).addTo(map.getLayer("v"));
