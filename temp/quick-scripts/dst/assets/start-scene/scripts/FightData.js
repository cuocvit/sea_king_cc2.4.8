
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/FightData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '09749Ma20NN+LM0qnNqQneW', 'FightData');
// start-scene/scripts/FightData.ts

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
exports.FightData = exports.FightState = void 0;
var StorageBase_1 = require("./StorageBase");
var GameManager_1 = require("./GameManager");
// @
var FightState;
(function (FightState) {
    FightState[FightState["NONE"] = 0] = "NONE";
    FightState[FightState["RUN"] = 1] = "RUN";
    FightState[FightState["PAUSE"] = 2] = "PAUSE";
    FightState[FightState["SUCCESS"] = 3] = "SUCCESS";
    FightState[FightState["FAIL"] = 4] = "FAIL";
    FightState[FightState["REVIVE"] = 5] = "REVIVE";
})(FightState = exports.FightState || (exports.FightState = {}));
// 
var FightData = /** @class */ (function (_super) {
    __extends(FightData, _super);
    // @
    function FightData() {
        var _this = _super.call(this) || this;
        _this.STORAGE_KEY = "FightData";
        _this.caves_layer = 1;
        _this.speed_scale = 2;
        _this.fight_count = 0;
        return _this;
    }
    // ??
    FightData.prototype.async_read_data = function (callback) {
        var _this = this;
        _super.prototype.async_read_data.call(this, function (data) {
            if (_this.is_init) {
                if (_this.fight_count == null)
                    _this.fight_count = 0;
            }
            else {
                _this.is_init = true;
                _this.async_write_data();
            }
            if (callback)
                callback(data);
        });
    };
    // @
    FightData.prototype.async_write_data = function (callback) {
        GameManager_1.gm.data.event_emitter.emit(FightData.EVENT_DATA_CHANGE);
        _super.prototype.async_write_data.call(this, callback);
    };
    FightData.EVENT_DATA_CHANGE = "fight_data_change";
    return FightData;
}(StorageBase_1.StorageBase));
exports.FightData = FightData;
///---

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEZpZ2h0RGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQTRDO0FBQzVDLDZDQUFtQztBQUVuQyxJQUFJO0FBQ0osSUFBWSxVQU9YO0FBUEQsV0FBWSxVQUFVO0lBQ2xCLDJDQUFRLENBQUE7SUFDUix5Q0FBTyxDQUFBO0lBQ1AsNkNBQVMsQ0FBQTtJQUNULGlEQUFXLENBQUE7SUFDWCwyQ0FBUSxDQUFBO0lBQ1IsK0NBQVUsQ0FBQTtBQUNkLENBQUMsRUFQVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU9yQjtBQUVELEdBQUc7QUFDSDtJQUErQiw2QkFBVztJQVF0QyxJQUFJO0lBQ0o7UUFBQSxZQUNJLGlCQUFPLFNBS1Y7UUFKRyxLQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixLQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7SUFDekIsQ0FBQztJQUVELEtBQUs7SUFDRSxtQ0FBZSxHQUF0QixVQUF1QixRQUE4QjtRQUFyRCxpQkFVQztRQVRHLGlCQUFNLGVBQWUsWUFBQyxVQUFDLElBQVM7WUFDNUIsSUFBSSxLQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNkLElBQUksS0FBSSxDQUFDLFdBQVcsSUFBSSxJQUFJO29CQUFFLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNILEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQjtZQUNELElBQUksUUFBUTtnQkFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsSUFBSTtJQUNHLG9DQUFnQixHQUF2QixVQUF3QixRQUFxQjtRQUN6QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hELGlCQUFNLGdCQUFnQixZQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFqQ2EsMkJBQWlCLEdBQVcsbUJBQW1CLENBQUM7SUFrQ2xFLGdCQUFDO0NBbkNELEFBbUNDLENBbkM4Qix5QkFBVyxHQW1DekM7QUFuQ1ksOEJBQVM7QUFxQ3RCLE1BQU0iLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlQmFzZSB9IGZyb20gJy4vU3RvcmFnZUJhc2UnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5cclxuLy8gQFxyXG5leHBvcnQgZW51bSBGaWdodFN0YXRlIHtcclxuICAgIE5PTkUgPSAwLFxyXG4gICAgUlVOID0gMSxcclxuICAgIFBBVVNFID0gMixcclxuICAgIFNVQ0NFU1MgPSAzLFxyXG4gICAgRkFJTCA9IDQsXHJcbiAgICBSRVZJVkUgPSA1XHJcbn1cclxuXHJcbi8vIFxyXG5leHBvcnQgY2xhc3MgRmlnaHREYXRhIGV4dGVuZHMgU3RvcmFnZUJhc2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBFVkVOVF9EQVRBX0NIQU5HRTogc3RyaW5nID0gXCJmaWdodF9kYXRhX2NoYW5nZVwiO1xyXG4gICAgLy9cclxuICAgIHB1YmxpYyBTVE9SQUdFX0tFWTogc3RyaW5nO1xyXG4gICAgcHVibGljIGNhdmVzX2xheWVyOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgc3BlZWRfc2NhbGU6IG51bWJlcjtcclxuICAgIHB1YmxpYyBmaWdodF9jb3VudDogbnVtYmVyO1xyXG5cclxuICAgIC8vIEBcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5TVE9SQUdFX0tFWSA9IFwiRmlnaHREYXRhXCI7XHJcbiAgICAgICAgdGhpcy5jYXZlc19sYXllciA9IDE7XHJcbiAgICAgICAgdGhpcy5zcGVlZF9zY2FsZSA9IDI7XHJcbiAgICAgICAgdGhpcy5maWdodF9jb3VudCA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPz9cclxuICAgIHB1YmxpYyBhc3luY19yZWFkX2RhdGEoY2FsbGJhY2s/OiAoZGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuYXN5bmNfcmVhZF9kYXRhKChkYXRhOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNfaW5pdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlnaHRfY291bnQgPT0gbnVsbCkgdGhpcy5maWdodF9jb3VudCA9IDA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzX2luaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgYXN5bmNfd3JpdGVfZGF0YShjYWxsYmFjaz86ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChGaWdodERhdGEuRVZFTlRfREFUQV9DSEFOR0UpO1xyXG4gICAgICAgIHN1cGVyLmFzeW5jX3dyaXRlX2RhdGEoY2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLy8tLS1cclxuIl19