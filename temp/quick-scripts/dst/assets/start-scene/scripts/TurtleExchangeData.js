
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TurtleExchangeData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '84cbf4xyrtMZIdZh9X4QYC5', 'TurtleExchangeData');
// start-scene/scripts/TurtleExchangeData.ts

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
exports.TurtleExchangeData = exports.TurtleExchangeItemData = void 0;
var StorageBase_1 = require("./StorageBase");
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
// @
var TurtleExchangeItemData = /** @class */ (function () {
    function TurtleExchangeItemData() {
        this.prop_id = 0;
        this.prop_num = 0;
        this.exchange_prop_id = Constants_1.RewardIdEnum.GOLD_BARREL;
        this.exchange_prop_num = 1;
        this.state = 0;
    }
    return TurtleExchangeItemData;
}());
exports.TurtleExchangeItemData = TurtleExchangeItemData;
// @
var TurtleExchangeData = /** @class */ (function (_super) {
    __extends(TurtleExchangeData, _super);
    // @
    function TurtleExchangeData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "TurtleExchangeData";
        _this.left_refresh_count = 0;
        return _this;
    }
    // @
    TurtleExchangeData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (!_this.is_init) {
                _this.left_refresh_count = GameManager_1.gm.const.TURTLE_EXCHANGE_MAX_REFRESH_COUNT;
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @
    TurtleExchangeData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(TurtleExchangeData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    // @
    TurtleExchangeData.prototype.get_turtle_exchange_data_array = function () {
        var exchangeDataArray = TurtleExchangeData.turtle_exchange_data_array;
        if (exchangeDataArray.length === 0) {
            for (var i = 0; i < GameManager_1.gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY.length; i++) {
                var itemData = GameManager_1.gm.const.TURTLE_EXCHANGE_ITEM_DATA_ARRAY[i];
                var newItem = new TurtleExchangeItemData();
                newItem.prop_id = itemData.prop_id;
                newItem.prop_num = itemData.prop_num;
                newItem.exchange_prop_id = itemData.exchange_prop_id;
                newItem.exchange_prop_num = itemData.exchange_prop_num;
                exchangeDataArray.push(newItem);
            }
        }
        for (var i = 0; i < exchangeDataArray.length; i++) {
            var item = exchangeDataArray[i];
            item.state = GameManager_1.gm.data.mapCell_data.getMertrailIDCount(item.prop_id) >= item.prop_num ? 1 : 0;
        }
        return exchangeDataArray;
    };
    TurtleExchangeData.EVENT_DATA_CHANGE = "turtle_exchange_data_change";
    TurtleExchangeData.turtle_exchange_data_array = [];
    return TurtleExchangeData;
}(StorageBase_1.StorageBase));
exports.TurtleExchangeData = TurtleExchangeData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFR1cnRsZUV4Y2hhbmdlRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLDZDQUFtQztBQUNuQyx5Q0FBMkM7QUFFM0MsSUFBSTtBQUNKO0lBQUE7UUFDVyxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIscUJBQWdCLEdBQVcsd0JBQVksQ0FBQyxXQUFXLENBQUM7UUFDcEQsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLFVBQUssR0FBVyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FOQSxBQU1DLElBQUE7QUFOWSx3REFBc0I7QUFRbkMsSUFBSTtBQUNKO0lBQXdDLHNDQUFXO0lBTS9DLElBQUk7SUFDSjtRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsS0FBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQzs7SUFDaEMsQ0FBQztJQUVELElBQUk7SUFDRyw0Q0FBZSxHQUF0QixVQUF1QixRQUE4QjtRQUFyRCxpQkFTQztRQVJHLGlCQUFNLGVBQWUsWUFBQyxVQUFDLElBQUk7WUFDdkIsSUFBSSxDQUFDLEtBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2YsS0FBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLGlDQUFpQyxDQUFDO2dCQUNyRSxLQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDcEIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7YUFDM0I7WUFDRCxJQUFJLFFBQVE7Z0JBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELElBQUk7SUFDRyw2Q0FBZ0IsR0FBdkIsVUFBd0IsUUFBcUI7UUFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pFLGlCQUFNLGdCQUFnQixZQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFRCxJQUFJO0lBQ0csMkRBQThCLEdBQXJDO1FBQ0ksSUFBTSxpQkFBaUIsR0FBRyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQztRQUN4RSxJQUFJLGlCQUFpQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFFLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEUsSUFBTSxRQUFRLEdBQUcsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELElBQU0sT0FBTyxHQUFHLElBQUksc0JBQXNCLEVBQUUsQ0FBQztnQkFDN0MsT0FBTyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO2dCQUNuQyxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ3JELE9BQU8sQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3ZELGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNuQztTQUNKO1FBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFNLElBQUksR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsS0FBSyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDL0Y7UUFFRCxPQUFPLGlCQUFpQixDQUFDO0lBQzdCLENBQUM7SUFuRGEsb0NBQWlCLEdBQVcsNkJBQTZCLENBQUM7SUFDMUQsNkNBQTBCLEdBQTZCLEVBQUUsQ0FBQztJQW1ENUUseUJBQUM7Q0FyREQsQUFxREMsQ0FyRHVDLHlCQUFXLEdBcURsRDtBQXJEWSxnREFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXdhcmRJZEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBjbGFzcyBUdXJ0bGVFeGNoYW5nZUl0ZW1EYXRhIHtcclxuICAgIHB1YmxpYyBwcm9wX2lkOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHByb3BfbnVtOiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIGV4Y2hhbmdlX3Byb3BfaWQ6IG51bWJlciA9IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTDtcclxuICAgIHB1YmxpYyBleGNoYW5nZV9wcm9wX251bTogbnVtYmVyID0gMTtcclxuICAgIHB1YmxpYyBzdGF0ZTogbnVtYmVyID0gMDtcclxufVxyXG5cclxuLy8gQFxyXG5leHBvcnQgY2xhc3MgVHVydGxlRXhjaGFuZ2VEYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJ0dXJ0bGVfZXhjaGFuZ2VfZGF0YV9jaGFuZ2VcIjtcclxuICAgIHB1YmxpYyBzdGF0aWMgdHVydGxlX2V4Y2hhbmdlX2RhdGFfYXJyYXk6IFR1cnRsZUV4Y2hhbmdlSXRlbURhdGFbXSA9IFtdO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBsZWZ0X3JlZnJlc2hfY291bnQ6IG51bWJlcjtcclxuXHJcbiAgICAvLyBAXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuU1RPUkFHRV9LRVkgPSBcIlR1cnRsZUV4Y2hhbmdlRGF0YVwiO1xyXG4gICAgICAgIHRoaXMubGVmdF9yZWZyZXNoX2NvdW50ID0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfcmVhZF9kYXRhKGNhbGxiYWNrPzogKGRhdGE6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3JlYWRfZGF0YSgoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNfaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0X3JlZnJlc2hfY291bnQgPSBnbS5jb25zdC5UVVJUTEVfRVhDSEFOR0VfTUFYX1JFRlJFU0hfQ09VTlQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChUdXJ0bGVFeGNoYW5nZURhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRfdHVydGxlX2V4Y2hhbmdlX2RhdGFfYXJyYXkoKTogVHVydGxlRXhjaGFuZ2VJdGVtRGF0YVtdIHtcclxuICAgICAgICBjb25zdCBleGNoYW5nZURhdGFBcnJheSA9IFR1cnRsZUV4Y2hhbmdlRGF0YS50dXJ0bGVfZXhjaGFuZ2VfZGF0YV9hcnJheTtcclxuICAgICAgICBpZiAoZXhjaGFuZ2VEYXRhQXJyYXkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX0lURU1fREFUQV9BUlJBWS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbURhdGEgPSBnbS5jb25zdC5UVVJUTEVfRVhDSEFOR0VfSVRFTV9EQVRBX0FSUkFZW2ldO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3SXRlbSA9IG5ldyBUdXJ0bGVFeGNoYW5nZUl0ZW1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBuZXdJdGVtLnByb3BfaWQgPSBpdGVtRGF0YS5wcm9wX2lkO1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbS5wcm9wX251bSA9IGl0ZW1EYXRhLnByb3BfbnVtO1xyXG4gICAgICAgICAgICAgICAgbmV3SXRlbS5leGNoYW5nZV9wcm9wX2lkID0gaXRlbURhdGEuZXhjaGFuZ2VfcHJvcF9pZDtcclxuICAgICAgICAgICAgICAgIG5ld0l0ZW0uZXhjaGFuZ2VfcHJvcF9udW0gPSBpdGVtRGF0YS5leGNoYW5nZV9wcm9wX251bTtcclxuICAgICAgICAgICAgICAgIGV4Y2hhbmdlRGF0YUFycmF5LnB1c2gobmV3SXRlbSk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGV4Y2hhbmdlRGF0YUFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBleGNoYW5nZURhdGFBcnJheVtpXTtcclxuICAgICAgICAgICAgaXRlbS5zdGF0ZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldE1lcnRyYWlsSURDb3VudChpdGVtLnByb3BfaWQpID49IGl0ZW0ucHJvcF9udW0gPyAxIDogMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBleGNoYW5nZURhdGFBcnJheTtcclxuICAgIH1cclxufVxyXG4iXX0=