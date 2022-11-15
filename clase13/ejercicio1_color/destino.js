"use strict";

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var Color = /*#__PURE__*/_createClass(function Color() {
  var _this = this;
  _classCallCheck(this, Color);
  _defineProperty(this, "generateColor", function () {
    var r = Math.floor(Math.random() * 256);
    _this.color.r = r;
    var g = Math.floor(Math.random() * 256);
    _this.color.g = g;
    var b = Math.floor(Math.random() * 256);
    _this.color.b = b;
  });
  _defineProperty(this, "getColor", function () {
    return _this.color;
  });
  _defineProperty(this, "printColor", function () {
    console.log("R: ".concat(_this.color.r, ", G: ").concat(_this.color.g, ", B: ").concat(_this.color.b));
  });
  this.color = {
    r: 0,
    g: 0,
    b: 0
  };
});
var color = new Color();
color.generateColor();
color.printColor();
