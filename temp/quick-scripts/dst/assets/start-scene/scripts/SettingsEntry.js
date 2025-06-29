
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/SettingsEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '5f4bf9+CBFNnYr+ZApa3Yt7', 'SettingsEntry');
// start-scene/scripts/SettingsEntry.ts

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
exports.SettingsEntry = void 0;
// +-+
var SettingsData_1 = require("./SettingsData");
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SettingsEntry = /** @class */ (function (_super) {
    __extends(SettingsEntry, _super);
    function SettingsEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.settings_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    SettingsEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    SettingsEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SettingsData_1.SettingsData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    SettingsEntry.prototype.update_view = function () {
        this.red_point_node.active = GameManager_1.gm.data.server_data.free_rename === 0;
    };
    SettingsEntry.prototype.editor_on_button_click_handler = function (event) {
        var _a;
        if (event.target === ((_a = this.settings_btn) === null || _a === void 0 ? void 0 : _a.node)) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Settings);
        }
    };
    __decorate([
        property(cc.Button)
    ], SettingsEntry.prototype, "settings_btn", void 0);
    __decorate([
        property(cc.Node)
    ], SettingsEntry.prototype, "red_point_node", void 0);
    SettingsEntry = __decorate([
        ccclass
    ], SettingsEntry);
    return SettingsEntry;
}(NodePoolItem_1.NodePoolItem));
exports.SettingsEntry = SettingsEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXFNldHRpbmdzRW50cnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE1BQU07QUFDTiwrQ0FBOEM7QUFDOUMsNkNBQW1DO0FBQ25DLCtDQUE4QztBQUV4QyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUFtQyxpQ0FBWTtJQUEvQztRQUFBLHFFQXlCQztRQXZCVyxrQkFBWSxHQUFxQixJQUFJLENBQUM7UUFHdEMsb0JBQWMsR0FBbUIsSUFBSSxDQUFDOztJQW9CbEQsQ0FBQztJQWxCYSxnQ0FBUSxHQUFsQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsMkJBQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRVMsaUNBQVMsR0FBbkI7UUFDSSxnQkFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLDJCQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBRU8sbUNBQVcsR0FBbkI7UUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRU8sc0RBQThCLEdBQXRDLFVBQXVDLEtBQWU7O1FBQ2xELElBQUksS0FBSyxDQUFDLE1BQU0sWUFBSyxJQUFJLENBQUMsWUFBWSwwQ0FBRSxJQUFJLENBQUEsRUFBRTtZQUMxQyxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdkM7SUFDTCxDQUFDO0lBdEJEO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7dURBQzBCO0lBRzlDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUM7eURBQzRCO0lBTHJDLGFBQWE7UUFEekIsT0FBTztPQUNLLGFBQWEsQ0F5QnpCO0lBQUQsb0JBQUM7Q0F6QkQsQUF5QkMsQ0F6QmtDLDJCQUFZLEdBeUI5QztBQXpCWSxzQ0FBYSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIi8vICstK1xyXG5pbXBvcnQgeyBTZXR0aW5nc0RhdGEgfSBmcm9tICcuL1NldHRpbmdzRGF0YSc7XHJcbmltcG9ydCB7IGdtIH0gZnJvbSAnLi9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IE5vZGVQb29sSXRlbSB9IGZyb20gJy4vTm9kZVBvb2xJdGVtJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NFbnRyeSBleHRlbmRzIE5vZGVQb29sSXRlbSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBzZXR0aW5nc19idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxyXG4gICAgcHJpdmF0ZSByZWRfcG9pbnRfbm9kZTogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBvbkVuYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub24oU2V0dGluZ3NEYXRhLkVWRU5UX0RBVEFfQ0hBTkdFLCB0aGlzLnVwZGF0ZV92aWV3LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICBnbS5kYXRhLmV2ZW50X2VtaXR0ZXIub2ZmKFNldHRpbmdzRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlZF9wb2ludF9ub2RlLmFjdGl2ZSA9IGdtLmRhdGEuc2VydmVyX2RhdGEuZnJlZV9yZW5hbWUgPT09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBlZGl0b3Jfb25fYnV0dG9uX2NsaWNrX2hhbmRsZXIoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gdGhpcy5zZXR0aW5nc19idG4/Lm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5TZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il19