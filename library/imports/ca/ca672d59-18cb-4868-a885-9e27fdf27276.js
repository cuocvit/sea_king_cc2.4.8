"use strict";
cc._RF.push(module, 'ca6721ZGMtIaKiFnif98nJ2', 'AddDesktop');
// add_desktop/scripts/AddDesktop.ts

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
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var Constants_1 = require("../../start-scene/scripts/Constants");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AddDesktop = /** @class */ (function (_super) {
    __extends(AddDesktop, _super);
    function AddDesktop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.add_desktop_btn = null;
        _this.left_node = null;
        _this.right_node = null;
        _this.left_lbl = null;
        _this.right_lbl = null;
        return _this;
    }
    AddDesktop.prototype.onEnable = function () {
        var self = this;
        if (this.left_node.childrenCount === 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, NodePoolItem_1.NodePoolItem, function (item) {
                if (self.left_node.childrenCount === 0) {
                    self.left_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
        var leftHeroData = GameManager_1.gm.config.get_row_data("HeroConfigData", GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID + "");
        if (leftHeroData)
            this.left_lbl.string = leftHeroData.name;
        if (this.right_node.childrenCount === 0) {
            GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID, NodePoolItem_1.NodePoolItem, function (item) {
                if (self.right_node.childrenCount === 0) {
                    self.right_node.addChild(item.node);
                }
                else {
                    GameManager_1.gm.pool.put(item.node);
                }
            });
        }
        var rightHeroData = GameManager_1.gm.config.get_row_data("HeroConfigData", GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID + "");
        if (rightHeroData)
            this.right_lbl.string = rightHeroData.name;
    };
    AddDesktop.prototype.onDisable = function () {
        GameManager_1.gm.pool.put_children(this.left_node);
        GameManager_1.gm.pool.put_children(this.right_node);
    };
    AddDesktop.prototype.editor_on_button_click_handler = function (event) {
        if (event.target == this.close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
        }
        else if (event.target == this.add_desktop_btn.node) {
            GameManager_1.gm.channel.addShortcut(function () {
                if (GameManager_1.gm.data.main_data.is_receive_shortcut_reward) {
                    GameManager_1.gm.ui.show_notice("Đã nhận được phần thưởng thêm vào máy tính để bàn!");
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
                }
                else {
                    GameManager_1.gm.data.main_data.is_receive_shortcut_reward = true;
                    GameManager_1.gm.data.main_data.async_write_data();
                    GameManager_1.gm.data.mapCell_data.addWareHouseList([GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID]);
                    GameManager_1.gm.data.mapCell_data.async_write_data();
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, {
                        idList: [GameManager_1.gm.const.ADD_DESKTOP_REWARD_LEFT_HERO_ID, GameManager_1.gm.const.ADD_DESKTOP_REWARD_RIGHT_HERO_ID],
                        numList: [1, 1]
                    });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.AddDesktop);
                    NetUtils_1.ReportData.instance.report_once_point(10639);
                }
            });
        }
    };
    __decorate([
        property(cc.Button)
    ], AddDesktop.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], AddDesktop.prototype, "add_desktop_btn", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktop.prototype, "left_node", void 0);
    __decorate([
        property(cc.Node)
    ], AddDesktop.prototype, "right_node", void 0);
    __decorate([
        property(cc.Label)
    ], AddDesktop.prototype, "left_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], AddDesktop.prototype, "right_lbl", void 0);
    AddDesktop = __decorate([
        ccclass
    ], AddDesktop);
    return AddDesktop;
}(GameModule_1.GameModule));

cc._RF.pop();