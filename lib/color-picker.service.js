<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { Rgba, Hsla, Hsva } from './classes';
export var ColorPickerService = (function () {
    function ColorPickerService() {
    }
    ColorPickerService.prototype.hsla2hsva = function (hsla) {
        var h = Math.min(hsla.h, 1), s = Math.min(hsla.s, 1), l = Math.min(hsla.l, 1), a = Math.min(hsla.a, 1);
        if (l === 0) {
            return new Hsva(h, 0, 0, a);
        }
        else {
            var v = l + s * (1 - Math.abs(2 * l - 1)) / 2;
            return new Hsva(h, 2 * (v - l) / v, v, a);
        }
    };
    ColorPickerService.prototype.hsva2hsla = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        if (v === 0) {
            return new Hsla(h, 0, 0, a);
        }
        else if (s === 0 && v === 1) {
            return new Hsla(h, 1, 1, a);
        }
        else {
            var l = v * (2 - s) / 2;
            return new Hsla(h, v * s / (1 - Math.abs(2 * l - 1)), l, a);
        }
    };
    ColorPickerService.prototype.rgbaToHsva = function (rgba) {
        var r = Math.min(rgba.r, 1), g = Math.min(rgba.g, 1), b = Math.min(rgba.b, 1), a = Math.min(rgba.a, 1);
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max === min) {
            h = 0;
        }
        else {
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return new Hsva(h, s, v, a);
    };
    ColorPickerService.prototype.hsvaToRgba = function (hsva) {
        var h = hsva.h, s = hsva.s, v = hsva.v, a = hsva.a;
        var r, g, b;
        var i = Math.floor(h * 6);
        var f = h * 6 - i;
        var p = v * (1 - s);
        var q = v * (1 - f * s);
        var t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                r = v, g = t, b = p;
                break;
            case 1:
                r = q, g = v, b = p;
                break;
            case 2:
                r = p, g = v, b = t;
                break;
            case 3:
                r = p, g = q, b = v;
                break;
            case 4:
                r = t, g = p, b = v;
                break;
            case 5:
                r = v, g = p, b = q;
                break;
        }
        return new Rgba(r, g, b, a);
    };
    ColorPickerService.prototype.stringToHsva = function (colorString) {
        if (colorString === void 0) { colorString = ''; }
        var stringParsers = [
            {
                re: /(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[2]) / 255, parseInt(execResult[3]) / 255, parseInt(execResult[4]) / 255, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function (execResult) {
                    return new Hsla(parseInt(execResult[2]) / 360, parseInt(execResult[3]) / 100, parseInt(execResult[4]) / 100, isNaN(parseFloat(execResult[5])) ? 1 : parseFloat(execResult[5]));
                }
            },
            {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1], 16) / 255, parseInt(execResult[2], 16) / 255, parseInt(execResult[3], 16) / 255, 1);
                }
            },
            {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,
                parse: function (execResult) {
                    return new Rgba(parseInt(execResult[1] + execResult[1], 16) / 255, parseInt(execResult[2] + execResult[2], 16) / 255, parseInt(execResult[3] + execResult[3], 16) / 255, 1);
                }
            }
        ];
        colorString = colorString.toLowerCase();
        var hsva = null;
        for (var key in stringParsers) {
            if (stringParsers.hasOwnProperty(key)) {
                var parser = stringParsers[key];
                var match = parser.re.exec(colorString), color = match && parser.parse(match);
                if (color) {
                    if (color instanceof Rgba) {
                        hsva = this.rgbaToHsva(color);
                    }
                    else if (color instanceof Hsla) {
                        hsva = this.hsla2hsva(color);
                    }
                    return hsva;
                }
            }
        }
        return hsva;
    };
    ColorPickerService.prototype.outputFormat = function (hsva, outputFormat) {
        if (hsva.a < 1) {
            switch (outputFormat) {
                case 'hsla':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsla(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%,' + hslaText.a + ')';
                default:
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgba(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ',' + Math.round(rgba.a * 100) / 100 + ')';
            }
        }
        else {
            switch (outputFormat) {
                case 'hsla':
                    var hsla = this.hsva2hsla(hsva);
                    var hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
                    return 'hsl(' + hslaText.h + ',' + hslaText.s + '%,' + hslaText.l + '%)';
                case 'rgba':
                    var rgba = this.denormalizeRGBA(this.hsvaToRgba(hsva));
                    return 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                default:
                    return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(hsva)));
            }
        }
    };
    ColorPickerService.prototype.hexText = function (rgba) {
        var hexText = '#' + ((1 << 24) | (rgba.r << 16) | (rgba.g << 8) | rgba.b).toString(16).substr(1);
        if (hexText[1] === hexText[2] && hexText[3] === hexText[4] && hexText[5] === hexText[6]) {
            hexText = '#' + hexText[1] + hexText[3] + hexText[5];
        }
        return hexText;
    };
    ColorPickerService.prototype.denormalizeRGBA = function (rgba) {
        return new Rgba(Math.round(rgba.r * 255), Math.round(rgba.g * 255), Math.round(rgba.b * 255), rgba.a);
    };
    ColorPickerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ColorPickerService.ctorParameters = function () { return []; };
    return ColorPickerService;
}());
//# sourceMappingURL=color-picker.service.js.map
=======
"use strict";var __decorate=this&&this.__decorate||function(a,e,s,r){var t,n=arguments.length,o=n<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,s):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(a,e,s,r);else for(var i=a.length-1;i>=0;i--)(t=a[i])&&(o=(n<3?t(o):n>3?t(e,s,o):t(e,s))||o);return n>3&&o&&Object.defineProperty(e,s,o),o},__metadata=this&&this.__metadata||function(a,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(a,e)},core_1=require("@angular/core"),classes_1=require("./classes"),ColorPickerService=function(){function a(){}return a.prototype.hsla2hsva=function(a){var e=Math.min(a.h,1),s=Math.min(a.s,1),r=Math.min(a.l,1),t=Math.min(a.a,1);if(0===r)return new classes_1.Hsva(e,0,0,t);var n=r+s*(1-Math.abs(2*r-1))/2;return new classes_1.Hsva(e,2*(n-r)/n,n,t)},a.prototype.hsva2hsla=function(a){var e=a.h,s=a.s,r=a.v,t=a.a;if(0===r)return new classes_1.Hsla(e,0,0,t);if(0===s&&1===r)return new classes_1.Hsla(e,1,1,t);var n=r*(2-s)/2;return new classes_1.Hsla(e,r*s/(1-Math.abs(2*n-1)),n,t)},a.prototype.rgbaToHsva=function(a){var e,s,r=Math.min(a.r,1),t=Math.min(a.g,1),n=Math.min(a.b,1),o=Math.min(a.a,1),i=Math.max(r,t,n),c=Math.min(r,t,n),h=i,l=i-c;if(s=0===i?0:l/i,i===c)e=0;else{switch(i){case r:e=(t-n)/l+(t<n?6:0);break;case t:e=(n-r)/l+2;break;case n:e=(r-t)/l+4}e/=6}return new classes_1.Hsva(e,s,h,o)},a.prototype.hsvaToRgba=function(a){var e,s,r,t=a.h,n=a.s,o=a.v,i=a.a,c=Math.floor(6*t),h=6*t-c,l=o*(1-n),u=o*(1-h*n),f=o*(1-(1-h)*n);switch(c%6){case 0:e=o,s=f,r=l;break;case 1:e=u,s=o,r=l;break;case 2:e=l,s=o,r=f;break;case 3:e=l,s=u,r=o;break;case 4:e=f,s=l,r=o;break;case 5:e=o,s=l,r=u}return new classes_1.Rgba(e,s,r,i)},a.prototype.stringToHsva=function(a,e){void 0===a&&(a=""),void 0===e&&(e=!1);var s=[{re:/(rgb)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*%?,\s*(\d{1,3})\s*%?(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return new classes_1.Rgba(parseInt(a[2])/255,parseInt(a[3])/255,parseInt(a[4])/255,isNaN(parseFloat(a[5]))?1:parseFloat(a[5]))}},{re:/(hsl)a?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,parse:function(a){return new classes_1.Hsla(parseInt(a[2])/360,parseInt(a[3])/100,parseInt(a[4])/100,isNaN(parseFloat(a[5]))?1:parseFloat(a[5]))}}];e?s.push({re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,parse:function(a){return new classes_1.Rgba(parseInt(a[1],16)/255,parseInt(a[2],16)/255,parseInt(a[3],16)/255,parseInt(a[4],16)/255)}}):s.push({re:/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/,parse:function(a){return new classes_1.Rgba(parseInt(a[1],16)/255,parseInt(a[2],16)/255,parseInt(a[3],16)/255,1)}},{re:/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])$/,parse:function(a){return new classes_1.Rgba(parseInt(a[1]+a[1],16)/255,parseInt(a[2]+a[2],16)/255,parseInt(a[3]+a[3],16)/255,1)}}),a=a.toLowerCase();var r=null;for(var t in s)if(s.hasOwnProperty(t)){var n=s[t],o=n.re.exec(a),i=o&&n.parse(o);if(i)return i instanceof classes_1.Rgba?r=this.rgbaToHsva(i):i instanceof classes_1.Hsla&&(r=this.hsla2hsva(i)),r}return r},a.prototype.outputFormat=function(a,e,s){if(a.a<1)switch(e){case"hsla":var r=this.hsva2hsla(a),t=new classes_1.Hsla(Math.round(360*r.h),Math.round(100*r.s),Math.round(100*r.l),Math.round(100*r.a)/100);return"hsla("+t.h+","+t.s+"%,"+t.l+"%,"+t.a+")";default:if(s&&"hex"===e)return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(a)),s);var n=this.denormalizeRGBA(this.hsvaToRgba(a));return"rgba("+n.r+","+n.g+","+n.b+","+Math.round(100*n.a)/100+")"}else switch(e){case"hsla":var r=this.hsva2hsla(a),t=new classes_1.Hsla(Math.round(360*r.h),Math.round(100*r.s),Math.round(100*r.l),Math.round(100*r.a)/100);return"hsl("+t.h+","+t.s+"%,"+t.l+"%)";case"rgba":var n=this.denormalizeRGBA(this.hsvaToRgba(a));return"rgb("+n.r+","+n.g+","+n.b+")";default:return this.hexText(this.denormalizeRGBA(this.hsvaToRgba(a)),s)}},a.prototype.hexText=function(a,e){var s="#"+(1<<24|a.r<<16|a.g<<8|a.b).toString(16).substr(1);return s[1]!==s[2]||s[3]!==s[4]||s[5]!==s[6]||1!==a.a||e||(s="#"+s[1]+s[3]+s[5]),e&&(s+=(256|Math.round(255*a.a)).toString(16).substr(1)),s},a.prototype.denormalizeRGBA=function(a){return new classes_1.Rgba(Math.round(255*a.r),Math.round(255*a.g),Math.round(255*a.b),a.a)},a=__decorate([core_1.Injectable(),__metadata("design:paramtypes",[])],a)}();exports.ColorPickerService=ColorPickerService;
//# sourceMappingURL=color-picker.service.js.map
>>>>>>> typescript-2
