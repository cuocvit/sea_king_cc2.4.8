
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/special_build/scripts/StoreList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'd6c0fIvtkFKYI1pYy2in446', 'StoreList');
// special_build/scripts/StoreList.ts

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
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var Timer_1 = require("../../start-scene/scripts/Timer");
var Utils_1 = require("../../start-scene/scripts/Utils");
var RecordData_1 = require("../../start-scene/scripts/RecordData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var StoreList = /** @class */ (function (_super) {
    __extends(StoreList, _super);
    function StoreList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show_panle = null;
        _this.store_list = null;
        _this.daily_list = null;
        _this.video_list = null;
        _this.diamond_list = null;
        _this.btn_close = null;
        _this.btn_refresh = null;
        _this.ref_time_lbl = null;
        _this.btn_close_bg = null;
        _this._time = null;
        return _this;
    }
    StoreList.prototype.onLoad = function () { };
    StoreList.prototype.onEnable = function () {
        if (GameManager_1.gm.data.store_data.refresh_time <= Date.now() / 1000 || GameManager_1.gm.data.store_data.daily_store_array.length > 4) {
            GameManager_1.gm.data.store_data.refresh_store();
        }
        GameManager_1.gm.data.event_emitter.on(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this.on_record_state_change_handler();
        this.showStoreList();
        this.showStoreDailyList();
        this.showVideoDailyList();
        this.showDiamondDailyList();
    };
    StoreList.prototype.onDisable = function () {
        this.store_list.reset();
        this.daily_list.reset();
        this.video_list.reset();
        this.diamond_list.reset();
        GameManager_1.gm.data.event_emitter.off(RecordData_1.RecordData.RECORD_STATE_CHANGE, this.on_record_state_change_handler, this);
        this._time && this._time.stop();
    };
    StoreList.prototype.on_record_state_change_handler = function () {
        var _this = this;
        if (!this._time) {
            this._time = new Timer_1.Timer();
        }
        if (!this._time.is_running) {
            this._time.start(function () {
                var time = Math.floor(GameManager_1.gm.data.store_data.refresh_time - Date.now() / 1000);
                _this.ref_time_lbl.string = "Thời gian làm mới: " + Utils_1.Utils.time_format(time, "mm:ss");
                if (time <= 0) {
                    GameManager_1.gm.data.store_data.refresh_store();
                    _this.showStoreDailyList();
                    _this.showStoreList();
                }
            }, 1000, 0);
        }
    };
    StoreList.prototype.showStoreList = function () {
        this.store_list.setData(GameManager_1.gm.data.store_data.store_array);
    };
    StoreList.prototype.showStoreDailyList = function () {
        this.daily_list.setData(GameManager_1.gm.data.store_data.daily_store_array);
    };
    StoreList.prototype.showVideoDailyList = function () {
        this.video_list.setData(GameManager_1.gm.data.store_data.video_store_array);
    };
    StoreList.prototype.showDiamondDailyList = function () {
        this.diamond_list.setData(GameManager_1.gm.data.store_data.diamond_store_array);
    };
    StoreList.prototype.editor_on_button_click_handler = function (event) {
        if (event.target === this.btn_close.node || event.target === this.btn_close_bg.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Store);
        }
        else if (event.target === this.btn_refresh.node) {
            if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < 5) {
                GameManager_1.gm.ui.show_notice("Không đủ kim cương");
            }
            else {
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, 5);
                GameManager_1.gm.data.store_data.refresh_store();
                this.showStoreDailyList();
                this.showStoreList();
                this.showDiamondDailyList();
                this.showVideoDailyList();
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], StoreList.prototype, "show_panle", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "store_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "daily_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "video_list", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], StoreList.prototype, "diamond_list", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_close", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_refresh", void 0);
    __decorate([
        property(cc.Label)
    ], StoreList.prototype, "ref_time_lbl", void 0);
    __decorate([
        property(cc.Button)
    ], StoreList.prototype, "btn_close_bg", void 0);
    StoreList = __decorate([
        ccclass
    ], StoreList);
    return StoreList;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3BlY2lhbF9idWlsZFxcc2NyaXB0c1xcU3RvcmVMaXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1FQUFrRTtBQUNsRSwrREFBOEQ7QUFDOUQseURBQXdEO0FBQ3hELHlEQUF3RDtBQUN4RCxtRUFBa0U7QUFDbEUscUVBQTJEO0FBQzNELGlFQUFxRTtBQUUvRCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qiw2QkFBVTtJQUFsQztRQUFBLHFFQXNHQztRQXBHVyxnQkFBVSxHQUFZLElBQUksQ0FBQztRQUczQixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixnQkFBVSxHQUFhLElBQUksQ0FBQztRQUc1QixrQkFBWSxHQUFhLElBQUksQ0FBQztRQUc5QixlQUFTLEdBQWMsSUFBSSxDQUFDO1FBRzVCLGlCQUFXLEdBQWMsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWEsSUFBSSxDQUFDO1FBRzlCLGtCQUFZLEdBQWMsSUFBSSxDQUFDO1FBRS9CLFdBQUssR0FBaUIsSUFBSSxDQUFDOztJQTBFdkMsQ0FBQztJQXhFYSwwQkFBTSxHQUFoQixjQUEyQixDQUFDO0lBRWxCLDRCQUFRLEdBQWxCO1FBQ0ksSUFBSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLElBQUksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVB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LENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQzttREFDbUI7SUFHdEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDbUI7SUExQnJDLFNBQVM7UUFEZCxPQUFPO09BQ0YsU0FBUyxDQXNHZDtJQUFELGdCQUFDO0NBdEdELEFBc0dDLENBdEd1Qix1QkFBVSxHQXNHakMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgTGlzdFZpZXcgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0xpc3RWaWV3JztcclxuaW1wb3J0IHsgVGltZXIgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1RpbWVyJztcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL1V0aWxzJztcclxuaW1wb3J0IHsgUmVjb3JkRGF0YSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvUmVjb3JkRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IFNldEl0ZW1OdW1FbnVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmNsYXNzIFN0b3JlTGlzdCBleHRlbmRzIEdhbWVNb2R1bGUge1xyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIHNob3dfcGFubGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgc3RvcmVfbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgZGFpbHlfbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgdmlkZW9fbGlzdDogTGlzdFZpZXcgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShMaXN0VmlldylcclxuICAgIHByaXZhdGUgZGlhbW9uZF9saXN0OiBMaXN0VmlldyA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYnRuX2Nsb3NlOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJ0bl9yZWZyZXNoOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5MYWJlbClcclxuICAgIHByaXZhdGUgcmVmX3RpbWVfbGJsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYnRuX2Nsb3NlX2JnOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgX3RpbWU6IFRpbWVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHsgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5zdG9yZV9kYXRhLnJlZnJlc2hfdGltZSA8PSBEYXRlLm5vdygpIC8gMTAwMCB8fCBnbS5kYXRhLnN0b3JlX2RhdGEuZGFpbHlfc3RvcmVfYXJyYXkubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICBnbS5kYXRhLnN0b3JlX2RhdGEucmVmcmVzaF9zdG9yZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oUmVjb3JkRGF0YS5SRUNPUkRfU1RBVEVfQ0hBTkdFLCB0aGlzLm9uX3JlY29yZF9zdGF0ZV9jaGFuZ2VfaGFuZGxlciwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5vbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIoKTtcclxuICAgICAgICB0aGlzLnNob3dTdG9yZUxpc3QoKTtcclxuICAgICAgICB0aGlzLnNob3dTdG9yZURhaWx5TGlzdCgpO1xyXG4gICAgICAgIHRoaXMuc2hvd1ZpZGVvRGFpbHlMaXN0KCk7XHJcbiAgICAgICAgdGhpcy5zaG93RGlhbW9uZERhaWx5TGlzdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9yZV9saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5kYWlseV9saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy52aWRlb19saXN0LnJlc2V0KCk7XHJcbiAgICAgICAgdGhpcy5kaWFtb25kX2xpc3QucmVzZXQoKTtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFJlY29yZERhdGEuUkVDT1JEX1NUQVRFX0NIQU5HRSwgdGhpcy5vbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3RpbWUgJiYgdGhpcy5fdGltZS5zdG9wKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbl9yZWNvcmRfc3RhdGVfY2hhbmdlX2hhbmRsZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90aW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpbWUgPSBuZXcgVGltZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLl90aW1lLmlzX3J1bm5pbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGltZS5zdGFydCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aW1lOiBudW1iZXIgPSBNYXRoLmZsb29yKGdtLmRhdGEuc3RvcmVfZGF0YS5yZWZyZXNoX3RpbWUgLSBEYXRlLm5vdygpIC8gMTAwMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlZl90aW1lX2xibC5zdHJpbmcgPSBcIlRo4budaSBnaWFuIGzDoG0gbeG7m2k6IFwiICsgVXRpbHMudGltZV9mb3JtYXQodGltZSwgXCJtbTpzc1wiKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aW1lIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLnN0b3JlX2RhdGEucmVmcmVzaF9zdG9yZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0b3JlRGFpbHlMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93U3RvcmVMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dTdG9yZUxpc3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9yZV9saXN0LnNldERhdGEoZ20uZGF0YS5zdG9yZV9kYXRhLnN0b3JlX2FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob3dTdG9yZURhaWx5TGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhaWx5X2xpc3Quc2V0RGF0YShnbS5kYXRhLnN0b3JlX2RhdGEuZGFpbHlfc3RvcmVfYXJyYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvd1ZpZGVvRGFpbHlMaXN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmlkZW9fbGlzdC5zZXREYXRhKGdtLmRhdGEuc3RvcmVfZGF0YS52aWRlb19zdG9yZV9hcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG93RGlhbW9uZERhaWx5TGlzdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpYW1vbmRfbGlzdC5zZXREYXRhKGdtLmRhdGEuc3RvcmVfZGF0YS5kaWFtb25kX3N0b3JlX2FycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLmJ0bl9jbG9zZS5ub2RlIHx8IGV2ZW50LnRhcmdldCA9PT0gdGhpcy5idG5fY2xvc2VfYmcubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5TdG9yZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChldmVudC50YXJnZXQgPT09IHRoaXMuYnRuX3JlZnJlc2gubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmRpYW1vbmROdW0gPCA1KSB7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIktow7RuZyDEkeG7pyBraW0gY8awxqFuZ1wiKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIDUpO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5zdG9yZV9kYXRhLnJlZnJlc2hfc3RvcmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1N0b3JlRGFpbHlMaXN0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dTdG9yZUxpc3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0RpYW1vbmREYWlseUxpc3QoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvRGFpbHlMaXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iXX0=