
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SignData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e0b46e9Cn5Pn5JwALimAOhy', 'SignData');
// start-scene/scripts/SignData.ts

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
exports.SignBuyItemData = exports.SignItemData = exports.SignData = void 0;
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
//
var SignData = /** @class */ (function (_super) {
    __extends(SignData, _super);
    // @
    function SignData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "SignData"; // StorageBase
        _this.sign_day = 0;
        _this.sign_state = 0;
        _this.create_time = 0;
        _this.next_day_time = 0;
        _this.sign_data_array = [];
        _this.sign_buy_data_array = [];
        return _this;
    }
    // @, !!!type
    SignData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (_this.is_init) {
                for (var i = 0; i < _this.sign_data_array.length; i++) {
                    Object.setPrototypeOf(_this.sign_data_array[i], SignItemData.prototype);
                }
                for (var i = 0; i < _this.sign_buy_data_array.length; i++) {
                    Object.setPrototypeOf(_this.sign_buy_data_array[i], SignBuyItemData.prototype);
                }
            }
            else {
                _this.sign_day = 0;
                _this.sign_state = 0;
                var date = new Date();
                var timestamp = Math.floor(date.getTime() / 1000);
                _this.create_time = timestamp - (timestamp - 60 * date.getTimezoneOffset()) % 86400;
                _this.next_day_time = _this.create_time + 86400;
                //
                for (var i = 0; i < SignData.SIGN_LOOP_DAY; i++) {
                    var signItem = new SignItemData();
                    signItem.array_index = i;
                    signItem.day = (_this.sign_day + i + 1) % SignData.MAX_DAY_COUNT;
                    signItem.state = i === 0 ? 1 : 0;
                    var rowData = GameManager_1.gm.config.get_row_data("SignConfigData", signItem.day.toString());
                    if (rowData) {
                        signItem.reward_array = rowData.reward_array;
                    }
                    _this.sign_data_array.push(signItem);
                }
                //
                for (var i = 0; i < SignData.MAX_BUY_COUNT; i++) {
                    var signBuyItem = new SignBuyItemData();
                    signBuyItem.array_index = i;
                    signBuyItem.state = 1;
                    var rowData = GameManager_1.gm.config.get_row_data("SignConfigData", (_this.sign_day + 1).toString());
                    if (rowData) {
                        signBuyItem.reward_data = rowData.other_reward_array[i];
                    }
                    _this.sign_buy_data_array.push(signBuyItem);
                }
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    }; // end: async_read_data
    // @
    SignData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(SignData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    SignData.EVENT_DATA_CHANGE = "sign_data_change";
    SignData.MAX_DAY_COUNT = 30;
    SignData.SIGN_LOOP_DAY = 7;
    SignData.MAX_BUY_COUNT = 3;
    return SignData;
}(StorageBase_1.StorageBase));
exports.SignData = SignData;
// @, !!! reward_array: any[]
var SignItemData = /** @class */ (function () {
    function SignItemData() {
        this.array_index = -1;
        this.day = 0;
        this.state = 0;
        this.reward_array = [];
    }
    return SignItemData;
}());
exports.SignItemData = SignItemData;
// @ , !! reward_data: any
var SignBuyItemData = /** @class */ (function () {
    function SignBuyItemData() {
        this.array_index = -1;
        this.state = 0;
    }
    return SignBuyItemData;
}());
exports.SignBuyItemData = SignBuyItemData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNpZ25EYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSw2Q0FBbUM7QUFDbkMsNkNBQTRDO0FBRTVDLEVBQUU7QUFDRjtJQUE4Qiw0QkFBVztJQWNyQyxJQUFJO0lBQ0o7UUFBQSxZQUNJLGlCQUFPLFNBUVY7UUFQRyxLQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQyxDQUFDLGNBQWM7UUFDN0MsS0FBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDbEIsS0FBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7UUFDcEIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsS0FBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsS0FBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUUsQ0FBQzs7SUFDbEMsQ0FBQztJQUVELGFBQWE7SUFDTixrQ0FBZSxHQUF0QixVQUF1QixRQUE4QjtRQUFyRCxpQkE0Q0M7UUEzQ0csaUJBQU0sZUFBZSxZQUFDLFVBQUMsSUFBUztZQUM1QixJQUFJLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNsRCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUMxRTtnQkFDRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdEQsTUFBTSxDQUFDLGNB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Q0FBQztRQUN2RCxpQkFBTSxnQkFBZ0IsWUFBQyxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBNUVELElBQUk7SUFDVSwwQkFBaUIsR0FBVyxrQkFBa0IsQ0FBQztJQUMvQyxzQkFBYSxHQUFXLEVBQUUsQ0FBQztJQUMzQixzQkFBYSxHQUFXLENBQUMsQ0FBQztJQUMxQixzQkFBYSxHQUFXLENBQUMsQ0FBQztJQXlFNUMsZUFBQztDQTlFRCxBQThFQyxDQTlFNkIseUJBQVcsR0E4RXhDO0FBOUVZLDRCQUFRO0FBZ0ZyQiw2QkFBNkI7QUFDN0I7SUFNSTtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFDTCxtQkFBQztBQUFELENBWkEsQUFZQyxJQUFBO0FBWlksb0NBQVk7QUFjekIsMEJBQTBCO0FBQzFCO0lBS0k7UUFDSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFDTCxzQkFBQztBQUFELENBVEEsQUFTQyxJQUFBO0FBVFksMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAXHJcbmltcG9ydCB7IHJld2FyZEFyciB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2xhZGRlcl9idWlsZGluZyc7XHJcbmltcG9ydCB7IE90aGVyUmV3YXJkLCBTaWduQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3Mvc2lnbic7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFN0b3JhZ2VCYXNlIH0gZnJvbSAnLi9TdG9yYWdlQmFzZSc7XHJcblxyXG4vL1xyXG5leHBvcnQgY2xhc3MgU2lnbkRhdGEgZXh0ZW5kcyBTdG9yYWdlQmFzZSB7XHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc3RhdGljIEVWRU5UX0RBVEFfQ0hBTkdFOiBzdHJpbmcgPSBcInNpZ25fZGF0YV9jaGFuZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgTUFYX0RBWV9DT1VOVDogbnVtYmVyID0gMzA7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNJR05fTE9PUF9EQVk6IG51bWJlciA9IDc7XHJcbiAgICBwdWJsaWMgc3RhdGljIE1BWF9CVVlfQ09VTlQ6IG51bWJlciA9IDM7XHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgc2lnbl9kYXk6IG51bWJlcjtcclxuICAgIHB1YmxpYyBzaWduX3N0YXRlOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGNyZWF0ZV90aW1lOiBudW1iZXI7IC8vIChwdWJsaWMgbW9kZSBub3QgdXNlZClcclxuICAgIHB1YmxpYyBuZXh0X2RheV90aW1lOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc2lnbl9kYXRhX2FycmF5OiBTaWduSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyBzaWduX2J1eV9kYXRhX2FycmF5OiBTaWduQnV5SXRlbURhdGFbXTtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU1RPUkFHRV9LRVkgPSBcIlNpZ25EYXRhXCI7IC8vIFN0b3JhZ2VCYXNlXHJcbiAgICAgICAgdGhpcy5zaWduX2RheSA9IDA7XHJcbiAgICAgICAgdGhpcy5zaWduX3N0YXRlID0gMDtcclxuICAgICAgICB0aGlzLmNyZWF0ZV90aW1lID0gMDtcclxuICAgICAgICB0aGlzLm5leHRfZGF5X3RpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuc2lnbl9kYXRhX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5zaWduX2J1eV9kYXRhX2FycmF5ID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQCwgISEhdHlwZVxyXG4gICAgcHVibGljIGFzeW5jX3JlYWRfZGF0YShjYWxsYmFjaz86IChkYXRhOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5hc3luY19yZWFkX2RhdGEoKGRhdGE6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc19pbml0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2lnbl9kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMuc2lnbl9kYXRhX2FycmF5W2ldLCBTaWduSXRlbURhdGEucHJvdG90eXBlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaWduX2J1eV9kYXRhX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHRoaXMuc2lnbl9idXlfZGF0YV9hcnJheVtpXSwgU2lnbkJ1eUl0ZW1EYXRhLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpZ25fZGF5ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2lnbl9zdGF0ZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGguZmxvb3IoZGF0ZS5nZXRUaW1lKCkgLyAxMDAwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlX3RpbWUgPSB0aW1lc3RhbXAgLSAodGltZXN0YW1wIC0gNjAgKiBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpICUgODY0MDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRfZGF5X3RpbWUgPSB0aGlzLmNyZWF0ZV90aW1lICsgODY0MDA7XHJcbiAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBTaWduRGF0YS5TSUdOX0xPT1BfREFZOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaWduSXRlbSA9IG5ldyBTaWduSXRlbURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBzaWduSXRlbS5hcnJheV9pbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbkl0ZW0uZGF5ID0gKHRoaXMuc2lnbl9kYXkgKyBpICsgMSkgJSBTaWduRGF0YS5NQVhfREFZX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25JdGVtLnN0YXRlID0gaSA9PT0gMCA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd0RhdGEgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiU2lnbkNvbmZpZ0RhdGFcIiwgc2lnbkl0ZW0uZGF5LnRvU3RyaW5nKCkpIGFzIFNpZ25Db25maWc7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvd0RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbkl0ZW0ucmV3YXJkX2FycmF5ID0gcm93RGF0YS5yZXdhcmRfYXJyYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2lnbl9kYXRhX2FycmF5LnB1c2goc2lnbkl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgU2lnbkRhdGEuTUFYX0JVWV9DT1VOVDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2lnbkJ1eUl0ZW0gPSBuZXcgU2lnbkJ1eUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2lnbkJ1eUl0ZW0uYXJyYXlfaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNpZ25CdXlJdGVtLnN0YXRlID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dEYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIlNpZ25Db25maWdEYXRhXCIsICh0aGlzLnNpZ25fZGF5ICsgMSkudG9TdHJpbmcoKSkgYXMgU2lnbkNvbmZpZztcclxuICAgICAgICAgICAgICAgICAgICBpZiAocm93RGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduQnV5SXRlbS5yZXdhcmRfZGF0YSA9IHJvd0RhdGEub3RoZXJfcmV3YXJkX2FycmF5W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNpZ25fYnV5X2RhdGFfYXJyYXkucHVzaChzaWduQnV5SXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH0gLy8gZW5kOiBhc3luY19yZWFkX2RhdGFcclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChTaWduRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSk7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEAsICEhISByZXdhcmRfYXJyYXk6IGFueVtdXHJcbmV4cG9ydCBjbGFzcyBTaWduSXRlbURhdGEge1xyXG4gICAgcHVibGljIGFycmF5X2luZGV4OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZGF5OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3RhdGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZXdhcmRfYXJyYXk6IHJld2FyZEFycltdOyAvLyA/XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5hcnJheV9pbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuZGF5ID0gMDtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgICAgICB0aGlzLnJld2FyZF9hcnJheSA9IFtdO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBAICwgISEgcmV3YXJkX2RhdGE6IGFueVxyXG5leHBvcnQgY2xhc3MgU2lnbkJ1eUl0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBhcnJheV9pbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHN0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmV3YXJkX2RhdGE6IE90aGVyUmV3YXJkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYXJyYXlfaW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLnN0YXRlID0gMDtcclxuICAgIH1cclxufVxyXG4iXX0=