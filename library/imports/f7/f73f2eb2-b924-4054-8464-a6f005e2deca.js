"use strict";
cc._RF.push(module, 'f73f26yuSRAVIRkpvAF4t7K', 'BrowserUtils');
// start-scene/scripts/BrowserUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserUtils = void 0;
var BrowserUtils = /** @class */ (function () {
    function BrowserUtils() {
    }
    BrowserUtils.is_int = function (t) {
        return /^-{0,1}\d+$/.test(t + "");
    };
    BrowserUtils.is_boolean = function (t) {
        return "true" === t || "false" === t;
    };
    BrowserUtils.get_url_param_value = function (paramName, type) {
        var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
        if (result && "" != result[2]) {
            var param = result[2];
            if ("string" == typeof type) {
                return param;
            }
            else if ("number" == typeof type) {
                return (this.is_int(type) ? parseInt : parseFloat)(param);
            }
            else if ("boolean" == typeof type) {
                return this.is_boolean(param) ? "true" == param : type;
            }
            else {
                console.log("不支持的URL参数类型 " + typeof type);
                return param;
            }
        }
        else {
            return type;
        }
    };
    BrowserUtils.get_url_param_obj = function () {
        return window.location.search.substr(1).split("&").reduce(function (accumulator, current) {
            var e = current.split("=");
            accumulator[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
            return accumulator;
        }, {});
    };
    return BrowserUtils;
}());
exports.BrowserUtils = BrowserUtils;

cc._RF.pop();