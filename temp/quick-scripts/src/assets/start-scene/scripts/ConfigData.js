"use strict";
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