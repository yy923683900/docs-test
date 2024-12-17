const options = {
  position: "top-right",
  content: "My Control",
};

class MyControl extends maptalks.control.Control {
  buildOn(map) {
    const dom = maptalks.DomUtil.createEl("div", "my-control");
    dom.innerText = this.options["content"];
    return dom;
  }
}

MyControl.mergeOptions(options);

const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

const control = new MyControl({
  content: "Hello, MyControl!",
});
map.addControl(control);
