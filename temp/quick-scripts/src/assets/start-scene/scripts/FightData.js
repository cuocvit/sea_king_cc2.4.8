"use strict";
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