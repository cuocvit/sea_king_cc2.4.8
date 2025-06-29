
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/RecordData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd4bd1+1ilCU4OOMZclXTQC', 'RecordData');
// start-scene/scripts/RecordData.ts

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
exports.RecordData = exports.WarehouseItemData = void 0;
var StorageBase_1 = require("./StorageBase");
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
// @
var WarehouseItemData = /** @class */ (function () {
    function WarehouseItemData() {
        this.id = 0;
        this.value = 0;
    }
    return WarehouseItemData;
}());
exports.WarehouseItemData = WarehouseItemData;
// @
var RecordData = /** @class */ (function (_super) {
    __extends(RecordData, _super);
    // @
    function RecordData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "RecordData";
        _this.share_record_count = 0;
        _this.left_push_share_count = 0;
        _this.reward_array = [];
        _this.record_state = 0;
        _this.record_type = 0;
        _this.record_timestamp = 0;
        _this.is_init = false;
        return _this;
    }
    //
    RecordData.prototype.async_read_data = function (callback) {
        var self = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (self.is_init) {
                for (var i = 0; i < self.reward_array.length; i++) {
                    Object.setPrototypeOf(self.reward_array[i], WarehouseItemData.prototype);
                }
                Object.setPrototypeOf(self.reward_data, WarehouseItemData.prototype);
            }
            else {
                self.reward_data = new WarehouseItemData();
                self.reward_data.id = Constants_1.RewardIdEnum.GOLD;
                self.reward_data.value = 100;
                //
                self.push_share_reward_data = new WarehouseItemData();
                self.push_share_reward_data.id = Constants_1.RewardIdEnum.DIAMOND;
                self.push_share_reward_data.value = 100;
                self.share_record_count = 0;
                self.left_push_share_count = GameManager_1.gm.const.MAX_PUSH_SHARE_COUNT;
                self.is_init = true;
                self.async_write_data();
            }
            self.record_state = 0;
            self.record_timestamp = 0;
            self.record_type = 0;
            if (callback)
                callback(data);
        });
    };
    // @
    RecordData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(RecordData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    RecordData.EVENT_DATA_CHANGE = "record_data_change";
    RecordData.RECORD_STATE_CHANGE = "record_state_change";
    RecordData.AUTO_END_RECORD_TIME = 20;
    RecordData.MIN_RECORD_TIME = 5;
    return RecordData;
}(StorageBase_1.StorageBase));
exports.RecordData = RecordData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFJlY29yZERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUE0QztBQUM1Qyx5Q0FBMkM7QUFDM0MsNkNBQW1DO0FBRW5DLElBQUk7QUFDSjtJQUlJO1FBQ0ksSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQVJBLEFBUUMsSUFBQTtBQVJZLDhDQUFpQjtBQVU5QixJQUFJO0FBQ0o7SUFBZ0MsOEJBQVc7SUFpQnZDLElBQUk7SUFDSjtRQUFBLFlBQ0ksaUJBQU8sU0FTVjtRQVJHLEtBQUksQ0FBQyxXQUFXLEdBQUcsWUFBWSxDQUFDO1FBQ2hDLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFDNUIsS0FBSSxDQUFDLHFCQUFxQixHQUFHLENBQUMsQ0FBQztRQUMvQixLQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOztJQUN6QixDQUFDO0lBRUQsRUFBRTtJQUNLLG9DQUFlLEdBQXRCLFVBQTBCLFFBQTRCO1FBQ2xELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQztRQUNsQixpQkFBTSxlQUFlLFlBQUMsVUFBQyxJQUFPO1lBQzFCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDZCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQy9DLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDNUU7Z0JBQ0QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3hFO2lCQUFNO2dCQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyx3QkFBWSxDQUFDLElBQUksQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUM3QixFQUFFO2dCQUNGLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEdBQUcsd0JBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ3RELElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixJQUFJLENBQUMscUJBQXFCLEdBQUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUM7Z0JBQzNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxRQUFRO2dCQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxJQUFJO0lBQ0cscUNBQWdCLEdBQXZCLFVBQXdCLFFBQXFCO1FBQ3pDLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDekQsaUJBQU0sZ0JBQWdCLFlBQUMsUUFBUSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQTlEYSw0QkFBaUIsR0FBVyxvQkFBb0IsQ0FBQztJQUNqRCw4QkFBbUIsR0FBVyxxQkFBcUIsQ0FBQztJQUNwRCwrQkFBb0IsR0FBVyxFQUFFLENBQUM7SUFDbEMsMEJBQWUsR0FBVyxDQUFDLENBQUM7SUE0RDlDLGlCQUFDO0NBaEVELEFBZ0VDLENBaEUrQix5QkFBVyxHQWdFMUM7QUFoRVksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5pbXBvcnQgeyBSZXdhcmRJZEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBXYXJlaG91c2VJdGVtRGF0YSB7XHJcbiAgICBwdWJsaWMgaWQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB2YWx1ZTogbnVtYmVyO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuaWQgPSAwO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAwO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBSZWNvcmREYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJyZWNvcmRfZGF0YV9jaGFuZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgUkVDT1JEX1NUQVRFX0NIQU5HRTogc3RyaW5nID0gXCJyZWNvcmRfc3RhdGVfY2hhbmdlXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIEFVVE9fRU5EX1JFQ09SRF9USU1FOiBudW1iZXIgPSAyMDtcclxuICAgIHB1YmxpYyBzdGF0aWMgTUlOX1JFQ09SRF9USU1FOiBudW1iZXIgPSA1O1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBTVE9SQUdFX0tFWTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNoYXJlX3JlY29yZF9jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIGxlZnRfcHVzaF9zaGFyZV9jb3VudDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJld2FyZF9hcnJheTogV2FyZWhvdXNlSXRlbURhdGFbXTtcclxuICAgIHB1YmxpYyByZXdhcmRfZGF0YTogV2FyZWhvdXNlSXRlbURhdGE7XHJcbiAgICBwdWJsaWMgcHVzaF9zaGFyZV9yZXdhcmRfZGF0YTogV2FyZWhvdXNlSXRlbURhdGE7XHJcbiAgICBwdWJsaWMgcmVjb3JkX3N0YXRlOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcmVjb3JkX3R5cGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyByZWNvcmRfdGltZXN0YW1wOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgaXNfaW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU1RPUkFHRV9LRVkgPSBcIlJlY29yZERhdGFcIjtcclxuICAgICAgICB0aGlzLnNoYXJlX3JlY29yZF9jb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZWZ0X3B1c2hfc2hhcmVfY291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMucmV3YXJkX2FycmF5ID0gW107XHJcbiAgICAgICAgdGhpcy5yZWNvcmRfc3RhdGUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjb3JkX3R5cGUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjb3JkX3RpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc19pbml0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLy9cclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGE8VD4oY2FsbGJhY2s/OiAoZGF0YTogVCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YSgoZGF0YTogVCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5pc19pbml0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGYucmV3YXJkX2FycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHNlbGYucmV3YXJkX2FycmF5W2ldLCBXYXJlaG91c2VJdGVtRGF0YS5wcm90b3R5cGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKHNlbGYucmV3YXJkX2RhdGEsIFdhcmVob3VzZUl0ZW1EYXRhLnByb3RvdHlwZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJld2FyZF9kYXRhID0gbmV3IFdhcmVob3VzZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJld2FyZF9kYXRhLmlkID0gUmV3YXJkSWRFbnVtLkdPTEQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnJld2FyZF9kYXRhLnZhbHVlID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgIHNlbGYucHVzaF9zaGFyZV9yZXdhcmRfZGF0YSA9IG5ldyBXYXJlaG91c2VJdGVtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wdXNoX3NoYXJlX3Jld2FyZF9kYXRhLmlkID0gUmV3YXJkSWRFbnVtLkRJQU1PTkQ7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnB1c2hfc2hhcmVfcmV3YXJkX2RhdGEudmFsdWUgPSAxMDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNoYXJlX3JlY29yZF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmxlZnRfcHVzaF9zaGFyZV9jb3VudCA9IGdtLmNvbnN0Lk1BWF9QVVNIX1NIQVJFX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5pc19pbml0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHNlbGYuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYucmVjb3JkX3N0YXRlID0gMDtcclxuICAgICAgICAgICAgc2VsZi5yZWNvcmRfdGltZXN0YW1wID0gMDtcclxuICAgICAgICAgICAgc2VsZi5yZWNvcmRfdHlwZSA9IDA7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2s/OiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoUmVjb3JkRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSk7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjayk7XHJcbiAgICB9XHJcbn1cclxuIl19