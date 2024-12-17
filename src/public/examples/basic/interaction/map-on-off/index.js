const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

function dragOn() {
  map.config("draggable", true);
}
function dragOff() {
  map.config("draggable", false);
}
function zoomOn() {
  map.config("zoomable", true);
}
function zoomOff() {
  map.config("zoomable", false);
}
function scrollOn() {
  map.config("scrollWheelZoom", true);
}
function scrollOff() {
  map.config("scrollWheelZoom", false);
}
function touchZoomOn() {
  map.config("touchZoom", true);
}
function touchZoomOff() {
  map.config("touchZoom", false);
}
function dblClickOn() {
  map.config("doubleClickZoom", true);
}
function dblClickOff() {
  map.config("doubleClickZoom", false);
}

const items = [
  ["Drag", dragOn, dragOff],
  ["Zoom", zoomOn, zoomOff],
  ["ScrollWheel", scrollOn, scrollOff],
  ["TouchZoom", touchZoomOn, touchZoomOff],
  ["DblClick", dblClickOn, dblClickOff],
].map(function (value) {
  return {
    item: value[0],
    children: [
      {
        item: "ON",
        click: value[1],
      },
      {
        item: "OFF",
        click: value[2],
      },
    ],
  };
});

new maptalks.control.Toolbar({
  items: items,
}).addTo(map);
