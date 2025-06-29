"use strict";
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