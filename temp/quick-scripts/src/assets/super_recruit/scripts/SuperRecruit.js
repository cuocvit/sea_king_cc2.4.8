"use strict";
cc._RF.push(module, 'e8706reK8pOD7uA3Pkg4p5d', 'SuperRecruit');
// super_recruit/scripts/SuperRecruit.ts

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
exports.SuperRecruit = void 0;
var ChannelManager_1 = require("../../start-scene/scripts/ChannelManager");
var Constants_1 = require("../../start-scene/scripts/Constants");
var GameManager_1 = require("../../start-scene/scripts/GameManager");
var GameModule_1 = require("../../start-scene/scripts/GameModule");
var NodePoolItem_1 = require("../../start-scene/scripts/NodePoolItem");
var NetUtils_1 = require("../../start-scene/scripts/NetUtils");
var TempData_1 = require("../../start-scene/scripts/TempData");
var Utils_1 = require("../../start-scene/scripts/Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SuperRecruit = /** @class */ (function (_super) {
    __extends(SuperRecruit, _super);
    function SuperRecruit() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.close_btn = null;
        _this.buy_box_red_btn = null;
        _this.video_buy_box_red_btn = null;
        _this.buy_box_yellow_btn = null;
        _this.free_buy_box_yellow_btn = null;
        _this.video_buy_box_yellow_btn = null;
        _this.video_close_btn = null;
        _this.buy_box_red_lbl = null;
        _this.video_buy_box_red_lbl = null;
        _this.buy_box_yellow_lbl = null;
        _this.get_anim = null;
        _this.model_node = null;
        _this.yellow_model_offset = new cc.Vec3(10, 10);
        _this.red_model_offset = new cc.Vec3(0, 0);
        return _this;
    }
    SuperRecruit.prototype.onEnable = function () {
        TempData_1.TempData.mainFunShowSuperHero = true;
        this.update_view();
        if (this.free_buy_box_yellow_btn.node.active) {
            GameManager_1.gm.data.show_weak_guide(this.free_buy_box_yellow_btn.node, new cc.Vec3(0, 0), "", 0);
        }
        GameManager_1.gm.channel.show_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
    };
    SuperRecruit.prototype.onDisable = function () {
        GameManager_1.gm.channel.hide_banner_ad(ChannelManager_1.BANNER_AD_TYPE.ALL);
        GameManager_1.gm.ui.mapMainUI.show_super_recruit_node_entry();
    };
    SuperRecruit.prototype.update_view = function () {
        this.buy_box_red_lbl.string = GameManager_1.gm.const.RED_SUPER_RECRUIT_DIAMOND + "";
        this.buy_box_yellow_lbl.string = GameManager_1.gm.const.YELLOW_SUPER_RECRUIT_GOLD + "";
        this.free_buy_box_yellow_btn.node.active = 0 < GameManager_1.gm.data.main_data.left_free_super_recruit_count;
        this.buy_box_yellow_btn.node.active = GameManager_1.gm.data.main_data.left_free_super_recruit_count <= 0;
        this.video_buy_box_red_lbl.string = cc.js.formatStr("Mời miễn phí(%d/%d)", GameManager_1.gm.data.main_data.super_recruit_count, GameManager_1.gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT);
    };
    SuperRecruit.prototype.editor_on_button_click_handler = function (event) {
        var _this = this;
        var target = event.target;
        if (target === this.close_btn.node || target === this.video_close_btn.node) {
            GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.SuperRecruit);
        }
        else if (target === this.buy_box_red_btn.node) {
            this.buy_red_box(GameManager_1.gm.const.RED_SUPER_RECRUIT_DIAMOND);
        }
        else if (target === this.video_buy_box_red_btn.node) {
            if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
                NetUtils_1.ReportData.instance.report_once_point(10535);
                NetUtils_1.ReportData.instance.report_point(10536);
                GameManager_1.gm.channel.show_video_ad(function () {
                    NetUtils_1.ReportData.instance.report_once_point(10635);
                    NetUtils_1.ReportData.instance.report_point(10636);
                    GameManager_1.gm.data.main_data.super_recruit_count++;
                    if (GameManager_1.gm.data.main_data.super_recruit_count >= GameManager_1.gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT) {
                        GameManager_1.gm.data.main_data.super_recruit_count -= GameManager_1.gm.const.MAX_SUPER_RECRUIT_VIDEO_COUNT;
                        GameManager_1.gm.data.main_data.async_write_data();
                        _this.buy_red_box(0);
                    }
                    _this.update_view();
                }, this);
            }
            else {
                GameManager_1.gm.ui.show_auto_merge_message();
            }
        }
        else if (target === this.buy_box_yellow_btn.node) {
            this.buy_yellow_box(GameManager_1.gm.const.YELLOW_SUPER_RECRUIT_GOLD);
        }
        else if (target === this.free_buy_box_yellow_btn.node) {
            if (0 < GameManager_1.gm.data.main_data.left_free_super_recruit_count) {
                GameManager_1.gm.data.main_data.left_free_super_recruit_count--;
                GameManager_1.gm.data.main_data.async_write_data();
                this.update_view();
                this.buy_yellow_box(0);
            }
        }
        else if (target === this.video_buy_box_yellow_btn.node) {
            if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
                NetUtils_1.ReportData.instance.report_once_point(10535);
                NetUtils_1.ReportData.instance.report_point(10536);
                GameManager_1.gm.channel.show_video_ad(function () {
                    NetUtils_1.ReportData.instance.report_once_point(10635);
                    NetUtils_1.ReportData.instance.report_point(10636);
                    _this.buy_yellow_box(0);
                }, this);
            }
            else {
                GameManager_1.gm.ui.show_auto_merge_message();
            }
        }
    };
    SuperRecruit.prototype.buy_yellow_box = function (amount) {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (0 < amount) {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < amount) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, amount);
            }
            var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", "11009");
            var poolConfig = GameManager_1.gm.config.get_row_data_array("PoolConfigData", itemConfig.price + "");
            var randomCase = GameManager_1.gm.config.get_random_case_data(poolConfig);
            var prop = randomCase.prop;
            var randomAmount = Utils_1.Utils.math_random(true, randomCase.section_a, randomCase.section_b + 1);
            if (GameManager_1.gm.data.main_data.is_first_super_recruit) {
                prop = 21005;
                GameManager_1.gm.data.main_data.is_first_super_recruit = false;
                randomAmount = 1;
                GameManager_1.gm.data.main_data.async_write_data();
            }
            var shift_1 = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            GameManager_1.gm.data.mapCell_data.addSuperRecruitItem(prop, shift_1);
            if (prop < 30000) {
                var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", prop + "");
                if (prop === 21005 || prop === 21057) {
                    var waterGirlCase_1 = GameManager_1.gm.data.mapCell_data.openWaterGirlCase(itemData.price, shift_1);
                    GameManager_1.gm.ui.emit("item_children_refresh", shift_1);
                    this.play_get_anim(waterGirlCase_1, this.yellow_model_offset, function () {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [waterGirlCase_1, shift_1, true]);
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                    });
                }
                else if (prop === 20008) {
                    var heroGiftCase_1 = GameManager_1.gm.data.mapCell_data.openHeroGiftCase(itemData.price, shift_1);
                    GameManager_1.gm.ui.emit("item_children_refresh", shift_1);
                    this.play_get_anim(heroGiftCase_1, this.yellow_model_offset, function () {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [heroGiftCase_1, shift_1, true]);
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                    });
                }
                else if (prop === Constants_1.RewardIdEnum.GOLD) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    GameManager_1.gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (prop === Constants_1.RewardIdEnum.DIAMOND) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    GameManager_1.gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (prop === Constants_1.RewardIdEnum.BARREL) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(randomAmount);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
                else if (itemData.type === Constants_1.PropTypeEnum.WOOD_TYPE || itemData.type === Constants_1.PropTypeEnum.IRON_TYPE || itemData.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                    var itemType = 0;
                    if (itemData.type === Constants_1.PropTypeEnum.WOOD_TYPE) {
                        itemType = 16008;
                    }
                    else if (itemData.type === Constants_1.PropTypeEnum.IRON_TYPE) {
                        itemType = 17008;
                    }
                    else if (itemData.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                        itemType = 25008;
                    }
                    GameManager_1.gm.data.mapCell_data.splitItemNum(randomAmount, itemType, 1);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
                else {
                    var items = [];
                    for (var i = 0; i < randomAmount; i++) {
                        items.push(prop);
                    }
                    GameManager_1.gm.data.mapCell_data.addWareHouseList(items);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
            }
            else {
                var items = [];
                for (var i = 0; i < randomAmount; i++) {
                    items.push(prop);
                }
                GameManager_1.gm.data.mapCell_data.addWareHouseList(items);
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    SuperRecruit.prototype.buy_red_box = function (amount) {
        if (GameManager_1.gm.data.mapCell_data.getIsHaveSpeceCellID()) {
            if (0 < amount) {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < amount) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, amount);
            }
            var itemConfig = GameManager_1.gm.config.get_row_data("ItemConfigData", "11010");
            var poolConfig = GameManager_1.gm.config.get_row_data_array("PoolConfigData", itemConfig.price + "");
            var randomCase = GameManager_1.gm.config.get_random_case_data(poolConfig);
            var prop = randomCase.prop;
            var randomAmount = Utils_1.Utils.math_random(true, randomCase.section_a, randomCase.section_b + 1);
            var shift_2 = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            GameManager_1.gm.data.mapCell_data.addSuperRecruitItem(prop, shift_2);
            if (prop < 30000) {
                var itemData = GameManager_1.gm.config.get_row_data("ItemConfigData", prop + "");
                if (prop === 21005 || prop === 21057) {
                    var waterGirlCase_2 = GameManager_1.gm.data.mapCell_data.openWaterGirlCase(itemData.price, shift_2);
                    this.play_get_anim(waterGirlCase_2, this.red_model_offset, function () {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [waterGirlCase_2, shift_2, true]);
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                    });
                }
                else if (prop === 20008) {
                    var heroGiftCase_2 = GameManager_1.gm.data.mapCell_data.openHeroGiftCase(itemData.price, shift_2);
                    GameManager_1.gm.ui.emit("item_children_refresh", shift_2);
                    this.play_get_anim(heroGiftCase_2, this.red_model_offset, function () {
                        GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.SUPERHEROOP.key, [heroGiftCase_2, shift_2, true]);
                        GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.SUPERHEROOP);
                    });
                }
                else if (prop === Constants_1.RewardIdEnum.GOLD) {
                    GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    GameManager_1.gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (prop === Constants_1.RewardIdEnum.DIAMOND) {
                    GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.ADD_ITEM_TYPE, randomAmount);
                    GameManager_1.gm.ui.show_coin_fly(prop, this.node.convertToWorldSpaceAR(cc.Vec3.ZERO));
                }
                else if (prop === Constants_1.RewardIdEnum.BARREL) {
                    GameManager_1.gm.data.mapCell_data.addBarrelNum(randomAmount);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
                else if (itemData.type === Constants_1.PropTypeEnum.WOOD_TYPE || itemData.type === Constants_1.PropTypeEnum.IRON_TYPE || itemData.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                    var itemType = 0;
                    if (itemData.type === Constants_1.PropTypeEnum.WOOD_TYPE) {
                        itemType = 16008;
                    }
                    else if (itemData.type === Constants_1.PropTypeEnum.IRON_TYPE) {
                        itemType = 17008;
                    }
                    else if (itemData.type === Constants_1.PropTypeEnum.SHELL_MONEY_TYPE) {
                        itemType = 25008;
                    }
                    GameManager_1.gm.data.mapCell_data.splitItemNum(randomAmount, itemType, 1);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
                else {
                    var items = [];
                    for (var i = 0; i < randomAmount; i++) {
                        items.push(prop);
                    }
                    GameManager_1.gm.data.mapCell_data.addWareHouseList(items);
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                    GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
                }
            }
            else {
                var items = [];
                for (var i = 0; i < randomAmount; i++) {
                    items.push(prop);
                }
                GameManager_1.gm.data.mapCell_data.addWareHouseList(items);
                GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETREWARDOP.key, { idList: [prop], numList: [randomAmount] });
                GameManager_1.gm.ui.async_show_module(GameManager_1.gm.const.GETREWARDOP);
            }
        }
        else {
            GameManager_1.gm.ui.show_auto_merge_message();
        }
    };
    SuperRecruit.prototype.play_get_anim = function (model, position, callback) {
        var self = this;
        GameManager_1.gm.pool.async_get(Constants_1.BundleName.COMMON, "prefabs/model/" + model, NodePoolItem_1.NodePoolItem, function (node) {
            if (self.model_node.childrenCount === 0) {
                self.model_node.addChild(node.node);
                node.node.setPosition(position);
                var skeleton = node.getComponent(sp.Skeleton);
                if (skeleton) {
                    skeleton.setSkin("front");
                    skeleton.setAnimation(0, "stay", true);
                }
                self.get_anim.node.active = true;
                self.scheduleOnce(function () {
                    GameManager_1.gm.pool.put_children(self.model_node);
                }, 2);
                self.get_anim.once(cc.Animation.EventType.FINISHED, function () {
                    self.get_anim.node.active = false;
                    GameManager_1.gm.ui.async_hide_module(GameManager_1.gm.const.SuperRecruit);
                    callback();
                }, self);
                self.get_anim.play();
            }
        });
    };
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "close_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "buy_box_red_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "video_buy_box_red_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "buy_box_yellow_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "free_buy_box_yellow_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "video_buy_box_yellow_btn", void 0);
    __decorate([
        property(cc.Button)
    ], SuperRecruit.prototype, "video_close_btn", void 0);
    __decorate([
        property(cc.Label)
    ], SuperRecruit.prototype, "buy_box_red_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], SuperRecruit.prototype, "video_buy_box_red_lbl", void 0);
    __decorate([
        property(cc.Label)
    ], SuperRecruit.prototype, "buy_box_yellow_lbl", void 0);
    __decorate([
        property(cc.Animation)
    ], SuperRecruit.prototype, "get_anim", void 0);
    __decorate([
        property(cc.Node)
    ], SuperRecruit.prototype, "model_node", void 0);
    SuperRecruit = __decorate([
        ccclass
    ], SuperRecruit);
    return SuperRecruit;
}(GameModule_1.GameModule));
exports.SuperRecruit = SuperRecruit;

cc._RF.pop();