const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const canvasLayer = new maptalks.CanvasLayer("c", {
  forceRenderOnMoving: true,
  forceRenderOnZooming: true,
});

canvasLayer.prepareToDraw = function (/* context */) {
  return ["foo", "bar"];
};

// param1 and param2 are prepareToDraw's return values.
canvasLayer.draw = function (context, view, param1, param2) {
  const size = map.getSize();
  const str = param1 + "," + param2;
  context.fillStyle = "#f00";
  context.font = "bolder 50px sans-serif";
  const len = context.measureText(str);
  context.fillText(str, size.width / 2 - len.width / 2, size.height / 2);
  this.completeRender();
};

//draw when map is interacting
canvasLayer.drawOnInteracting = function (context, view, param1, param2) {
  this.draw(context, view, param1, param2);
};

map.addLayer(canvasLayer);
