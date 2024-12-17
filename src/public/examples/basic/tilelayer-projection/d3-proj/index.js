// Versor Dragging projection from D3
// https://bl.ocks.org/mbostock/7ea1dde508cec6d2d95306f92642bc42
const projection = d3.geoOrthographic().scale(148).precision(0.1);

// convert to a maptalks projection object
const proj = {
  project: function (c) {
    const pc = projection([c.x, c.y]);
    return new maptalks.Coordinate(pc[0], pc[1]);
  },
  unproject: function (pc) {
    const c = projection.invert([pc.x, pc.y]);
    if (!c || isNaN(c[0]) || isNaN(c[1])) {
      return null;
    }
    return new maptalks.Coordinate(c);
  },
};

const min = proj.project(new maptalks.Coordinate(-180, -90)),
  max = proj.project(new maptalks.Coordinate(180, 90)),
  fullExtent = {
    top: max.y,
    left: min.x,
    right: max.x,
    bottom: min.y,
  };

d3.json("{res}/geojson/world-50m.json", function (error, world) {
  if (error) throw error;
  // initialize map with a customized projection
  const map = new maptalks.Map("map", {
    center: [0, 0],
    centerCross: true,
    zoom: 2,
    spatialReference: {
      projection: proj,
      resolutions: (function () {
        const resolutions = [];
        for (let i = 0; i < 10; i++) {
          resolutions[i] = 4 / Math.pow(2, i);
        }
        return resolutions;
      })(),
      fullExtent: fullExtent,
    },
  });
  const featureCollection = topojson.feature(world, world.objects.countries),
    geometries = maptalks.GeoJSON.toGeometry(featureCollection);
  const symbol = {
    lineColor: "#fff",
    lineWidth: 0.5,
    polygonOpacity: 1,
    polygonFill: "#747474",
  };
  new maptalks.VectorLayer("v", geometries, {
    geometryEvents: false,
    enableSimplify: false,
  })
    .forEach(function (geo) {
      geo.setSymbol(symbol);
    })
    .addTo(map);
});
