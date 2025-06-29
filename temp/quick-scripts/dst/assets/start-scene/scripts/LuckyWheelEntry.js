
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/LuckyWheelEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'e70d1Tdb6FHMKBZN24RZdwM', 'LuckyWheelEntry');
// start-scene/scripts/LuckyWheelEntry.ts

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
exports.LuckyWheelEntry = void 0;
// +-+
var LuckyWheelData_1 = require("./LuckyWheelData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LuckyWheelEntry = /** @class */ (function (_super) {
    __extends(LuckyWheelEntry, _super);
    function LuckyWheelEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.lucky_wheel_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    LuckyWheelEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(LuckyWheelData_1.LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    LuckyWheelEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(LuckyWheelData_1.LuckyWheelData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    LuckyWheelEntry.prototype.update_view = function () {
        this.red_point_node.active = GameManager_1.gm.data.lucky_wheel_data.left_lucky_wheel_video_count > 0;
    };
    LuckyWheelEntry.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.lucky_wheel_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.LuckyWheel);
        }
    };
    __decorate([
        property(cc.Button)
    ], LuckyWheelEntry.prototype, "lucky_wheel_btn", void 0);
    __decorate([
        property(cc.Node)
    ], LuckyWheelEntry.prototype, "red_point_node", void 0);
    LuckyWheelEntry = __decorate([
        ccclass
    ], LuckyWheelEntry);
    return LuckyWheelEntry;
}(NodePoolItem_1.NodePoolItem));
exports.LuckyWheelEntry = LuckyWheelEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEx1Y2t5V2hlZWxFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLG1EQUFrRDtBQUNsRCw2Q0FBbUM7QUFDbkMsK0NBQThDO0FBRXhDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQXFDLG1DQUFZO0lBQWpEO1FBQUEscUVBeUJDO1FBdkJXLHFCQUFlLEdBQXFCLElBQUksQ0FBQztRQUd6QyxvQkFBYyxHQUFtQixJQUFJLENBQUM7O0lBb0JsRCxDQUFDO0lBbEJhLGtDQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQywrQkFBYyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkYsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFUyxtQ0FBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsK0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFTyxxQ0FBVyxHQUFuQjtRQUNJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLDRCQUE0QixHQUFHLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRU8sd0RBQThCLEdBQXRDLFVBQXVDLEtBQWU7UUFDbEQsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxlQUFnQixDQUFDLElBQUksRUFBRTtZQUM1QyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDekM7SUFDTCxDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7NERBQzZCO0lBR2pEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7MkRBQzRCO0lBTHJDLGVBQWU7UUFEM0IsT0FBTztPQUNLLGVBQWUsQ0F5QjNCO0lBQUQsc0JBQUM7Q0F6QkQsQUF5QkMsQ0F6Qm9DLDJCQUFZLEdBeUJoRDtBQXpCWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBMdWNreVdoZWVsRGF0YSB9IGZyb20gJy4vTHVja3lXaGVlbERhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4vR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBOb2RlUG9vbEl0ZW0gfSBmcm9tICcuL05vZGVQb29sSXRlbSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIEx1Y2t5V2hlZWxFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBsdWNreV93aGVlbF9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZWRfcG9pbnRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oTHVja3lXaGVlbERhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoTHVja3lXaGVlbERhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZWRfcG9pbnRfbm9kZS5hY3RpdmUgPSBnbS5kYXRhLmx1Y2t5X3doZWVsX2RhdGEubGVmdF9sdWNreV93aGVlbF92aWRlb19jb3VudCA+IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PSB0aGlzLmx1Y2t5X3doZWVsX2J0biEubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0Lkx1Y2t5V2hlZWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==