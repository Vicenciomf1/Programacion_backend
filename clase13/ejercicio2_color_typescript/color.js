var Color = /** @class */ (function () {
    function Color() {
        var _this = this;
        this.generateColor = function () {
            var r = Math.floor(Math.random() * 256);
            _this.color.r = r;
            var g = Math.floor(Math.random() * 256);
            _this.color.g = g;
            var b = Math.floor(Math.random() * 256);
            _this.color.b = b;
        };
        this.getColor = function () {
            return _this.color;
        };
        this.printColor = function () {
            console.log("R: ".concat(_this.color.r, ", G: ").concat(_this.color.g, ", B: ").concat(_this.color.b));
        };
        this.color = {
            r: 0,
            g: 0,
            b: 0
        };
    }
    ;
    return Color;
}());
;
var color = new Color();
color.generateColor();
color.printColor();
