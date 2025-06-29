
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/super_recruit/scripts/SuperRecruit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3VwZXJfcmVjcnVpdFxcc2NyaXB0c1xcU3VwZXJSZWNydWl0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyRUFBMEU7QUFDMUUsaUVBQTZHO0FBQzdHLHFFQUEyRDtBQUMzRCxtRUFBa0U7QUFDbEUsdUVBQXNFO0FBQ3RFLCtEQUFnRTtBQUNoRSwrREFBOEQ7QUFDOUQseURBQXdEO0FBSWxELElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQWtDLGdDQUFVO0lBQTVDO1FBQUEscUVBdVNDO1FBclNXLGVBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLHFCQUFlLEdBQXFCLElBQUksQ0FBQztRQUd6QywyQkFBcUIsR0FBcUIsSUFBSSxDQUFDO1FBRy9DLHdCQUFrQixHQUFxQixJQUFJLENBQUM7UUFHNUMsNkJBQXVCLEdBQXFCLElBQUksQ0FBQztRQUdqRCw4QkFBd0IsR0FBcUIsSUFBSSxDQUFDO1FBR2xELHFCQUFlLEdBQXFCLElBQUksQ0FBQztRQUd6QyxxQkFBZSxHQUFvQixJQUFJLENBQUM7UUFHeEMsMkJBQXFCLEdBQW9CLElBQUksQ0FBQztRQUc5Qyx3QkFBa0IsR0FBb0IsSUFBSSxDQUFDO1FBRzNDLGNBQVEsR0FBd0IsSUFBSSxDQUFDO1FBR3JDLGdCQUFVLEdBQW1CLElBQUksQ0FBQztRQUVsQyx5QkFBbUIsR0FBWSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELHNCQUFnQixHQUFZLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0lBaVExRCxDQUFDO0lBL1BhLCtCQUFRLEdBQWxCO1FBQ0ksbUJBQVEsQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7UUFDckMsSUFBSSxD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QXVTQyxDQXZTaUMsdUJBQVUsR0F1UzNDO0FBdlNZLG9DQUFZIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQkFOTkVSX0FEX1RZUEUgfSBmcm9tICcuLi8uLi9zdGFydC1zY2VuZS9zY3JpcHRzL0NoYW5uZWxNYW5hZ2VyJztcclxuaW1wb3J0IHsgUmV3YXJkSWRFbnVtLCBTZXRJdGVtTnVtRW51bSwgUHJvcFR5cGVFbnVtLCBCdW5kbGVOYW1lIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Db25zdGFudHMnO1xyXG5pbXBvcnQgeyBnbSB9IGZyb20gJy4uLy4uL3N0YXJ0LXNjZW5lL3NjcmlwdHMvR2FtZU1hbmFnZXInO1xyXG5pbXBvcnQgeyBHYW1lTW9kdWxlIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9HYW1lTW9kdWxlJztcclxuaW1wb3J0IHsgTm9kZVBvb2xJdGVtIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9Ob2RlUG9vbEl0ZW0nO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9OZXRVdGlscyc7XHJcbmltcG9ydCB7IFRlbXBEYXRhIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9UZW1wRGF0YSc7XHJcbmltcG9ydCB7IFV0aWxzIH0gZnJvbSAnLi4vLi4vc3RhcnQtc2NlbmUvc2NyaXB0cy9VdGlscyc7XHJcbmltcG9ydCB7IFBvb2xDb25maWcgfSBmcm9tICcuLi8uLi9jb21tb24vY29uZmlncy9wb29sJztcclxuaW1wb3J0IHsgSXRlbUNvbmZpZyB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25maWdzL2l0ZW0nO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBTdXBlclJlY3J1aXQgZXh0ZW5kcyBHYW1lTW9kdWxlIHtcclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGNsb3NlX2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgYnV5X2JveF9yZWRfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQnV0dG9uKVxyXG4gICAgcHJpdmF0ZSB2aWRlb19idXlfYm94X3JlZF9idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIGJ1eV9ib3hfeWVsbG93X2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgZnJlZV9idXlfYm94X3llbGxvd19idG46IGNjLkJ1dHRvbiB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eShjYy5CdXR0b24pXHJcbiAgICBwcml2YXRlIHZpZGVvX2J1eV9ib3hfeWVsbG93X2J0bjogY2MuQnV0dG9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkJ1dHRvbilcclxuICAgIHByaXZhdGUgdmlkZW9fY2xvc2VfYnRuOiBjYy5CdXR0b24gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGJ1eV9ib3hfcmVkX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIHZpZGVvX2J1eV9ib3hfcmVkX2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuTGFiZWwpXHJcbiAgICBwcml2YXRlIGJ1eV9ib3hfeWVsbG93X2xibDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoY2MuQW5pbWF0aW9uKVxyXG4gICAgcHJpdmF0ZSBnZXRfYW5pbTogY2MuQW5pbWF0aW9uIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXHJcbiAgICBwcml2YXRlIG1vZGVsX25vZGU6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIHllbGxvd19tb2RlbF9vZmZzZXQ6IGNjLlZlYzMgPSBuZXcgY2MuVmVjMygxMCwgMTApO1xyXG4gICAgcHJpdmF0ZSByZWRfbW9kZWxfb2Zmc2V0OiBjYy5WZWMzID0gbmV3IGNjLlZlYzMoMCwgMCk7XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIFRlbXBEYXRhLm1haW5GdW5TaG93U3VwZXJIZXJvID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV92aWV3KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuZnJlZV9idXlfYm94X3llbGxvd19idG4ubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgZ20uZGF0YS5zaG93X3dlYWtfZ3VpZGUodGhpcy5mcmVlX2J1eV9ib3hfeWVsbG93X2J0bi5ub2RlLCBuZXcgY2MuVmVjMygwLCAwKSwgXCJcIiwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdtLmNoYW5uZWwuc2hvd19iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGdtLmNoYW5uZWwuaGlkZV9iYW5uZXJfYWQoQkFOTkVSX0FEX1RZUEUuQUxMKTtcclxuICAgICAgICBnbS51aS5tYXBNYWluVUkuc2hvd19zdXBlcl9yZWNydWl0X25vZGVfZW50cnkoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlX3ZpZXcoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5idXlfYm94X3JlZF9sYmwuc3RyaW5nID0gZ20uY29uc3QuUkVEX1NVUEVSX1JFQ1JVSVRfRElBTU9ORCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5idXlfYm94X3llbGxvd19sYmwuc3RyaW5nID0gZ20uY29uc3QuWUVMTE9XX1NVUEVSX1JFQ1JVSVRfR09MRCArIFwiXCI7XHJcbiAgICAgICAgdGhpcy5mcmVlX2J1eV9ib3hfeWVsbG93X2J0bi5ub2RlLmFjdGl2ZSA9IDAgPCBnbS5kYXRhLm1haW5fZGF0YS5sZWZ0X2ZyZWVfc3VwZXJfcmVjcnVpdF9jb3VudDtcclxuICAgICAgICB0aGlzLmJ1eV9ib3hfeWVsbG93X2J0bi5ub2RlLmFjdGl2ZSA9IGdtLmRhdGEubWFpbl9kYXRhLmxlZnRfZnJlZV9zdXBlcl9yZWNydWl0X2NvdW50IDw9IDA7XHJcbiAgICAgICAgdGhpcy52aWRlb19idXlfYm94X3JlZF9sYmwuc3RyaW5nID0gY2MuanMuZm9ybWF0U3RyKFwiTeG7nWkgbWnhu4VuIHBow60oJWQvJWQpXCIsIGdtLmRhdGEubWFpbl9kYXRhLnN1cGVyX3JlY3J1aXRfY291bnQsIGdtLmNvbnN0Lk1BWF9TVVBFUl9SRUNSVUlUX1ZJREVPX0NPVU5UKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGVkaXRvcl9vbl9idXR0b25fY2xpY2tfaGFuZGxlcihldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgaWYgKHRhcmdldCA9PT0gdGhpcy5jbG9zZV9idG4ubm9kZSB8fCB0YXJnZXQgPT09IHRoaXMudmlkZW9fY2xvc2VfYnRuLm5vZGUpIHtcclxuICAgICAgICAgICAgZ20udWkuYXN5bmNfaGlkZV9tb2R1bGUoZ20uY29uc3QuU3VwZXJSZWNydWl0KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gdGhpcy5idXlfYm94X3JlZF9idG4ubm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJ1eV9yZWRfYm94KGdtLmNvbnN0LlJFRF9TVVBFUl9SRUNSVUlUX0RJQU1PTkQpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLnZpZGVvX2J1eV9ib3hfcmVkX2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNTM1KTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTM2KTtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYzNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MzYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFpbl9kYXRhLnN1cGVyX3JlY3J1aXRfY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYWluX2RhdGEuc3VwZXJfcmVjcnVpdF9jb3VudCA+PSBnbS5jb25zdC5NQVhfU1VQRVJfUkVDUlVJVF9WSURFT19DT1VOVCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5zdXBlcl9yZWNydWl0X2NvdW50IC09IGdtLmNvbnN0Lk1BWF9TVVBFUl9SRUNSVUlUX1ZJREVPX0NPVU5UO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X3JlZF9ib3goMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlX3ZpZXcoKTtcclxuICAgICAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2hvd19hdXRvX21lcmdlX21lc3NhZ2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLmJ1eV9ib3hfeWVsbG93X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnV5X3llbGxvd19ib3goZ20uY29uc3QuWUVMTE9XX1NVUEVSX1JFQ1JVSVRfR09MRCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgPT09IHRoaXMuZnJlZV9idXlfYm94X3llbGxvd19idG4ubm9kZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IGdtLmRhdGEubWFpbl9kYXRhLmxlZnRfZnJlZV9zdXBlcl9yZWNydWl0X2NvdW50KSB7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5sZWZ0X2ZyZWVfc3VwZXJfcmVjcnVpdF9jb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfdmlldygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5idXlfeWVsbG93X2JveCgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ID09PSB0aGlzLnZpZGVvX2J1eV9ib3hfeWVsbG93X2J0bi5ub2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwNTM1KTtcclxuICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwNTM2KTtcclxuICAgICAgICAgICAgICAgIGdtLmNoYW5uZWwuc2hvd192aWRlb19hZCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDYzNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA2MzYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnV5X3llbGxvd19ib3goMCk7XHJcbiAgICAgICAgICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfYXV0b19tZXJnZV9tZXNzYWdlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBidXlfeWVsbG93X2JveChhbW91bnQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5nZXRJc0hhdmVTcGVjZUNlbGxJRCgpKSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmNvaW5OdW0gPCBhbW91bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUQ09JTk9QLmtleSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5SRURVQ0VfSVRFTV9UWVBFLCBhbW91bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgXCIxMTAwOVwiKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICBjb25zdCBwb29sQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIlBvb2xDb25maWdEYXRhXCIsIGl0ZW1Db25maWcucHJpY2UgKyBcIlwiKSBhcyBQb29sQ29uZmlnW107XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUNhc2UgPSBnbS5jb25maWcuZ2V0X3JhbmRvbV9jYXNlX2RhdGEocG9vbENvbmZpZyk7XHJcbiAgICAgICAgICAgIGxldCBwcm9wID0gcmFuZG9tQ2FzZS5wcm9wO1xyXG4gICAgICAgICAgICBsZXQgcmFuZG9tQW1vdW50ID0gVXRpbHMubWF0aF9yYW5kb20odHJ1ZSwgcmFuZG9tQ2FzZS5zZWN0aW9uX2EsIHJhbmRvbUNhc2Uuc2VjdGlvbl9iICsgMSk7XHJcbiAgICAgICAgICAgIGlmIChnbS5kYXRhLm1haW5fZGF0YS5pc19maXJzdF9zdXBlcl9yZWNydWl0KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wID0gMjEwMDU7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1haW5fZGF0YS5pc19maXJzdF9zdXBlcl9yZWNydWl0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByYW5kb21BbW91bnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYWluX2RhdGEuYXN5bmNfd3JpdGVfZGF0YSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0Um9sZVNwY2VMaXN0U2hpZnQoKTtcclxuICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkU3VwZXJSZWNydWl0SXRlbShwcm9wLCBzaGlmdCk7XHJcbiAgICAgICAgICAgIGlmIChwcm9wIDwgMzAwMDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1EYXRhID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIsIHByb3AgKyBcIlwiKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgaWYgKHByb3AgPT09IDIxMDA1IHx8IHByb3AgPT09IDIxMDU3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2F0ZXJHaXJsQ2FzZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9wZW5XYXRlckdpcmxDYXNlKGl0ZW1EYXRhLnByaWNlLCBzaGlmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBzaGlmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5X2dldF9hbmltKHdhdGVyR2lybENhc2UsIHRoaXMueWVsbG93X21vZGVsX29mZnNldCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuU1VQRVJIRVJPT1Aua2V5LCBbd2F0ZXJHaXJsQ2FzZSwgc2hpZnQsIHRydWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuU1VQRVJIRVJPT1ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSAyMDAwOCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9HaWZ0Q2FzZSA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLm9wZW5IZXJvR2lmdENhc2UoaXRlbURhdGEucHJpY2UsIHNoaWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwiaXRlbV9jaGlsZHJlbl9yZWZyZXNoXCIsIHNoaWZ0KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlfZ2V0X2FuaW0oaGVyb0dpZnRDYXNlLCB0aGlzLnllbGxvd19tb2RlbF9vZmZzZXQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlNVUEVSSEVST09QLmtleSwgW2hlcm9HaWZ0Q2FzZSwgc2hpZnQsIHRydWVdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuU1VQRVJIRVJPT1ApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBSZXdhcmRJZEVudW0uR09MRCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVDb2luKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHJhbmRvbUFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShwcm9wLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBSZXdhcmRJZEVudW0uRElBTU9ORCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLkFERF9JVEVNX1RZUEUsIHJhbmRvbUFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19jb2luX2ZseShwcm9wLCB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLlZlYzMuWkVSTykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwcm9wID09PSBSZXdhcmRJZEVudW0uQkFSUkVMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkQmFycmVsTnVtKHJhbmRvbUFtb3VudCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwgeyBpZExpc3Q6IFtwcm9wXSwgbnVtTGlzdDogW3JhbmRvbUFtb3VudF0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtRGF0YS50eXBlID09PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFIHx8IGl0ZW1EYXRhLnR5cGUgPT09IFByb3BUeXBlRW51bS5JUk9OX1RZUEUgfHwgaXRlbURhdGEudHlwZSA9PT0gUHJvcFR5cGVFbnVtLlNIRUxMX01PTkVZX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbVR5cGUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtRGF0YS50eXBlID09PSBQcm9wVHlwZUVudW0uV09PRF9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gMTYwMDg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtRGF0YS50eXBlID09PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1UeXBlID0gMTcwMDg7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtRGF0YS50eXBlID09PSBQcm9wVHlwZUVudW0uU0hFTExfTU9ORVlfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IDI1MDA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zcGxpdEl0ZW1OdW0ocmFuZG9tQW1vdW50LCBpdGVtVHlwZSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwgeyBpZExpc3Q6IFtwcm9wXSwgbnVtTGlzdDogW3JhbmRvbUFtb3VudF0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZG9tQW1vdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChwcm9wKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkV2FyZUhvdXNlTGlzdChpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwgeyBpZExpc3Q6IFtwcm9wXSwgbnVtTGlzdDogW3JhbmRvbUFtb3VudF0gfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuYXN5bmNfc2hvd19tb2R1bGUoZ20uY29uc3QuR0VUUkVXQVJET1ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFuZG9tQW1vdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtcy5wdXNoKHByb3ApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkV2FyZUhvdXNlTGlzdChpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUUkVXQVJET1Aua2V5LCB7IGlkTGlzdDogW3Byb3BdLCBudW1MaXN0OiBbcmFuZG9tQW1vdW50XSB9KTtcclxuICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdtLnVpLnNob3dfYXV0b19tZXJnZV9tZXNzYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYnV5X3JlZF9ib3goYW1vdW50OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEuZ2V0SXNIYXZlU3BlY2VDZWxsSUQoKSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IGFtb3VudCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVDb2luRGF0YS5kaWFtb25kTnVtIDwgYW1vdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfcGFuZWwoZ20uY29uc3QuR0VUQ09JTk9QKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5SRURVQ0VfSVRFTV9UWVBFLCBhbW91bnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Db25maWcgPSBnbS5jb25maWcuZ2V0X3Jvd19kYXRhKFwiSXRlbUNvbmZpZ0RhdGFcIiwgXCIxMTAxMFwiKSBhcyBJdGVtQ29uZmlnO1xyXG4gICAgICAgICAgICBjb25zdCBwb29sQ29uZmlnID0gZ20uY29uZmlnLmdldF9yb3dfZGF0YV9hcnJheShcIlBvb2xDb25maWdEYXRhXCIsIGl0ZW1Db25maWcucHJpY2UgKyBcIlwiKSBhcyBQb29sQ29uZmlnW107XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUNhc2UgPSBnbS5jb25maWcuZ2V0X3JhbmRvbV9jYXNlX2RhdGEocG9vbENvbmZpZyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb3AgPSByYW5kb21DYXNlLnByb3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmRvbUFtb3VudCA9IFV0aWxzLm1hdGhfcmFuZG9tKHRydWUsIHJhbmRvbUNhc2Uuc2VjdGlvbl9hLCByYW5kb21DYXNlLnNlY3Rpb25fYiArIDEpO1xyXG4gICAgICAgICAgICBjb25zdCBzaGlmdCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFN1cGVyUmVjcnVpdEl0ZW0ocHJvcCwgc2hpZnQpO1xyXG4gICAgICAgICAgICBpZiAocHJvcCA8IDMwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtRGF0YSA9IGdtLmNvbmZpZy5nZXRfcm93X2RhdGEoXCJJdGVtQ29uZmlnRGF0YVwiLCBwcm9wICsgXCJcIikgYXMgSXRlbUNvbmZpZztcclxuICAgICAgICAgICAgICAgIGlmIChwcm9wID09PSAyMTAwNSB8fCBwcm9wID09PSAyMTA1Nykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHdhdGVyR2lybENhc2UgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5vcGVuV2F0ZXJHaXJsQ2FzZShpdGVtRGF0YS5wcmljZSwgc2hpZnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheV9nZXRfYW5pbSh3YXRlckdpcmxDYXNlLCB0aGlzLnJlZF9tb2RlbF9vZmZzZXQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LlNVUEVSSEVST09QLmtleSwgW3dhdGVyR2lybENhc2UsIHNoaWZ0LCB0cnVlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlNVUEVSSEVST09QKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gMjAwMDgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvR2lmdENhc2UgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5vcGVuSGVyb0dpZnRDYXNlKGl0ZW1EYXRhLnByaWNlLCBzaGlmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuZW1pdChcIml0ZW1fY2hpbGRyZW5fcmVmcmVzaFwiLCBzaGlmdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5X2dldF9hbmltKGhlcm9HaWZ0Q2FzZSwgdGhpcy5yZWRfbW9kZWxfb2Zmc2V0LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5TVVBFUkhFUk9PUC5rZXksIFtoZXJvR2lmdENhc2UsIHNoaWZ0LCB0cnVlXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LlNVUEVSSEVST09QKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gUmV3YXJkSWRFbnVtLkdPTEQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lQ29pbihTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCByYW5kb21BbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkocHJvcCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gUmV3YXJkSWRFbnVtLkRJQU1PTkQpIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5zZXRBZGRHYW1lRGlhbW9uZChTZXRJdGVtTnVtRW51bS5BRERfSVRFTV9UWVBFLCByYW5kb21BbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNob3dfY29pbl9mbHkocHJvcCwgdGhpcy5ub2RlLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy5WZWMzLlpFUk8pKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvcCA9PT0gUmV3YXJkSWRFbnVtLkJBUlJFTCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZEJhcnJlbE51bShyYW5kb21BbW91bnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHsgaWRMaXN0OiBbcHJvcF0sIG51bUxpc3Q6IFtyYW5kb21BbW91bnRdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbURhdGEudHlwZSA9PT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRSB8fCBpdGVtRGF0YS50eXBlID09PSBQcm9wVHlwZUVudW0uSVJPTl9UWVBFIHx8IGl0ZW1EYXRhLnR5cGUgPT09IFByb3BUeXBlRW51bS5TSEVMTF9NT05FWV9UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW1UeXBlID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbURhdGEudHlwZSA9PT0gUHJvcFR5cGVFbnVtLldPT0RfVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IDE2MDA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbURhdGEudHlwZSA9PT0gUHJvcFR5cGVFbnVtLklST05fVFlQRSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtVHlwZSA9IDE3MDA4O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbURhdGEudHlwZSA9PT0gUHJvcFR5cGVFbnVtLlNIRUxMX01PTkVZX1RZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbVR5cGUgPSAyNTAwODtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc3BsaXRJdGVtTnVtKHJhbmRvbUFtb3VudCwgaXRlbVR5cGUsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHsgaWRMaXN0OiBbcHJvcF0sIG51bUxpc3Q6IFtyYW5kb21BbW91bnRdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmRvbUFtb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLnNldF9tb2R1bGVfYXJncyhnbS5jb25zdC5HRVRSRVdBUkRPUC5rZXksIHsgaWRMaXN0OiBbcHJvcF0sIG51bUxpc3Q6IFtyYW5kb21BbW91bnRdIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX3Nob3dfbW9kdWxlKGdtLmNvbnN0LkdFVFJFV0FSRE9QKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhbmRvbUFtb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChwcm9wKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLmFkZFdhcmVIb3VzZUxpc3QoaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVFJFV0FSRE9QLmtleSwgeyBpZExpc3Q6IFtwcm9wXSwgbnVtTGlzdDogW3JhbmRvbUFtb3VudF0gfSk7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5hc3luY19zaG93X21vZHVsZShnbS5jb25zdC5HRVRSRVdBUkRPUCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X2F1dG9fbWVyZ2VfbWVzc2FnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHBsYXlfZ2V0X2FuaW0obW9kZWw6IG51bWJlciwgcG9zaXRpb246IGNjLlZlYzMsIGNhbGxiYWNrOiAoKSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZ20ucG9vbC5hc3luY19nZXQoQnVuZGxlTmFtZS5DT01NT04sIFwicHJlZmFicy9tb2RlbC9cIiArIG1vZGVsLCBOb2RlUG9vbEl0ZW0sIChub2RlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm1vZGVsX25vZGUuY2hpbGRyZW5Db3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5tb2RlbF9ub2RlLmFkZENoaWxkKG5vZGUubm9kZSk7XHJcbiAgICAgICAgICAgICAgICBub2RlLm5vZGUuc2V0UG9zaXRpb24ocG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2tlbGV0b24gPSBub2RlLmdldENvbXBvbmVudChzcC5Ta2VsZXRvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tlbGV0b24pIHtcclxuICAgICAgICAgICAgICAgICAgICBza2VsZXRvbi5zZXRTa2luKFwiZnJvbnRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc2tlbGV0b24uc2V0QW5pbWF0aW9uKDAsIFwic3RheVwiLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0X2FuaW0ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zY2hlZHVsZU9uY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnBvb2wucHV0X2NoaWxkcmVuKHNlbGYubW9kZWxfbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAyKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuZ2V0X2FuaW0ub25jZShjYy5BbmltYXRpb24uRXZlbnRUeXBlLkZJTklTSEVELCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5nZXRfYW5pbS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdtLnVpLmFzeW5jX2hpZGVfbW9kdWxlKGdtLmNvbnN0LlN1cGVyUmVjcnVpdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0sIHNlbGYpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5nZXRfYW5pbS5wbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSJdfQ==