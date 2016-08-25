"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var angular2_color_picker_1 = require('angular2-color-picker');
var Cmyk = (function () {
    function Cmyk(c, m, y, k) {
        this.c = c;
        this.m = m;
        this.y = y;
        this.k = k;
    }
    return Cmyk;
}());
exports.Cmyk = Cmyk;
var AppComponent = (function () {
    function AppComponent(cpService) {
        this.cpService = cpService;
        this.color = '#2889e9';
        this.color2 = "hsla(300,82%,52%)";
        this.color3 = "#fff500";
        this.color4 = "rgb(236,64,64)";
        this.color5 = "rgba(45,208,45,1)";
        this.color6 = "#1973c0";
        this.color7 = "#f200bd";
        this.color8 = "#a8ff00";
        this.color9 = "#3b4da1";
        this.cmyk = new Cmyk(0, 0, 0, 0);
    }
    AppComponent.prototype.onChangeColor = function (color) {
        return this.rgbaToCmyk(this.cpService.hsvaToRgba(this.cpService.stringToHsva(color)));
    };
    AppComponent.prototype.rgbaToCmyk = function (rgba) {
        var cmyk = new Cmyk(0, 0, 0, 0), k;
        k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
        if (k == 1)
            return new Cmyk(0, 0, 0, 1);
        cmyk.c = (1 - rgba.r - k) / (1 - k);
        cmyk.m = (1 - rgba.g - k) / (1 - k);
        cmyk.y = (1 - rgba.b - k) / (1 - k);
        cmyk.k = k;
        return cmyk;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/demo.html',
            directives: [angular2_color_picker_1.ColorPickerDirective]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_color_picker_1.ColorPickerService !== 'undefined' && angular2_color_picker_1.ColorPickerService) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map