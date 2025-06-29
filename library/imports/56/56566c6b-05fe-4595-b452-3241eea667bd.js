"use strict";
cc._RF.push(module, '56566xrBf5FlbRSMkHupme9', 'AutoMergeMessage');
// start-scene/scripts/AutoMergeMessage.ts

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
exports.AutoMergeMessage = void 0;
// +-+
var GameManager_1 = require("./GameManager");
var ChannelManager_1 = require("./ChannelManager");
var GameModule_1 = require("./GameModule");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AutoMergeMessage = /** @class */ (function (_super) {
    __extends(AutoMergeMessage, _super);
    function AutoMergeMessage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.ok_btn = null;
        _this.video_btn = null;
        _this.free_btn = null;
        return _this;
    }
    AutoMergeMessage.prototype.onEnable = function () {
        var _a;
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        this.free_btn.node.active = false;
        this.video_btn.node.active = false;
        this.free_btn.node.active = GameManager_1.gm.data.mapCell_data.is_first_auto_compose == 0;
        this.video_btn.node.active = !((_a = this.free_btn) === null || _a === void 0 ? void 0 : _a.node.active);
    };
    AutoMergeMessage.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    AutoMergeMessage.prototype.editor_on_button_click_handler = function (event) {
        var _a, _b, _c, _d;
        if (event.target == ((_a = this.close_btn) === null || _a === void 0 ? void 0 : _a.node) || event.target == ((_b = this.ok_btn) === null || _b === void 0 ? void 0 : _b.node)) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
        }
        else if (event.target == ((_c = this.video_btn) === null || _c === void 0 ? void 0 : _c.node)) {
            GameManager_1.gm.channel.show_video_ad(function () {
                GameManager_1.gm.data.event_emitter.emit("auto_merge_message");
                GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
            }, 1);
        }
        else if (event.target == ((_d = this.free_btn) === null || _d === void 0 ? void 0 : _d.node)) {
            GameManager_1.gm.data.event_emitter.emit("auto_merge_message");
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AutoMergeMessage);
        }
    };
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "ok_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "video_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AutoMergeMessage.prototype, "free_btn", void 0);
    AutoMergeMessage = __decorate([
        ccclass
    ], AutoMergeMessage);
    return AutoMergeMessage;
}(GameModule_1.GameModule));
exports.AutoMergeMessage = AutoMergeMessage;

cc._RF.pop();