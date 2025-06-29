
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/start-scene/scripts/ConfigData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '86541OEhZFJSZtqS1j8vaWg', 'ConfigData');
// start-scene/scripts/ConfigData.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigData = exports.SkillEffectId = exports.SkillPos = exports.SkillType = exports.AttackType = void 0;
var GameManager_1 = require("./GameManager");
var Constants_1 = require("./Constants");
// @
var AttackType;
(function (AttackType) {
    AttackType[AttackType["NONE"] = 0] = "NONE";
    AttackType[AttackType["MELEE"] = 1] = "MELEE";
    AttackType[AttackType["REMOTE"] = 2] = "REMOTE";
})(AttackType = exports.AttackType || (exports.AttackType = {}));
// @
var SkillType;
(function (SkillType) {
    SkillType[SkillType["NONE"] = 0] = "NONE";
    SkillType[SkillType["IMMEDIATE"] = 1] = "IMMEDIATE";
    SkillType[SkillType["FLY"] = 2] = "FLY";
    SkillType[SkillType["PASSIVE"] = 3] = "PASSIVE";
})(SkillType = exports.SkillType || (exports.SkillType = {}));
// @
var SkillPos;
(function (SkillPos) {
    SkillPos[SkillPos["ENEMY_BODY"] = 0] = "ENEMY_BODY";
    SkillPos[SkillPos["SELF_BODY"] = 1] = "SELF_BODY";
    SkillPos[SkillPos["ALL_ENEMY_BODY"] = 2] = "ALL_ENEMY_BODY";
    SkillPos[SkillPos["ALL_SELF_BODY"] = 3] = "ALL_SELF_BODY";
    SkillPos[SkillPos["MAIN_CITY"] = 4] = "MAIN_CITY";
    SkillPos[SkillPos["ONE_CIRCLE_GRID"] = 5] = "ONE_CIRCLE_GRID";
    SkillPos[SkillPos["TWO_CIRCLE_GRID"] = 6] = "TWO_CIRCLE_GRID";
})(SkillPos = exports.SkillPos || (exports.SkillPos = {}));
// @
var SkillEffectId;
(function (SkillEffectId) {
    SkillEffectId[SkillEffectId["NONE"] = 0] = "NONE";
    SkillEffectId[SkillEffectId["REDUCE_DAMAGE"] = 1] = "REDUCE_DAMAGE";
    SkillEffectId[SkillEffectId["ATTACK_SPEED_UP"] = 2] = "ATTACK_SPEED_UP";
    SkillEffectId[SkillEffectId["ATTACK_BONUS"] = 3] = "ATTACK_BONUS";
    SkillEffectId[SkillEffectId["DIZZINESS"] = 4] = "DIZZINESS";
    SkillEffectId[SkillEffectId["DEFENSE_BONUS"] = 5] = "DEFENSE_BONUS";
    SkillEffectId[SkillEffectId["RESTORE_HP"] = 6] = "RESTORE_HP";
    SkillEffectId[SkillEffectId["FIRE"] = 7] = "FIRE";
    SkillEffectId[SkillEffectId["REDUCE_SPEED"] = 8] = "REDUCE_SPEED";
})(SkillEffectId = exports.SkillEffectId || (exports.SkillEffectId = {}));
//
var ConfigData = /** @class */ (function () {
    function ConfigData() {
        this._mapCfgList = [];
        this._buildCfgList = {};
        this._openSortCellCfgList = {};
        this._itemCfgList = {};
        this._itemTypeCfgList = {};
        this._randomConfigData = {};
        this._heroCfgList = {};
        this._caskCfgList = [];
        this._shopCfgList = {};
        this._guideCfgList = {};
        this._specialCfgList = {};
        this._skillCfgList = {};
        this._buildSort = {};
        this._heroSkillArr = {};
        this._cellIndexArr = {};
        this._dict = [-20, 1, 20, -1];
        this._tempDictList = [];
        this._storeArr = {};
        this._starListArr = {};
    }
    // @
    ConfigData.prototype.getCallDireCellID = function (idx) {
        this._tempDictList = [];
        for (var e = 0; e < this._dict.length; e++) {
            var val = this._cellIndexArr[this._mapCfgList[idx].mapIndex + this._dict[e]];
            this._tempDictList.push(val ? val : -1);
        }
        return this._tempDictList;
    };
    // ???
    ConfigData.prototype.initAllCfg = function () {
        this._buildSort = {};
        this._openSortCellCfgList = {};
        this._itemCfgList = {};
        this._heroSkillArr = {};
        this._cellIndexArr = {};
        this._starListArr = {};
        // ----------
        var mapCellConfig = GameManager_1.gm.config.get_config_data("MapCellConfigData");
        if (mapCellConfig) {
            for (var e in mapCellConfig.data) {
                var mapcell = mapCellConfig.data[e];
                this._mapCfgList.push(mapcell);
                this._openSortCellCfgList[mapcell.areaID] || (this._openSortCellCfgList[mapcell.areaID] = {});
                this._cellIndexArr[mapcell.mapIndex] = mapcell.cellID;
                this._openSortCellCfgList[mapcell.areaID][mapcell.lock] = mapcell;
            }
        }
        // ----------
        var buildConfig = GameManager_1.gm.config.get_config_data("BuildConfigData");
        if (buildConfig) {
            for (var e in buildConfig.data) {
                var build = buildConfig.data[e];
                build.rate = build.rate.split("|");
                build.consume = build.consume.split("|");
                build.num = build.num.split("|");
                build.reward = build.reward.split("|");
                build.amount = build.amount.split("|");
                build.showAreaID = build.showAreaID.split("|");
                //
                for (var i = 0; i < build.rate.length; i++) {
                    build.rate[i] = parseInt(build.rate[i].toString());
                }
                for (var i = 0; i < build.consume.length; i++) {
                    build.consume[i] = parseInt(build.consume[i].toString());
                }
                for (var i = 0; i < build.num.length; i++) {
                    build.num[i] = parseInt(build.num[i].toString());
                }
                if (Array.isArray(build.reward)) {
                    for (var i = 0; i < build.reward.length; i++) {
                        build.reward[i] = parseInt(build.reward[i].toString());
                    }
                }
                if (Array.isArray(build.amount)) {
                    for (var i = 0; i < build.amount.length; i++) {
                        build.amount[i] = parseInt(build.amount[i].toString());
                    }
                }
                if (Array.isArray(build.showAreaID)) {
                    for (var i = 0; i < build.showAreaID.length; i++) {
                        build.showAreaID[i] = parseInt(build.showAreaID[i].toString());
                    }
                }
                this._buildSort[build.lock] = build.buildName;
            }
            this._buildCfgList = buildConfig.data;
        }
        // ----------
        var itemConfig = GameManager_1.gm.config.get_config_data("ItemConfigData");
        if (itemConfig) {
            var item = itemConfig.data;
            this._itemCfgList = item;
        }
        // ----------
        var lvRanDomConfig = GameManager_1.gm.config.get_config_data("LvRandomConfigData");
        if (lvRanDomConfig) {
            for (var e in lvRanDomConfig.data) {
                var Lv = lvRanDomConfig.data[e];
                this._randomConfigData[Lv.castle_lv] || (this._randomConfigData[Lv.castle_lv] = {});
                this._randomConfigData[Lv.castle_lv][Lv.lighthouse_lv] = Lv.pool_id;
            }
        }
        // ----------
        var heroConfig = GameManager_1.gm.config.get_config_data("HeroConfigData");
        if (heroConfig) {
            for (var e in heroConfig.data) {
                var hero = heroConfig.data[e];
                hero.nextLv = hero.nextLv.split("|");
                hero.nextNeedItem = hero.nextNeedItem.split("|");
                hero.nextNeedSort = hero.nextNeedSort.split("|");
                hero.itemType = hero.itemType.split("|");
                hero.itemNum = hero.itemNum.split("|");
                //
                for (var i = 0; i < hero.nextLv.length; i++) {
                    hero.nextLv[i] = parseInt(hero.nextLv[i].toString());
                }
                for (var i = 0; i < hero.nextNeedItem.length; i++) {
                    hero.nextNeedItem[i] = parseInt(hero.nextNeedItem[i].toString());
                }
                for (var i = 0; i < hero.nextNeedSort.length; i++) {
                    hero.nextNeedSort[i] = parseInt(hero.nextNeedSort[i].toString());
                }
                for (var i = 0; i < hero.itemType.length; i++) {
                    hero.itemType[i] = parseInt(hero.itemType[i].toString());
                }
                for (var i = 0; i < hero.itemNum.length; i++) {
                    hero.itemNum[i] = parseInt(hero.itemNum[i].toString());
                }
                this._heroCfgList[hero.heroid] = hero;
            }
        }
        // ----------
        var caskConfig = GameManager_1.gm.config.get_config_data("CaskConfigData");
        if (caskConfig) {
            for (var e in caskConfig.data) {
                var cask = caskConfig.data[e];
                this._caskCfgList.push(cask.drop);
            }
        }
        // ----------
        var shopConfig = GameManager_1.gm.config.get_config_data("ShopConfigData");
        if (shopConfig) {
            var shop = shopConfig.data;
            this._shopCfgList = shop;
        }
        // ----------
        this._guideCfgList = {};
        var guideConfig = GameManager_1.gm.config.get_config_data("GuideConfigData");
        if (guideConfig) {
            for (var e in guideConfig.data) {
                var guide = guideConfig.data[e];
                this._guideCfgList[guide.guideID] || (this._guideCfgList[guide.guideID] = []);
                this._guideCfgList[guide.guideID].push(guide);
            }
        }
        // ----------
        var speciaConfig = GameManager_1.gm.config.get_config_data("SpecialConfigData");
        if (speciaConfig) {
            for (var e in speciaConfig.data) {
                var special = speciaConfig.data[e];
                special.prop = special.prop.split("|");
                special.value = special.value.split("|");
                //
                for (var i = 0; i < special.prop.length; i++) {
                    special.prop[i] = parseInt(special.prop[i].toString());
                }
                for (var i = 0; i < special.value.length; i++) {
                    special.value[i] = parseInt(special.value[i].toString());
                }
                this._specialCfgList[special.id] = special;
            }
        }
        // ----------
        this._skillCfgList = {};
        var skillConfig = GameManager_1.gm.config.get_config_data("SkillConfigData");
        if (skillConfig) {
            for (var e in skillConfig.data) {
                var skill = skillConfig.data[e];
                this._skillCfgList[skill.id] || (this._skillCfgList[skill.id] = []);
                this._skillCfgList[skill.id].push(skill);
                if (skill.is_show === 1) {
                    this._heroSkillArr[skill.id] || (this._heroSkillArr[skill.id] = []);
                    this._heroSkillArr[skill.id].push(skill);
                }
            }
        }
        // ----------
        this._storeArr = {};
        var storeConfig = GameManager_1.gm.config.get_config_data("StoreConfigData");
        if (storeConfig) {
            for (var e in storeConfig.data) {
                var store = storeConfig.data[e];
                this._storeArr[store.shop_type] || (this._storeArr[store.shop_type] = []);
                this._storeArr[store.shop_type].push(store);
            }
        }
        // ----------
        var starConfig = GameManager_1.gm.config.get_config_data("StarConfigData");
        if (starConfig) {
            for (var e in starConfig.data) {
                var star = starConfig.data[e];
                this._starListArr[star.arms] || (this._starListArr[star.arms] = []);
                this._starListArr[star.arms].push(star);
            }
        }
    }; // end: initAllCfg
    // @
    ConfigData.prototype.getSortBuildName = function () {
        return this._buildSort[GameManager_1.gm.data.mapCell_data.role_build_lock_num];
    };
    // @
    ConfigData.prototype.getGuideIDList = function (key) {
        return this._guideCfgList[key];
    };
    // @
    ConfigData.prototype.getCaskIDBySortId = function (index) {
        return this._caskCfgList[index] < 30000 ? [1, this._caskCfgList[index]] : [3, this._caskCfgList[index]];
    };
    // @
    ConfigData.prototype.getRandomID = function () {
        var t = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.TOWER_TYPE];
        var e = GameManager_1.gm.data.mapCell_data.buildData[Constants_1.BuildTypeEnum.WHARFTAX_TYPE];
        var buildID = t && t.buildID > 51001 ? t.buildID : 51001;
        var wharfID = e && e.buildID > 59001 ? e.buildID : 59001;
        return this._randomConfigData[buildID][wharfID];
    };
    // @
    ConfigData.prototype.getAreaIDList = function (key) {
        return this._openSortCellCfgList[key];
    };
    // @
    ConfigData.prototype.getAreaNextOpenCellID = function (key1, key2) {
        return this._openSortCellCfgList[key1][key2];
    };
    // @
    ConfigData.prototype.getBuildCfg = function () {
        return this._buildCfgList;
    };
    // @
    ConfigData.prototype.getBuildCfgByID = function (key) {
        return this._buildCfgList[key] || null;
    };
    // @
    ConfigData.prototype.getMapCellCfg = function () {
        return this._mapCfgList;
    };
    // @
    ConfigData.prototype.getMapCellCfgByID = function (cellID) {
        return this._mapCfgList[cellID];
    };
    // @
    ConfigData.prototype.getMapIndexByCellID = function (mapIndex) {
        return this._mapCfgList[mapIndex].mapIndex;
    };
    // @
    ConfigData.prototype.getItemCfgByID = function (key) {
        return this._itemCfgList[key];
    };
    // @
    ConfigData.prototype.getHeroCfgByID = function (key) {
        return this._heroCfgList[key];
    };
    // @
    ConfigData.prototype.getShopCfgByID = function (key) {
        return this._shopCfgList[key];
    };
    // @
    ConfigData.prototype.getSpecialByID = function (key) {
        return this._specialCfgList[key];
    };
    // @
    ConfigData.prototype.getSpecialList = function () {
        return this._specialCfgList;
    };
    // @
    ConfigData.prototype.getSkillByID = function (key) {
        return this._skillCfgList[key];
    };
    // @
    ConfigData.prototype.getSkillList = function () {
        return this._heroSkillArr;
    };
    // @
    ConfigData.prototype.getStoreList = function () {
        return this._storeArr;
    };
    // @
    ConfigData.prototype.getStarCfgList = function () {
        return this._starListArr;
    };
    // @
    ConfigData.prototype.getStarCfgByID = function (key1, key2) {
        var star = this._starListArr[key1];
        return star && star[key2] || null;
    };
    return ConfigData;
}());
exports.ConfigData = ConfigData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc3RhcnQtc2NlbmVcXHNjcmlwdHNcXENvbmZpZ0RhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW1DO0FBQ25DLHlDQUF5RDtBQWV6RCxJQUFJO0FBQ0osSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ2xCLDJDQUFRLENBQUE7SUFDUiw2Q0FBUyxDQUFBO0lBQ1QsK0NBQVUsQ0FBQTtBQUNkLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQjtBQUVELElBQUk7QUFDSixJQUFZLFNBS1g7QUFMRCxXQUFZLFNBQVM7SUFDakIseUNBQVEsQ0FBQTtJQUNSLG1EQUFhLENBQUE7SUFDYix1Q0FBTyxDQUFBO0lBQ1AsK0NBQVcsQ0FBQTtBQUNmLENBQUMsRUFMVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUtwQjtBQUVELElBQUk7QUFDSixJQUFZLFFBUVg7QUFSRCxXQUFZLFFBQVE7SUFDaEIsbURBQWMsQ0FBQTtJQUNkLGlEQUFhLENBQUE7SUFDYiwyREFBa0IsQ0FBQTtJQUNsQix5REFBaUIsQ0FBQTtJQUNqQixpREFBYSxDQUFBO0lBQ2IsNkRBQW1CLENBQUE7SUFDbkIsNkRBQW1CLENBQUE7QUFDdkIsQ0FBQyxFQVJXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBUW5CO0FBRUQsSUFBSTtBQUNKLElBQVksYUFVWDtBQVZELFdBQVksYUFBYTtJQUNyQixpREFBUSxDQUFBO0lBQ1IsbUVBQWlCLENBQUE7SUFDakIsdUVBQW1CLENBQUE7SUFDbkIsaUVBQWdCLENBQUE7SUFDaEIsMkRBQWEsQ0FBQTtJQUNiLG1FQUFpQixDQUFBO0lBQ2pCLDZEQUFjLENBQUE7SUFDZCxpREFBUSxDQUFBO0lBQ1IsaUVBQWdCLENBQUE7QUFDcEIsQ0FBQyxFQVZXLGFBQWEsR0FBYixxQkFBYSxLQUFiLHFCQUFhLFFBVXhCO0FBR0QsRUFBRTtBQUNGO0lBQUE7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SSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsSUFBSTtJQUNHLGlDQUFZLEdBQW5CO1FBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRCxJQUFJO0lBQ0csaUNBQVksR0FBbkI7UUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUk7SUFDRyxtQ0FBYyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSTtJQUNHLG1DQUFjLEdBQXJCLFVBQXNCLElBQVksRUFBRSxJQUFZO1FBQzVDLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUNyQyxDQUFDO0lBQ0wsaUJBQUM7QUFBRCxDQTVVQSxBQTRVQyxJQUFBO0FBNVVZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ20gfSBmcm9tICcuL0dhbWVNYW5hZ2VyJztcclxuaW1wb3J0IHsgQnVpbGRUeXBlRW51bSwgU3BlY2lhbEVudW0gfSBmcm9tICcuL0NvbnN0YW50cyc7XHJcbmltcG9ydCB7IE1hcENlbGwgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbWFwY2VsbFwiXHJcbmltcG9ydCB7IEJ1aWxkIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL2J1aWxkXCI7XHJcbmltcG9ydCB7IEl0ZW1Db25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvaXRlbVwiO1xyXG5pbXBvcnQgeyBsdlJhbmRvbUNvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9sdl9yYW5kb21cIjtcclxuaW1wb3J0IHsgSGVyb0NvbmZpZyB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9oZXJvXCI7XHJcbmltcG9ydCB7IENhc2tDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvY2Fza1wiO1xyXG5pbXBvcnQgeyBTaG9wQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3Nob3BcIjtcclxuaW1wb3J0IHsgR3VpZGVDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvZ3VpZGVcIjtcclxuaW1wb3J0IHsgU3BlY2lhbCB9IGZyb20gXCIuLi8uLi9jb21tb24vY29uZmlncy9zcGVjaWFsXCI7XHJcbmltcG9ydCB7IFNraWxsQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3NraWxsXCI7XHJcbmltcG9ydCB7IE1hbGxDb25maWcgfSBmcm9tIFwiLi4vLi4vY29tbW9uL2NvbmZpZ3MvbWFsbFwiO1xyXG5pbXBvcnQgeyBTdGFyQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbW1vbi9jb25maWdzL3N0YXJcIjtcclxuXHJcblxyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIEF0dGFja1R5cGUge1xyXG4gICAgTk9ORSA9IDAsXHJcbiAgICBNRUxFRSA9IDEsXHJcbiAgICBSRU1PVEUgPSAyXHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gU2tpbGxUeXBlIHtcclxuICAgIE5PTkUgPSAwLFxyXG4gICAgSU1NRURJQVRFID0gMSxcclxuICAgIEZMWSA9IDIsXHJcbiAgICBQQVNTSVZFID0gM1xyXG59XHJcblxyXG4vLyBAXHJcbmV4cG9ydCBlbnVtIFNraWxsUG9zIHtcclxuICAgIEVORU1ZX0JPRFkgPSAwLFxyXG4gICAgU0VMRl9CT0RZID0gMSxcclxuICAgIEFMTF9FTkVNWV9CT0RZID0gMixcclxuICAgIEFMTF9TRUxGX0JPRFkgPSAzLFxyXG4gICAgTUFJTl9DSVRZID0gNCxcclxuICAgIE9ORV9DSVJDTEVfR1JJRCA9IDUsXHJcbiAgICBUV09fQ0lSQ0xFX0dSSUQgPSA2XHJcbn1cclxuXHJcbi8vIEBcclxuZXhwb3J0IGVudW0gU2tpbGxFZmZlY3RJZCB7XHJcbiAgICBOT05FID0gMCxcclxuICAgIFJFRFVDRV9EQU1BR0UgPSAxLFxyXG4gICAgQVRUQUNLX1NQRUVEX1VQID0gMixcclxuICAgIEFUVEFDS19CT05VUyA9IDMsXHJcbiAgICBESVpaSU5FU1MgPSA0LFxyXG4gICAgREVGRU5TRV9CT05VUyA9IDUsXHJcbiAgICBSRVNUT1JFX0hQID0gNixcclxuICAgIEZJUkUgPSA3LFxyXG4gICAgUkVEVUNFX1NQRUVEID0gOFxyXG59XHJcblxyXG5cclxuLy9cclxuZXhwb3J0IGNsYXNzIENvbmZpZ0RhdGEge1xyXG4gICAgcHJpdmF0ZSBfbWFwQ2ZnTGlzdDogTWFwQ2VsbFtdID0gW107XHJcbiAgICBwcml2YXRlIF9idWlsZENmZ0xpc3Q6IFJlY29yZDxudW1iZXIsIEJ1aWxkPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfb3BlblNvcnRDZWxsQ2ZnTGlzdDogUmVjb3JkPG51bWJlciwgUmVjb3JkPG51bWJlciwgTWFwQ2VsbD4+ID0ge307XHJcbiAgICBwcml2YXRlIF9pdGVtQ2ZnTGlzdDogUmVjb3JkPG51bWJlciwgSXRlbUNvbmZpZz4gPSB7fTtcclxuICAgIHByaXZhdGUgX2l0ZW1UeXBlQ2ZnTGlzdDogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfcmFuZG9tQ29uZmlnRGF0YTogUmVjb3JkPG51bWJlciwgUmVjb3JkPG51bWJlciwgbnVtYmVyPj4gPSB7fTtcclxuICAgIHByaXZhdGUgX2hlcm9DZmdMaXN0OiBSZWNvcmQ8bnVtYmVyLCBIZXJvQ29uZmlnPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfY2Fza0NmZ0xpc3Q6IG51bWJlcltdID0gW107XHJcbiAgICBwcml2YXRlIF9zaG9wQ2ZnTGlzdDogUmVjb3JkPG51bWJlciwgU2hvcENvbmZpZz4gPSB7fTtcclxuICAgIHByaXZhdGUgX2d1aWRlQ2ZnTGlzdDogUmVjb3JkPG51bWJlciwgR3VpZGVDb25maWdbXT4gPSB7fTtcclxuICAgIHByaXZhdGUgX3NwZWNpYWxDZmdMaXN0OiBSZWNvcmQ8bnVtYmVyLCBTcGVjaWFsPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfc2tpbGxDZmdMaXN0OiBSZWNvcmQ8bnVtYmVyLCBTa2lsbENvbmZpZ1tdPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBfYnVpbGRTb3J0OiBSZWNvcmQ8bnVtYmVyLCBzdHJpbmc+ID0ge307XHJcbiAgICBwcml2YXRlIF9oZXJvU2tpbGxBcnI6IFJlY29yZDxudW1iZXIsIFNraWxsQ29uZmlnW10+ID0ge307XHJcbiAgICBwcml2YXRlIF9jZWxsSW5kZXhBcnI6IFJlY29yZDxudW1iZXIsIG51bWJlcj4gPSB7fTtcclxuICAgIHByaXZhdGUgX2RpY3Q6IG51bWJlcltdID0gWy0yMCwgMSwgMjAsIC0xXTtcclxuICAgIHByaXZhdGUgX3RlbXBEaWN0TGlzdDogbnVtYmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX3N0b3JlQXJyOiBSZWNvcmQ8c3RyaW5nLCBNYWxsQ29uZmlnW10+ID0ge307XHJcbiAgICBwcml2YXRlIF9zdGFyTGlzdEFycjogUmVjb3JkPG51bWJlciwgU3RhckNvbmZpZ1tdPiA9IHt9O1xyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRDYWxsRGlyZUNlbGxJRChpZHg6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICB0aGlzLl90ZW1wRGljdExpc3QgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBlID0gMDsgZSA8IHRoaXMuX2RpY3QubGVuZ3RoOyBlKyspIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5fY2VsbEluZGV4QXJyW3RoaXMuX21hcENmZ0xpc3RbaWR4XS5tYXBJbmRleCArIHRoaXMuX2RpY3RbZV1dO1xyXG4gICAgICAgICAgICB0aGlzLl90ZW1wRGljdExpc3QucHVzaCh2YWwgPyB2YWwgOiAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90ZW1wRGljdExpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPz8/XHJcbiAgICBwdWJsaWMgaW5pdEFsbENmZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9idWlsZFNvcnQgPSB7fTtcclxuICAgICAgICB0aGlzLl9vcGVuU29ydENlbGxDZmdMaXN0ID0ge307XHJcbiAgICAgICAgdGhpcy5faXRlbUNmZ0xpc3QgPSB7fTtcclxuICAgICAgICB0aGlzLl9oZXJvU2tpbGxBcnIgPSB7fTtcclxuICAgICAgICB0aGlzLl9jZWxsSW5kZXhBcnIgPSB7fTtcclxuICAgICAgICB0aGlzLl9zdGFyTGlzdEFyciA9IHt9O1xyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgbWFwQ2VsbENvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJNYXBDZWxsQ29uZmlnRGF0YVwiKTtcclxuICAgICAgICBpZiAobWFwQ2VsbENvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIGluIG1hcENlbGxDb25maWcuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFwY2VsbCA9IG1hcENlbGxDb25maWcuZGF0YVtlXSBhcyBNYXBDZWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2ZnTGlzdC5wdXNoKG1hcGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb3BlblNvcnRDZWxsQ2ZnTGlzdFttYXBjZWxsLmFyZWFJRF0gfHwgKHRoaXMuX29wZW5Tb3J0Q2VsbENmZ0xpc3RbbWFwY2VsbC5hcmVhSURdID0ge30pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2VsbEluZGV4QXJyW21hcGNlbGwubWFwSW5kZXhdID0gbWFwY2VsbC5jZWxsSUQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuU29ydENlbGxDZmdMaXN0W21hcGNlbGwuYXJlYUlEXVttYXBjZWxsLmxvY2tdID0gbWFwY2VsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgYnVpbGRDb25maWcgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiQnVpbGRDb25maWdEYXRhXCIpO1xyXG4gICAgICAgIGlmIChidWlsZENvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIGluIGJ1aWxkQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJ1aWxkID0gYnVpbGRDb25maWcuZGF0YVtlXSBhcyBCdWlsZDtcclxuICAgICAgICAgICAgICAgIGJ1aWxkLnJhdGUgPSBidWlsZC5yYXRlLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkLmNvbnN1bWUgPSBidWlsZC5jb25zdW1lLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkLm51bSA9IGJ1aWxkLm51bS5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgICAgICBidWlsZC5yZXdhcmQgPSBidWlsZC5yZXdhcmQuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgYnVpbGQuYW1vdW50ID0gYnVpbGQuYW1vdW50LnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIGJ1aWxkLnNob3dBcmVhSUQgPSBidWlsZC5zaG93QXJlYUlELnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1aWxkLnJhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZC5yYXRlW2ldID0gcGFyc2VJbnQoYnVpbGQucmF0ZVtpXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVpbGQuY29uc3VtZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkLmNvbnN1bWVbaV0gPSBwYXJzZUludChidWlsZC5jb25zdW1lW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWlsZC5udW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZC5udW1baV0gPSBwYXJzZUludChidWlsZC5udW1baV0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShidWlsZC5yZXdhcmQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBidWlsZC5yZXdhcmQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGQucmV3YXJkW2ldID0gcGFyc2VJbnQoYnVpbGQucmV3YXJkW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGJ1aWxkLmFtb3VudCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1aWxkLmFtb3VudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidWlsZC5hbW91bnRbaV0gPSBwYXJzZUludChidWlsZC5hbW91bnRbaV0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYnVpbGQuc2hvd0FyZWFJRCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1aWxkLnNob3dBcmVhSUQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnVpbGQuc2hvd0FyZWFJRFtpXSA9IHBhcnNlSW50KGJ1aWxkLnNob3dBcmVhSURbaV0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYnVpbGRTb3J0W2J1aWxkLmxvY2tdID0gYnVpbGQuYnVpbGROYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2J1aWxkQ2ZnTGlzdCA9IGJ1aWxkQ29uZmlnLmRhdGEgYXMgUmVjb3JkPG51bWJlciwgQnVpbGQ+O1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBpdGVtQ29uZmlnID0gZ20uY29uZmlnLmdldF9jb25maWdfZGF0YShcIkl0ZW1Db25maWdEYXRhXCIpO1xyXG4gICAgICAgIGlmIChpdGVtQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtQ29uZmlnLmRhdGEgYXMgUmVjb3JkPHN0cmluZywgSXRlbUNvbmZpZz47XHJcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1DZmdMaXN0ID0gaXRlbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS1cclxuICAgICAgICBjb25zdCBsdlJhbkRvbUNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJMdlJhbmRvbUNvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgaWYgKGx2UmFuRG9tQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGUgaW4gbHZSYW5Eb21Db25maWcuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgTHYgPSBsdlJhbkRvbUNvbmZpZy5kYXRhW2VdIGFzIGx2UmFuZG9tQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmFuZG9tQ29uZmlnRGF0YVtMdi5jYXN0bGVfbHZdIHx8ICh0aGlzLl9yYW5kb21Db25maWdEYXRhW0x2LmNhc3RsZV9sdl0gPSB7fSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yYW5kb21Db25maWdEYXRhW0x2LmNhc3RsZV9sdl1bTHYubGlnaHRob3VzZV9sdl0gPSBMdi5wb29sX2lkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3QgaGVyb0NvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJIZXJvQ29uZmlnRGF0YVwiKTtcclxuICAgICAgICBpZiAoaGVyb0NvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIGluIGhlcm9Db25maWcuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVybyA9IGhlcm9Db25maWcuZGF0YVtlXSBhcyBIZXJvQ29uZmlnO1xyXG4gICAgICAgICAgICAgICAgaGVyby5uZXh0THYgPSBoZXJvLm5leHRMdi5zcGxpdChcInxcIik7XHJcbiAgICAgICAgICAgICAgICBoZXJvLm5leHROZWVkSXRlbSA9IGhlcm8ubmV4dE5lZWRJdGVtLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIGhlcm8ubmV4dE5lZWRTb3J0ID0gaGVyby5uZXh0TmVlZFNvcnQuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgaGVyby5pdGVtVHlwZSA9IGhlcm8uaXRlbVR5cGUuc3BsaXQoXCJ8XCIpO1xyXG4gICAgICAgICAgICAgICAgaGVyby5pdGVtTnVtID0gaGVyby5pdGVtTnVtLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlcm8ubmV4dEx2Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyby5uZXh0THZbaV0gPSBwYXJzZUludChoZXJvLm5leHRMdltpXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVyby5uZXh0TmVlZEl0ZW0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvLm5leHROZWVkSXRlbVtpXSA9IHBhcnNlSW50KGhlcm8ubmV4dE5lZWRJdGVtW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZXJvLm5leHROZWVkU29ydC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlcm8ubmV4dE5lZWRTb3J0W2ldID0gcGFyc2VJbnQoaGVyby5uZXh0TmVlZFNvcnRbaV0udG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlcm8uaXRlbVR5cGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvLml0ZW1UeXBlW2ldID0gcGFyc2VJbnQoaGVyby5pdGVtVHlwZVtpXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVyby5pdGVtTnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyby5pdGVtTnVtW2ldID0gcGFyc2VJbnQoaGVyby5pdGVtTnVtW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGVyb0NmZ0xpc3RbaGVyby5oZXJvaWRdID0gaGVybztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgICAgIGNvbnN0IGNhc2tDb25maWcgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiQ2Fza0NvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgaWYgKGNhc2tDb25maWcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZSBpbiBjYXNrQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhc2sgPSBjYXNrQ29uZmlnLmRhdGFbZV0gYXMgQ2Fza0NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2Fza0NmZ0xpc3QucHVzaChjYXNrLmRyb3ApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgY29uc3Qgc2hvcENvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJTaG9wQ29uZmlnRGF0YVwiKTtcclxuICAgICAgICBpZiAoc2hvcENvbmZpZykge1xyXG4gICAgICAgICAgICBjb25zdCBzaG9wID0gc2hvcENvbmZpZy5kYXRhIGFzIFJlY29yZDxudW1iZXIsIFNob3BDb25maWc+O1xyXG4gICAgICAgICAgICB0aGlzLl9zaG9wQ2ZnTGlzdCA9IHNob3BcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC0tLS0tLS0tLS1cclxuICAgICAgICB0aGlzLl9ndWlkZUNmZ0xpc3QgPSB7fTtcclxuICAgICAgICBjb25zdCBndWlkZUNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJHdWlkZUNvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgaWYgKGd1aWRlQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGUgaW4gZ3VpZGVDb25maWcuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ3VpZGUgPSBndWlkZUNvbmZpZy5kYXRhW2VdIGFzIEd1aWRlQ29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ndWlkZUNmZ0xpc3RbZ3VpZGUuZ3VpZGVJRF0gfHwgKHRoaXMuX2d1aWRlQ2ZnTGlzdFtndWlkZS5ndWlkZUlEXSA9IFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2d1aWRlQ2ZnTGlzdFtndWlkZS5ndWlkZUlEXS5wdXNoKGd1aWRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgICAgIGNvbnN0IHNwZWNpYUNvbmZpZyA9IGdtLmNvbmZpZy5nZXRfY29uZmlnX2RhdGEoXCJTcGVjaWFsQ29uZmlnRGF0YVwiKTtcclxuICAgICAgICBpZiAoc3BlY2lhQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGUgaW4gc3BlY2lhQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWNpYWwgPSBzcGVjaWFDb25maWcuZGF0YVtlXSBhcyBTcGVjaWFsO1xyXG4gICAgICAgICAgICAgICAgc3BlY2lhbC5wcm9wID0gc3BlY2lhbC5wcm9wLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIHNwZWNpYWwudmFsdWUgPSBzcGVjaWFsLnZhbHVlLnNwbGl0KFwifFwiKTtcclxuICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwZWNpYWwucHJvcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWwucHJvcFtpXSA9IHBhcnNlSW50KHNwZWNpYWwucHJvcFtpXS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BlY2lhbC52YWx1ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwZWNpYWwudmFsdWVbaV0gPSBwYXJzZUludChzcGVjaWFsLnZhbHVlW2ldLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlY2lhbENmZ0xpc3Rbc3BlY2lhbC5pZF0gPSBzcGVjaWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAtLS0tLS0tLS0tXHJcbiAgICAgICAgdGhpcy5fc2tpbGxDZmdMaXN0ID0ge307XHJcbiAgICAgICAgY29uc3Qgc2tpbGxDb25maWcgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiU2tpbGxDb25maWdEYXRhXCIpO1xyXG4gICAgICAgIGlmIChza2lsbENvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIGluIHNraWxsQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNraWxsID0gc2tpbGxDb25maWcuZGF0YVtlXSBhcyBTa2lsbENvbmZpZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2tpbGxDZmdMaXN0W3NraWxsLmlkXSB8fCAodGhpcy5fc2tpbGxDZmdMaXN0W3NraWxsLmlkXSA9IFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NraWxsQ2ZnTGlzdFtza2lsbC5pZF0ucHVzaChza2lsbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2tpbGwuaXNfc2hvdyA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlcm9Ta2lsbEFycltza2lsbC5pZF0gfHwgKHRoaXMuX2hlcm9Ta2lsbEFycltza2lsbC5pZF0gPSBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVyb1NraWxsQXJyW3NraWxsLmlkXS5wdXNoKHNraWxsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgICAgIHRoaXMuX3N0b3JlQXJyID0ge307XHJcbiAgICAgICAgY29uc3Qgc3RvcmVDb25maWcgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiU3RvcmVDb25maWdEYXRhXCIpO1xyXG4gICAgICAgIGlmIChzdG9yZUNvbmZpZykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBlIGluIHN0b3JlQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlID0gc3RvcmVDb25maWcuZGF0YVtlXSBhcyBNYWxsQ29uZmlnXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdG9yZUFycltzdG9yZS5zaG9wX3R5cGVdIHx8ICh0aGlzLl9zdG9yZUFycltzdG9yZS5zaG9wX3R5cGVdID0gW10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RvcmVBcnJbc3RvcmUuc2hvcF90eXBlXS5wdXNoKHN0b3JlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLS0tLS0tLS0tLVxyXG4gICAgICAgIGNvbnN0IHN0YXJDb25maWcgPSBnbS5jb25maWcuZ2V0X2NvbmZpZ19kYXRhKFwiU3RhckNvbmZpZ0RhdGFcIik7XHJcbiAgICAgICAgaWYgKHN0YXJDb25maWcpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgZSBpbiBzdGFyQ29uZmlnLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXIgPSBzdGFyQ29uZmlnLmRhdGFbZV0gYXMgU3RhckNvbmZpZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3Rhckxpc3RBcnJbc3Rhci5hcm1zXSB8fCAodGhpcy5fc3Rhckxpc3RBcnJbc3Rhci5hcm1zXSA9IFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJMaXN0QXJyW3N0YXIuYXJtc10ucHVzaChzdGFyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0gLy8gZW5kOiBpbml0QWxsQ2ZnXHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldFNvcnRCdWlsZE5hbWUoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRTb3J0W2dtLmRhdGEubWFwQ2VsbF9kYXRhLnJvbGVfYnVpbGRfbG9ja19udW1dO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRHdWlkZUlETGlzdChrZXk6IG51bWJlcik6IEd1aWRlQ29uZmlnW10gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ndWlkZUNmZ0xpc3Rba2V5XTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0Q2Fza0lEQnlTb3J0SWQoaW5kZXg6IG51bWJlcik6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2Fza0NmZ0xpc3RbaW5kZXhdIDwgMzAwMDAgPyBbMSwgdGhpcy5fY2Fza0NmZ0xpc3RbaW5kZXhdXSA6IFszLCB0aGlzLl9jYXNrQ2ZnTGlzdFtpbmRleF1dO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRSYW5kb21JRCgpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHQgPSBnbS5kYXRhLm1hcENlbGxfZGF0YS5idWlsZERhdGFbQnVpbGRUeXBlRW51bS5UT1dFUl9UWVBFXTtcclxuICAgICAgICBjb25zdCBlID0gZ20uZGF0YS5tYXBDZWxsX2RhdGEuYnVpbGREYXRhW0J1aWxkVHlwZUVudW0uV0hBUkZUQVhfVFlQRV07XHJcbiAgICAgICAgY29uc3QgYnVpbGRJRCA9IHQgJiYgdC5idWlsZElEID4gNTEwMDEgPyB0LmJ1aWxkSUQgOiA1MTAwMTtcclxuICAgICAgICBjb25zdCB3aGFyZklEID0gZSAmJiBlLmJ1aWxkSUQgPiA1OTAwMSA/IGUuYnVpbGRJRCA6IDU5MDAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21Db25maWdEYXRhW2J1aWxkSURdW3doYXJmSURdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRBcmVhSURMaXN0KGtleTogbnVtYmVyKTogUmVjb3JkPG51bWJlciwgTWFwQ2VsbD4gfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuU29ydENlbGxDZmdMaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldEFyZWFOZXh0T3BlbkNlbGxJRChrZXkxOiBudW1iZXIsIGtleTI6IG51bWJlcik6IE1hcENlbGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuU29ydENlbGxDZmdMaXN0W2tleTFdW2tleTJdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHByaXZhdGUgZ2V0QnVpbGRDZmcoKTogUmVjb3JkPG51bWJlciwgQnVpbGQ+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYnVpbGRDZmdMaXN0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRCdWlsZENmZ0J5SUQoa2V5OiBudW1iZXIpOiBCdWlsZCB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idWlsZENmZ0xpc3Rba2V5XSB8fCBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRNYXBDZWxsQ2ZnKCk6IE1hcENlbGxbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcENmZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldE1hcENlbGxDZmdCeUlEKGNlbGxJRDogbnVtYmVyKTogTWFwQ2VsbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcENmZ0xpc3RbY2VsbElEXTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0TWFwSW5kZXhCeUNlbGxJRChtYXBJbmRleDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbWFwQ2ZnTGlzdFttYXBJbmRleF0ubWFwSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldEl0ZW1DZmdCeUlEKGtleTogbnVtYmVyKTogSXRlbUNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1DZmdMaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldEhlcm9DZmdCeUlEKGtleTogbnVtYmVyKTogSGVyb0NvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlcm9DZmdMaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBnZXRTaG9wQ2ZnQnlJRChrZXk6IG51bWJlcik6IFNob3BDb25maWcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaG9wQ2ZnTGlzdFtrZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRTcGVjaWFsQnlJRChrZXk6IFNwZWNpYWxFbnVtKTogU3BlY2lhbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NwZWNpYWxDZmdMaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldFNwZWNpYWxMaXN0KCk6IFJlY29yZDxudW1iZXIsIFNwZWNpYWw+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3BlY2lhbENmZ0xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHJpdmF0ZSBnZXRTa2lsbEJ5SUQoa2V5OiBudW1iZXIpOiBTa2lsbENvbmZpZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2tpbGxDZmdMaXN0W2tleV07XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQFxyXG4gICAgcHVibGljIGdldFNraWxsTGlzdCgpOiBSZWNvcmQ8bnVtYmVyLCBTa2lsbENvbmZpZ1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlcm9Ta2lsbEFycjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0U3RvcmVMaXN0KCk6IFJlY29yZDxudW1iZXIsIE1hbGxDb25maWdbXT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdG9yZUFycjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBAXHJcbiAgICBwdWJsaWMgZ2V0U3RhckNmZ0xpc3QoKTogUmVjb3JkPHN0cmluZywgU3RhckNvbmZpZ1tdPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXJMaXN0QXJyO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEBcclxuICAgIHB1YmxpYyBnZXRTdGFyQ2ZnQnlJRChrZXkxOiBudW1iZXIsIGtleTI6IG51bWJlcik6IFN0YXJDb25maWcgfCBudWxsIHtcclxuICAgICAgICBjb25zdCBzdGFyID0gdGhpcy5fc3Rhckxpc3RBcnJba2V5MV07XHJcbiAgICAgICAgcmV0dXJuIHN0YXIgJiYgc3RhcltrZXkyXSB8fCBudWxsXHJcbiAgICB9XHJcbn1cclxuIl19