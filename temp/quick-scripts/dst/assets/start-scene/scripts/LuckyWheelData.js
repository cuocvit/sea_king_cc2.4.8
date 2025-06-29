
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LuckyWheelData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '678ab89WUVAEIhxEjMbrg2g', 'LuckyWheelData');
// start-scene/scripts/LuckyWheelData.ts

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
exports.LuckyWheelData = void 0;
//
var GameManager_1 = require("./GameManager");
var StorageBase_1 = require("./StorageBase");
// @
var LuckyWheelData = /** @class */ (function (_super) {
    __extends(LuckyWheelData, _super);
    // @
    function LuckyWheelData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "LuckyWheelData";
        _this.left_lucky_wheel_free_count = 0;
        _this.left_lucky_wheel_video_count = 0;
        _this.free_timestamp = 0;
        _this.last_reward_index = 0;
        _this.is_init = false;
        return _this;
    }
    // @
    LuckyWheelData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.is_init = true;
                _this.left_lucky_wheel_free_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_FREE_COUNT;
                _this.left_lucky_wheel_video_count = GameManager_1.gm.const.MAX_LUCKY_WHEEL_VIDEO_COUNT;
                _this.free_timestamp = Date.now();
                _this.last_reward_index = 0;
                _this.async_write_data();
            }
            else {
                if (_this.free_timestamp === null || _this.free_timestamp === undefined) {
                    _this.free_timestamp = Date.now();
                }
            }
            if (callback)
                callback(data);
        });
    };
    // @
    LuckyWheelData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(LuckyWheelData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    LuckyWheelData.EVENT_DATA_CHANGE = "hero_data_change";
    return LuckyWheelData;
}(StorageBase_1.StorageBase));
exports.LuckyWheelData = LuckyWheelData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEx1Y2t5V2hlZWxEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxFQUFFO0FBQ0YsNkNBQW1DO0FBQ25DLDZDQUE0QztBQUU1QyxJQUFJO0FBQ0o7SUFBb0Msa0NBQVc7SUFRM0MsSUFBSTtJQUNKO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBTkcsS0FBSSxDQUFDLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQztRQUNwQyxLQUFJLENBQUMsMkJBQTJCLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxDQUFDLENBQUM7UUFDdEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDeEIsS0FBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQztRQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7SUFDekIsQ0FBQztJQUVELElBQUk7SUFDRyx3Q0FBZSxHQUF0QixVQUEwQixRQUE0QjtRQUF0RCxpQkFnQkM7UUFmRyxpQkFBTSxlQUFlLFlBQUMsVUFBQyxJQUFPO1lBQzFCLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNmLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsMkJBQTJCLEdBQUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7Z0JBQ3ZFLEtBQUksQ0FBQyw0QkFBNEIsR0FBRyxnQkFBRSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQztnQkFDekUsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQ2pDLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNILElBQUksS0FBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLElBQUksS0FBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLEVBQUU7b0JBQ25FLEtBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUNwQzthQUNKO1lBQ0QsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO0lBQ0cseUNBQWdCLEdBQXZCLFVBQXdCLFFBQXFCO1FBQ3pDLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQXpDYSxnQ0FBaUIsR0FBVyxrQkFBa0IsQ0FBQztJQTBDakUscUJBQUM7Q0EzQ0QsQUEyQ0MsQ0EzQ21DLHlCQUFXLEdBMkM5QztBQTNDWSx3Q0FBYyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vXHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFN0b3JhZ2VCYXNlIH0gZnJvbSAnLi9TdG9yYWdlQmFzZSc7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBMdWNreVdoZWVsRGF0YSBleHRlbmRzIFN0b3JhZ2VCYXNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgRVZFTlRfREFUQV9DSEFOR0U6IHN0cmluZyA9IFwiaGVyb19kYXRhX2NoYW5nZVwiO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBsZWZ0X2x1Y2t5X3doZWVsX2ZyZWVfY291bnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZnJlZV90aW1lc3RhbXA6IG51bWJlcjtcclxuICAgIHB1YmxpYyBsYXN0X3Jld2FyZF9pbmRleDogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5TVE9SQUdFX0tFWSA9IFwiTHVja3lXaGVlbERhdGFcIjtcclxuICAgICAgICB0aGlzLmxlZnRfbHVja3lfd2hlZWxfZnJlZV9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLmZyZWVfdGltZXN0YW1wID0gMDtcclxuICAgICAgICB0aGlzLmxhc3RfcmV3YXJkX2luZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzX2luaXQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfcmVhZF9kYXRhPFQ+KGNhbGxiYWNrPzogKGRhdGE6IFQpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5hc3luY19yZWFkX2RhdGEoKGRhdGE6IFQpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzX2luaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNfaW5pdCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnRfbHVja3lfd2hlZWxfZnJlZV9jb3VudCA9IGdtLmNvbnN0Lk1BWF9MVUNLWV9XSEVFTF9GUkVFX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0X2x1Y2t5X3doZWVsX3ZpZGVvX2NvdW50ID0gZ20uY29uc3QuTUFYX0xVQ0tZX1dIRUVMX1ZJREVPX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmVlX3RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RfcmV3YXJkX2luZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZnJlZV90aW1lc3RhbXAgPT09IG51bGwgfHwgdGhpcy5mcmVlX3RpbWVzdGFtcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcmVlX3RpbWVzdGFtcCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChMdWNreVdoZWVsRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSk7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuIl19