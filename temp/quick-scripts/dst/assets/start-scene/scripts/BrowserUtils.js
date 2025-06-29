
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/BrowserUtils.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEJyb3dzZXJVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO0lBMENBLENBQUM7SUF6Q2tCLG1CQUFNLEdBQXJCLFVBQXNCLENBQUM7UUFDbkIsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRWMsdUJBQVUsR0FBekIsVUFBMEIsQ0FBUztRQUMvQixPQUFPLE1BQU0sS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR2EsZ0NBQW1CLEdBQWpDLFVBQWtDLFNBQWlCLEVBQUUsSUFBc0I7UUFDdkUsSUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxlQUFlLENBQUMsQ0FBQztRQUM5RCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNELElBQUksTUFBTSxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDM0IsSUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhCLElBQUksUUFBUSxJQUFJLE9BQU8sSUFBSSxFQUFFO2dCQUN6QixPQUFPLEtBQUssQ0FBQzthQUVoQjtpQkFBTSxJQUFJLFFBQVEsSUFBSSxPQUFPLElBQUksRUFBRTtnQkFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFFN0Q7aUJBQU0sSUFBSSxTQUFTLElBQUksT0FBTyxJQUFJLEVBQUU7Z0JBQ2pDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBRTFEO2lCQUFNO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxHQUFHLE9BQU8sSUFBSSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sS0FBSyxDQUFDO2FBQ2hCO1NBRUo7YUFBTTtZQUNILE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDTCxDQUFDO0lBRWMsOEJBQWlCLEdBQWhDO1FBQ0ksT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFdBQVcsRUFBRSxPQUFPO1lBQzNFLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakUsT0FBTyxXQUFXLENBQUM7UUFDdkIsQ0FBQyxFQUFFLEVBQTRCLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQTFDQSxBQTBDQyxJQUFBO0FBMUNZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcblxyXG5leHBvcnQgY2xhc3MgQnJvd3NlclV0aWxzIHtcclxuICAgIHByaXZhdGUgc3RhdGljIGlzX2ludCh0KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIC9eLXswLDF9XFxkKyQvLnRlc3QodCArIFwiXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGlzX2Jvb2xlYW4odDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFwidHJ1ZVwiID09PSB0IHx8IFwiZmFsc2VcIiA9PT0gdDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRfdXJsX3BhcmFtX3ZhbHVlKHBhcmFtTmFtZTogc3RyaW5nLCB0eXBlOiBib29sZWFuIHwgbnVtYmVyKTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB7XHJcbiAgICAgICAgY29uc3QgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBwYXJhbU5hbWUgKyBcIj0oW14mXSopKCZ8JClcIik7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgICAgICBpZiAocmVzdWx0ICYmIFwiXCIgIT0gcmVzdWx0WzJdKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtID0gcmVzdWx0WzJdO1xyXG5cclxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXCJudW1iZXJcIiA9PSB0eXBlb2YgdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLmlzX2ludCh0eXBlKSA/IHBhcnNlSW50IDogcGFyc2VGbG9hdCkocGFyYW0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChcImJvb2xlYW5cIiA9PSB0eXBlb2YgdHlwZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNfYm9vbGVhbihwYXJhbSkgPyBcInRydWVcIiA9PSBwYXJhbSA6IHR5cGU7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLkuI3mlK/mjIHnmoRVUkzlj4LmlbDnsbvlnosgXCIgKyB0eXBlb2YgdHlwZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGdldF91cmxfcGFyYW1fb2JqKCk6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdChcIiZcIikucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlID0gY3VycmVudC5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgIGFjY3VtdWxhdG9yW2RlY29kZVVSSUNvbXBvbmVudChlWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQoZVsxXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcclxuICAgICAgICB9LCB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+KVxyXG4gICAgfVxyXG59Il19