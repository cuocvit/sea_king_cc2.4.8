
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SettingsData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0af4c3zfmVCDLJNskmkQd1T', 'SettingsData');
// start-scene/scripts/SettingsData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsData = void 0;
// @
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
// @
var SettingsData = /** @class */ (function (_super) {
    __extends(SettingsData, _super);
    // @
    function SettingsData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "SettingsData"; // (extends super)
        return _this;
    }
    // @ !!!
    SettingsData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @
    SettingsData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(SettingsData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    SettingsData.EVENT_DATA_CHANGE = "settings_data_change";
    return SettingsData;
}(StorageBase_1.StorageBase));
exports.SettingsData = SettingsData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNldHRpbmdzRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSTtBQUNKLDZDQUFtQztBQUNuQyw2Q0FBNEM7QUFFNUMsSUFBSTtBQUNKO0lBQWtDLGdDQUFXO0lBSTNDLElBQUk7SUFDSjtRQUFBLFlBQ0UsaUJBQU8sU0FFUjtRQURDLEtBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDLENBQUMsa0JBQWtCOztJQUN2RCxDQUFDO0lBRUQsUUFBUTtJQUNELHNDQUFlLEdBQXRCLFVBQTBCLFFBQTRCO1FBQXRELGlCQVFDO1FBUEMsaUJBQU0sZUFBZSxZQUFDLFVBQUMsSUFBTztZQUM1QixJQUFJLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRTtnQkFDakIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ3BCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3pCO1lBQ0QsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFHRCxJQUFJO0lBQ0csdUNBQWdCLEdBQXZCLFVBQXdCLFFBQXFCO1FBQzNDLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDM0QsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQXpCRCxJQUFJO0lBQ21CLDhCQUFpQixHQUFXLHNCQUFzQixDQUFDO0lBeUI1RSxtQkFBQztDQTNCRCxBQTJCQyxDQTNCaUMseUJBQVcsR0EyQjVDO0FBM0JZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQFxyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NEYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gIC8vIEBcclxuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IEVWRU5UX0RBVEFfQ0hBTkdFOiBzdHJpbmcgPSBcInNldHRpbmdzX2RhdGFfY2hhbmdlXCI7XHJcblxyXG4gIC8vIEBcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLlNUT1JBR0VfS0VZID0gXCJTZXR0aW5nc0RhdGFcIjsgLy8gKGV4dGVuZHMgc3VwZXIpXHJcbiAgfVxyXG5cclxuICAvLyBAICEhIVxyXG4gIHB1YmxpYyBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s/OiAoZGF0YTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgc3VwZXIuYXN5bmNfcmVhZF9kYXRhKChkYXRhOiBUKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5pc19pbml0KSB7XHJcbiAgICAgICAgdGhpcy5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBcclxuICAvLyBAXHJcbiAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChTZXR0aW5nc0RhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgc3VwZXIuYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjayk7XHJcbiAgfVxyXG59XHJcbiJdfQ==