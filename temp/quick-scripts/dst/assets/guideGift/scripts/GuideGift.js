
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/guideGift/scripts/GuideGift.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '0a33bz7QMtFrYKdNlSY7ixS', 'GuideGift');
// guideGift/scripts/GuideGift.ts

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
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GuideGift = /** @class */ (function (_super) {
    __extends(GuideGift, _super);
    function GuideGift() {
        var _this = _super.call(this) || this;
        _this.close_btn = null;
        _this.video_close_btn = null;
        _this.get_btn = null;
        _this.item_lbl_node = null;
        _this._itemIDList = [18003, 35003, 36001, 37003, 18005];
        _this._itemNumList = [1, 1, 1, 1, 1];
        return _this;
    }
    GuideGift.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowGuide = true;
        this.initPanel();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    GuideGift.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_guide_gift_entry();
    };
    GuideGift.prototype.initPanel = function () {
        for (var t = 0; t < this._itemNumList.length; t++) {
            this.item_lbl_node.children[t].getComponent(cc.Label).string = "x" + this._itemNumList[t];
        }
    };
    GuideGift.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node || event.target == this.video_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDEGIFT);
        }
        else if (event.target == this.get_btn.node) {
            NetUtils_1.ReportData.instance.report_once_point(10531);
            NetUtils_1.ReportData.instance.report_point(10532);
            GameManager_1.gm.channel.show_video_ad(this.watch_ad_cb, this);
        }
    };
    GuideGift.prototype.watch_ad_cb = function () {
        NetUtils_1.ReportData.instance.report_once_point(10631);
        NetUtils_1.ReportData.instance.report_point(10632);
        GameManager_1.gm.data.mapCell_data.guideGift.guideIsGet = true;
        GameManager_1.gm.data.mapCell_data.addWareHouseList(this._itemIDList);
        GameManager_1.gm.data.mapCell_data.async_write_data();
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.GUIDEGIFT);
        GameManager_1.gm.ui.emit("guideGiftChange");
        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
            idList: this._itemIDList,
            numList: this._itemNumList
        });
        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
    };
    __decorate([
        property(cc.Button)
    ], GuideGift.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], GuideGift.prototype, "video_close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], GuideGift.prototype, "get_btn", void 0);
    __decorate([
        property(cc.Node)
    ], GuideGift.prototype, "item_lbl_node", void 0);
    GuideGift = __decorate([
        ccclass
    ], GuideGift);
    return GuideGift;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcZ3VpZGVHaWZ0XFxzY3JpcHRzXFxHdWlkZUdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUVBQTJEO0FBQzNELG1FQUFrRTtBQUNsRSwyRUFBMEU7QUFDMUUsK0RBQWdFO0FBQ2hFLCtEQUE4RDtBQUV4RCxJQUFBLEtBQXdCLEVBQUUsQ0FBQyxVQUFVLEVBQW5DLE9BQU8sYUFBQSxFQUFFLFFBQVEsY0FBa0IsQ0FBQztBQUc1QztJQUF3Qiw2QkFBVTtJQWdCOUI7UUFBQSxZQUNJLGlCQUFPLFNBR1Y7UUFsQk8sZUFBUyxHQUFjLElBQUksQ0FBQztRQUc1QixxQkFBZSxHQUFjLElBQUksQ0FBQztRQUdsQyxhQUFPLEdBQWMsSUFBSSxDQUFDO1FBRzFCLG1CQUFhLEdBQVksSUFBSSxDQUFDO1FBT2xDLEtBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsS0FBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFDeEMsQ0FBQztJQUVTLDRCQUFRLEdBQWxCO1FBQ0ksbUJBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyw2QkFBUyxHQUFuQjtRQUNJLGdCQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQywrQkFBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLGdCQUFFLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQzVDLENBQUM7SUFFTyw2QkFBUyxHQUFqQjtRQUNJLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3RjtJQUNMLENBQUM7SUFFTyxrREFBOEIsR0FBdEMsVUFBdUMsS0FBZTtRQUNsRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRTtZQUNsRixnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMvQzthQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUMxQyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEMsZ0JBQUUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEQ7SUFDTCxDQUFDO0lBRU8sK0JBQVcsR0FBbkI7UUFDSSxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3QyxxQkFBVSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2pELGdCQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDeEQsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsZ0JBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUIsZ0JBQUUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGdCQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXO1lBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTtTQUM3QixDQUFDLENBQUM7UUFDSCxnQkFBRSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxnQkFBRSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBNUREO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0RBQ2dCO0lBR3BDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7c0RBQ3NCO0lBRzFDO1FBREMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7OENBQ2M7SUFHbEM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztvREFDb0I7SUFYcEMsU0FBUztRQURkLE9BQU87T0FDRixTQUFTLENBK0RkO0lBQUQsZ0JBQUM7Q0EvREQsQUErREMsQ0EvRHVCLHVCQUFVLEdBK0RqQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTWFuYWdlcic7XHJcbmltcG9ydCB7IEdhbWVNb2R1bGUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0dhbWVNb2R1bGUnO1xyXG5pbXBvcnQgeyBCQU5ORVJfQURfVFlQRSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvQ2hhbm5lbE1hbmFnZXInO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9UZW1wRGF0YSc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgR3VpZGVHaWZ0IGV4dGVuZHMgR2FtZU1vZHVsZSB7XHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSBjbG9zZV9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgdmlkZW9fY2xvc2VfYnRuOiBjYy5CdXR0b24gPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGdldF9idG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIGl0ZW1fbGJsX25vZGU6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2l0ZW1JRExpc3Q6IG51bWJlcltdO1xyXG4gICAgcHJpdmF0ZSByZWFkb25seSBfaXRlbU51bUxpc3Q6IG51bWJlcltdO1xyXG5cclxuICAgIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9pdGVtSURMaXN0ID0gWzE4MDAzLCAzNTAwMywgMzYwMDEsIDM3MDAzLCAxODAwNV07XHJcbiAgICAgICAgdGhpcy5faXRlbU51bUxpc3QgPSBbMSwgMSwgMSwgMSwgMV07XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLm1haW5GdW5TaG93R3VpZGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaW5pdFBhbmVsKCk7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5zaG93X2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ20uY2hhbm5lbC5oaWRlX2Jhbm5lcl9hZChCQU5ORVJfQURfVFlQRS5BTEwpO1xyXG4gICAgICAgIGdtLnVpLm1hcE1haW5VSS5zaG93X2d1aWRlX2dpZnRfZW50cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRQYW5lbCgpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuX2l0ZW1OdW1MaXN0Lmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbV9sYmxfbm9kZS5jaGlsZHJlblt0XS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwieFwiICsgdGhpcy5faXRlbU51bUxpc3RbdF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZWRpdG9yX29uX2J1dHRvbl9jbGlja19oYW5kbGVyKGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChldmVudC50YXJnZXQgPT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fCBldmVudC50YXJnZXQgPT0gdGhpcy52aWRlb19jbG9zZV9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBnbS51aS5hc3luY19oaWRlX21vZHVsZShnbS5jb25zdC5HVUlERUdJRlQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudGFyZ2V0ID09IHRoaXMuZ2V0X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA1MzEpO1xyXG4gICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDUzMik7XHJcbiAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCh0aGlzLndhdGNoX2FkX2NiLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB3YXRjaF9hZF9jYigpOiB2b2lkIHtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNjMxKTtcclxuICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDYzMik7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ3VpZGVHaWZ0Lmd1aWRlSXNHZXQgPSB0cnVlO1xyXG4gICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QodGhpcy5faXRlbUlETGlzdCk7XHJcbiAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LkdVSURFR0lGVCk7XHJcbiAgICAgICAgZ20udWkuZW1pdChcImd1aWRlR2lmdENoYW5nZVwiKTtcclxuICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7XHJcbiAgICAgICAgICAgIGlkTGlzdDogdGhpcy5faXRlbUlETGlzdCxcclxuICAgICAgICAgICAgbnVtTGlzdDogdGhpcy5faXRlbU51bUxpc3RcclxuICAgICAgICB9KTtcclxuICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRSRVdBUkRPUCk7XHJcbiAgICB9XHJcbn0iXX0=