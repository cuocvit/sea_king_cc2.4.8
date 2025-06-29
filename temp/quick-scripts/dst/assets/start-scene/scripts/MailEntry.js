
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/MailEntry.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0c1e3Qsgb1NxrfgeL2xRAoq', 'MailEntry');
// start-scene/scripts/MailEntry.ts

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
exports.MailEntry = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var NodePoolItem_1 = require("./NodePoolItem");
var Constants_1 = require("./Constants");
var ServerData_1 = require("./ServerData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var MailEntry = /** @class */ (function (_super) {
    __extends(MailEntry, _super);
    function MailEntry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mail_btn = null;
        _this.red_point_node = null;
        return _this;
    }
    MailEntry.prototype.onEnable = function () {
        GameManager_1.gm.data.event_emitter.on(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
    };
    MailEntry.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(ServerData_1.ServerData.EVENT_DATA_CHANGE, this.update_view, this);
    };
    MailEntry.prototype.update_view = function () {
        if (this.red_point_node) {
            this.red_point_node.active = GameManager_1.gm.data.server_data.mail_red_point;
        }
    };
    MailEntry.prototype.editor_on_button_click_handler = function (event) {
        var buildData = GameManager_1.gm.data.mapCell_data.getBuildDataByType(Constants_1.BuildTypeEnum.GARRISION_TYPE);
        if (!buildData || buildData.buildLvl < 1) {
            GameManager_1.gm.ui.show_notice("Điều kiện mở Liên Minh Hải Vương: Quân đồn trú đạt cấp 1");
        }
        else if (event.target == this.mail_btn.node) {
            GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.Mail);
        }
    };
    __decorate([
        property(cc.Button)
    ], MailEntry.prototype, "mail_btn", void 0);
    __decorate([
        property(cc.Node)
    ], MailEntry.prototype, "red_point_node", void 0);
    MailEntry = __decorate([
        ccclass
    ], MailEntry);
    return MailEntry;
}(NodePoolItem_1.NodePoolItem));
exports.MailEntry = MailEntry;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXE1haWxFbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLDZDQUFtQztBQUNuQywrQ0FBOEM7QUFDOUMseUNBQTRDO0FBQzVDLDJDQUEwQztBQUVwQyxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUErQiw2QkFBWTtJQUEzQztRQUFBLHFFQThCQztRQTVCVyxjQUFRLEdBQXFCLElBQUksQ0FBQztRQUdsQyxvQkFBYyxHQUFtQixJQUFJLENBQUM7O0lBeUJsRCxDQUFDO0lBdkJhLDRCQUFRLEdBQWxCO1FBQ0ksZ0JBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyx1QkFBVSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFUyw2QkFBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsdUJBQVUsQ0FBQyxpQkFBaUIsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFFTywrQkFBVyxHQUFuQjtRQUNJLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxnQkFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVPLGtEQUE4QixHQUF0QyxVQUF1QyxLQUFlO1FBQ2xELElBQU0sU0FBUyxHQUFHLGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyx5QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3hGLElBQUksQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7WUFDdEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLDBEQUEwRCxDQUFDLENBQUM7U0FDakY7YUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7WUFDM0MsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ25DO0lBQ0wsQ0FBQztJQTNCRDtRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDOytDQUNzQjtJQUcxQztRQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3FEQUM0QjtJQUxyQyxTQUFTO1FBRHJCLE9BQU87T0FDSyxTQUFTLENBOEJyQjtJQUFELGdCQUFDO0NBOUJELEFBOEJDLENBOUI4QiwyQkFBWSxHQThCMUM7QUE5QlksOEJBQVMiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBCdWlsZFR5cGVFbnVtIH0gZnJvbSAnLi9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBTZXJ2ZXJEYXRhIH0gZnJvbSAnLi9TZXJ2ZXJEYXRhJztcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgTWFpbEVudHJ5IGV4dGVuZHMgTm9kZVBvb2xJdGVtIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIG1haWxfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcclxuICAgIHByaXZhdGUgcmVkX3BvaW50X25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcm90ZWN0ZWQgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uZGF0YS5ldmVudF9lbWl0dGVyLm9uKFNlcnZlckRhdGEuRVZFTlRfREFUQV9DSEFOR0UsIHRoaXMudXBkYXRlX3ZpZXcsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmRhdGEuZXZlbnRfZW1pdHRlci5vZmYoU2VydmVyRGF0YS5FVkVOVF9EQVRBX0NIQU5HRSwgdGhpcy51cGRhdGVfdmlldywgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB1cGRhdGVfdmlldygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWRfcG9pbnRfbm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlZF9wb2ludF9ub2RlLmFjdGl2ZSA9IGdtLmRhdGEuc2VydmVyX2RhdGEubWFpbF9yZWRfcG9pbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGJ1aWxkRGF0YSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldEJ1aWxkRGF0YUJ5VHlwZShCdWlsZFR5cGVFbnVtLkdBUlJJU0lPTl9UWVBFKTtcclxuICAgICAgICBpZiAoIWJ1aWxkRGF0YSB8fCBidWlsZERhdGEuYnVpbGRMdmwgPCAxKSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfbm90aWNlKFwixJBp4buBdSBraeG7h24gbeG7nyBMacOqbiBNaW5oIEjhuqNpIFbGsMahbmc6IFF1w6JuIMSR4buTbiB0csO6IMSR4bqhdCBj4bqlcCAxXCIpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMubWFpbF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0Lk1haWwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==