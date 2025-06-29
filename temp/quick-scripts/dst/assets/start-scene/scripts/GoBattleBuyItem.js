
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/GoBattleBuyItem.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '758e1G4rwtAuI9w0h+e040u', 'GoBattleBuyItem');
// start-scene/scripts/GoBattleBuyItem.ts

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
exports.GoBattleBuyItem = void 0;
// +-+
var Utils_1 = require("./Utils");
var Constants_1 = require("./Constants");
var TempData_1 = require("./TempData");
var GameManager_1 = require("./GameManager");
var MapCellCfgData_1 = require("./MapCellCfgData");
var NetUtils_1 = require("./NetUtils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GoBattleBuyItem = /** @class */ (function (_super) {
    __extends(GoBattleBuyItem, _super);
    function GoBattleBuyItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.heroColorSpr = null;
        _this.heroSpr = null;
        _this.heroLvlSpr = null;
        _this.price_lbl = null;
        _this.cost_sprite = null;
        _this.heroID = 0;
        _this.heroDiam = 0;
        return _this;
    }
    GoBattleBuyItem.prototype.initdata = function (heroID, heroDiam) {
        this.heroID = heroID;
        this.heroDiam = heroDiam;
        var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(this.heroID);
        if (heroConfig) {
            Utils_1.Utils.async_set_sprite_frame(this.heroColorSpr, Constants_1.BundleName.COMMON, "res/color_" + heroConfig.lv);
            Utils_1.Utils.async_set_sprite_frame(this.heroSpr, Constants_1.BundleName.COMMON, "res/handbook/" + this.heroID);
            Utils_1.Utils.async_set_sprite_frame(this.heroLvlSpr, Constants_1.BundleName.BOOK, "res/icon_lv" + heroConfig.lv);
            this.price_lbl.string = this.heroDiam.toString();
            this.cost_sprite.node.color = cc.Color.WHITE;
            this.price_lbl.node.getComponent(cc.LabelOutline).enabled = true;
            this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#FFDA58");
            this.price_lbl.node.getComponent(cc.LabelOutline).color = cc.Color.BLACK.fromHEX("#7D2713");
            this.cost_sprite.node.height = 50;
            this.cost_sprite.node.width = 50;
            if (this.heroDiam == 0) {
                this.price_lbl.string = "Miễn phí";
                this.cost_sprite.node.color = cc.Color.BLACK.fromHEX("#253D45");
                this.price_lbl.node.color = cc.Color.BLACK.fromHEX("#1C3F00");
                this.price_lbl.node.getComponent(cc.LabelOutline).enabled = false;
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/video_1");
                this.cost_sprite.node.width = 55;
                this.cost_sprite.node.height = 40;
            }
            else if (this.heroDiam > 200) {
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + Constants_1.RewardIdEnum.GOLD);
            }
            else {
                Utils_1.Utils.async_set_sprite_frame(this.cost_sprite, Constants_1.BundleName.COMMON, "res/handbook/" + Constants_1.RewardIdEnum.DIAMOND);
            }
        }
    };
    GoBattleBuyItem.prototype.onClickAddHeroTobattle = function () {
        if (GameManager_1.gm.data.fight_temp_data.get_battle_hero_is_space()) {
            if (this.heroDiam == 0) {
                GameManager_1.gm.channel.show_video_ad(this.addHero, this);
            }
            else if (this.heroDiam > 200) {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.coinNum < this.heroDiam) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, false);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameCoin(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            }
            else {
                if (GameManager_1.gm.data.mapCell_data.roleCoinData.diamondNum < this.heroDiam) {
                    GameManager_1.gm.ui.set_module_args(GameManager_1.gm.const.GETCOINOP.key, true);
                    GameManager_1.gm.ui.show_panel(GameManager_1.gm.const.GETCOINOP);
                    return;
                }
                GameManager_1.gm.data.mapCell_data.setAddGameDiamond(Constants_1.SetItemNumEnum.REDUCE_ITEM_TYPE, this.heroDiam);
                this.addHero();
            }
        }
        else {
            GameManager_1.gm.ui.show_notice("Bạn không có đủ ô trống, vui lòng dọn dẹp chúng trước");
        }
    };
    GoBattleBuyItem.prototype.addHero = function () {
        var spaceIndex;
        if (TempData_1.TempData.getDefenseType() != 2) {
            spaceIndex = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            var heroID = this.heroID;
            GameManager_1.gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
            var roleGoBattleItem = new MapCellCfgData_1.roleGoBattleItemVO();
            roleGoBattleItem.cellID = spaceIndex;
            if (heroConfig) {
                roleGoBattleItem.itemID = heroConfig.heroid;
                roleGoBattleItem.itemType = heroConfig.occupation;
                roleGoBattleItem.hp = heroConfig.hp;
                roleGoBattleItem.maxHp = heroConfig.hp;
                GameManager_1.gm.data.fight_temp_data.battle_hero_array.push(roleGoBattleItem);
            }
            switch (this.heroID) {
                case 34003:
                    NetUtils_1.ReportData.instance.report_once_point(10900);
                    NetUtils_1.ReportData.instance.report_point(10901);
                    break;
                case 35003:
                    NetUtils_1.ReportData.instance.report_once_point(10902);
                    NetUtils_1.ReportData.instance.report_point(10903);
                    break;
                case 37003:
                    NetUtils_1.ReportData.instance.report_once_point(10904);
                    NetUtils_1.ReportData.instance.report_point(10905);
                    break;
                case 38003:
                    NetUtils_1.ReportData.instance.report_once_point(10906);
                    NetUtils_1.ReportData.instance.report_point(10907);
                    break;
                case 39003:
                    NetUtils_1.ReportData.instance.report_once_point(10908);
                    NetUtils_1.ReportData.instance.report_point(10909);
                    break;
            }
            GameManager_1.gm.ui.emit("refreshHeroBattle");
            GameManager_1.gm.ui.emit("refreshBattleHero");
        }
        else if (GameManager_1.gm.data.fight_temp_data.get_defense_hero_is_space()) {
            spaceIndex = GameManager_1.gm.data.mapCell_data.getRoleSpceListShift();
            var heroID = this.heroID;
            GameManager_1.gm.data.mapCell_data.addItem(heroID, 1, spaceIndex);
            var roleData = GameManager_1.gm.data.mapCell_data.role_map_data[spaceIndex];
            if (roleData.itemID > 30000) {
                var heroConfig = GameManager_1.gm.data.config_data.getHeroCfgByID(heroID);
                if (heroConfig) {
                    var defenseHeroItem = new MapCellCfgData_1.DefenseHeroItemVO();
                    defenseHeroItem.cellID = spaceIndex;
                    defenseHeroItem.heroid = heroID;
                    defenseHeroItem.heroUID = roleData.heroUID;
                    GameManager_1.gm.data.mapCell_data.addDefenseDataByID(defenseHeroItem);
                }
                GameManager_1.gm.ui.emit("refreshHeroBattle");
                GameManager_1.gm.ui.emit("refreshBattleHero");
                GameManager_1.gm.data.mapCell_data.async_write_data();
            }
        }
    };
    GoBattleBuyItem.prototype.reset = function () {
        this.heroSpr.spriteFrame = null;
        this.heroLvlSpr.spriteFrame = null;
    };
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroColorSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroSpr", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "heroLvlSpr", void 0);
    __decorate([
        property(cc.Label)
    ], GoBattleBuyItem.prototype, "price_lbl", void 0);
    __decorate([
        property(cc.Sprite)
    ], GoBattleBuyItem.prototype, "cost_sprite", void 0);
    GoBattleBuyItem = __decorate([
        ccclass
    ], GoBattleBuyItem);
    return GoBattleBuyItem;
}(cc.Component));
exports.GoBattleBuyItem = GoBattleBuyItem;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXEdvQmF0dGxlQnV5SXRlbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTTtBQUNOLGlDQUFnQztBQUNoQyx5Q0FBdUU7QUFDdkUsdUNBQXNDO0FBQ3RDLDZDQUFtQztBQUNuQyxtREFBeUU7QUFDekUsdUNBQXdDO0FBRWxDLElBQUEsS0FBd0IsRUFBRSxDQUFDLFVBQVUsRUFBbkMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFrQixDQUFDO0FBRzVDO0lBQThCLG1DQUFZO0lBQTFDO1FBQUEscUVBcUpDO1FBbkpXLGtCQUFZLEdBQXFCLElBQUksQ0FBQztRQUd0QyxhQUFPLEdBQXFCLElBQUksQ0FBQztRQUdqQyxnQkFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsZUFBUyxHQUFvQixJQUFJLENBQUM7UUFHbEMsaUJBQVcsR0FBcUIsSUFBSSxDQUFDO1FBRXJDLFlBQU0sR0FBVyxDQUFDLENBQUM7UUFDbkIsY0FBUSxHQUFXLENBQUMsQ0FBQzs7SUFvSWpDLENBQUM7SUFsSVUsa0NBQVEsR0FBZixVQUFnQixNQUFjLEVBQUUsUUFBZ0I7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBTSxVQUFVLEdBQUcsZ0JBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxVQUFVLEVBQUU7WUFDWixhQUFLLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxzQkFBVSxDQUFDLE1BQU0sRUFBRSxZQUFZLEdBQUcsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pHLGFBQUssQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFF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cUI7SUFHekM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt1REFDd0I7SUFHNUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztzREFDdUI7SUFHMUM7UUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzt3REFDeUI7SUFkM0MsZUFBZTtRQURwQixPQUFPO09BQ0YsZUFBZSxDQXFKcEI7SUFBRCxzQkFBQztDQXJKRCxBQXFKQyxDQXJKNkIsRUFBRSxDQUFDLFNBQVMsR0FxSnpDO0FBRVEsMENBQWUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyIvLyArLStcclxuaW1wb3J0IHsgVXRpbHMgfSBmcm9tICcuL1V0aWxzJztcclxuaW1wb3J0IHsgUmV3YXJkSWRFbnVtLCBCdW5kbGVOYW1lLCBTZXRJdGVtTnVtRW51bSB9IGZyb20gJy4vQ29uc3RhbnRzJztcclxuaW1wb3J0IHsgVGVtcERhdGEgfSBmcm9tICcuL1RlbXBEYXRhJztcclxuaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgRGVmZW5zZUhlcm9JdGVtVk8sIHJvbGVHb0JhdHRsZUl0ZW1WTyB9IGZyb20gJy4vTWFwQ2VsbENmZ0RhdGEnO1xyXG5pbXBvcnQgeyBSZXBvcnREYXRhIH0gZnJvbSAnLi9OZXRVdGlscyc7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuY2xhc3MgR29CYXR0bGVCdXlJdGVtIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eShjYy5TcHJpdGUpXHJcbiAgICBwcml2YXRlIGhlcm9Db2xvclNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb1NwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgaGVyb0x2bFNwcjogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLkxhYmVsKVxyXG4gICAgcHJpdmF0ZSBwcmljZV9sYmw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KGNjLlNwcml0ZSlcclxuICAgIHByaXZhdGUgY29zdF9zcHJpdGU6IGNjLlNwcml0ZSB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIHByaXZhdGUgaGVyb0lEOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBoZXJvRGlhbTogbnVtYmVyID0gMDtcclxuXHJcbiAgICBwdWJsaWMgaW5pdGRhdGEoaGVyb0lEOiBudW1iZXIsIGhlcm9EaWFtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9JRCA9IGhlcm9JRDtcclxuICAgICAgICB0aGlzLmhlcm9EaWFtID0gaGVyb0RpYW07XHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQodGhpcy5oZXJvSUQpO1xyXG4gICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5oZXJvQ29sb3JTcHIsIEJ1bmRsZU5hbWUuQ09NTU9OLCBcInJlcy9jb2xvcl9cIiArIGhlcm9Db25maWcubHYpO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb1NwciwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgdGhpcy5oZXJvSUQpO1xyXG4gICAgICAgICAgICBVdGlscy5hc3luY19zZXRfc3ByaXRlX2ZyYW1lKHRoaXMuaGVyb0x2bFNwciwgQnVuZGxlTmFtZS5CT09LLCBcInJlcy9pY29uX2x2XCIgKyBoZXJvQ29uZmlnLmx2KTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwuc3RyaW5nID0gdGhpcy5oZXJvRGlhbS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUuY29sb3IgPSBjYy5Db2xvci5XSElURTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWxPdXRsaW5lKS5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wcmljZV9sYmwubm9kZS5jb2xvciA9IGNjLkNvbG9yLkJMQUNLLmZyb21IRVgoXCIjRkZEQTU4XCIpO1xyXG4gICAgICAgICAgICB0aGlzLnByaWNlX2xibC5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbE91dGxpbmUpLmNvbG9yID0gY2MuQ29sb3IuQkxBQ0suZnJvbUhFWChcIiM3RDI3MTNcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29zdF9zcHJpdGUubm9kZS5oZWlnaHQgPSA1MDtcclxuICAgICAgICAgICAgdGhpcy5jb3N0X3Nwcml0ZS5ub2RlLndpZHRoID0gNTA7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5oZXJvRGlhbSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByaWNlX2xibC5zdHJpbmcgPSBcIk1p4buFbiBwaMOtXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvc3Rfc3ByaXRlLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiIzI1M0Q0NVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLm5vZGUuY29sb3IgPSBjYy5Db2xvci5CTEFDSy5mcm9tSEVYKFwiIzFDM0YwMFwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJpY2VfbGJsLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsT3V0bGluZSkuZW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmNvc3Rfc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svdmlkZW9fMVwiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29zdF9zcHJpdGUubm9kZS53aWR0aCA9IDU1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3N0X3Nwcml0ZS5ub2RlLmhlaWdodCA9IDQwO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGVyb0RpYW0gPiAyMDApIHtcclxuICAgICAgICAgICAgICAgIFV0aWxzLmFzeW5jX3NldF9zcHJpdGVfZnJhbWUodGhpcy5jb3N0X3Nwcml0ZSwgQnVuZGxlTmFtZS5DT01NT04sIFwicmVzL2hhbmRib29rL1wiICsgUmV3YXJkSWRFbnVtLkdPTEQpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgVXRpbHMuYXN5bmNfc2V0X3Nwcml0ZV9mcmFtZSh0aGlzLmNvc3Rfc3ByaXRlLCBCdW5kbGVOYW1lLkNPTU1PTiwgXCJyZXMvaGFuZGJvb2svXCIgKyBSZXdhcmRJZEVudW0uRElBTU9ORCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNsaWNrQWRkSGVyb1RvYmF0dGxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfYmF0dGxlX2hlcm9faXNfc3BhY2UoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oZXJvRGlhbSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBnbS5jaGFubmVsLnNob3dfdmlkZW9fYWQodGhpcy5hZGRIZXJvLCB0aGlzKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhlcm9EaWFtID4gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZUNvaW5EYXRhLmNvaW5OdW0gPCB0aGlzLmhlcm9EaWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2V0X21vZHVsZV9hcmdzKGdtLmNvbnN0LkdFVENPSU5PUC5rZXksIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zaG93X3BhbmVsKGdtLmNvbnN0LkdFVENPSU5PUCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuc2V0QWRkR2FtZUNvaW4oU2V0SXRlbU51bUVudW0uUkVEVUNFX0lURU1fVFlQRSwgdGhpcy5oZXJvRGlhbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZEhlcm8oKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChnbS5kYXRhLm1hcENlbGxfZGF0YS5yb2xlQ29pbkRhdGEuZGlhbW9uZE51bSA8IHRoaXMuaGVyb0RpYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBnbS51aS5zZXRfbW9kdWxlX2FyZ3MoZ20uY29uc3QuR0VUQ09JTk9QLmtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20udWkuc2hvd19wYW5lbChnbS5jb25zdC5HRVRDT0lOT1ApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdtLmRhdGEubWFwQ2VsbF9kYXRhLnNldEFkZEdhbWVEaWFtb25kKFNldEl0ZW1OdW1FbnVtLlJFRFVDRV9JVEVNX1RZUEUsIHRoaXMuaGVyb0RpYW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRIZXJvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnbS51aS5zaG93X25vdGljZShcIkLhuqFuIGtow7RuZyBjw7MgxJHhu6cgw7QgdHLhu5FuZywgdnVpIGzDsm5nIGThu41uIGThurlwIGNow7puZyB0csaw4bubY1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRIZXJvKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzcGFjZUluZGV4OiBudW1iZXI7XHJcblxyXG4gICAgICAgIGlmIChUZW1wRGF0YS5nZXREZWZlbnNlVHlwZSgpICE9IDIpIHtcclxuICAgICAgICAgICAgc3BhY2VJbmRleCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9JRCA9IHRoaXMuaGVyb0lEO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRJdGVtKGhlcm9JRCwgMSwgc3BhY2VJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9Db25maWcgPSBnbS5kYXRhLmNvbmZpZ19kYXRhLmdldEhlcm9DZmdCeUlEKGhlcm9JRCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVHb0JhdHRsZUl0ZW0gPSBuZXcgcm9sZUdvQmF0dGxlSXRlbVZPKCk7XHJcbiAgICAgICAgICAgIHJvbGVHb0JhdHRsZUl0ZW0uY2VsbElEID0gc3BhY2VJbmRleDtcclxuXHJcbiAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByb2xlR29CYXR0bGVJdGVtLml0ZW1JRCA9IGhlcm9Db25maWcuaGVyb2lkO1xyXG4gICAgICAgICAgICAgICAgcm9sZUdvQmF0dGxlSXRlbS5pdGVtVHlwZSA9IGhlcm9Db25maWcub2NjdXBhdGlvbjtcclxuICAgICAgICAgICAgICAgIHJvbGVHb0JhdHRsZUl0ZW0uaHAgPSBoZXJvQ29uZmlnLmhwO1xyXG4gICAgICAgICAgICAgICAgcm9sZUdvQmF0dGxlSXRlbS5tYXhIcCA9IGhlcm9Db25maWcuaHA7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5iYXR0bGVfaGVyb19hcnJheS5wdXNoKHJvbGVHb0JhdHRsZUl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuaGVyb0lEKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM0MDAzOlxyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA5MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwOTAxKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzUwMDM6XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDkwMik7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA5MDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzNzAwMzpcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9vbmNlX3BvaW50KDEwOTA0KTtcclxuICAgICAgICAgICAgICAgICAgICBSZXBvcnREYXRhLmluc3RhbmNlLnJlcG9ydF9wb2ludCgxMDkwNSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM4MDAzOlxyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X29uY2VfcG9pbnQoMTA5MDYpO1xyXG4gICAgICAgICAgICAgICAgICAgIFJlcG9ydERhdGEuaW5zdGFuY2UucmVwb3J0X3BvaW50KDEwOTA3KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMzkwMDM6XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfb25jZV9wb2ludCgxMDkwOCk7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVwb3J0RGF0YS5pbnN0YW5jZS5yZXBvcnRfcG9pbnQoMTA5MDkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaEhlcm9CYXR0bGVcIik7XHJcbiAgICAgICAgICAgIGdtLnVpLmVtaXQoXCJyZWZyZXNoQmF0dGxlSGVyb1wiKTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChnbS5kYXRhLmZpZ2h0X3RlbXBfZGF0YS5nZXRfZGVmZW5zZV9oZXJvX2lzX3NwYWNlKCkpIHtcclxuICAgICAgICAgICAgc3BhY2VJbmRleCA9IGdtLmRhdGEubWFwQ2VsbF9kYXRhLmdldFJvbGVTcGNlTGlzdFNoaWZ0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9JRCA9IHRoaXMuaGVyb0lEO1xyXG4gICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hZGRJdGVtKGhlcm9JRCwgMSwgc3BhY2VJbmRleCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVEYXRhID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEucm9sZV9tYXBfZGF0YVtzcGFjZUluZGV4XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyb2xlRGF0YS5pdGVtSUQgPiAzMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmRhdGEuY29uZmlnX2RhdGEuZ2V0SGVyb0NmZ0J5SUQoaGVyb0lEKTtcclxuICAgICAgICAgICAgICAgIGlmIChoZXJvQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZW5zZUhlcm9JdGVtID0gbmV3IERlZmVuc2VIZXJvSXRlbVZPKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtLmNlbGxJRCA9IHNwYWNlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmZW5zZUhlcm9JdGVtLmhlcm9pZCA9IGhlcm9JRDtcclxuICAgICAgICAgICAgICAgICAgICBkZWZlbnNlSGVyb0l0ZW0uaGVyb1VJRCA9IHJvbGVEYXRhLmhlcm9VSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZ20uZGF0YS5tYXBDZWxsX2RhdGEuYWRkRGVmZW5zZURhdGFCeUlEKGRlZmVuc2VIZXJvSXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaEhlcm9CYXR0bGVcIik7XHJcbiAgICAgICAgICAgICAgICBnbS51aS5lbWl0KFwicmVmcmVzaEJhdHRsZUhlcm9cIik7XHJcbiAgICAgICAgICAgICAgICBnbS5kYXRhLm1hcENlbGxfZGF0YS5hc3luY193cml0ZV9kYXRhKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhlcm9TcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaGVyb0x2bFNwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgeyBHb0JhdHRsZUJ1eUl0ZW0gfTsiXX0=