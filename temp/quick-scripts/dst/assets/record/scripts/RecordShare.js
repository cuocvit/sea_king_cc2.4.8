
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/record/scripts/RecordShare.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'c663e57AotPDptHrOvFDwi6', 'RecordShare');
// record/scripts/RecordShare.ts

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
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var Utils_1 = require("../../start-scene/scripts/Utils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RecordShare = /** @class */ (function (_super) {
    __extends(RecordShare, _super);
    function RecordShare() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.bg_spr = null;
        _this.count_lbl = null;
        _this.close_btn = null;
        _this.share_record_btn = null;
        _this._reward_data = null;
        return _this;
    }
    RecordShare.prototype.onEnable = function () {
        this._reward_data = GameManager_1.gm.data.record_data.push_share_reward_data;
        this.count_lbl.string = "+" + this._reward_data.value;
        this.share_record_btn.node.active = GameManager_1.gm.data.record_data.left_push_share_count > 0;
        Utils_1.Utils.async_set_sprite_frame(this.bg_spr, Constants_1.BundleName.RECORD, "res/" + Utils_1.Utils.math_random(true, 1, 5));
    };
    RecordShare.prototype.onDisable = function () {
        GameManager_1.gm.data.record_data.record_state = 0;
        GameManager_1.gm.data.record_data.record_timestamp = 0;
        GameManager_1.gm.data.event_emitter.emit(RecordData_1.RecordData.RECORD_STATE_CHANGE);
        GameManager_1.gm.data.record_data.async_write_data();
    };
    RecordShare.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RecordShare);
        }
        else if (event.target == this.share_record_btn.node) {
            if (0 < GameManager_1.gm.data.record_data.left_push_share_count) {
                GameManager_1.gm.channel.viedo_share(true, function (result) {
                    if (_this._reward_data && 0 == result) {
                        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.RecordShare);
                        GameManager_1.gm.data.record_data.left_push_share_count--;
                        GameManager_1.gm.data.record_data.share_record_count++;
                        GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, _this._reward_data.value);
                        GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.DIAMOND, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                    }
                });
            }
            else {
                GameManager_1.gm.ui.show_notice("Số lần chia sẻ đã hết, hãy quay lại vào ngày mai!!");
            }
        }
    };
    __decorate([
        property(cc.Sprite)
    ], RecordShare.prototype, "bg_spr", void 0);
    __decorate([
        property(cc.Label)
    ], RecordShare.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], RecordShare.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], RecordShare.prototype, "share_record_btn", void 0);
    RecordShare = __decorate([
        ccclass
    ], RecordShare);
    return RecordShare;
}(GameModule_1.GameModule));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVjb3JkXFxzY3JpcHRzXFxSZWNvcmRTaGFyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtRUFBa0U7QUFDbEUscUVBQTJEO0FBQzNELG1FQUFrRTtBQUNsRSx5REFBd0Q7QUFDeEQsaUVBQStGO0FBRXpGLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQTBCLCtCQUFVO0lBQXBDO1FBQUEscUVBZ0RDO1FBOUNXLFlBQU0sR0FBYyxJQUFJLENBQUM7UUFHekIsZUFBUyxHQUFhLElBQUksQ0FBQztRQUczQixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLHNCQUFnQixHQUFjLElBQUksQ0FBQztRQUVuQyxrQkFBWSxHQUFzQixJQUFJLENBQUM7O0lBbUNuRCxDQUFDO0lBakNhLDhCQUFRLEdBQWxCO1FBQ0ksSUFBSSxDQUFDLFlBQVksR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLENBQUM7UUFDL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLENBQUM7UUFDbEYsYUFBSyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsc0JBQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxHQUFHLGFBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pHLENBQUM7SUFFUywrQkFBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyx1QkFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDM0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVPLG9EQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQXRELGlCQWtCQztRQWpCRyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7WUFDckMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakQ7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtZQUNuRCxJQUFJLENBQUMsR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMscUJBQXFCLEVBQUU7Z0JBQy9DLGdCQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsVUFBQyxNQUFjO29CQUN4QyxJQUFJLEtBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLE1BQU0sRUFBRTt3QkFDbEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQzlDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFBO3dCQUMzQyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzt3QkFDekMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLDBCQUFjLENBQUMsYUFBYSxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQzlGLGdCQUFFLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyx3QkFBWSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDNUY7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsb0RBQW9ELENBQUMsQ0FBQzthQUMzRTtTQUNKO0lBQ0wsQ0FBQztJQTdDRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNhO0lBR2pDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7a0RBQ2dCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7a0RBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7eURBQ3VCO0lBWHpDLFdBQVc7UUFEaEIsT0FBTztPQUNGLFdBQVcsQ0FnRGhCO0lBQUQsa0JBQUM7Q0FoREQsQUFnREMsQ0FoRHlCLHVCQUFVLEdBZ0RuQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlY29yZERhdGEgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1JlY29yZERhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgQnVuZGxlTmFtZSwgU2V0SXRlbU51bUVudW0sIFJld2FyZElkRW51bSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ29uc3RhbnRzJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBSZWNvcmRTaGFyZSBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgYmdfc3ByOiBjYy5TcHJpdGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgY291bnRfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHNoYXJlX3JlY29yZF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmV3YXJkX2RhdGE6IHsgdmFsdWU6IG51bWJlciB9ID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fcmV3YXJkX2RhdGEgPSBnbS5kYXRhLnJlY29yZF9kYXRhLnB1c2hfc2hhcmVfcmV3YXJkX2RhdGE7XHJcbiAgICAgICAgdGhpcy5jb3VudF9sYmwuc3RyaW5nID0gXCIrXCIgKyB0aGlzLl9yZXdhcmRfZGF0YS52YWx1ZTtcclxuICAgICAgICB0aGlzLnNoYXJlX3JlY29yZF9idG4ubm9kZS5hY3RpdmUgPSBnbS5kYXRhLnJlY29yZF9kYXRhLmxlZnRfcHVzaF9zaGFyZV9jb3VudCA+IDA7XHJcbiAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmJnX3NwciwgQnVuZGxlTmFtZS5SRUNPUkQsIFwicmVzL1wiICsgVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgMSwgNSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGUgPSAwO1xyXG4gICAgICAgIGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3RpbWVzdGFtcCA9IDA7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoUmVjb3JkRGF0YS5SRUNPUkRfU1RBVEVfQ0hBTkdFKTtcclxuICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuY2xvc2VfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuUmVjb3JkU2hhcmUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuc2hhcmVfcmVjb3JkX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgZ20uZGF0YS5yZWNvcmRfZGF0YS5sZWZ0X3B1c2hfc2hhcmVfY291bnQpIHtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwudmllZG9fc2hhcmUodHJ1ZSwgKHJlc3VsdDogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jld2FyZF9kYXRhICYmIDAgPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlJlY29yZFNoYXJlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5sZWZ0X3B1c2hfc2hhcmVfY291bnQtLVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnNoYXJlX3JlY29yZF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCB0aGlzLl9yZXdhcmRfZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkoUmV3YXJkSWRFbnVtLkRJQU1PTkQsIHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoY2MuVmVjMy5aRVJPKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIlPhu5EgbOG6p24gY2hpYSBz4bq7IMSRw6MgaOG6v3QsIGjDo3kgcXVheSBs4bqhaSB2w6BvIG5nw6B5IG1haSEhXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19