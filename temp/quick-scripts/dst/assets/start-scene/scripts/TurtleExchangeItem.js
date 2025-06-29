
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/TurtleExchangeItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bfae6SGx69Iv6eH7KMjgjQs', 'TurtleExchangeItem');
// start-scene/scripts/TurtleExchangeItem.ts

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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurtleExchangeItem = void 0;
// *-*
var Constants_1 = require("./Constants");
var GameManager_1 = require("./GameManager");
var ListViewItem_1 = require("./ListViewItem");
var Utils_1 = require("./Utils");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TurtleExchangeItem = /** @class */ (function (_super) {
    __extends(TurtleExchangeItem, _super);
    function TurtleExchangeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exchange_light_sf = null;
        _this.exchange_dark_sf = null;
        _this.bg_node = null;
        _this.exchange_btn = null;
        _this.exchange_spr = null;
        _this.prop_spr = null;
        _this.prop_lbl = null;
        _this.exchange_prop_spr = null;
        _this.exchange_prop_lbl = null;
        return _this;
    }
    Object.defineProperty(TurtleExchangeItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            this.update_view();
        },
        enumerable: false,
        configurable: true
    });
    TurtleExchangeItem.prototype.update_view = function () {
        var data = this._data;
        this.bg_node.color = 0 < data.state ? GameManager_1.gm.const.TURTLE_EXCHANGE_COLOR_LIGHT : GameManager_1.gm.const.TURTLE_EXCHANGE_COLOR_DART;
        this.exchange_btn.interactable = 0 < data.state;
        this.exchange_spr.spriteFrame = 0 < data.state ? this.exchange_light_sf : this.exchange_dark_sf;
        Utils_1.Utils.async_set_sprite_frame(this.prop_spr, Constants_1.BundleName.MAP, "res/" + t.prop_id);
        Utils_1.Utils.async_set_sprite_frame(this.exchange_prop_spr, Constants_1.BundleName.MAP, "res/" + t.exchange_prop_id);
        this.prop_lbl.string = data.prop_num + "";
        this.exchange_prop_lbl.string = data.exchange_prop_num + "";
    };
    TurtleExchangeItem.prototype.reset = function () {
        this.prop_spr.spriteFrame = null;
    };
    TurtleExchangeItem.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.exchange_btn.node) {
            var mapCellData = GameManager_1.gm.data.mapCell_data;
            var data = this._data;
            var turtleExchangeData = GameManager_1.gm.data.turtle_exchange_data;
            if (turtleExchangeData.left_refresh_count <= 0) {
                GameManager_1.gm.ui.show_notice("Không đủ thời gian đổi thưởng, vui lòng mua thêm");
            }
            else {
                if (mapCellData.getIsHaveSpeceCellID()) {
                    if (0 < data.exchange_prop_id && 0 < data.exchange_prop_num) {
                        if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL || data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                            if (1 == data.exchange_prop_num) {
                                var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", data.prop_id.toString());
                                if (itemConfig.type == Constants_1.PropTypeEnum.COIN_TYPE) {
                                    if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10615);
                                        NetUtils_1.ReportData.instance.report_point(10616);
                                    }
                                    else if (data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10611);
                                        NetUtils_1.ReportData.instance.report_point(10612);
                                    }
                                }
                                else if (itemConfig.type == Constants_1.PropTypeEnum.DIAMONDS_TYPE) {
                                    if (data.exchange_prop_id == Constants_1.RewardIdEnum.GOLD_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10617);
                                        NetUtils_1.ReportData.instance.report_point(10618);
                                    }
                                    else if (data.exchange_prop_id == Constants_1.RewardIdEnum.SILVER_BARREL) {
                                        NetUtils_1.ReportData.instance.report_once_point(10613);
                                        NetUtils_1.ReportData.instance.report_point(10614);
                                    }
                                }
                                mapCellData.delCellItem(data.prop_id, data.prop_num);
                                mapCellData.addBarrelInMap(data.exchange_prop_id);
                                turtleExchangeData.left_refresh_count--;
                                turtleExchangeData.async_write_data();
                            }
                        }
                        else {
                            cc.error("超出需求的奖励");
                        }
                    }
                    else {
                        GameManager_1.gm.ui.show_auto_merge_message();
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], TurtleExchangeItem.prototype, "exchange_light_sf", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], TurtleExchangeItem.prototype, "exchange_dark_sf", void 0);
    __decorate([
        property(cc.Node)
    ], TurtleExchangeItem.prototype, "bg_node", void 0);
    __decorate([
        property(cc.Button)
    ], TurtleExchangeItem.prototype, "exchange_btn", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "exchange_spr", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchangeItem.prototype, "prop_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], TurtleExchangeItem.prototype, "exchange_prop_spr", void 0);
    __decorate([
        property(cc.Label)
    ], TurtleExchangeItem.prototype, "exchange_prop_lbl", void 0);
    TurtleExchangeItem = __decorate([
        ccclass
    ], TurtleExchangeItem);
    return TurtleExchangeItem;
}(ListViewItem_1.ListViewItem));
exports.TurtleExchangeItem = TurtleExchangeItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFR1cnRsZUV4Y2hhbmdlSXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLHlDQUFxRTtBQUNyRSw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBQzlDLGlDQUFnQztBQUNoQyx1Q0FBd0M7QUFJbEMsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBd0Msc0NBQVk7SUFBcEQ7UUFBQSxxRUFvR0M7UUFsR1csdUJBQWlCLEdBQTBCLElBQUksQ0FBQztRQUdoRCxzQkFBZ0IsR0FBMEIsSUFBSSxDQUFDO1FBRy9DLGFBQU8sR0FBbUIsSUFBSSxDQUFDO1FBRy9CLGtCQUFZLEdBQXFCLElBQUksQ0FBQztRQUd0QyxrQkFBWSxHQUFxQixJQUFJLENBQUM7UUFHdEMsY0FBUSxHQUFxQixJQUFJLENBQUM7UUFHbEMsY0FBUSxHQUFvQixJQUFJLENBQUM7UUFHakMsdUJBQWlCLEdBQXFCLElBQUksQ0FBQztRQUczQyx1QkFBaUIsR0FBb0IsSUFBSSxDQUFDOztJQTBFdEQsQ0FBQztJQXRFRyxzQkFBVyxvQ0FBSTthQUFmO1lBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3RCLENBQUM7YUFFRCxVQUFnQixLQUE2QjtZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdkIsQ0FBQzs7O09BTEE7SUFPTSx3Q0FBVyxHQUFsQjtRQUNJLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGdCQUFFLENBQUMsS0FBSyxD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LFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUMwQjtJQUc5QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOzREQUMwQjtJQUc5QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3dEQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtJQUd6QztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO2lFQUMrQjtJQUduRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2lFQUMrQjtJQTFCekMsa0JBQWtCO1FBRDlCLE9BQU87T0FDSyxrQkFBa0IsQ0FvRzlCO0lBQUQseUJBQUM7Q0FwR0QsQUFvR0MsQ0FwR3VDLDJCQUFZLEdBb0duRDtBQXBHWSxnREFBa0IiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyAqLSpcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgUmV3YXJkSWRFbnVtLCBQcm9wVHlwZUVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IExpc3RWaWV3SXRlbSB9IGZyb20gJy4vTGlzdFZpZXdJdGVtJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgUmVwb3J0RGF0YSB9IGZyb20gJy4vTmV0VXRpbHMnO1xyXG5pbXBvcnQgeyBJdGVtQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbSc7XHJcbmltcG9ydCB7IFR1cnRsZUV4Y2hhbmdlSXRlbURhdGEgfSBmcm9tICcuL1R1cnRsZUV4Y2hhbmdlRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFR1cnRsZUV4Y2hhbmdlSXRlbSBleHRlbmRzIExpc3RWaWV3SXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlX2xpZ2h0X3NmOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcclxuICAgIHByaXZhdGUgZXhjaGFuZ2VfZGFya19zZjogY2MuU3ByaXRlRnJhbWUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgYmdfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGV4Y2hhbmdlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgZXhjaGFuZ2Vfc3ByOiBjYy5TcHJpdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBwcm9wX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBwcm9wX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuU3ByaXRlKVxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZV9wcm9wX3NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBleGNoYW5nZV9wcm9wX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwdWJsaWMgX2RhdGE6IFR1cnRsZUV4Y2hhbmdlSXRlbURhdGE7XHJcblxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IFR1cnRsZUV4Y2hhbmdlSXRlbURhdGEge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZGF0YSh2YWx1ZTogVHVydGxlRXhjaGFuZ2VJdGVtRGF0YSkge1xyXG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZV92aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgIHRoaXMuYmdfbm9kZS5jb2xvciA9IDAgPCBkYXRhLnN0YXRlID8gZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX0NPTE9SX0xJR0hUIDogZ20uY29uc3QuVFVSVExFX0VYQ0hBTkdFX0NPTE9SX0RBUlQ7XHJcbiAgICAgICAgdGhpcy5leGNoYW5nZV9idG4uaW50ZXJhY3RhYmxlID0gMCA8IGRhdGEuc3RhdGU7XHJcbiAgICAgICAgdGhpcy5leGNoYW5nZV9zcHIuc3ByaXRlRnJhbWUgPSAwIDwgZGF0YS5zdGF0ZSA/IHRoaXMuZXhjaGFuZ2VfbGlnaHRfc2YgOiB0aGlzLmV4Y2hhbmdlX2Rhcmtfc2Y7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLnByb3Bfc3ByLCBCdW5kbGVOYW1lLk1BUCwgXCJyZXMvXCIgKyB0LnByb3BfaWQpO1xyXG4gICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5leGNoYW5nZV9wcm9wX3NwciwgQnVuZGxlTmFtZS5NQVAsIFwicmVzL1wiICsgdC5leGNoYW5nZV9wcm9wX2lkKTtcclxuICAgICAgICB0aGlzLnByb3BfbGJsLnN0cmluZyA9IGRhdGEucHJvcF9udW0gKyBcIlwiO1xyXG4gICAgICAgIHRoaXMuZXhjaGFuZ2VfcHJvcF9sYmwuc3RyaW5nID0gZGF0YS5leGNoYW5nZV9wcm9wX251bSArIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvcF9zcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmV4Y2hhbmdlX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hcENlbGxEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGE7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl9kYXRhO1xyXG4gICAgICAgICAgICBjb25zdCB0dXJ0bGVFeGNoYW5nZURhdGEgPSBnbS5kYXRhLnR1cnRsZV9leGNoYW5nZV9kYXRhO1xyXG4gICAgICAgICAgICBpZiAodHVydGxlRXhjaGFuZ2VEYXRhLmxlZnRfcmVmcmVzaF9jb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIktow7RuZyDEkeG7pyB0aOG7nWkgZ2lhbiDEkeG7lWkgdGjGsOG7n25nLCB2dWkgbMOybmcgbXVhIHRow6ptXCIpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hcENlbGxEYXRhLmdldElzSGF2ZVNwZWNlQ2VsbElEKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoMCA8IGRhdGEuZXhjaGFuZ2VfcHJvcF9pZCAmJiAwIDwgZGF0YS5leGNoYW5nZV9wcm9wX251bSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5leGNoYW5nZV9wcm9wX2lkID09IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTCB8fCBkYXRhLmV4Y2hhbmdlX3Byb3BfaWQgPT0gUmV3YXJkSWRFbnVtLlNJTFZFUl9CQVJSRUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgxID09IGRhdGEuZXhjaGFuZ2VfcHJvcF9udW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIGRhdGEucHJvcF9pZC50b1N0cmluZygpKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtQ29uZmlnLnR5cGUgPT0gUHJvcFR5cGVFbnVtLkNPSU5fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5leGNoYW5nZV9wcm9wX2lkID09IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYxNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDYxNik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5leGNoYW5nZV9wcm9wX2lkID09IFJld2FyZElkRW51bS5TSUxWRVJfQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjExKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjEyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW1Db25maWcudHlwZSA9PSBQcm9wVHlwZUVudW0uRElBTU9ORFNfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5leGNoYW5nZV9wcm9wX2lkID09IFJld2FyZElkRW51bS5HT0xEX0JBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYxNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDYxOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5leGNoYW5nZV9wcm9wX2lkID09IFJld2FyZElkRW51bS5TSUxWRVJfQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjEzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNjE0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXBDZWxsRGF0YS5kZWxDZWxsSXRlbShkYXRhLnByb3BfaWQsIGRhdGEucHJvcF9udW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcENlbGxEYXRhLmFkZEJhcnJlbEluTWFwKGRhdGEuZXhjaGFuZ2VfcHJvcF9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHVydGxlRXhjaGFuZ2VEYXRhLmxlZnRfcmVmcmVzaF9jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1cnRsZUV4Y2hhbmdlRGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5lcnJvcihcIui2heWHuumcgOaxgueahOWlluWKsVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfYXV0b19tZXJnZV9tZXNzYWdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==