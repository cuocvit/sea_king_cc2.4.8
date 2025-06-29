
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/settings/scripts/Announcement.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1646bqHdctOE47JZg66+CKb', 'Announcement');
// settings/scripts/Announcement.ts

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
var SettingsData_1 = require("../../start-scene/scripts/SettingsData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Announcement = /** @class */ (function (_super) {
    __extends(Announcement, _super);
    function Announcement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        return _this;
    }
    Announcement.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Announcement.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Announcement.prototype.update_view = function () { };
    Announcement.prototype.editor_on_button_click_handler = function (event) {
        if (!(event.target != this.close_btn.node && event.target != this.anywhere_close_btn.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Announcement);
        }
    };
    __decorate([
        property(cc.Button)
    ], Announcement.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Announcement.prototype, "anywhere_close_btn", void 0);
    Announcement = __decorate([
        ccclass
    ], Announcement);
    return Announcement;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2V0dGluZ3NcXHNjcmlwdHNcXEFubm91bmNlbWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBMEU7QUFDMUUsdUVBQXNFO0FBQ3RFLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFFNUQsSUFBQSxLQUF3QixFQUFFLENBQUMsVUFBVSxFQUFuQyxPQUFPLGFBQUEsRUFBRSxRQUFRLGNBQWtCLENBQUM7QUFHNUM7SUFBMkIsZ0NBQVU7SUFBckM7UUFBQSxxRUF5QkM7UUF2QlMsZUFBUyxHQUFxQixJQUFJLENBQUM7UUFHbkMsd0JBQWtCLEdBQXFCLElBQUksQ0FBQzs7SUFvQnRELENBQUM7SUFsQlcsK0JBQVEsR0FBbEI7UUFDRSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLDJCQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqRixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVTLGdDQUFTLEdBQW5CO1FBQ0UsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQywyQkFBWSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEYsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLCtCQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVNLGtDQUFXLEdBQWxCLGNBQTZCLENBQUM7SUFFdEIscURBQThCLEdBQXRDLFVBQXVDLEtBQWU7UUFDcEQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUF0QkQ7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzttREFDdUI7SUFHM0M7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs0REFDZ0M7SUFMaEQsWUFBWTtRQURqQixPQUFPO09BQ0YsWUFBWSxDQXlCakI7SUFBRCxtQkFBQztDQXpCRCxBQXlCQyxDQXpCMEIsdUJBQVUsR0F5QnBDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgU2V0dGluZ3NEYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9TZXR0aW5nc0RhdGEnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5jbGFzcyBBbm5vdW5jZW1lbnQgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gIHByaXZhdGUgY2xvc2VfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICBwcml2YXRlIGFueXdoZXJlX2Nsb3NlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vbihTZXR0aW5nc0RhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoU2V0dGluZ3NEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgIGdtLmNoYW5uZWwuaGlkZV9iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyB1cGRhdGVfdmlldygpOiB2b2lkIHsgfVxyXG5cclxuICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgIGlmICghKGV2ZW50LnRhcmdldCAhPSB0aGlzLmNsb3NlX2J0bi5ub2RlICYmIGV2ZW50LnRhcmdldCAhPSB0aGlzLmFueXdoZXJlX2Nsb3NlX2J0bi5ub2RlKSkge1xyXG4gICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5Bbm5vdW5jZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=