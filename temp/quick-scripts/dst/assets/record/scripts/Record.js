
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/record/scripts/Record.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bd637DpVetLZbwURZnF2k+7', 'Record');
// record/scripts/Record.ts

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
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Record = /** @class */ (function (_super) {
    __extends(Record, _super);
    function Record() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count_lbl = null;
        _this.close_btn = null;
        _this.record_btn = null;
        _this.share_record_btn = null;
        return _this;
    }
    Record.prototype.onEnable = function () {
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        if (GameManager_1.gm.data.record_data.share_record_count < GameManager_1.gm.data.record_data.reward_array.length) {
            this._reward_data = GameManager_1.gm.data.record_data.reward_array[GameManager_1.gm.data.record_data.share_record_count];
        }
        else {
            this._reward_data = GameManager_1.gm.data.record_data.reward_data;
        }
        if (5 <= GameManager_1.gm.data.record_data.share_record_count) {
            this._reward_data.value = 0;
        }
        this.count_lbl.string = "+" + this._reward_data.value;
        this.record_btn.node.active = 0 == GameManager_1.gm.data.record_data.record_state;
        this.share_record_btn.node.active = 2 == GameManager_1.gm.data.record_data.record_state;
    };
    Record.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        if (1 == GameManager_1.gm.data.record_data.record_type && 2 == GameManager_1.gm.data.record_data.record_state) {
            GameManager_1.gm.data.record_data.record_state = 0;
            GameManager_1.gm.data.record_data.record_timestamp = 0;
            GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            GameManager_1.gm.data.record_data.async_write_data();
        }
    };
    Record.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
        }
        else if (event.target == this.record_btn.node) {
            GameManager_1.gm.channel.record_start();
            GameManager_1.gm.data.record_data.record_state = 1;
            GameManager_1.gm.data.record_data.record_type = 1;
            GameManager_1.gm.data.record_data.record_timestamp = Date.now();
            GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
        }
        else if (event.target == this.share_record_btn.node) {
            GameManager_1.gm.channel.viedo_share(true, function (result) {
                if (_this._reward_data && 0 == result) {
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Record);
                    GameManager_1.gm.data.record_data.share_record_count++;
                    GameManager_1.gm.data.record_data.record_state = 0;
                    GameManager_1.gm.data.record_data.record_timestamp = 0;
                    GameManager_1.gm.data.event_emitter.emit(i.RecordData.RECORD_STATE_CHANGE);
                    GameManager_1.gm.data.record_data.async_write_data();
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, _this._reward_data.value);
                    GameManager_1.gm.ui.show_coin_fly(Constants_1.RewardIdEnum.GOLD, _this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
            });
        }
    };
    __decorate([
        property(cc.Label)
    ], Record.prototype, "count_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "record_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Record.prototype, "share_record_btn", void 0);
    Record = __decorate([
        ccclass
    ], Record);
    return Record;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xccmVjb3JkXFxzY3JpcHRzXFxSZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkVBQTBFO0FBQzFFLGlFQUFtRjtBQUNuRixxRUFBMkQ7QUFDM0QsbUVBQWtFO0FBRTVELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFCLDBCQUFVO0lBQS9CO1FBQUEscUVBcUVDO1FBbkVXLGVBQVMsR0FBYSxJQUFJLENBQUM7UUFHM0IsZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFjLElBQUksQ0FBQztRQUc3QixzQkFBZ0IsR0FBYyxJQUFJLENBQUM7O0lBMEQvQyxDQUFDO0lBdERhLHlCQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7WUFDbEYsSUFBSSxDQUFDLFlBQVksR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2hHO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUM7U0FDdkQ7UUFFRCxJQUFJLENBQUMsSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUU7WUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBRUQs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QUN6QyxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDN0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7b0JBQ3ZDLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsMEJBQWMsQ0FBQyxhQUFhLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0YsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLHdCQUFZLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUN6RjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBbEVEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7NkNBQ2dCO0lBR25DO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NkNBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ2lCO0lBR3JDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7b0RBQ3VCO0lBWHpDLE1BQU07UUFEWCxPQUFPO09BQ0YsTUFBTSxDQXFFWDtJQUFELGFBQUM7Q0FyRUQsQUFxRUMsQ0FyRW9CLHVCQUFVLEdBcUU5QiIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJBTk5FUl9BRF9UWVBFIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9DaGFubmVsTWFuYWdlcic7XHJcbmltcG9ydCB7IFNldEl0ZW1OdW1FbnVtLCBSZXdhcmRJZEVudW0gfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFJlY29yZCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBjb3VudF9sYmw6IGNjLkxhYmVsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgcmVjb3JkX2J0bjogY2MuQnV0dG9uID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBzaGFyZV9yZWNvcmRfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3Jld2FyZF9kYXRhOiB7IHZhbHVlOiBudW1iZXIgfTtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgICAgIGlmIChnbS5kYXRhLnJlY29yZF9kYXRhLnNoYXJlX3JlY29yZF9jb3VudCA8IGdtLmRhdGEucmVjb3JkX2RhdGEucmV3YXJkX2FycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRfZGF0YSA9IGdtLmRhdGEucmVjb3JkX2RhdGEucmV3YXJkX2FycmF5W2dtLmRhdGEucmVjb3JkX2RhdGEuc2hhcmVfcmVjb3JkX2NvdW50XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRfZGF0YSA9IGdtLmRhdGEucmVjb3JkX2RhdGEucmV3YXJkX2RhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoNSA8PSBnbS5kYXRhLnJlY29yZF9kYXRhLnNoYXJlX3JlY29yZF9jb3VudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRfZGF0YS52YWx1ZSA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvdW50X2xibC5zdHJpbmcgPSBcIitcIiArIHRoaXMuX3Jld2FyZF9kYXRhLnZhbHVlO1xyXG4gICAgICAgIHRoaXMucmVjb3JkX2J0bi5ub2RlLmFjdGl2ZSA9IDAgPT0gZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGU7XHJcbiAgICAgICAgdGhpcy5zaGFyZV9yZWNvcmRfYnRuLm5vZGUuYWN0aXZlID0gMiA9PSBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF9zdGF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuaGlkZV9iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgICAgICBpZiAoMSA9PSBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90eXBlICYmIDIgPT0gZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGUgPSAwO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90aW1lc3RhbXAgPSAwO1xyXG4gICAgICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIuZW1pdChpLlJlY29yZERhdGEuUkVDT1JEX1NUQVRFX0NIQU5HRSk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEucmVjb3JkX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuY2xvc2VfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuUmVjb3JkKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5yZWNvcmRfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20uY2hhbm5lbC5yZWNvcmRfc3RhcnQoKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfc3RhdGUgPSAxO1xyXG4gICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90eXBlID0gMTtcclxuICAgICAgICAgICAgZ20uZGF0YS5yZWNvcmRfZGF0YS5yZWNvcmRfdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLmVtaXQoaS5SZWNvcmREYXRhLlJFQ09SRF9TVEFURV9DSEFOR0UpO1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5SZWNvcmQpO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLnNoYXJlX3JlY29yZF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS5jaGFubmVsLnZpZWRvX3NoYXJlKHRydWUsIChyZXN1bHQ6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3Jld2FyZF9kYXRhICYmIDAgPT0gcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuUmVjb3JkKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnNoYXJlX3JlY29yZF9jb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEucmVjb3JkX2RhdGEucmVjb3JkX3N0YXRlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLnJlY29yZF90aW1lc3RhbXAgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5lbWl0KGkuUmVjb3JkRGF0YS5SRUNPUkRfU1RBVEVfQ0hBTkdFKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnJlY29yZF9kYXRhLmFzeW5jX3dyaXRlX2RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCB0aGlzLl9yZXdhcmRfZGF0YS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShSZXdhcmRJZEVudW0uR09MRCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==