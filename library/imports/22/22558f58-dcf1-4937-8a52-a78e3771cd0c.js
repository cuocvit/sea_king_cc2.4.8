"use strict";
cc._RF.push(module, '225589Y3PFJN4pSp443cc0M', 'Buy');
// buy/scripts/Buy.ts

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
var SignData_1 = require("../../start-scene/scripts/SignData");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var ListView_1 = require("../../start-scene/scripts/ListView");
var buyItem_1 = require("./buyItem");
var TempData_1 = require("../../start-scene/scripts/TempData");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Buy = /** @class */ (function (_super) {
    __extends(Buy, _super);
    function Buy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.anywhere_close_btn = null;
        _this.sign_list = null;
        _this.sign_buy_item_array = [];
        return _this;
    }
    Buy.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowSign = true;
        GameManager_1.gm.data.event_emitter.on(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.update_view();
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    Buy.prototype.onDisable = function () {
        GameManager_1.gm.data.event_emitter.off(SignData_1.SignData.EVENT_DATA_CHANGE, this.update_view, this);
        this.sign_list.reset();
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].reset();
        }
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_sign_entry();
    };
    Buy.prototype.update_view = function () {
        var data = [];
        this.sign_list.setData(GameManager_1.gm.const.BuyData);
        for (var i = 0; i < this.sign_buy_item_array.length; i++) {
            this.sign_buy_item_array[i].data =
                GameManager_1.gm.data.sign_data.sign_buy_data_array[i];
        }
    };
    Buy.prototype.editor_on_button_click_handler = function (event) {
        if (event.target !== this.close_btn.node &&
            event.target !== this.anywhere_close_btn.node)
            return;
        GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.Buy);
    };
    __decorate([
        property(cc.Button)
    ], Buy.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], Buy.prototype, "anywhere_close_btn", void 0);
    __decorate([
        property(ListView_1.ListView)
    ], Buy.prototype, "sign_list", void 0);
    __decorate([
        property(buyItem_1.BuyItem)
    ], Buy.prototype, "sign_buy_item_array", void 0);
    Buy = __decorate([
        ccclass
    ], Buy);
    return Buy;
}(GameModule_1.GameModule));
exports.default = Buy;

cc._RF.pop();