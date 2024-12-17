const layerOrder = ["earth", "landuse", "water", "roads", "building"];
// draw mapzen's geojson vector tile with CanvasTileLayer
const canvasTile = new maptalks.CanvasTileLayer("tile", {
  urlTemplate:
    "https://tile.mapzen.com/mapzen/vector/v1/all/{z}/{x}/{y}.json?api_key=mapzen-cGRKZj",
  attribution:
    '&copy; <a href="https://mapzen.com/" target="_blank">mapzen</a>',
});
canvasTile.drawTile = function (canvas, tileContext, onComplete) {
  maptalks.Ajax.getJSON(tileContext.url, function (err, data) {
    if (err) {
      throw err;
    }
    const layers = [];
    const loaded = 0;
    function onLayerLoaded() {
      loaded++;
      if (loaded === layers.length) {
        onComplete(null);
      }
    }
    const mapzenStyle = getMapZenStyle();
    // prepare a VectorLayer per mapzen's layer
    for (let i = 0, l = layerOrder.length; i < l; i++) {
      const name = layerOrder[i];
      if (!data[name]) {
        continue;
      }
      const style = mapzenStyle[name];
      layers.push(
        new maptalks.VectorLayer(
          name,
          maptalks.GeoJSON.toGeometry(data[name]),
          {
            style: style,
            enableSimplify: false,
            geometryEvents: false,
          }
        ).on("layerload", onLayerLoaded)
      );
    }
    // create a map instance on tile's canvas
    new maptalks.Map(canvas, {
      center: tileContext.center,
      zoom: tileContext.z,
      layers: layers,
    });
  });
};
const map = new maptalks.Map("map", {
  center: [-122.12258202067433, 38.080679835385574],
  zoom: 9,
  centerCross: true,
  baseLayer: canvasTile,
});

function getMapZenStyle() {
  return {
    roads: [
      {
        filter: ["==", "kind", "highway"],
        symbol: [
          {
            lineColor: "grey",
            lineWidth: 7,
          },
          {
            lineColor: "#cc6666",
            lineWidth: 4,
          },
        ],
      },
      {
        filter: ["==", "kind", "minor_road"],
        symbol: {
          lineColor: "lightgrey",
          lineWidth: 3,
        },
      },
      {
        filter: true,
        symbol: {
          lineColor: "lightgrey",
          lineWidth: 2,
        },
      },
    ],

    buildings: [
      {
        filter: true,
        symbol: {
          lineColor: "#000",
          polygonFill: "#fff",
        },
      },
    ],

    water: [
      {
        filter: ["==", "$type", "Point"],
        symbol: {
          markerOpacity: 0,
          markerType: "ellipse",
          markerFill: "#88bbee",
          markerWidth: 4,
          markerHeight: 4,
        },
      },

      {
        filter: true,
        symbol: {
          lineColor: "#88bbee",
          polygonFill: "#88bbee",
        },
      },
    ],

    earth: [
      {
        filter: ["==", "$type", "Point"],
        symbol: {
          markerOpacity: 0,
          markerType: "ellipse",
          markerFill: "#ddeeee",
          markerWidth: 4,
          markerHeight: 4,
        },
      },
      {
        filter: true,
        symbol: {
          lineColor: "#ddeeee",
          polygonFill: "#ddeeee",
        },
      },
    ],

    landuse: [
      {
        filter: ["==", "$type", "Point"],
        symbol: {
          markerOpacity: 0,
          markerType: "ellipse",
          markerFill: "#aaffaa",
          markerWidth: 4,
          markerHeight: 4,
        },
      },
      {
        filter: true,
        symbol: {
          lineColor: "#aaffaa",
          polygonFill: "#aaffaa",
        },
      },
    ],
  };
}
